const extractForecastFor = ($row, id) => {
  const predictionString = $row.find(id).text().match(/\d+/) &&
    $row.find(id).text().match(/\d+/)[0];

  return parseInt(predictionString || 0);
}

const extractNonProcessedTeamsArray = ($) => {
  return $('table.celdaBlanca tbody > tr').map((i, elem) => {
    const $row = $(elem)

    const teams = $row.find('td[align=left]').map((i, elem) => {
      const $td = $(elem);

      return $td.text().trim();
    }).get();


    return {
      team_a: teams[0],
      team_b: teams[1],
    }
  }).get();
};

const extractTeams = ($) => {
  const nonProcessedTeamsArray = extractNonProcessedTeamsArray($)

  return [
    ...nonProcessedTeamsArray.slice(0, -2), {
      team_a: nonProcessedTeamsArray.slice(-2)[0].team_a,
      team_b: nonProcessedTeamsArray.slice(-2)[1].team_a,
    }
  ]
};

const extractForecastPercentages = ($) => {
  return $('table.celdaBlanca tbody > tr').map((i, elem) => {
    const $row = $(elem)

    return {
      unos: extractForecastFor($row, '#lblUnos'),
      equis: extractForecastFor($row, '#lblEquis'),
      doses: extractForecastFor($row, '#lblDoses'),
      emes: extractForecastFor($row, '#lblEmes')
    };
  }).get();
}

module.exports = {
  uri: 'http://www.elquinielista.com/Quinielista/estimacion-quinielas',
  extractTeams,
  extractForecastPercentages,
}
