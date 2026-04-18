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

Available data columns: ${JSON.stringify(dataSchema.columns)}
Data types: ${JSON.stringify(dataSchema.types)}
Sample data: ${JSON.stringify(dataSchema.preview)}

When given a question, respond with a JSON object:
{
  "operation": "aggregation|filter|sort|top|trend|stats",
  "column": "column_name_for_metric",
  "metric": "sum|avg|count|max|min",
  "groupBy": "column_name_for_grouping",
  "limit": number,
  "filter": [
    { "column": "name", "operator": "equals|greater|less|contains", "value": "val" }
  ],
  "chartType": "bar|area|pie|scatter|composed|funnel",
  "visualization": {
    "xAxis": "column_name",
    "yAxis": "column_name",
    "color": "hex_code"
  }
}

Chart Selection Rules:
- bar: Use for comparisons between categories.
- area: Use for trends over time.
- pie: Use for parts-of-a-whole (max 6 categories).
- scatter: Use for correlation between two numerical columns.
- composed: Use for trends where you want to show both actual values (bars) and a moving average/trend line (line).
- funnel: Use for sequential stages or conversion flows.

Always return valid JSON. If the question is purely informational, use operation: "stats".
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
    const { question, queryPlan } = context;
    const statistics = JSON.stringify(data.slice(0, 15)); // Send a bit more context

    const systemPrompt = `
You are a senior data analyst. Analyze the provided data results and the original question to provide 3-5 professional, actionable insights.

Original Question: ${question}
Query Intent: ${JSON.stringify(queryPlan)}
Data Context (Summary): ${statistics}

Generate insights in this JSON format:
{
  "insights": [
    {
      "title": "Concise title (max 60 chars)",
      "description": "1-2 sentence detailed explanation",
      "metric": "Relevant number or percentage (e.g. +23%, $1.2M)",
      "type": "trend|comparison|anomaly|predictive",
      "sentiment": "positive|negative|neutral",
      "recommendation": "Actionable next step"
    }
  ]
}

Guidelines:
- Trend: Focus on % change and direction.
- Comparison: Highlight highest, lowest, or specific outliers.
- Recommendation: Suggest a clear business-focused next step.
- Be concise, specific, and business-oriented.
`;

    try {
      const response = await this.withRetry(() =>
        this.openai.chat.completions.create({
          model: this.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: "Generate structured insights for this data." },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        })
      );

      const result = JSON.parse(response.choices[0].message.content);
      return result.insights || [];
    } catch (error) {
      logger.error("AI Service Error (generateInsights):", error);
      return [
        {
          title: "Data Trend Analysis",
          description: "A consistent pattern was observed in the primary data segments.",
          metric: "Stable",
          type: "trend",
          sentiment: "neutral",
          recommendation: "Continue monitoring for any shifts in baseline activity."
        }
      ];
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
