const authorizeAction = require('./src/authorize');
const writeRow = require('./src/write_row');
const valueGenerator = require('./src/strategies/elquinielista');

const spreadsheetId = '1uBczBk2gRnYyRcmDtPmvIUBlZs4bPs35n1MEd4eEv7c'
const range = 'J11:J25';

// The format of the column to google API should be given as an array of arrays
// ex: [[1], ['X'], [2], [1], ...]
const wrapArrayIntoArray = (arr) => {
  return arr.map((el) => {
    return [el];
  });
};

Promise.all([
  authorizeAction(),
  valueGenerator(),
]).then((result) => {
  writeRow({
    auth: result[0],
    spreadsheetId,
    range,
    values: wrapArrayIntoArray(result[1]),
  });
});
