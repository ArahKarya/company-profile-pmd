module.exports = {
  apps: [
    {
      name: "company-profile-pmd",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/home/ubuntu/projects/company-profile-pmd",
      env: {
        NODE_ENV: "production",
        PORT: 3003,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "256M",
    },
  ],
};
