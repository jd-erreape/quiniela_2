const strategyFactory = require('../strategy_factory');

module.exports = (strategy, command) => {
  strategyFactory(strategy, command.parent)()
    .then(console.log)
}
