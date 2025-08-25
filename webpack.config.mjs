import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: "./static/client.js", // This is the critical line to verify.
  output: {
    path: path.resolve(__dirname, "dist/client"),
    filename: "bundle.js",
  },
  devServer: {
    port: 5100,
    static: ["./static", "node_modules/bootstrap/dist"],
    // proxy: {
    //   "/read": "http://localhost:5005",
    // },

    client: {
      webSocketURL: "http://localhost:5005/ws",
    },
  },
  devtool: "source-map",
};
