import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack";

export default {
  entry: "./src/index.tsx",
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    corejs: "3.18.3",
                    useBuiltIns: "entry",
                  },
                ],
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    new CopyPlugin({
      patterns: [{ from: "resources" }],
    }),
    new webpack.EnvironmentPlugin(["SENTRY_DSN"]),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};
