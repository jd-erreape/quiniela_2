const rp = require('request-promise');
const cheerio = require('cheerio');
const utils = require('./utils');

/*

  State

  {
    teams: [
      {
        team_a: 'Real Madrid',
        team_b: 'FC Barcelona'
      },
      ...
    ],
    forecastPercentages: [
      // There will be 16 items instead of 15,
      // the 2 latest ones will correspond to el pleno al 15 match
      {unos: 34, equis: 16, doses: 50, emes: 0},
      ...
    ],
    forecast: {
      classic: [
        1, 'X', 2, '1', '1', 'X', '2', 'X', '1', '2', '2', 'X', '1', '2', '1'
      ],
      goals: [
        1, 'X', 2, '1', '1', 'X', '2', 'X', '1', '2', '2', 'X', '1', '2', '0-M'
      ],
    }
  }

*/

// ----------------- Main function (default exported one)

module.exports = (providerName) => {
  const provider = require('./providers/' + providerName);

  const options = {
    uri: provider.uri,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  return Promise.all([
    // Teams Extraction
    rp(options).
      then(function ($) {
        return provider.extractTeams($);
      }).
      catch(() => 'error'),

    // Forecast percentages
    rp(options).
      then(function ($) {
        return provider.extractForecastPercentages($);
      }).
      catch(() => 'error'),

    // New Goals Forecast values
    rp(options).
      then(function ($) {
        return utils.forecastFor(provider.extractForecastPercentages($), 'goals');
      }).
      catch(() => 'error'),

    // Classic Forecast values
    rp(options).
      then(function ($) {
        return utils.forecastFor(provider.extractForecastPercentages($), 'classic');
      }).
      catch(() => 'error')
  ]).then((values) => {
    return utils.stateFor(...values);
  });
}
