/*
  An `Output` instance is passed through to the Webpack entry point,
  when is then responsible for orchestrating middleware, routes or other
  functions within the Webpack'd environment
*/

// ----------------------------------------------------------------------------
// IMPORTS

/* Local */
import Stats from "./stats";

// ----------------------------------------------------------------------------
// Config cache
const config = new WeakMap();

export default class Output {

  // --------------------------------------------------------------------------
  /* PUBLIC METHODS */
  // --------------------------------------------------------------------------

  /* CONSTRUCTOR */
  constructor(c) {
    config.set(this, c);
  }

  /* GETTERS */

  // Return the Webpack client build stats
  get client() {
    return config.get(this).client;
  }

  // Return the Webpack server build stats
  get server() {
    return config.get(this).server;
  }
}
