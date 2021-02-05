'use strict';

/**
 * `Public` policy.
 */

module.exports = async (ctx, next) => {
  console.log("next");
  await next();
};
