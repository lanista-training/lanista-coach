// Runner (app)

// ----------------------------------------------------------------------------
// IMPORTS

/* Node */
import fs from "fs";
import path from "path";

/* NPM */

// Koa 2 web server.  Handles incoming HTTP requests, and will serve back
// the React render, or any of the static assets being compiled
import Koa from "koa";

// Static file handler
import koaSend from "koa-send";

// Static file directory handler
const serve = require('koa-static');

// Enable cross-origin requests
import koaCors from "kcors";

// Koa Router, for handling URL requests
import KoaRouter from "koa-router";

const proxy = require('koa-proxies');

// High-precision timing, so we can debug response time to serve a request
import ms from "microseconds";

// Webpack 4
import webpack from "webpack";

/* Ora spinner */
import ora from "ora";

/* Local */
import client from "../webpack/client";
import server from "../webpack/server";

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// ----------------------------------------------------------------------------

function staticMiddleware(root, immutable = true) {
  return async (ctx, next) => {
    try {
      if (ctx.path !== "/") {

        // If we're in production, try <dist>/public first
        return await koaSend(
          ctx,
          ctx.path,
          {
            immutable,
            root,
          },
        );
      }
    } catch (e) {
      //console.log("ERROR");
      //console.log(e);
    }
    return next();
  };
}

// Distributio path
const dist = path.resolve(__dirname, "..", "..", "dist");

export const common = {
  // Compiled files
  compiled: {
    clientStats: path.resolve(dist, "client.stats.json"),
    server: path.resolve(dist, "server.js"),
    serverStats: path.resolve(dist, "server.stats.json"),
  },

  // Distribution folder
  dist,

  // Are we in production?
  isProduction: process.env.NODE_ENV === "production",

  // Port to start web server on
  port: process.env.PORT || 3000,

  // Spinner
  spinner: ora(),
};

// Webpack compiler
export const compiler = webpack([server, client]);

// Build function
export function build() {
  return new Promise(resolve => {
    compiler.run((e, fullStats) => {

      // If there's an error, exit out to the console
      if (e) {
        common.spinner.fail(e.message);
        process.exit(1);
      }

      // Pull out the JSON stats
      const stats = fullStats.toJson();

      // Report any build errors
      if (stats.errors.length) {
        console.log("ERROR");
        common.spinner.fail(stats.errors.join("\n"));
        process.exit(1);
      }

      // All good - save the stats
      [common.compiled.serverStats, common.compiled.clientStats].forEach((file, i) => {
        fs.writeFileSync(file, JSON.stringify(stats.children[i]), {
          encoding: "utf8",
        });
      });

      resolve();
    });
  });
}

// Router
const router = new KoaRouter()
  .get("/ping", async ctx => {
    ctx.body = "pong";
  })
  .get("/favicon.ico", async ctx => {
    ctx.status = 204;
  });



// Koa instance
export const app = new Koa()
  // CORS
  .use(koaCors())

  .use(proxy('/default', {
    target: 'https://bpo3iybcx9.execute-api.eu-central-1.amazonaws.com',
    changeOrigin: true,
    logs: true
  }))

  // Error catcher
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      console.log("Error catched:", e.message);
      console.log(e);
      ctx.status = 500;
      ctx.body = "There was an error. Please try again later.";
    }
  })

  // Timing
  .use(async (ctx, next) => {
    const start = ms.now();
    await next();
    const end = ms.parse(ms.since(start));
    const total = end.microseconds + (end.milliseconds * 1e3) + (end.seconds * 1e6);
    ctx.set("Response-Time", `${total / 1e3}ms`);
  })

  .use(serve(__dirname + '/../../static'))
;

// Static file serving
console.log("ABSOLUTE PATH");
console.log(__dirname + '/../../static');
// In production, check <dist>/public first
if (common.isProduction) {
  app.use(staticMiddleware(
    path.resolve(common.dist, "public"),
  ));
}

// ... and then fall-back to <root>/public
app.use(staticMiddleware(
  path.resolve(common.dist, "..", "public"),
  false,
));

// Router
app.use(router.allowedMethods())
  .use(router.routes());
