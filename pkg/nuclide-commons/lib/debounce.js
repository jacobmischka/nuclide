Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.debounce = debounce;

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var invariant = require('assert');

function debounce(func, wait) {
  var immediate = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  // Taken from: https://github.com/jashkenas/underscore/blob/b10b2e6d72/underscore.js#L815.
  var timeout = undefined;
  var args = undefined;
  var context = undefined;
  var timestamp = 0;
  var result = undefined;

  var later = function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        invariant(args);
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      }
    }
  };

  // $FlowIssue -- Flow's type system isn't expressive enough to type debounce.
  return function () {
    context = this; // eslint-disable-line consistent-this
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlYm91bmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFXQSxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTdCLFNBQVMsUUFBUSxDQUN0QixJQUFPLEVBQ1AsSUFBWSxFQUVUO01BREgsU0FBbUIseURBQUcsS0FBSzs7O0FBRzNCLE1BQUksT0FBTyxZQUFBLENBQUM7QUFDWixNQUFJLElBQWlCLFlBQUEsQ0FBQztBQUN0QixNQUFJLE9BQU8sWUFBQSxDQUFDO0FBQ1osTUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLE1BQUksTUFBTSxZQUFBLENBQUM7O0FBRVgsTUFBTSxLQUFLLEdBQUcsU0FBUixLQUFLLEdBQWM7QUFDdkIsUUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQzs7QUFFcEMsUUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7QUFDNUIsYUFBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQzFDLE1BQU07QUFDTCxhQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ2YsVUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNkLGlCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEIsY0FBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25DLFlBQUksQ0FBQyxPQUFPLEVBQUU7QUFDWixpQkFBTyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7U0FDdkI7T0FDRjtLQUNGO0dBQ0YsQ0FBQzs7O0FBR0YsU0FBTyxZQUFXO0FBQ2hCLFdBQU8sR0FBRyxJQUFJLENBQUM7QUFDZixRQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ2pCLGFBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdkIsUUFBTSxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3RDLFFBQUksQ0FBQyxPQUFPLEVBQUU7QUFDWixhQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNuQztBQUNELFFBQUksT0FBTyxFQUFFO0FBQ1gsWUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25DLGFBQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ3ZCOztBQUVELFdBQU8sTUFBTSxDQUFDO0dBQ2YsQ0FBQztDQUNIIiwiZmlsZSI6ImRlYm91bmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4vKiBAZmxvdyAqL1xuXG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuY29uc3QgaW52YXJpYW50ID0gcmVxdWlyZSgnYXNzZXJ0Jyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZTxUIDogRnVuY3Rpb24+KFxuICBmdW5jOiBULFxuICB3YWl0OiBudW1iZXIsXG4gIGltbWVkaWF0ZT86IGJvb2xlYW4gPSBmYWxzZSxcbik6IFQge1xuICAvLyBUYWtlbiBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvYmxvYi9iMTBiMmU2ZDcyL3VuZGVyc2NvcmUuanMjTDgxNS5cbiAgbGV0IHRpbWVvdXQ7XG4gIGxldCBhcmdzOiA/QXJyYXk8YW55PjtcbiAgbGV0IGNvbnRleHQ7XG4gIGxldCB0aW1lc3RhbXAgPSAwO1xuICBsZXQgcmVzdWx0O1xuXG4gIGNvbnN0IGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbGFzdCA9IERhdGUubm93KCkgLSB0aW1lc3RhbXA7XG5cbiAgICBpZiAobGFzdCA8IHdhaXQgJiYgbGFzdCA+PSAwKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgIGludmFyaWFudChhcmdzKTtcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vICRGbG93SXNzdWUgLS0gRmxvdydzIHR5cGUgc3lzdGVtIGlzbid0IGV4cHJlc3NpdmUgZW5vdWdoIHRvIHR5cGUgZGVib3VuY2UuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBjb250ZXh0ID0gdGhpczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXRoaXNcbiAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgY29uc3QgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICB9XG4gICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cbiJdfQ==