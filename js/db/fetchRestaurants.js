import { cacheInIdb, getCachedResponses } from './cacheRequest.js';

import { filter, handleAsJson, identity, rejectNon200 } from '../lib.js';

export const syncRestaurants = () =>
  fetch('/api/restaurants')
    .then(rejectNon200)
    .then(handleAsJson)
    .then( cacheInIdb('restaurants') );

const returnResultsOrFetch = results =>
    results.length ? results
  : syncRestaurants();

/** Fetch all restaurants */
// fetchRestaurants :: () -> Promise rs
export const fetchRestaurants = () =>
  Promise.all( getCachedResponses('restaurants') )
    .then( filter(identity) )
    .then(returnResultsOrFetch);
