import { defineConfig } from "father";

const config = {
  cjs: {
    transformer: "babel",
  },
  esm: {
    transformer: "babel",
    alias: {
      "antd/lib": "antd/es",
    },
  },
  // preCommit: {
  //   eslint: true,
  //   prettier: true,
  // },
  // runtimeHelpers: true,
};

if (process.env.NODE_ENV !== "ci") {
  config.umd = {
    externals: { react: "window.React" },
    // minFile: true,
    // sourcemap: false,
  };
}

export default defineConfig(config);
