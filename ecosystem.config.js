module.exports = {
  apps: [
    {
      name: 'gotoro-backend',
      script: '/srv/gotoro.com-api/dist/main.js',
      watch: false,
      interpreter: '/root/.nvm/versions/node/v14.16.0/bin/node',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
