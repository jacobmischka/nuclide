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

exports.hgRepositoryForEditor = hgRepositoryForEditor;

var _require = require('../../nuclide-hg-git-bridge');

var repositoryForPath = _require.repositoryForPath;

function hgRepositoryForEditor(editor) {
  var repo = repositoryForPath(editor.getPath() || '');
  if (!repo || repo.getType() !== 'hg') {
    return null;
  }
  return repo;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztlQWE0QixPQUFPLENBQUMsNkJBQTZCLENBQUM7O0lBQTNELGlCQUFpQixZQUFqQixpQkFBaUI7O0FBRWpCLFNBQVMscUJBQXFCLENBQUMsTUFBa0IsRUFBdUI7QUFDN0UsTUFBTSxJQUFJLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZELE1BQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtBQUNwQyxXQUFPLElBQUksQ0FBQztHQUNiO0FBQ0QsU0FBUyxJQUFJLENBQTRCO0NBQzFDIiwiZmlsZSI6ImNvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIHtIZ1JlcG9zaXRvcnlDbGllbnR9IGZyb20gJy4uLy4uL251Y2xpZGUtaGctcmVwb3NpdG9yeS1jbGllbnQnO1xuXG5jb25zdCB7cmVwb3NpdG9yeUZvclBhdGh9ID0gcmVxdWlyZSgnLi4vLi4vbnVjbGlkZS1oZy1naXQtYnJpZGdlJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBoZ1JlcG9zaXRvcnlGb3JFZGl0b3IoZWRpdG9yOiBUZXh0RWRpdG9yKTogP0hnUmVwb3NpdG9yeUNsaWVudCB7XG4gIGNvbnN0IHJlcG8gPSByZXBvc2l0b3J5Rm9yUGF0aChlZGl0b3IuZ2V0UGF0aCgpIHx8ICcnKTtcbiAgaWYgKCFyZXBvIHx8IHJlcG8uZ2V0VHlwZSgpICE9PSAnaGcnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuICgocmVwbzogYW55KTogSGdSZXBvc2l0b3J5Q2xpZW50KTtcbn1cbiJdfQ==