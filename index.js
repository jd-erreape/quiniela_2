let authorizeAction = require('./src/authorize');
let writeRow = require('./src/write_row');

let spreadsheetId = '1uBczBk2gRnYyRcmDtPmvIUBlZs4bPs35n1MEd4eEv7c'
let range = 'J11:J25';
var sample = (items) => { return items[Math.floor(Math.random()*items.length)]; };
let values = (() => { let arr = []; for(let i = 0; i < 15; i++){ arr.push([sample([1,'X',2])]) }; return arr })();

authorizeAction().then((auth) => {
  writeRow({
    auth,
    spreadsheetId,
    range,
    values
  })
});
