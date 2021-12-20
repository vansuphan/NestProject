module.exports = {
  apps: [
    {
      name: "maixep-backend",
      script: "/srv/maixephoangthienphat.com-api/dist/main.js",
      watch: false,
      interpreter: "/root/.nvm/versions/node/v14.16.0/bin/node",
      env: {
        "NODE_ENV": "production"
      }
    }
  ]
};