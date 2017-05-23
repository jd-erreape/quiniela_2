const extractTeams = ($) => {
  return $('.games_list .game_info').map((i, elem) => {
    const $row = $(elem)

    const teams = $row.find('dt.title03').map((i, elem) => {
      const $td = $(elem);

      return $td.text().trim();
    }).get();


    return {
      team_a: teams[0],
      team_b: teams[1],
    }
  }).get();
};

const extractForecastPercentages = ($) => {
  return [
    ...$('.games_list .game_info').slice(0, 14).map((i, elem) => {
      const $row = $(elem)
      const forecasts = $row.find('.probability_list div.graphic1').map((i, elem) => {
        return $(elem).data('percentage');
      })

      return {
        unos: forecasts[0],
        equis: forecasts[1],
        doses: forecasts[2],
        emes: 0
      };
    }).get(),
    ...$('.games_list .forecastRecommended span').slice(14).text().split('-').map((result) => {
      return {
        unos: result === '0' ? 100 : 0,
        equis: result === '1' ? 100 : 0,
        doses: result === '2' ? 100 : 0,
        emes: result === 'M' ? 100 : 0
      };
    })
  ]
};

module.exports = {
  uri: 'https://www.ventura24.es/pronosticos-quiniela',
  extractTeams,
  extractForecastPercentages,
}
