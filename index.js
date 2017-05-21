let authorizeAction = require('./src/authorize');
let writeRow = require('./src/write_row');
let valueGenerator = require('./src/strategies/random');

let spreadsheetId = '1uBczBk2gRnYyRcmDtPmvIUBlZs4bPs35n1MEd4eEv7c'
let range = 'J11:J25';

authorizeAction().then((auth) => {
  writeRow({
    auth,
    spreadsheetId,
    range,
    values: valueGenerator()
  })
});
