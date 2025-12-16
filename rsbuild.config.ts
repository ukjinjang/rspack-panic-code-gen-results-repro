import { defaultAllowedOrigins, defineConfig } from "@rsbuild/core";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";

export default defineConfig({
  mode: "production",

  output: {
    distPath: {
      root: "./rsbuild-dist",
    },
  },

  plugins: [
    pluginModuleFederation({
      name: "main_app",
      exposes: {
        "./mf": "./src/mf-expose",
      },
    }),
    pluginNodePolyfill({
      exclude: ["console"],
      overrides: {
        fs: "memfs",
      },
    }),
  ],

  security: {
    sri: {
      enable: true,
      algorithm: "sha512",
    },
  },

  server: {
    cors: {
      origin: defaultAllowedOrigins,
    },
  },
});
