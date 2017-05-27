const fs = require('fs');

// Available strategies
const STRATEGIES = [
  'all_x',
  'random',
  'scrapping'
];

const strategyOptions = (options) => {
  // Extract just strategy related options (to be more expresive here)
  return {
    provider: options.provider
  };
}

module.exports = (strategy, options={}) => {
  if(STRATEGIES.indexOf(strategy) !== -1) {
    const strategyConstructor = require(`${__dirname}/strategies/${strategy}.js`);

    return strategyConstructor(strategyOptions(options));
  }

  throw 'ERR: STRATEGY NOT SUPPORTED';
}
