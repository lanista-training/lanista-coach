/*
  A `Stats` instance wraps client/server Webpack stats to provide
  helper functions to obtain chunk names, etc.
*/

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import lodash from "lodash";

// ----------------------------------------------------------------------------

// Config for `Stats` instances
const config = new WeakMap();

export default class Stats {

  // --------------------------------------------------------------------------
  /* PUBLIC METHODS */
  // --------------------------------------------------------------------------

  /* CONSTRUCTOR */
  constructor(stats) {

    // Store a raw copy of the config
    config.set(this, stats);
  }

  /* GETTERS */

  // Get the full, raw stats
  get raw() {
    return config.get(this);
  }

  // Get main built asset based on file extension
  main(ext) {
    const main = lodash.get(config.get(this), "assetsByChunkName.main", []);
    const file = (Array.isArray(main) ? main : [main]).find((c) => c.endsWith(`.${ext}`));
    return file && `/${file}`;
  }
}
