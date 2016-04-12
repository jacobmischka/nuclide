

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var cachedResultForTrack = Promise.resolve();

// This is a stubbed implementation that other packages use to record analytics data & performance.
module.exports = {

  /**
   * Track a set of values against a named event.
   * @param eventName Name of the event to be tracked.
   * @param values The object containing the data to track.
   * @param immediate Bypass batching. The resulting promise will resolve on upload.
   */
  track: function track(eventName, values, immediate) {
    return cachedResultForTrack;
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuYWx5dGljcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBV0EsSUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7OztBQUcvQyxNQUFNLENBQUMsT0FBTyxHQUFHOzs7Ozs7OztBQVFmLE9BQUssRUFBQSxlQUNILFNBQWlCLEVBQ2pCLE1BQWdDLEVBQ2hDLFNBQW1CLEVBQ0g7QUFDaEIsV0FBTyxvQkFBb0IsQ0FBQztHQUM3QjtDQUNGLENBQUMiLCJmaWxlIjoiYW5hbHl0aWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4vKiBAZmxvdyAqL1xuXG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuY29uc3QgY2FjaGVkUmVzdWx0Rm9yVHJhY2sgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuLy8gVGhpcyBpcyBhIHN0dWJiZWQgaW1wbGVtZW50YXRpb24gdGhhdCBvdGhlciBwYWNrYWdlcyB1c2UgdG8gcmVjb3JkIGFuYWx5dGljcyBkYXRhICYgcGVyZm9ybWFuY2UuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAvKipcbiAgICogVHJhY2sgYSBzZXQgb2YgdmFsdWVzIGFnYWluc3QgYSBuYW1lZCBldmVudC5cbiAgICogQHBhcmFtIGV2ZW50TmFtZSBOYW1lIG9mIHRoZSBldmVudCB0byBiZSB0cmFja2VkLlxuICAgKiBAcGFyYW0gdmFsdWVzIFRoZSBvYmplY3QgY29udGFpbmluZyB0aGUgZGF0YSB0byB0cmFjay5cbiAgICogQHBhcmFtIGltbWVkaWF0ZSBCeXBhc3MgYmF0Y2hpbmcuIFRoZSByZXN1bHRpbmcgcHJvbWlzZSB3aWxsIHJlc29sdmUgb24gdXBsb2FkLlxuICAgKi9cbiAgdHJhY2soXG4gICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgdmFsdWVzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgaW1tZWRpYXRlPzogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxtaXhlZD4ge1xuICAgIHJldHVybiBjYWNoZWRSZXN1bHRGb3JUcmFjaztcbiAgfSxcbn07XG4iXX0=