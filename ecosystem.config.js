module.exports = {
  apps: [
    {
      name: "nexst",
      script: "bun",
      args: "start",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "4G",
      exec_mode: "cluster",
    },
  ],
};
