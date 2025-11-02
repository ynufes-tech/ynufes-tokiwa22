const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  // Configure for Cloudflare Workers/Pages deployment
  configureWebpack: {
    output: {
      // Ensure assets are properly hashed for caching
      filename: "js/[name].[contenthash:8].js",
      chunkFilename: "js/[name].[contenthash:8].chunk.js",
    },
  },

  chainWebpack: (config) => {
    // Optimize for static site serving
    // Only modify prefetch if it exists (only in production builds)
    if (config.plugins.has("prefetch")) {
      config.plugin("prefetch").tap((options) => {
        options[0] = {
          rel: "prefetch",
          // Only prefetch critical chunks
          fileBlacklist: [/\.map$/, /hot-update\.js$/],
          typeMatch: /\.js(\?.*)?$/,
        };
        return options;
      });
    }

    // Disable preload plugin for better Cloudflare Pages performance
    if (config.plugins.has("preload")) {
      config.plugins.delete("preload");
    }
  },

  outputDir: "dist",

  // Base URL - adjust if deploying to subdirectory
  publicPath: "/",
});
