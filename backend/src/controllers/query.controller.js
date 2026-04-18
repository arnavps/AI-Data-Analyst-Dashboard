const aiService = require('../services/ai.service');
const { fileStore } = require('./upload.controller');

exports.queryData = async (req, res, next) => {
  const startTime = Date.now();
  try {
    const { fileId, question } = req.body;

    if (!fileId || !question) {
      return res.status(400).json({ success: false, error: 'fileId and question are required' });
    }

    const metadata = fileStore.get(fileId);
    if (!metadata) {
      return res.status(404).json({ success: false, error: 'File not found' });
    }

    // 1. Process natural language question into structured query
    const queryPlan = await aiService.processNaturalLanguageQuery(question, {
      columns: metadata.columns,
      types: metadata.columnTypes,
      preview: metadata.preview
    });

    // 2. Generate insights based on the context (using preview for now)
    const insights = await aiService.generateInsights(metadata.preview, { question, queryPlan });

    res.status(200).json({
      success: true,
      data: {
        queryPlan,
        insights,
        chartType: queryPlan.chartType || 'bar',
        visualization: queryPlan.visualization,
        fileId
      },
      meta: {
        timestamp: new Date().toISOString(),
        processingTime: `${Date.now() - startTime}ms`
      }
    });
  } catch (error) {
    next(error);
  }
};
