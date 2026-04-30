const _ = require("lodash");
const { parse, format, isValid } = require("date-fns");
const logger = require("../utils/logger");

class DataProcessorService {
 
  executeQuery(data, queryParams) {
    const startTime = Date.now();
    const { operation, column, metric, groupBy, limit, filter, sort } = queryParams;

    let processedData = [...data];

    // 1. Filtering
    if (filter) {
      processedData = this.filterData(processedData, filter);
    }

    // 2. Sorting
    if (sort) {
      processedData = this.sortData(processedData, sort.column, sort.order);
    }

    // 3. Operations
    let result;
    switch (operation) {
      case "aggregation":
      case "trend":
        result = this.aggregateData(processedData, groupBy, column, metric);
        break;
      case "top":
        result = this.getTopN(processedData, column, limit || 5, metric);
        break;
      case "stats":
        result = this.calculateMetrics(processedData, column);
        break;
      default:
        result = processedData;
    }

    const processingTime = `${Date.now() - startTime}ms`;

    return {
      data: result,
      metadata: {
        rowCount: Array.isArray(result) ? result.length : 1,
        processingTime,
        queryType: operation,
      },
    };
  }

  /**
   * Aggregates data by a column using a metric (sum, avg, count, etc.)
   */
  aggregateData(data, groupBy, column, metric = "sum") {
    if (!groupBy) return data;

    const grouped = _.groupBy(data, (item) => {
      const val = item[groupBy];
      // Special handling for date grouping
      if (this.isDate(val)) {
        const date = new Date(val);
        return format(date, "MMM yyyy"); // Default to Month Year for trends
      }
      return val;
    });

    return Object.entries(grouped).map(([key, group]) => {
      let value;
      switch (metric) {
        case "avg":
          value = _.meanBy(group, (item) => parseFloat(item[column]) || 0);
          break;
        case "count":
          value = group.length;
          break;
        case "max":
          value = _.maxBy(group, (item) => parseFloat(item[column]) || 0)[column];
          break;
        case "min":
          value = _.minBy(group, (item) => parseFloat(item[column]) || 0)[column];
          break;
        case "sum":
        default:
          value = _.sumBy(group, (item) => parseFloat(item[column]) || 0);
      }

      return {
        [groupBy]: key,
        [column]: value,
      };
    });
  }

  /**
   * Filters data based on conditions
   */
  filterData(data, filter) {
    // filter can be { column: value } or [{ column, operator, value }]
    if (Array.isArray(filter)) {
      return data.filter((item) => {
        return filter.every(({ column, operator, value }) => {
          const itemVal = item[column];
          switch (operator) {
            case "equals": return itemVal == value;
            case "contains": return String(itemVal).toLowerCase().includes(String(value).toLowerCase());
            case "greaterThan": return parseFloat(itemVal) > parseFloat(value);
            case "lessThan": return parseFloat(itemVal) < parseFloat(value);
            default: return itemVal == value;
          }
        });
      });
    }

    return _.filter(data, filter);
  }

  /**
   * Sorts data by column and order
   */
  sortData(data, column, order = "desc") {
    return _.orderBy(data, [column], [order]);
  }

  /**
   * Gets top N items based on a column and metric
   */
  getTopN(data, column, n = 5, metric = "sum") {
    // If data is already aggregated, just sort and limit
    // Otherwise, aggregate then sort
    const sorted = _.orderBy(data, [column], ["desc"]);
    return _.take(sorted, n);
  }

  /**
   * Calculates statistical metrics for a numeric column
   */
  calculateMetrics(data, column) {
    const values = data.map(item => parseFloat(item[column])).filter(v => !isNaN(v));
    if (values.length === 0) return null;

    const sortedValues = [...values].sort((a, b) => a - b);
    const mean = _.mean(values);
    
    return {
      min: _.min(values),
      max: _.max(values),
      avg: mean,
      count: values.length,
      median: sortedValues[Math.floor(sortedValues.length / 2)],
      sum: _.sum(values)
    };
  }

  /**
   * Utility: Checks if a value is a date
   */
  isDate(val) {
    if (!val) return false;
    const date = new Date(val);
    return isValid(date) && !isNaN(date.getTime()) && String(val).includes("-");
  }

  /**
   * Utility: Formats currency
   */
  formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }
}

module.exports = new DataProcessorService();
