let createSharedSymLink = (shipit) => {
  let currentPath = `${process.env.SHIPIT_DEPLOY_TO}/current`;
  let sharedPath = `${process.env.SHIPIT_DEPLOY_TO}/shared`;

  shipit.remote(`ln -s ${sharedPath} shared`, {
    cwd: currentPath
  })
  shipit.remote(`ln -s ${sharedPath}/.env .env`, {
    cwd: currentPath
  })
};

let installNodeModules = (shipit) => {
  let currentPath = `${process.env.SHIPIT_DEPLOY_TO}/current`;

  shipit.remote(`npm install`, {
    cwd: currentPath
  }).then((res) => {
    // Do something
  });
};

module.exports = function (shipit) {
  require('dotenv').config();
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: process.env.SHIPIT_WORKSPACE,
      deployTo: process.env.SHIPIT_DEPLOY_TO,
      repositoryUrl: process.env.SHIPIT_REPO,
      ignores: ['.git', 'node_modules', 'shipitfile.js'],
      keepReleases: 2,
      deleteOnRollback: false,
      shallowClone: true
    },
    staging: {
      servers: process.env.SHIPIT_SERVERS
    }
  });

  shipit.on('deploy', (res) => {
    return shipit.remote(`mkdir -p ${process.env.SHIPIT_DEPLOY_TO}/shared`);
  });

  shipit.on('published', (res) => {
    createSharedSymLink(shipit);
    installNodeModules(shipit);
  })
};
