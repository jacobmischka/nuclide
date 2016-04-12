Object.defineProperty(exports, '__esModule', {
  value: true
});

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

exports.activate = activate;
exports.getHyperclickProvider = getHyperclickProvider;
exports.createAutocompleteProvider = createAutocompleteProvider;
exports.provideLinter = provideLinter;
exports.createTypeHintProvider = createTypeHintProvider;

var _constants = require('./constants');

function activate() {}

function getHyperclickProvider() {
  return require('./HyperclickProvider');
}

function createAutocompleteProvider() {
  var _require = require('../../nuclide-analytics');

  var trackOperationTiming = _require.trackOperationTiming;

  var getSuggestions = function getSuggestions(request) {
    return trackOperationTiming('nuclide-ocaml:getAutocompleteSuggestions', function () {
      return require('./AutoComplete').getAutocompleteSuggestions(request);
    });
  };
  return {
    selector: '.source.ocaml',
    inclusionPriority: 1,
    disableForSelector: '.source.ocaml .comment',
    getSuggestions: getSuggestions
  };
}

function provideLinter() {
  var MerlinLinterProvider = require('./LinterProvider');
  return MerlinLinterProvider;
}

function createTypeHintProvider() {
  var _require2 = require('./TypeHintProvider');

  var TypeHintProvider = _require2.TypeHintProvider;

  var typeHintProvider = new TypeHintProvider();
  var typeHint = typeHintProvider.typeHint.bind(typeHintProvider);

  return {
    inclusionPriority: 1,
    providerName: 'nuclide-ocaml',
    selector: Array.from(_constants.GRAMMARS).join(', '),
    typeHint: typeHint
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQWN1QixhQUFhOztBQUU3QixTQUFTLFFBQVEsR0FBUyxFQUNoQzs7QUFFTSxTQUFTLHFCQUFxQixHQUFHO0FBQ3RDLFNBQU8sT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Q0FDeEM7O0FBRU0sU0FBUywwQkFBMEIsR0FBVTtpQkFDbkIsT0FBTyxDQUFDLHlCQUF5QixDQUFDOztNQUExRCxvQkFBb0IsWUFBcEIsb0JBQW9COztBQUMzQixNQUFNLGNBQWMsR0FBRyxTQUFqQixjQUFjLENBQUcsT0FBTyxFQUFJO0FBQ2hDLFdBQU8sb0JBQW9CLENBQ3pCLDBDQUEwQyxFQUMxQzthQUFNLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQztLQUFBLENBQUMsQ0FBQztHQUN4RSxDQUFDO0FBQ0YsU0FBTztBQUNMLFlBQVEsRUFBRSxlQUFlO0FBQ3pCLHFCQUFpQixFQUFFLENBQUM7QUFDcEIsc0JBQWtCLEVBQUUsd0JBQXdCO0FBQzVDLGtCQUFjLEVBQWQsY0FBYztHQUNmLENBQUM7Q0FDSDs7QUFFTSxTQUFTLGFBQWEsR0FBbUI7QUFDOUMsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN6RCxTQUFPLG9CQUFvQixDQUFDO0NBQzdCOztBQUVNLFNBQVMsc0JBQXNCLEdBQXlCO2tCQUNsQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7O01BQWpELGdCQUFnQixhQUFoQixnQkFBZ0I7O0FBQ3ZCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0FBQ2hELE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFbEUsU0FBTztBQUNMLHFCQUFpQixFQUFFLENBQUM7QUFDcEIsZ0JBQVksRUFBRSxlQUFlO0FBQzdCLFlBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxxQkFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDekMsWUFBUSxFQUFSLFFBQVE7R0FDVCxDQUFDO0NBQ0giLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIHtMaW50ZXJQcm92aWRlcn0gZnJvbSAnLi4vLi4vbnVjbGlkZS1kaWFnbm9zdGljcy1iYXNlJztcbmltcG9ydCB0eXBlIHtUeXBlSGludFByb3ZpZGVyIGFzIFR5cGVIaW50UHJvdmlkZXJUeXBlfSBmcm9tICcuLi8uLi9udWNsaWRlLXR5cGUtaGludC1pbnRlcmZhY2VzJztcblxuaW1wb3J0IHtHUkFNTUFSU30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoKTogdm9pZCB7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIeXBlcmNsaWNrUHJvdmlkZXIoKSB7XG4gIHJldHVybiByZXF1aXJlKCcuL0h5cGVyY2xpY2tQcm92aWRlcicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXV0b2NvbXBsZXRlUHJvdmlkZXIoKTogbWl4ZWQge1xuICBjb25zdCB7dHJhY2tPcGVyYXRpb25UaW1pbmd9ID0gcmVxdWlyZSgnLi4vLi4vbnVjbGlkZS1hbmFseXRpY3MnKTtcbiAgY29uc3QgZ2V0U3VnZ2VzdGlvbnMgPSByZXF1ZXN0ID0+IHtcbiAgICByZXR1cm4gdHJhY2tPcGVyYXRpb25UaW1pbmcoXG4gICAgICAnbnVjbGlkZS1vY2FtbDpnZXRBdXRvY29tcGxldGVTdWdnZXN0aW9ucycsXG4gICAgICAoKSA9PiByZXF1aXJlKCcuL0F1dG9Db21wbGV0ZScpLmdldEF1dG9jb21wbGV0ZVN1Z2dlc3Rpb25zKHJlcXVlc3QpKTtcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RvcjogJy5zb3VyY2Uub2NhbWwnLFxuICAgIGluY2x1c2lvblByaW9yaXR5OiAxLFxuICAgIGRpc2FibGVGb3JTZWxlY3RvcjogJy5zb3VyY2Uub2NhbWwgLmNvbW1lbnQnLFxuICAgIGdldFN1Z2dlc3Rpb25zLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUxpbnRlcigpOiBMaW50ZXJQcm92aWRlciB7XG4gIGNvbnN0IE1lcmxpbkxpbnRlclByb3ZpZGVyID0gcmVxdWlyZSgnLi9MaW50ZXJQcm92aWRlcicpO1xuICByZXR1cm4gTWVybGluTGludGVyUHJvdmlkZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUeXBlSGludFByb3ZpZGVyKCk6IFR5cGVIaW50UHJvdmlkZXJUeXBlIHtcbiAgY29uc3Qge1R5cGVIaW50UHJvdmlkZXJ9ID0gcmVxdWlyZSgnLi9UeXBlSGludFByb3ZpZGVyJyk7XG4gIGNvbnN0IHR5cGVIaW50UHJvdmlkZXIgPSBuZXcgVHlwZUhpbnRQcm92aWRlcigpO1xuICBjb25zdCB0eXBlSGludCA9IHR5cGVIaW50UHJvdmlkZXIudHlwZUhpbnQuYmluZCh0eXBlSGludFByb3ZpZGVyKTtcblxuICByZXR1cm4ge1xuICAgIGluY2x1c2lvblByaW9yaXR5OiAxLFxuICAgIHByb3ZpZGVyTmFtZTogJ251Y2xpZGUtb2NhbWwnLFxuICAgIHNlbGVjdG9yOiBBcnJheS5mcm9tKEdSQU1NQVJTKS5qb2luKCcsICcpLFxuICAgIHR5cGVIaW50LFxuICB9O1xufVxuIl19