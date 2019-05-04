// Webpack (common)

// ----------------------------------------------------------------------------
// IMPORTS

/* Node */
import path from "path";

/* NPM */
import lodash from "lodash";
import webpack from "webpack";

// ----------------------------------------------------------------------------

const root = path.resolve(__dirname, "..", "..");

// Default merge customiser
export function defaultMerger(obj, src, key, _object, _source, _stack) {

  // Merge rules
  if (key === "rules" && [obj, src].every(v => Array.isArray(v))) {

    src.forEach((v, _i) => {
      const existingTest = (obj).find(rule => String(rule.test) === String(v.test));

      if (existingTest) {
        lodash.mergeWith(existingTest, v, defaultMerger);
      } else {
        obj.push(v);
      }
    });

    return obj;
  }

  // By default, merge arrays
  if (Array.isArray(obj)) {
    return obj.concat(src);
  }
}

const isProduction = process.env.NODE_ENV === "production";

// RegExp for file types
export const files = {
  fonts: /\.(woff|woff2|(o|t)tf|eot)$/i,
  images: /\.(jpe?g|png|gif|svg)$/i,
  json: /\.(json)$/i,
};

// Common config
export default (_ssr /* <-- not currently used */) => {

  const common = {
    mode: isProduction ? "production" : "development",
    module: {
      rules: [
        // Typescript
        {
          exclude: /node_modules/,
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [
                "react-hot-loader/babel",
                ["styled-components", {
                  displayName: !isProduction,
                  ssr: true,
                }],
              ],
            },
          },
        },
      ],
    },

    output: {
      publicPath: "/",
    },

    resolve: {
      alias: {
        "@": path.resolve(root, "src"),
      },
      extensions: [".js", ".json", ".mjs"],
      modules: [
        path.resolve(root, "node_modules"),
      ],
    },
  };

  return common;
};
