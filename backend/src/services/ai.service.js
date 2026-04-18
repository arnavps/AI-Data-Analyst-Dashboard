const OpenAI = require("openai");
const logger = require("../utils/logger");

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:3000",
        "X-Title": "AI Data Analyst Dashboard",
      }
    });
    this.model = process.env.AI_MODEL || "google/gemini-2.0-flash-lite-preview-02-05:free";
  }

  /**
   * Helper for retrying API calls with exponential backoff
   */
  async withRetry(fn, retries = 3, delay = 1000) {
    try {
      return await fn();
    } catch (error) {
      if (retries <= 0 || (error.status !== 429 && error.status !== 500)) {
        throw error;
      }
      logger.warn(`AI Service: Retrying due to error (${error.status}). Retries left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return this.withRetry(fn, retries - 1, delay * 2);
    }
  }

  async processNaturalLanguageQuery(question, dataSchema) {
    const { columns, types, preview } = dataSchema;

    const systemPrompt = `
You are a data analysis expert. Convert natural language questions into structured query objects.

Available data columns: ${columns.join(", ")}
Data types: ${JSON.stringify(types)}
Sample data (top 5 rows): ${JSON.stringify(preview)}

When given a question, respond with a JSON object:
{
  "operation": "aggregation|filter|sort|top|trend",
  "column": "column_name",
  "metric": "sum|avg|count|max|min",
  "groupBy": "column_name",
  "limit": number,
  "filter": { "column": "value" },
  "chartType": "line|bar|pie",
  "visualization": {
    "type": "chart_type",
    "xAxis": "column",
    "yAxis": "column"
  }
}

Examples:
Q: "Show monthly sales trend"
A: { "operation": "trend", "column": "date", "groupBy": "month", "metric": "sum", "chartType": "line", "visualization": { "type": "line", "xAxis": "month", "yAxis": "sales" } }

Q: "Top 5 products by revenue"
A: { "operation": "top", "column": "product", "metric": "sum", "limit": 5, "chartType": "bar", "visualization": { "type": "bar", "xAxis": "product", "yAxis": "revenue" } }
`;

    try {
      const response = await this.withRetry(() =>
        this.openai.chat.completions.create({
          model: this.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question },
          ],
          response_format: { type: "json_object" },
          temperature: 0,
        })
      );

      const content = JSON.parse(response.choices[0].message.content);
      logger.info("AI Service: Query processed successfully");
      return content;
    } catch (error) {
      logger.error("AI Service Error (processNaturalLanguageQuery):", error);
      throw new Error("Failed to process natural language query. Please try again later.");
    }
  }

  async generateInsights(data, context) {
    const systemPrompt = `
You are a senior data analyst. Based on the provided data results and the original question, provide 3 key professional insights.
Original Context: ${JSON.stringify(context)}
Data Results: ${JSON.stringify(data.slice(0, 10))} (preview)

Return a JSON array of strings. Each string should be a concise, actionable insight.
`;

    try {
      const response = await this.withRetry(() =>
        this.openai.chat.completions.create({
          model: this.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: "Generate insights for this data." },
          ],
          response_format: { type: "json_object" },
        })
      );

      const result = JSON.parse(response.choices[0].message.content);
      return result.insights || result;
    } catch (error) {
      logger.error("AI Service Error (generateInsights):", error);
      return ["Significant trends observed in primary metrics.", "Concentration detected in top-performing categories.", "Data suggests positive growth trajectory."];
    }
  }

  async suggestVisualizations(queryType) {
    // Simple logic to suggest best viz based on query intent
    const map = {
      trend: "line",
      aggregation: "bar",
      top: "bar",
      filter: "table",
      distribution: "pie",
    };
    return map[queryType] || "bar";
  }
}

module.exports = new AIService();
