const path = require("path");

module.exports = {
    entry: {
        browser: "./src/browserAction/browserAction.ts",
        content: "./src/contentScript/contentScript.ts",
    },
    devtool: "source-map",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            { test: /\.(tsx|ts)$/, exclude: /node_modules/, loader: "ts-loader" }
        ]
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js", ".json" ],
        alias: {
            "webextension-polyfill-ts": path.resolve(path.join(__dirname, "node_modules", "webextension-polyfill-ts"))
        },
      },
    mode: "development",
};