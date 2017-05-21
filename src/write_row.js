var google = require('googleapis');

module.exports = (opts) => {
  var sheets = google.sheets('v4');

  sheets.spreadsheets.values.update({
    auth: opts.auth,
    spreadsheetId: opts.spreadsheetId,
    resource: {
      range: opts.range,
      values: opts.values
    },
    range: opts.range,
    valueInputOption: 'RAW'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
  });
}
