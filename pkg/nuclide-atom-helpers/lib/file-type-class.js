

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var fs = require('fs-plus');
var path = require('path');

function fileTypeClass(filename) {
  var typeClass = undefined;
  var ext = path.extname(filename);

  if (fs.isReadmePath(filename)) {
    typeClass = 'icon-book';
  } else if (fs.isCompressedExtension(ext)) {
    typeClass = 'icon-file-zip';
  } else if (fs.isImageExtension(ext)) {
    typeClass = 'icon-file-media';
  } else if (fs.isPdfExtension(ext)) {
    typeClass = 'icon-file-pdf';
  } else if (fs.isBinaryExtension(ext)) {
    typeClass = 'icon-file-binary';
  } else {
    typeClass = 'icon-file-text';
  }

  return typeClass;
}

module.exports = fileTypeClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUtdHlwZS1jbGFzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBV0EsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzlCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFN0IsU0FBUyxhQUFhLENBQUMsUUFBZ0IsRUFBVTtBQUMvQyxNQUFJLFNBQVMsWUFBQSxDQUFDO0FBQ2QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFbkMsTUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQzdCLGFBQVMsR0FBRyxXQUFXLENBQUM7R0FDekIsTUFBTSxJQUFJLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN4QyxhQUFTLEdBQUcsZUFBZSxDQUFDO0dBQzdCLE1BQU0sSUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDbkMsYUFBUyxHQUFHLGlCQUFpQixDQUFDO0dBQy9CLE1BQU0sSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ2pDLGFBQVMsR0FBRyxlQUFlLENBQUM7R0FDN0IsTUFBTSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNwQyxhQUFTLEdBQUcsa0JBQWtCLENBQUM7R0FDaEMsTUFBTTtBQUNMLGFBQVMsR0FBRyxnQkFBZ0IsQ0FBQztHQUM5Qjs7QUFFRCxTQUFPLFNBQVMsQ0FBQztDQUNsQjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyIsImZpbGUiOiJmaWxlLXR5cGUtY2xhc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbi8qIEBmbG93ICovXG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzLXBsdXMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmZ1bmN0aW9uIGZpbGVUeXBlQ2xhc3MoZmlsZW5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGxldCB0eXBlQ2xhc3M7XG4gIGNvbnN0IGV4dCA9IHBhdGguZXh0bmFtZShmaWxlbmFtZSk7XG5cbiAgaWYgKGZzLmlzUmVhZG1lUGF0aChmaWxlbmFtZSkpIHtcbiAgICB0eXBlQ2xhc3MgPSAnaWNvbi1ib29rJztcbiAgfSBlbHNlIGlmIChmcy5pc0NvbXByZXNzZWRFeHRlbnNpb24oZXh0KSkge1xuICAgIHR5cGVDbGFzcyA9ICdpY29uLWZpbGUtemlwJztcbiAgfSBlbHNlIGlmIChmcy5pc0ltYWdlRXh0ZW5zaW9uKGV4dCkpIHtcbiAgICB0eXBlQ2xhc3MgPSAnaWNvbi1maWxlLW1lZGlhJztcbiAgfSBlbHNlIGlmIChmcy5pc1BkZkV4dGVuc2lvbihleHQpKSB7XG4gICAgdHlwZUNsYXNzID0gJ2ljb24tZmlsZS1wZGYnO1xuICB9IGVsc2UgaWYgKGZzLmlzQmluYXJ5RXh0ZW5zaW9uKGV4dCkpIHtcbiAgICB0eXBlQ2xhc3MgPSAnaWNvbi1maWxlLWJpbmFyeSc7XG4gIH0gZWxzZSB7XG4gICAgdHlwZUNsYXNzID0gJ2ljb24tZmlsZS10ZXh0JztcbiAgfVxuXG4gIHJldHVybiB0eXBlQ2xhc3M7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmlsZVR5cGVDbGFzcztcbiJdfQ==