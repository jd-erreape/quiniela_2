const PROVIDERS = require('../scrappers/list');
const scrapper = require('../scrappers/main');
const forecastFor = require('../scrappers/utils').forecastFor;

const averageForecast = (percentagesPerProvider) => {
  //console.log(percentagesPerProvider);

  // TODO: Build the average percentages and provide it to forecastFor
  return forecastFor(percentagesPerProvider[0], 'classic');
}

module.exports = () => {
  return () => {
    return Promise.all(PROVIDERS.map((provider) => {
      return scrapper(provider).
        then((state) => state.forecastPercentages);
    })).then(averageForecast);
  };
};
