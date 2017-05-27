const debugResult = (res) => {
  console.log(res);

  return(res);
}

const selectSign = (signs, forecast) => {
  return signs[forecast.indexOf(Math.max(...forecast))]
}

const goalsForecast = (teamAForecast, teamBForecast) => {
  const teamASign = selectSign([0, 1, 2, 'M'], Object.values(teamAForecast));
  const teamBSign = selectSign([0, 1, 2, 'M'], Object.values(teamBForecast));


  return `${teamASign} - ${teamBSign}`;
}

const classicForecast = (teamAForecast, teamBForecast) => {
  const selectedTeamAForecast = selectSign([0, 1, 2, 3], Object.values(teamAForecast));
  const selectedTeamBForecast = selectSign([0, 1, 2, 3], Object.values(teamBForecast));

  if (selectedTeamAForecast > selectedTeamBForecast) {
    return 1;
  } else if (selectedTeamAForecast < selectedTeamBForecast) {
    return 2;
  } else {
    return 'X';
  }
}

const forecastFor = (forecastPercentages, forecastType) => {
  const lastElemForecast = forecastType === 'classic' ? classicForecast : goalsForecast

  return [
    ...forecastPercentages.slice(0, 14).map((forecastForMatch) => {
      return selectSign([1,'X',2], Object.values(forecastForMatch));
    }),
    lastElemForecast(...forecastPercentages.slice(forecastPercentages.length - 2))
  ];
}

const stateFor = (teams, forecastPercentages, goalsForecast, classicForecast) => {
  return {
    teams,
    forecastPercentages,
    forecast: {
      goals: goalsForecast,
      classic: classicForecast
    }
  }
}

module.exports = {
  debugResult,
  forecastFor,
  stateFor
}
