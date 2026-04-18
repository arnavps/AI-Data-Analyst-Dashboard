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

    const result = await aiService.processQuery(metadata, question);

    res.status(200).json({
      success: true,
      data: {
        ...result,
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
