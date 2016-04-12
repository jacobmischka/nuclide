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

exports.isTextEditor = isTextEditor;
exports.createTextEditor = createTextEditor;
exports.existingEditorForUri = existingEditorForUri;

var loadBufferForUri = _asyncToGenerator(function* (uri) {
  var buffer = existingBufferForUri(uri);
  if (buffer == null) {
    buffer = createBufferForUri(uri);
  }
  if (buffer.loaded) {
    return buffer;
  }
  try {
    yield buffer.load();
    return buffer;
  } catch (error) {
    atom.project.removeBuffer(buffer);
    throw error;
  }
}

/**
 * Returns an existing buffer for that uri, or create one if not existing.
 */
);

exports.loadBufferForUri = loadBufferForUri;
exports.bufferForUri = bufferForUri;
exports.existingBufferForUri = existingBufferForUri;
exports.getViewOfEditor = getViewOfEditor;
exports.getScrollTop = getScrollTop;
exports.setScrollTop = setScrollTop;
exports.setPositionAndScroll = setPositionAndScroll;
exports.getCursorPositions = getCursorPositions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _atom = require('atom');

var _rx = require('rx');

// TODO(most): move to remote-connection/lib/RemoteTextBuffer.js

var _nuclideRemoteProjectsLibNuclideTextBuffer = require('../../nuclide-remote-projects/lib/NuclideTextBuffer');

var _nuclideRemoteProjectsLibNuclideTextBuffer2 = _interopRequireDefault(_nuclideRemoteProjectsLibNuclideTextBuffer);

var _nuclideRemoteUri = require('../../nuclide-remote-uri');

var _nuclideRemoteConnection = require('../../nuclide-remote-connection');

var _nuclideCommons = require('../../nuclide-commons');

var observableFromSubscribeFunction = _nuclideCommons.event.observableFromSubscribeFunction;

function isTextEditor(item) {
  if (item == null) {
    return false;
  } else if (typeof atom.workspace.buildTextEditor === 'function') {
    // If buildTextEditor is present, then accessing the TextEditor constructor will trigger a
    // deprecation warning. Atom recommends testing for the existence of the public method of
    // TextEditor that you are using as a proxy for whether the object is a TextEditor:
    // https://github.com/atom/atom/commit/4d2d4c3. This is a fairly weak heuristic, so we test
    // for a larger set of methods that are more likely unique to TextEditor as a better heuristic:
    return typeof item.screenPositionForBufferPosition === 'function' && typeof item.scanInBufferRange === 'function' && typeof item.scopeDescriptorForBufferPosition === 'function';
  } else {
    return item instanceof _atom.TextEditor;
  }
}

function createTextEditor(textEditorParams) {
  // Note that atom.workspace.buildTextEditor was introduced after the release of Atom 1.0.19.
  // As of this change, calling the constructor of TextEditor directly is deprecated. Therefore,
  // we must choose the appropriate code path based on which API is available.
  if (atom.workspace.buildTextEditor) {
    return atom.workspace.buildTextEditor(textEditorParams);
  } else {
    return new _atom.TextEditor(textEditorParams);
  }
}

/**
 * Returns a text editor that has the given path open, or null if none exists. If there are multiple
 * text editors for this path, one is chosen arbitrarily.
 */

function existingEditorForUri(path) {
  // This isn't ideal but realistically iterating through even a few hundred editors shouldn't be a
  // real problem. And if you have more than a few hundred you probably have bigger problems.
  for (var editor of atom.workspace.getTextEditors()) {
    if (editor.getPath() === path) {
      return editor;
    }
  }

  return null;
}

function bufferForUri(uri) {
  var buffer = existingBufferForUri(uri);
  if (buffer != null) {
    return buffer;
  }
  return createBufferForUri(uri);
}

function createBufferForUri(uri) {
  var buffer = undefined;
  if ((0, _nuclideRemoteUri.isLocal)(uri)) {
    buffer = new _atom.TextBuffer({ filePath: uri });
  } else {
    var connection = _nuclideRemoteConnection.ServerConnection.getForUri(uri);
    if (connection == null) {
      throw new Error('ServerConnection cannot be found for uri: ' + uri);
    }
    buffer = new _nuclideRemoteProjectsLibNuclideTextBuffer2['default'](connection, { filePath: uri });
  }
  atom.project.addBuffer(buffer);
  (0, _assert2['default'])(buffer);
  return buffer;
}

