const Papa = require('papaparse');
const fs = require('fs');

class CSVService {
  async parseCSV(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    return new Promise((resolve, reject) => {
      Papa.parse(fileContent, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  detectColumnTypes(data) {
    if (!data || data.length === 0) return {};
    
    const headers = Object.keys(data[0]);
    const types = {};

    headers.forEach(header => {
      const sampleValue = data.find(row => row[header] !== null && row[header] !== undefined)?.[header];
      
      if (typeof sampleValue === 'number') {
        types[header] = 'number';
      } else if (sampleValue instanceof Date || (typeof sampleValue === 'string' && !isNaN(Date.parse(sampleValue)) && isNaN(sampleValue))) {
        types[header] = 'date';
      } else {
        types[header] = 'string';
      }
    });

    return types;
  }

  generateStats(data, types) {
    const stats = {};
    const headers = Object.keys(types);

    headers.forEach(header => {
      if (types[header] === 'number') {
        const values = data.map(row => row[header]).filter(v => typeof v === 'number');
        stats[header] = {
          min: Math.min(...values),
          max: Math.max(...values),
          avg: values.reduce((a, b) => a + b, 0) / values.length,
          count: values.length
        };
      } else {
        const values = data.map(row => row[header]).filter(v => v !== null && v !== undefined);
        stats[header] = {
          uniqueCount: new Set(values).size,
          count: values.length
        };
      }
    });

    return stats;
  }
}

module.exports = new CSVService();
