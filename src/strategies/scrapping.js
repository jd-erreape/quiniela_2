const PROVIDERS = require('../scrappers/list');
const scrapper = require('../scrappers/main');

module.exports = (opts) => {
  if(PROVIDERS.indexOf(opts.provider) !== -1) {
    return () => {
      return scrapper(opts.provider).
        then((state) => {
          return state.forecast.classic
        });
    };
  }

  throw 'ERR: PROVIDER FOR SCRAPPING NOT SUPPORTED';
};
