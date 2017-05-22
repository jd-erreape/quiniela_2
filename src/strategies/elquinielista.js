const scrapper = require('../scrappers/main');

const values = () => {
  return scrapper('elquinielista').
    then((state) => {
      console.log(state);

      return state.forecast.classic
    });
};

module.exports = values;
