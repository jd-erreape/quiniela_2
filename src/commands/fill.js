const strategyFactory = require('../strategy_factory');
const authorizeAction = require('../utils/authorize');
const writeRow = require('../utils/write_row');

const spreadsheetId = '1AsUcX5YH1ejsbz9L--EDo5KjA1zqfY2g7MBvaCgG_Sc';
const range = 'H11:H25';

// The format of the column to google API should be given as an array of arrays
// ex: [[1], ['X'], [2], [1], ...]
const wrapArrayIntoArray = (arr) => {
  return arr.map((el) => {
    return [el];
  });
};

module.exports = (strategy, command) => {
  Promise.all([
    authorizeAction(),
    strategyFactory(strategy, command.parent)()
  ]).then((result) => {
    writeRow({
      auth: result[0],
      spreadsheetId,
      range,
      values: wrapArrayIntoArray(result[1])
    });
  });
}
