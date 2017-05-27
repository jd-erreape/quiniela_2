// Command Actions
const fill = require('./src/commands/fill');
const predict = require('./src/commands/predict');

// Commander options
var program = require('commander');

// General
program.version('0.0.1')

// Options
program
  .option(
    '-p, --provider <provider>',
    'Provider for scrapping strategy'
  )
  .option(
    '-t, --prediction-type [type]',
    'Type of prediction (classic or emes)',
    'classic'
  )

// Commands
program
  .command('fill <strategy>')
  .action(fill);
program
  .command('predict <strategy>')
  .action(predict);


program.parse(process.argv);
