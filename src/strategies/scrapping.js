const scrapper = require('../scrappers/main');

const PROVIDERS = [
  'elquinielista',
  'ventura24'
];

module.exports = (opts) => {
  if(PROVIDERS.indexOf(opts.provider) !== -1) {
    return () => {
      return scrapper(opts.provider).
        then((state) => {
          return state.forecast.classic
        });
    };
  } else {
    throw 'ERR: PROVIDER FOR SCRAPPING NOT SUPPORTED';
  };
};