/**
 * Returns an exsting buffer for that uri, or null if not existing.
 */

function existingBufferForUri(uri) {
  return atom.project.findBufferForPath(uri);
}

function getViewOfEditor(editor) {
  return atom.views.getView(editor);
}

function getScrollTop(editor) {
  return getViewOfEditor(editor).getScrollTop();
}

function setScrollTop(editor, scrollTop) {
  getViewOfEditor(editor).setScrollTop(scrollTop);
}

/**
 * Does a best effort to set an editor pane to a given cursor position & scroll.
 * Does not ensure that the current cursor position is visible.
 *
 * Can be used with editor.getCursorBufferPosition() & getScrollTop() to restore
 * an editors cursor and scroll.
 */

function setPositionAndScroll(editor, position, scrollTop) {
  editor.setCursorBufferPosition(position, { autoscroll: false });
  setScrollTop(editor, scrollTop);
}

function getCursorPositions(editor) {
  // This will behave strangely in the face of multiple cursors. Consider supporting multiple
  // cursors in the future.
  var cursor = editor.getCursors()[0];
  (0, _assert2['default'])(cursor != null);
  return _rx.Observable.merge(_rx.Observable.just(cursor.getBufferPosition()), observableFromSubscribeFunction(cursor.onDidChangePosition.bind(cursor)).map(function (event) {
    return event.newBufferPosition;
  }));
}
//# sourceMappingURL=data:application/json;base64,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LENBQUM7QUFDMUIsU0FBTyxlQUFXLEtBQUssQ0FDckIsZUFBVyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFDM0MsK0JBQStCLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUNyRSxHQUFHLENBQUMsVUFBQSxLQUFLO1dBQUksS0FBSyxDQUFDLGlCQUFpQjtHQUFBLENBQUMsQ0FDekMsQ0FBQztDQUNIIiwiZmlsZSI6InRleHQtZWRpdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4vKiBAZmxvdyAqL1xuXG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IHR5cGUge051Y2xpZGVVcml9IGZyb20gJy4uLy4uL251Y2xpZGUtcmVtb3RlLXVyaSc7XG5cbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7VGV4dEJ1ZmZlciwgVGV4dEVkaXRvcn0gZnJvbSAnYXRvbSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4JztcblxuLy8gVE9ETyhtb3N0KTogbW92ZSB0byByZW1vdGUtY29ubmVjdGlvbi9saWIvUmVtb3RlVGV4dEJ1ZmZlci5qc1xuaW1wb3J0IE51Y2xpZGVUZXh0QnVmZmVyIGZyb20gJy4uLy4uL251Y2xpZGUtcmVtb3RlLXByb2plY3RzL2xpYi9OdWNsaWRlVGV4dEJ1ZmZlcic7XG5pbXBvcnQge2lzTG9jYWx9IGZyb20gJy4uLy4uL251Y2xpZGUtcmVtb3RlLXVyaSc7XG5pbXBvcnQge1NlcnZlckNvbm5lY3Rpb259IGZyb20gJy4uLy4uL251Y2xpZGUtcmVtb3RlLWNvbm5lY3Rpb24nO1xuXG5pbXBvcnQge2V2ZW50IGFzIGNvbW1vbnNFdmVudH0gZnJvbSAnLi4vLi4vbnVjbGlkZS1jb21tb25zJztcbmNvbnN0IHtvYnNlcnZhYmxlRnJvbVN1YnNjcmliZUZ1bmN0aW9ufSA9IGNvbW1vbnNFdmVudDtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGV4dEVkaXRvcihpdGVtOiA/YW55KTogYm9vbGVhbiB7XG4gIGlmIChpdGVtID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGF0b20ud29ya3NwYWNlLmJ1aWxkVGV4dEVkaXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIElmIGJ1aWxkVGV4dEVkaXRvciBpcyBwcmVzZW50LCB0aGVuIGFjY2Vzc2luZyB0aGUgVGV4dEVkaXRvciBjb25zdHJ1Y3RvciB3aWxsIHRyaWdnZXIgYVxuICAgIC8vIGRlcHJlY2F0aW9uIHdhcm5pbmcuIEF0b20gcmVjb21tZW5kcyB0ZXN0aW5nIGZvciB0aGUgZXhpc3RlbmNlIG9mIHRoZSBwdWJsaWMgbWV0aG9kIG9mXG4gICAgLy8gVGV4dEVkaXRvciB0aGF0IHlvdSBhcmUgdXNpbmcgYXMgYSBwcm94eSBmb3Igd2hldGhlciB0aGUgb2JqZWN0IGlzIGEgVGV4dEVkaXRvcjpcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYXRvbS9hdG9tL2NvbW1pdC80ZDJkNGMzLiBUaGlzIGlzIGEgZmFpcmx5IHdlYWsgaGV1cmlzdGljLCBzbyB3ZSB0ZXN0XG4gICAgLy8gZm9yIGEgbGFyZ2VyIHNldCBvZiBtZXRob2RzIHRoYXQgYXJlIG1vcmUgbGlrZWx5IHVuaXF1ZSB0byBUZXh0RWRpdG9yIGFzIGEgYmV0dGVyIGhldXJpc3RpYzpcbiAgICByZXR1cm4gdHlwZW9mIGl0ZW0uc2NyZWVuUG9zaXRpb25Gb3JCdWZmZXJQb3NpdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgdHlwZW9mIGl0ZW0uc2NhbkluQnVmZmVyUmFuZ2UgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiBpdGVtLnNjb3BlRGVzY3JpcHRvckZvckJ1ZmZlclBvc2l0aW9uID09PSAnZnVuY3Rpb24nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBpdGVtIGluc3RhbmNlb2YgVGV4dEVkaXRvcjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGV4dEVkaXRvcih0ZXh0RWRpdG9yUGFyYW1zOiBhdG9tJFRleHRFZGl0b3JQYXJhbXMpOiBUZXh0RWRpdG9yIHtcbiAgLy8gTm90ZSB0aGF0IGF0b20ud29ya3NwYWNlLmJ1aWxkVGV4dEVkaXRvciB3YXMgaW50cm9kdWNlZCBhZnRlciB0aGUgcmVsZWFzZSBvZiBBdG9tIDEuMC4xOS5cbiAgLy8gQXMgb2YgdGhpcyBjaGFuZ2UsIGNhbGxpbmcgdGhlIGNvbnN0cnVjdG9yIG9mIFRleHRFZGl0b3IgZGlyZWN0bHkgaXMgZGVwcmVjYXRlZC4gVGhlcmVmb3JlLFxuICAvLyB3ZSBtdXN0IGNob29zZSB0aGUgYXBwcm9wcmlhdGUgY29kZSBwYXRoIGJhc2VkIG9uIHdoaWNoIEFQSSBpcyBhdmFpbGFibGUuXG4gIGlmIChhdG9tLndvcmtzcGFjZS5idWlsZFRleHRFZGl0b3IpIHtcbiAgICByZXR1cm4gYXRvbS53b3Jrc3BhY2UuYnVpbGRUZXh0RWRpdG9yKHRleHRFZGl0b3JQYXJhbXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgVGV4dEVkaXRvcih0ZXh0RWRpdG9yUGFyYW1zKTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgYSB0ZXh0IGVkaXRvciB0aGF0IGhhcyB0aGUgZ2l2ZW4gcGF0aCBvcGVuLCBvciBudWxsIGlmIG5vbmUgZXhpc3RzLiBJZiB0aGVyZSBhcmUgbXVsdGlwbGVcbiAqIHRleHQgZWRpdG9ycyBmb3IgdGhpcyBwYXRoLCBvbmUgaXMgY2hvc2VuIGFyYml0cmFyaWx5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhpc3RpbmdFZGl0b3JGb3JVcmkocGF0aDogTnVjbGlkZVVyaSk6ID9hdG9tJFRleHRFZGl0b3Ige1xuICAvLyBUaGlzIGlzbid0IGlkZWFsIGJ1dCByZWFsaXN0aWNhbGx5IGl0ZXJhdGluZyB0aHJvdWdoIGV2ZW4gYSBmZXcgaHVuZHJlZCBlZGl0b3JzIHNob3VsZG4ndCBiZSBhXG4gIC8vIHJlYWwgcHJvYmxlbS4gQW5kIGlmIHlvdSBoYXZlIG1vcmUgdGhhbiBhIGZldyBodW5kcmVkIHlvdSBwcm9iYWJseSBoYXZlIGJpZ2dlciBwcm9ibGVtcy5cbiAgZm9yIChjb25zdCBlZGl0b3Igb2YgYXRvbS53b3Jrc3BhY2UuZ2V0VGV4dEVkaXRvcnMoKSkge1xuICAgIGlmIChlZGl0b3IuZ2V0UGF0aCgpID09PSBwYXRoKSB7XG4gICAgICByZXR1cm4gZWRpdG9yO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZEJ1ZmZlckZvclVyaSh1cmk6IE51Y2xpZGVVcmkpOiBQcm9taXNlPGF0b20kVGV4dEJ1ZmZlcj4ge1xuICBsZXQgYnVmZmVyID0gZXhpc3RpbmdCdWZmZXJGb3JVcmkodXJpKTtcbiAgaWYgKGJ1ZmZlciA9PSBudWxsKSB7XG4gICAgYnVmZmVyID0gY3JlYXRlQnVmZmVyRm9yVXJpKHVyaSk7XG4gIH1cbiAgaWYgKGJ1ZmZlci5sb2FkZWQpIHtcbiAgICByZXR1cm4gYnVmZmVyO1xuICB9XG4gIHRyeSB7XG4gICAgYXdhaXQgYnVmZmVyLmxvYWQoKTtcbiAgICByZXR1cm4gYnVmZmVyO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGF0b20ucHJvamVjdC5yZW1vdmVCdWZmZXIoYnVmZmVyKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgYW4gZXhpc3RpbmcgYnVmZmVyIGZvciB0aGF0IHVyaSwgb3IgY3JlYXRlIG9uZSBpZiBub3QgZXhpc3RpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWZmZXJGb3JVcmkodXJpOiBOdWNsaWRlVXJpKTogYXRvbSRUZXh0QnVmZmVyIHtcbiAgY29uc3QgYnVmZmVyID0gZXhpc3RpbmdCdWZmZXJGb3JVcmkodXJpKTtcbiAgaWYgKGJ1ZmZlciAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyRm9yVXJpKHVyaSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlckZvclVyaSh1cmk6IE51Y2xpZGVVcmkpOiBhdG9tJFRleHRCdWZmZXIge1xuICBsZXQgYnVmZmVyO1xuICBpZiAoaXNMb2NhbCh1cmkpKSB7XG4gICAgYnVmZmVyID0gbmV3IFRleHRCdWZmZXIoe2ZpbGVQYXRoOiB1cml9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gU2VydmVyQ29ubmVjdGlvbi5nZXRGb3JVcmkodXJpKTtcbiAgICBpZiAoY29ubmVjdGlvbiA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlcnZlckNvbm5lY3Rpb24gY2Fubm90IGJlIGZvdW5kIGZvciB1cmk6ICR7dXJpfWApO1xuICAgIH1cbiAgICBidWZmZXIgPSBuZXcgTnVjbGlkZVRleHRCdWZmZXIoY29ubmVjdGlvbiwge2ZpbGVQYXRoOiB1cml9KTtcbiAgfVxuICBhdG9tLnByb2plY3QuYWRkQnVmZmVyKGJ1ZmZlcik7XG4gIGludmFyaWFudChidWZmZXIpO1xuICByZXR1cm4gYnVmZmVyO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gZXhzdGluZyBidWZmZXIgZm9yIHRoYXQgdXJpLCBvciBudWxsIGlmIG5vdCBleGlzdGluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4aXN0aW5nQnVmZmVyRm9yVXJpKHVyaTogTnVjbGlkZVVyaSk6ID9hdG9tJFRleHRCdWZmZXIge1xuICByZXR1cm4gYXRvbS5wcm9qZWN0LmZpbmRCdWZmZXJGb3JQYXRoKHVyaSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWaWV3T2ZFZGl0b3IoZWRpdG9yOiBhdG9tJFRleHRFZGl0b3IpOiBhdG9tJFRleHRFZGl0b3JFbGVtZW50IHtcbiAgcmV0dXJuIGF0b20udmlld3MuZ2V0VmlldyhlZGl0b3IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsVG9wKGVkaXRvcjogYXRvbSRUZXh0RWRpdG9yKTogbnVtYmVyIHtcbiAgcmV0dXJuIGdldFZpZXdPZkVkaXRvcihlZGl0b3IpLmdldFNjcm9sbFRvcCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U2Nyb2xsVG9wKGVkaXRvcjogYXRvbSRUZXh0RWRpdG9yLCBzY3JvbGxUb3A6IG51bWJlcik6IHZvaWQge1xuICBnZXRWaWV3T2ZFZGl0b3IoZWRpdG9yKS5zZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wKTtcbn1cblxuLyoqXG4gKiBEb2VzIGEgYmVzdCBlZmZvcnQgdG8gc2V0IGFuIGVkaXRvciBwYW5lIHRvIGEgZ2l2ZW4gY3Vyc29yIHBvc2l0aW9uICYgc2Nyb2xsLlxuICogRG9lcyBub3QgZW5zdXJlIHRoYXQgdGhlIGN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uIGlzIHZpc2libGUuXG4gKlxuICogQ2FuIGJlIHVzZWQgd2l0aCBlZGl0b3IuZ2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24oKSAmIGdldFNjcm9sbFRvcCgpIHRvIHJlc3RvcmVcbiAqIGFuIGVkaXRvcnMgY3Vyc29yIGFuZCBzY3JvbGwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRQb3NpdGlvbkFuZFNjcm9sbChcbiAgZWRpdG9yOiBhdG9tJFRleHRFZGl0b3IsXG4gIHBvc2l0aW9uOiBhdG9tJFBvaW50LFxuICBzY3JvbGxUb3A6IG51bWJlcixcbik6IHZvaWQge1xuICBlZGl0b3Iuc2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24ocG9zaXRpb24sIHthdXRvc2Nyb2xsOiBmYWxzZX0pO1xuICBzZXRTY3JvbGxUb3AoZWRpdG9yLCBzY3JvbGxUb3ApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3Vyc29yUG9zaXRpb25zKGVkaXRvcjogYXRvbSRUZXh0RWRpdG9yKTogT2JzZXJ2YWJsZTxhdG9tJFBvaW50PiB7XG4gIC8vIFRoaXMgd2lsbCBiZWhhdmUgc3RyYW5nZWx5IGluIHRoZSBmYWNlIG9mIG11bHRpcGxlIGN1cnNvcnMuIENvbnNpZGVyIHN1cHBvcnRpbmcgbXVsdGlwbGVcbiAgLy8gY3Vyc29ycyBpbiB0aGUgZnV0dXJlLlxuICBjb25zdCBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29ycygpWzBdO1xuICBpbnZhcmlhbnQoY3Vyc29yICE9IG51bGwpO1xuICByZXR1cm4gT2JzZXJ2YWJsZS5tZXJnZShcbiAgICBPYnNlcnZhYmxlLmp1c3QoY3Vyc29yLmdldEJ1ZmZlclBvc2l0aW9uKCkpLFxuICAgIG9ic2VydmFibGVGcm9tU3Vic2NyaWJlRnVuY3Rpb24oY3Vyc29yLm9uRGlkQ2hhbmdlUG9zaXRpb24uYmluZChjdXJzb3IpKVxuICAgICAgLm1hcChldmVudCA9PiBldmVudC5uZXdCdWZmZXJQb3NpdGlvbiksXG4gICk7XG59XG4iXX0=