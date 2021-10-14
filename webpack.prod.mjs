import { merge } from "webpack-merge";
import { GenerateSW } from "workbox-webpack-plugin";
import common from "./webpack.common.mjs";

export default merge(common, {
  mode: "production",
  plugins: [new GenerateSW()],
});
