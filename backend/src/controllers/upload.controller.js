const csvService = require('../services/csv.service');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const logger = require('../utils/logger');

// In-memory store for demonstration
const fileStore = new Map();

exports.uploadFile = async (req, res, next) => {
  const startTime = Date.now();
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const results = await csvService.parseCSV(filePath);
    const types = csvService.detectColumnTypes(results.data);
    const stats = csvService.generateStats(results.data, types);

    const fileId = uuidv4();
    const metadata = {
      id: fileId,
      filename: req.file.originalname,
      rowCount: results.data.length,
      columns: Object.keys(types),
      columnTypes: types,
      stats: stats,
      preview: results.data.slice(0, 5),
      data: results.data, // Store full data for querying
      createdAt: new Date().toISOString()
    };

    fileStore.set(fileId, metadata);

    res.status(200).json({
      success: true,
      data: {
        fileId,
        filename: metadata.filename,
        columns: metadata.columns,
        columnTypes: metadata.columnTypes,
        rowCount: metadata.rowCount,
        stats: metadata.stats,
        preview: metadata.preview
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

exports.getFileMetadata = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const metadata = fileStore.get(fileId);

    if (!metadata) {
      return res.status(404).json({ success: false, error: 'File not found' });
    }

    res.status(200).json({
      success: true,
      data: metadata,
      meta: {
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// Export fileStore for other controllers
exports.fileStore = fileStore;
