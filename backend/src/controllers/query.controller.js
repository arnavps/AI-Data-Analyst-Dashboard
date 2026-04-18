const aiService = require('../services/ai.service');
const dataProcessorService = require('../services/dataProcessor.service');
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

    // 2. Execute the query plan on the full dataset
    const queryResult = dataProcessorService.executeQuery(metadata.data, queryPlan);

    // 3. Generate insights based on the actual results
    const insights = await aiService.generateInsights(queryResult.data, { question, queryPlan });

    res.status(200).json({
      success: true,
      data: {
        ...queryResult,
        insights,
        queryPlan,
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
