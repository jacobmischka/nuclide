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

exports.getCachedHackLanguageForUri = getCachedHackLanguageForUri;

var getHackLanguageForUri = _asyncToGenerator(function* (uri) {
  if (uri == null || uri.length === 0) {
    return null;
  }
  var key = getKeyOfUri(uri);
  if (key == null) {
    return null;
  }
  return yield createHackLanguageIfNotExisting(key, uri);
});

exports.getHackLanguageForUri = getHackLanguageForUri;

var createHackLanguageIfNotExisting = _asyncToGenerator(function* (key, fileUri) {
  if (!uriToHackLanguage.has(key)) {
    var hackEnvironment = yield (0, _utils.getHackEnvironmentDetails)(fileUri);

    // If multiple calls were done asynchronously, then return the single-created HackLanguage.
    if (!uriToHackLanguage.has(key)) {
      uriToHackLanguage.set(key, createHackLanguage(hackEnvironment.hackService, hackEnvironment.isAvailable, hackEnvironment.hackRoot, fileUri, hackEnvironment.useServerOnly || hackEnvironment.useIdeConnection));
    }
  }
  return uriToHackLanguage.get(key);
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

var _LocalHackLanguage = require('./LocalHackLanguage');

var _ServerHackLanguage = require('./ServerHackLanguage');

var _nuclideRemoteConnection = require('../../nuclide-remote-connection');

var _nuclideRemoteUri = require('../../nuclide-remote-uri');

var _utils = require('./utils');

/**
 * The HackLanguage is the controller that servers language requests by trying to get worker results
 * and/or results from HackService (which would be executing hh_client on a supporting server)
 * and combining and/or selecting the results to give back to the requester.
 */

/**
 * This is responsible for managing (creating/disposing) multiple HackLanguage instances,
 * creating the designated HackService instances with the NuclideClient it needs per remote project.
 * Also, it deelegates the language feature request to the correct HackLanguage instance.
 */
var uriToHackLanguage = new Map();

// dummy key into uriToHackLanguage for local projects.
// Any non-remote NuclideUri will do.
// TODO: I suspect we should key the local service off of the presence of a .hhconfig file
// rather than having a single HackLanguage for all local requests. Regardless, we haven't tested
// local hack services so save that for another day.
var LOCAL_URI_KEY = 'local-hack-key';

function createHackLanguage(hackService, hhAvailable, basePath, initialFileUri, useServerOnly) {
  return useServerOnly ? new _ServerHackLanguage.ServerHackLanguage(hackService, hhAvailable, basePath) : new _LocalHackLanguage.LocalHackLanguage(hackService, hhAvailable, basePath, initialFileUri);
}

// Returns null if we can't get the key at this time because the RemoteConnection is initializing.
// This can happen on startup when reloading remote files.
function getKeyOfUri(uri) {
  var remoteConnection = _nuclideRemoteConnection.RemoteConnection.getForUri(uri);
  return remoteConnection == null ? (0, _nuclideRemoteUri.isRemote)(uri) ? null : LOCAL_URI_KEY : remoteConnection.getUriForInitialWorkingDirectory();
}

function getCachedHackLanguageForUri(uri) {
  var key = getKeyOfUri(uri);
  return key == null ? null : uriToHackLanguage.get(uri);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhhY2tMYW5ndWFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQWdKc0IscUJBQXFCLHFCQUFwQyxXQUFxQyxHQUFnQixFQUEwQjtBQUNwRixNQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDbkMsV0FBTyxJQUFJLENBQUM7R0FDYjtBQUNELE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixNQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFDZixXQUFPLElBQUksQ0FBQztHQUNiO0FBQ0QsU0FBTyxNQUFNLCtCQUErQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUN4RDs7OztJQUVjLCtCQUErQixxQkFBOUMsV0FDRSxHQUFXLEVBQ1gsT0FBbUIsRUFDSTtBQUN2QixNQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQy9CLFFBQU0sZUFBZSxHQUFHLE1BQU0sc0NBQTBCLE9BQU8sQ0FBQyxDQUFDOzs7QUFHakUsUUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUMvQix1QkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUN2QixrQkFBa0IsQ0FDaEIsZUFBZSxDQUFDLFdBQVcsRUFDM0IsZUFBZSxDQUFDLFdBQVcsRUFDM0IsZUFBZSxDQUFDLFFBQVEsRUFDeEIsT0FBTyxFQUNQLGVBQWUsQ0FBQyxhQUFhLElBQUksZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztLQUN6RTtHQUNGO0FBQ0QsU0FBTyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDbkM7Ozs7aUNBekorQixxQkFBcUI7O2tDQUNwQixzQkFBc0I7O3VDQUN4QixpQ0FBaUM7O2dDQUN6QywwQkFBMEI7O3FCQUNULFNBQVM7Ozs7Ozs7Ozs7Ozs7QUFvRmpELElBQU0saUJBQTRDLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7Ozs7OztBQU8vRCxJQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQzs7QUFFdkMsU0FBUyxrQkFBa0IsQ0FDdkIsV0FBd0IsRUFDeEIsV0FBb0IsRUFDcEIsUUFBaUIsRUFDakIsY0FBMEIsRUFDMUIsYUFBc0IsRUFDVjtBQUNkLFNBQU8sYUFBYSxHQUNoQiwyQ0FBdUIsV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsR0FDMUQseUNBQXNCLFdBQVcsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0NBQy9FOzs7O0FBSUQsU0FBUyxXQUFXLENBQUMsR0FBZSxFQUFXO0FBQzdDLE1BQU0sZ0JBQWdCLEdBQUcsMENBQWlCLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6RCxTQUFPLGdCQUFnQixJQUFJLElBQUksR0FDNUIsZ0NBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLGFBQWEsR0FDckMsZ0JBQWdCLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQztDQUN2RDs7QUFFTSxTQUFTLDJCQUEyQixDQUFDLEdBQWUsRUFBaUI7QUFDMUUsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLFNBQU8sR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3hEIiwiZmlsZSI6IkhhY2tMYW5ndWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIHtOdWNsaWRlVXJpfSBmcm9tICcuLi8uLi9udWNsaWRlLXJlbW90ZS11cmknO1xuaW1wb3J0IHR5cGVvZiAqIGFzIEhhY2tTZXJ2aWNlIGZyb20gJy4uLy4uL251Y2xpZGUtaGFjay1iYXNlL2xpYi9IYWNrU2VydmljZSc7XG5pbXBvcnQgdHlwZSB7XG4gIEhhY2tEaWFnbm9zdGljLFxuICBIYWNrU2VhcmNoUG9zaXRpb24sXG4gIEhhY2tSZWZlcmVuY2UsXG4gIEhhY2tPdXRsaW5lLFxufSBmcm9tICcuLi8uLi9udWNsaWRlLWhhY2stYmFzZS9saWIvSGFja1NlcnZpY2UnO1xuaW1wb3J0IHR5cGUge1R5cGVDb3ZlcmFnZVJlZ2lvbn0gZnJvbSAnLi9UeXBlZFJlZ2lvbnMnO1xuXG5pbXBvcnQge0xvY2FsSGFja0xhbmd1YWdlfSBmcm9tICcuL0xvY2FsSGFja0xhbmd1YWdlJztcbmltcG9ydCB7U2VydmVySGFja0xhbmd1YWdlfSBmcm9tICcuL1NlcnZlckhhY2tMYW5ndWFnZSc7XG5pbXBvcnQge1JlbW90ZUNvbm5lY3Rpb259IGZyb20gJy4uLy4uL251Y2xpZGUtcmVtb3RlLWNvbm5lY3Rpb24nO1xuaW1wb3J0IHtpc1JlbW90ZX0gZnJvbSAnLi4vLi4vbnVjbGlkZS1yZW1vdGUtdXJpJztcbmltcG9ydCB7Z2V0SGFja0Vudmlyb25tZW50RGV0YWlsc30gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIENvbXBsZXRpb25SZXN1bHQgPSB7XG4gIG1hdGNoU25pcHBldDogc3RyaW5nO1xuICBtYXRjaFRleHQ6IHN0cmluZztcbiAgbWF0Y2hUeXBlOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFRoZSBIYWNrTGFuZ3VhZ2UgaXMgdGhlIGNvbnRyb2xsZXIgdGhhdCBzZXJ2ZXJzIGxhbmd1YWdlIHJlcXVlc3RzIGJ5IHRyeWluZyB0byBnZXQgd29ya2VyIHJlc3VsdHNcbiAqIGFuZC9vciByZXN1bHRzIGZyb20gSGFja1NlcnZpY2UgKHdoaWNoIHdvdWxkIGJlIGV4ZWN1dGluZyBoaF9jbGllbnQgb24gYSBzdXBwb3J0aW5nIHNlcnZlcilcbiAqIGFuZCBjb21iaW5pbmcgYW5kL29yIHNlbGVjdGluZyB0aGUgcmVzdWx0cyB0byBnaXZlIGJhY2sgdG8gdGhlIHJlcXVlc3Rlci5cbiAqL1xuZXhwb3J0IHR5cGUgSGFja0xhbmd1YWdlICA9IHtcblxuICBkaXNwb3NlKCk6IHZvaWQ7XG5cbiAgZ2V0Q29tcGxldGlvbnMoXG4gICAgZmlsZVBhdGg6IE51Y2xpZGVVcmksXG4gICAgY29udGVudHM6IHN0cmluZyxcbiAgICBvZmZzZXQ6IG51bWJlclxuICApOiBQcm9taXNlPEFycmF5PENvbXBsZXRpb25SZXN1bHQ+PjtcblxuICBmb3JtYXRTb3VyY2UoXG4gICAgY29udGVudHM6IHN0cmluZyxcbiAgICBzdGFydFBvc2l0aW9uOiBudW1iZXIsXG4gICAgZW5kUG9zaXRpb246IG51bWJlcixcbiAgKTogUHJvbWlzZTxzdHJpbmc+O1xuXG4gIGhpZ2hsaWdodFNvdXJjZShcbiAgICBwYXRoOiBOdWNsaWRlVXJpLFxuICAgIGNvbnRlbnRzOiBzdHJpbmcsXG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbDogbnVtYmVyLFxuICApOiBQcm9taXNlPEFycmF5PGF0b20kUmFuZ2U+PjtcblxuICBnZXREaWFnbm9zdGljcyhcbiAgICBwYXRoOiBOdWNsaWRlVXJpLFxuICAgIGNvbnRlbnRzOiBzdHJpbmcsXG4gICk6IFByb21pc2U8QXJyYXk8e21lc3NhZ2U6IEhhY2tEaWFnbm9zdGljO30+PjtcblxuICBnZXRUeXBlQ292ZXJhZ2UoXG4gICAgZmlsZVBhdGg6IE51Y2xpZGVVcmksXG4gICk6IFByb21pc2U8QXJyYXk8VHlwZUNvdmVyYWdlUmVnaW9uPj47XG5cbiAgZ2V0RGVmaW5pdGlvbihcbiAgICAgIGZpbGVQYXRoOiBOdWNsaWRlVXJpLFxuICAgICAgY29udGVudHM6IHN0cmluZyxcbiAgICAgIGxpbmVOdW1iZXI6IG51bWJlcixcbiAgICAgIGNvbHVtbjogbnVtYmVyLFxuICAgICAgbGluZVRleHQ6IHN0cmluZ1xuICAgICk6IFByb21pc2U8QXJyYXk8SGFja1NlYXJjaFBvc2l0aW9uPj47XG5cbiAgZ2V0VHlwZShcbiAgICBmaWxlUGF0aDogTnVjbGlkZVVyaSxcbiAgICBjb250ZW50czogc3RyaW5nLFxuICAgIGV4cHJlc3Npb246IHN0cmluZyxcbiAgICBsaW5lTnVtYmVyOiBudW1iZXIsXG4gICAgY29sdW1uOiBudW1iZXIsXG4gICk6IFByb21pc2U8P3N0cmluZz47XG5cbiAgZmluZFJlZmVyZW5jZXMoXG4gICAgZmlsZVBhdGg6IE51Y2xpZGVVcmksXG4gICAgY29udGVudHM6IHN0cmluZyxcbiAgICBsaW5lOiBudW1iZXIsXG4gICAgY29sdW1uOiBudW1iZXJcbiAgKTogUHJvbWlzZTw/e2Jhc2VVcmk6IHN0cmluZzsgc3ltYm9sTmFtZTogc3RyaW5nOyByZWZlcmVuY2VzOiBBcnJheTxIYWNrUmVmZXJlbmNlPn0+O1xuXG4gIGdldE91dGxpbmUoXG4gICAgZmlsZVBhdGg6IE51Y2xpZGVVcmksXG4gICAgY29udGVudHM6IHN0cmluZyxcbiAgKTogUHJvbWlzZTw/SGFja091dGxpbmU+O1xuXG4gIGdldEJhc2VQYXRoKCk6ID9zdHJpbmc7XG5cbiAgaXNIYWNrQXZhaWxhYmxlKCk6IGJvb2xlYW47XG5cbn07XG5cbi8qKlxuICogVGhpcyBpcyByZXNwb25zaWJsZSBmb3IgbWFuYWdpbmcgKGNyZWF0aW5nL2Rpc3Bvc2luZykgbXVsdGlwbGUgSGFja0xhbmd1YWdlIGluc3RhbmNlcyxcbiAqIGNyZWF0aW5nIHRoZSBkZXNpZ25hdGVkIEhhY2tTZXJ2aWNlIGluc3RhbmNlcyB3aXRoIHRoZSBOdWNsaWRlQ2xpZW50IGl0IG5lZWRzIHBlciByZW1vdGUgcHJvamVjdC5cbiAqIEFsc28sIGl0IGRlZWxlZ2F0ZXMgdGhlIGxhbmd1YWdlIGZlYXR1cmUgcmVxdWVzdCB0byB0aGUgY29ycmVjdCBIYWNrTGFuZ3VhZ2UgaW5zdGFuY2UuXG4gKi9cbmNvbnN0IHVyaVRvSGFja0xhbmd1YWdlOiBNYXA8c3RyaW5nLCBIYWNrTGFuZ3VhZ2U+ID0gbmV3IE1hcCgpO1xuXG4vLyBkdW1teSBrZXkgaW50byB1cmlUb0hhY2tMYW5ndWFnZSBmb3IgbG9jYWwgcHJvamVjdHMuXG4vLyBBbnkgbm9uLXJlbW90ZSBOdWNsaWRlVXJpIHdpbGwgZG8uXG4vLyBUT0RPOiBJIHN1c3BlY3Qgd2Ugc2hvdWxkIGtleSB0aGUgbG9jYWwgc2VydmljZSBvZmYgb2YgdGhlIHByZXNlbmNlIG9mIGEgLmhoY29uZmlnIGZpbGVcbi8vIHJhdGhlciB0aGFuIGhhdmluZyBhIHNpbmdsZSBIYWNrTGFuZ3VhZ2UgZm9yIGFsbCBsb2NhbCByZXF1ZXN0cy4gUmVnYXJkbGVzcywgd2UgaGF2ZW4ndCB0ZXN0ZWRcbi8vIGxvY2FsIGhhY2sgc2VydmljZXMgc28gc2F2ZSB0aGF0IGZvciBhbm90aGVyIGRheS5cbmNvbnN0IExPQ0FMX1VSSV9LRVkgPSAnbG9jYWwtaGFjay1rZXknO1xuXG5mdW5jdGlvbiBjcmVhdGVIYWNrTGFuZ3VhZ2UoXG4gICAgaGFja1NlcnZpY2U6IEhhY2tTZXJ2aWNlLFxuICAgIGhoQXZhaWxhYmxlOiBib29sZWFuLFxuICAgIGJhc2VQYXRoOiA/c3RyaW5nLFxuICAgIGluaXRpYWxGaWxlVXJpOiBOdWNsaWRlVXJpLFxuICAgIHVzZVNlcnZlck9ubHk6IGJvb2xlYW4sXG4pOiBIYWNrTGFuZ3VhZ2Uge1xuICByZXR1cm4gdXNlU2VydmVyT25seVxuICAgID8gbmV3IFNlcnZlckhhY2tMYW5ndWFnZShoYWNrU2VydmljZSwgaGhBdmFpbGFibGUsIGJhc2VQYXRoKVxuICAgIDogbmV3IExvY2FsSGFja0xhbmd1YWdlKGhhY2tTZXJ2aWNlLCBoaEF2YWlsYWJsZSwgYmFzZVBhdGgsIGluaXRpYWxGaWxlVXJpKTtcbn1cblxuLy8gUmV0dXJucyBudWxsIGlmIHdlIGNhbid0IGdldCB0aGUga2V5IGF0IHRoaXMgdGltZSBiZWNhdXNlIHRoZSBSZW1vdGVDb25uZWN0aW9uIGlzIGluaXRpYWxpemluZy5cbi8vIFRoaXMgY2FuIGhhcHBlbiBvbiBzdGFydHVwIHdoZW4gcmVsb2FkaW5nIHJlbW90ZSBmaWxlcy5cbmZ1bmN0aW9uIGdldEtleU9mVXJpKHVyaTogTnVjbGlkZVVyaSk6ID9zdHJpbmcge1xuICBjb25zdCByZW1vdGVDb25uZWN0aW9uID0gUmVtb3RlQ29ubmVjdGlvbi5nZXRGb3JVcmkodXJpKTtcbiAgcmV0dXJuIHJlbW90ZUNvbm5lY3Rpb24gPT0gbnVsbCA/XG4gICAgKGlzUmVtb3RlKHVyaSkgPyBudWxsIDogTE9DQUxfVVJJX0tFWSkgOlxuICAgIHJlbW90ZUNvbm5lY3Rpb24uZ2V0VXJpRm9ySW5pdGlhbFdvcmtpbmdEaXJlY3RvcnkoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhY2hlZEhhY2tMYW5ndWFnZUZvclVyaSh1cmk6IE51Y2xpZGVVcmkpOiA/SGFja0xhbmd1YWdlIHtcbiAgY29uc3Qga2V5ID0gZ2V0S2V5T2ZVcmkodXJpKTtcbiAgcmV0dXJuIGtleSA9PSBudWxsID8gbnVsbCA6IHVyaVRvSGFja0xhbmd1YWdlLmdldCh1cmkpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SGFja0xhbmd1YWdlRm9yVXJpKHVyaTogP051Y2xpZGVVcmkpOiBQcm9taXNlPD9IYWNrTGFuZ3VhZ2U+IHtcbiAgaWYgKHVyaSA9PSBudWxsIHx8IHVyaS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBrZXkgPSBnZXRLZXlPZlVyaSh1cmkpO1xuICBpZiAoa2V5ID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gYXdhaXQgY3JlYXRlSGFja0xhbmd1YWdlSWZOb3RFeGlzdGluZyhrZXksIHVyaSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUhhY2tMYW5ndWFnZUlmTm90RXhpc3RpbmcoXG4gIGtleTogc3RyaW5nLFxuICBmaWxlVXJpOiBOdWNsaWRlVXJpLFxuKTogUHJvbWlzZTxIYWNrTGFuZ3VhZ2U+IHtcbiAgaWYgKCF1cmlUb0hhY2tMYW5ndWFnZS5oYXMoa2V5KSkge1xuICAgIGNvbnN0IGhhY2tFbnZpcm9ubWVudCA9IGF3YWl0IGdldEhhY2tFbnZpcm9ubWVudERldGFpbHMoZmlsZVVyaSk7XG5cbiAgICAvLyBJZiBtdWx0aXBsZSBjYWxscyB3ZXJlIGRvbmUgYXN5bmNocm9ub3VzbHksIHRoZW4gcmV0dXJuIHRoZSBzaW5nbGUtY3JlYXRlZCBIYWNrTGFuZ3VhZ2UuXG4gICAgaWYgKCF1cmlUb0hhY2tMYW5ndWFnZS5oYXMoa2V5KSkge1xuICAgICAgdXJpVG9IYWNrTGFuZ3VhZ2Uuc2V0KGtleSxcbiAgICAgICAgY3JlYXRlSGFja0xhbmd1YWdlKFxuICAgICAgICAgIGhhY2tFbnZpcm9ubWVudC5oYWNrU2VydmljZSxcbiAgICAgICAgICBoYWNrRW52aXJvbm1lbnQuaXNBdmFpbGFibGUsXG4gICAgICAgICAgaGFja0Vudmlyb25tZW50LmhhY2tSb290LFxuICAgICAgICAgIGZpbGVVcmksXG4gICAgICAgICAgaGFja0Vudmlyb25tZW50LnVzZVNlcnZlck9ubHkgfHwgaGFja0Vudmlyb25tZW50LnVzZUlkZUNvbm5lY3Rpb24pKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVyaVRvSGFja0xhbmd1YWdlLmdldChrZXkpO1xufVxuIl19