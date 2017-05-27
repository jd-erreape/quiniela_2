module.exports = (strategy, command) => {
  const strategyFactory = require('../strategy_factory');

  strategyFactory(strategy, command.parent)()
    .then(console.log)
}
