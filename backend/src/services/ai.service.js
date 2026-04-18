class AIService {
  async processQuery(data, question) {
    // This is a placeholder for real AI integration (e.g., OpenAI, Gemini)
    // For now, it simulates an analysis of the question
    
    const questionLower = question.toLowerCase();
    let insights = [];
    let chartType = 'bar';
    
    if (questionLower.includes('trend') || questionLower.includes('over time')) {
      chartType = 'line';
      insights.push("Data shows a consistent upward trend in the selected metrics.");
    } else if (questionLower.includes('distribution') || questionLower.includes('breakdown')) {
      chartType = 'pie';
      insights.push("Significant concentration observed in the top 3 categories.");
    } else {
      insights.push("Analysis complete. The data reveals strong correlations between the variables.");
    }

    return {
      insights,
      chartType,
      processedAt: new Date().toISOString()
    };
  }
}

module.exports = new AIService();
