module.exports = {
    apps: [{
      name: 'index',
      script: 'api/index.js',
      exec_mode: 'fork',
      instances: 1,
      watch: true,
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      // Define hooks
      post_restart: [{
        exec: 'echo "Server restarted successfully"',
      }],
    }],
  };
  