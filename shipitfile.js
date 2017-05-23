let postDeploy = (shipit) => {
  let currentPath = `${process.env.SHIPIT_DEPLOY_TO}/current`;
  let sharedPath = `${process.env.SHIPIT_DEPLOY_TO}/shared`;
  let envVars = `CURRENT_PATH=${currentPath} SHARED_PATH=${sharedPath}`;

  shipit.remote(`${envVars} ./post_deploy.sh`, {
    cwd: currentPath
  })
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
      shallowClone: true,
      branch: 'master'
    },
    staging: {
      servers: process.env.SHIPIT_SERVERS
    }
  });

  shipit.on('deploy', (res) => {
    return shipit.remote(`mkdir -p ${process.env.SHIPIT_DEPLOY_TO}/shared`);
  });

  shipit.on('published', (res) => {
    postDeploy(shipit);
  })
};
