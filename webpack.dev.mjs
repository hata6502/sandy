import path from "path";
import { fileURLToPath } from "url";
import { merge } from "webpack-merge";
import common from "./webpack.common.mjs";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default merge(common, {
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(dirname, "dist"),
    },
  },
  devtool: "eval-source-map",
});
