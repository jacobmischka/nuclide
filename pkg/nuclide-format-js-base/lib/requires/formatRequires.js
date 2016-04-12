

var FirstNode = require('../utils/FirstNode');

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var NewLine = require('../utils/NewLine');

var _require = require('../utils/StringUtils');

var compareStrings = _require.compareStrings;
var isCapitalized = _require.isCapitalized;

var hasOneRequireDeclaration = require('../utils/hasOneRequireDeclaration');
var isGlobal = require('../utils/isGlobal');
var isRequireExpression = require('../utils/isRequireExpression');
var jscs = require('jscodeshift');
var reprintRequire = require('../utils/reprintRequire');

// Set up a config to easily add require formats
var CONFIG = [
// Handle type imports
{
  searchTerms: [jscs.ImportDeclaration, { importKind: 'type' }],
  filters: [isGlobal],
  comparator: function comparator(node1, node2) {
    return compareStrings(node1.specifiers[0].local.name, node2.specifiers[0].local.name);
  },
  mapper: function mapper(node) {
    return reprintRequire(node);
  }
},

// Handle side effects, e.g: `require('monkey-patches');`
{
  searchTerms: [jscs.ExpressionStatement],
  filters: [isGlobal, function (path) {
    return isRequireExpression(path.node);
  }],
  comparator: function comparator(node1, node2) {
    return compareStrings(node1.expression.arguments[0].value, node2.expression.arguments[0].value);
  },
  mapper: function mapper(node) {
    return reprintRequire(node);
  }
},

// Handle UpperCase requires, e.g: `require('UpperCase');`
{
  searchTerms: [jscs.VariableDeclaration],
  filters: [isGlobal, function (path) {
    return isValidRequireDeclaration(path.node);
  }, function (path) {
    return isCapitalized(getDeclarationName(path.node));
  }],
  comparator: function comparator(node1, node2) {
    return compareStrings(getDeclarationName(node1), getDeclarationName(node2));
  },
  mapper: function mapper(node) {
    return reprintRequire(node);
  }
},

// Handle lowerCase requires, e.g: `require('lowerCase');`
{
  searchTerms: [jscs.VariableDeclaration],
  filters: [isGlobal, function (path) {
    return isValidRequireDeclaration(path.node);
  }, function (path) {
    return !isCapitalized(getDeclarationName(path.node));
  }],
  comparator: function comparator(node1, node2) {
    return compareStrings(getDeclarationName(node1), getDeclarationName(node2));
  },
  mapper: function mapper(node) {
    return reprintRequire(node);
  }
}];

/**
 * This formats requires based on the left hand side of the require, unless it
 * is a simple require expression in which case there is no left hand side.
 *
 * The groups are:
 *
 *   - import types: import type Foo from 'anything';
 *   - require expressions: require('anything');
 *   - capitalized requires: var Foo = require('anything');
 *   - non-capitalized requires: var foo = require('anything');
 *
 * Array and object destructures are also valid left hand sides. Object patterns
 * are sorted and then the first identifier in each of patterns is used for
 * sorting.
 */
function formatRequires(root) {
  var first = FirstNode.get(root);
  if (!first) {
    return;
  }
  var _first = first; // For flow.

  // Create groups of requires from each config
  var nodeGroups = CONFIG.map(function (config) {
    var paths = root.find(config.searchTerms[0], config.searchTerms[1]).filter(function (path) {
      return config.filters.every(function (filter) {
        return filter(path);
      });
    });

    // Save the underlying nodes before removing the paths
    var nodes = paths.nodes().slice();
    paths.forEach(function (path) {
      return jscs(path).remove();
    });
    return nodes.map(function (node) {
      return config.mapper(node);
    }).sort(config.comparator);
  });

  // Build all the nodes we want to insert, then add them
  var allGroups = [[NewLine.statement]];
  nodeGroups.forEach(function (group) {
    return allGroups.push(group, [NewLine.statement]);
  });
  var nodesToInsert = Array.prototype.concat.apply([], allGroups);
  nodesToInsert.reverse().forEach(function (node) {
    return _first.insertBefore(node);
  });
}

/**
 * Tests if a variable declaration is a valid require declaration.
 */
function isValidRequireDeclaration(node) {
  if (!hasOneRequireDeclaration(node)) {
    return false;
  }
  var declaration = node.declarations[0];
  if (jscs.Identifier.check(declaration.id)) {
    return true;
  }
  if (jscs.ObjectPattern.check(declaration.id)) {
    return declaration.id.properties.every(function (prop) {
      return prop.shorthand && jscs.Identifier.check(prop.key);
    });
  }
  if (jscs.ArrayPattern.check(declaration.id)) {
    return declaration.id.elements.every(function (element) {
      return jscs.Identifier.check(element);
    });
  }
  return false;
}

function getDeclarationName(node) {
  var declaration = node.declarations[0];
  if (jscs.Identifier.check(declaration.id)) {
    return declaration.id.name;
  }
  // Order by the first property name in the object pattern.
  if (jscs.ObjectPattern.check(declaration.id)) {
    return declaration.id.properties[0].key.name;
  }
  // Order by the first element name in the array pattern.
  if (jscs.ArrayPattern.check(declaration.id)) {
    return declaration.id.elements[0].name;
  }
  return '';
}

module.exports = formatRequires;
//# sourceMappingURL=data:application/json;base64,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Q0FDMUQsQ0FBQztHQUNIO0FBQ0QsTUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDM0MsV0FBTyxXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQ2xDLFVBQUEsT0FBTzthQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztLQUFBLENBQzFDLENBQUM7R0FDSDtBQUNELFNBQU8sS0FBSyxDQUFDO0NBQ2Q7O0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxJQUFVLEVBQVU7QUFDOUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxNQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN6QyxXQUFPLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO0dBQzVCOztBQUVELE1BQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzVDLFdBQU8sV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztHQUM5Qzs7QUFFRCxNQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMzQyxXQUFPLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztHQUN4QztBQUNELFNBQU8sRUFBRSxDQUFDO0NBQ1g7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMiLCJmaWxlIjoiZm9ybWF0UmVxdWlyZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbi8qIEBmbG93ICovXG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgdHlwZSB7Q29sbGVjdGlvbiwgTm9kZSwgTm9kZVBhdGh9IGZyb20gJy4uL3R5cGVzL2FzdCc7XG5cbmNvbnN0IEZpcnN0Tm9kZSA9IHJlcXVpcmUoJy4uL3V0aWxzL0ZpcnN0Tm9kZScpO1xuY29uc3QgTmV3TGluZSA9IHJlcXVpcmUoJy4uL3V0aWxzL05ld0xpbmUnKTtcblxuY29uc3Qge2NvbXBhcmVTdHJpbmdzLCBpc0NhcGl0YWxpemVkfSA9IHJlcXVpcmUoJy4uL3V0aWxzL1N0cmluZ1V0aWxzJyk7XG5jb25zdCBoYXNPbmVSZXF1aXJlRGVjbGFyYXRpb24gPSByZXF1aXJlKCcuLi91dGlscy9oYXNPbmVSZXF1aXJlRGVjbGFyYXRpb24nKTtcbmNvbnN0IGlzR2xvYmFsID0gcmVxdWlyZSgnLi4vdXRpbHMvaXNHbG9iYWwnKTtcbmNvbnN0IGlzUmVxdWlyZUV4cHJlc3Npb24gPSByZXF1aXJlKCcuLi91dGlscy9pc1JlcXVpcmVFeHByZXNzaW9uJyk7XG5jb25zdCBqc2NzID0gcmVxdWlyZSgnanNjb2Rlc2hpZnQnKTtcbmNvbnN0IHJlcHJpbnRSZXF1aXJlID0gcmVxdWlyZSgnLi4vdXRpbHMvcmVwcmludFJlcXVpcmUnKTtcblxudHlwZSBDb25maWdFbnRyeSA9IHtcbiAgc2VhcmNoVGVybXM6IFthbnksIE9iamVjdF07XG4gIGZpbHRlcnM6IEFycmF5PChwYXRoOiBOb2RlUGF0aCkgPT4gYm9vbGVhbj47XG4gIGNvbXBhcmF0b3I6IChub2RlMTogTm9kZSwgbm9kZTI6IE5vZGUpID0+IG51bWJlcjtcbiAgbWFwcGVyOiAobm9kZTogTm9kZSkgPT4gTm9kZTtcbn07XG5cbi8vIFNldCB1cCBhIGNvbmZpZyB0byBlYXNpbHkgYWRkIHJlcXVpcmUgZm9ybWF0c1xuY29uc3QgQ09ORklHOiBBcnJheTxDb25maWdFbnRyeT4gPSBbXG4gIC8vIEhhbmRsZSB0eXBlIGltcG9ydHNcbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbXG4gICAgICBqc2NzLkltcG9ydERlY2xhcmF0aW9uLFxuICAgICAge2ltcG9ydEtpbmQ6ICd0eXBlJ30sXG4gICAgXSxcbiAgICBmaWx0ZXJzOiBbXG4gICAgICBpc0dsb2JhbCxcbiAgICBdLFxuICAgIGNvbXBhcmF0b3I6IChub2RlMSwgbm9kZTIpID0+IGNvbXBhcmVTdHJpbmdzKFxuICAgICAgbm9kZTEuc3BlY2lmaWVyc1swXS5sb2NhbC5uYW1lLFxuICAgICAgbm9kZTIuc3BlY2lmaWVyc1swXS5sb2NhbC5uYW1lXG4gICAgKSxcbiAgICBtYXBwZXI6IG5vZGUgPT4gcmVwcmludFJlcXVpcmUobm9kZSksXG4gIH0sXG5cbiAgLy8gSGFuZGxlIHNpZGUgZWZmZWN0cywgZS5nOiBgcmVxdWlyZSgnbW9ua2V5LXBhdGNoZXMnKTtgXG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuRXhwcmVzc2lvblN0YXRlbWVudF0sXG4gICAgZmlsdGVyczogW1xuICAgICAgaXNHbG9iYWwsXG4gICAgICBwYXRoID0+IGlzUmVxdWlyZUV4cHJlc3Npb24ocGF0aC5ub2RlKSxcbiAgICBdLFxuICAgIGNvbXBhcmF0b3I6IChub2RlMSwgbm9kZTIpID0+IGNvbXBhcmVTdHJpbmdzKFxuICAgICAgbm9kZTEuZXhwcmVzc2lvbi5hcmd1bWVudHNbMF0udmFsdWUsXG4gICAgICBub2RlMi5leHByZXNzaW9uLmFyZ3VtZW50c1swXS52YWx1ZVxuICAgICksXG4gICAgbWFwcGVyOiBub2RlID0+IHJlcHJpbnRSZXF1aXJlKG5vZGUpLFxuICB9LFxuXG4gIC8vIEhhbmRsZSBVcHBlckNhc2UgcmVxdWlyZXMsIGUuZzogYHJlcXVpcmUoJ1VwcGVyQ2FzZScpO2BcbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5WYXJpYWJsZURlY2xhcmF0aW9uXSxcbiAgICBmaWx0ZXJzOiBbXG4gICAgICBpc0dsb2JhbCxcbiAgICAgIHBhdGggPT4gaXNWYWxpZFJlcXVpcmVEZWNsYXJhdGlvbihwYXRoLm5vZGUpLFxuICAgICAgcGF0aCA9PiBpc0NhcGl0YWxpemVkKGdldERlY2xhcmF0aW9uTmFtZShwYXRoLm5vZGUpKSxcbiAgICBdLFxuICAgIGNvbXBhcmF0b3I6IChub2RlMSwgbm9kZTIpID0+IGNvbXBhcmVTdHJpbmdzKFxuICAgICAgZ2V0RGVjbGFyYXRpb25OYW1lKG5vZGUxKSxcbiAgICAgIGdldERlY2xhcmF0aW9uTmFtZShub2RlMilcbiAgICApLFxuICAgIG1hcHBlcjogbm9kZSA9PiByZXByaW50UmVxdWlyZShub2RlKSxcbiAgfSxcblxuICAvLyBIYW5kbGUgbG93ZXJDYXNlIHJlcXVpcmVzLCBlLmc6IGByZXF1aXJlKCdsb3dlckNhc2UnKTtgXG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuVmFyaWFibGVEZWNsYXJhdGlvbl0sXG4gICAgZmlsdGVyczogW1xuICAgICAgaXNHbG9iYWwsXG4gICAgICBwYXRoID0+IGlzVmFsaWRSZXF1aXJlRGVjbGFyYXRpb24ocGF0aC5ub2RlKSxcbiAgICAgIHBhdGggPT4gIWlzQ2FwaXRhbGl6ZWQoZ2V0RGVjbGFyYXRpb25OYW1lKHBhdGgubm9kZSkpLFxuICAgIF0sXG4gICAgY29tcGFyYXRvcjogKG5vZGUxLCBub2RlMikgPT4gY29tcGFyZVN0cmluZ3MoXG4gICAgICBnZXREZWNsYXJhdGlvbk5hbWUobm9kZTEpLFxuICAgICAgZ2V0RGVjbGFyYXRpb25OYW1lKG5vZGUyKVxuICAgICksXG4gICAgbWFwcGVyOiBub2RlID0+IHJlcHJpbnRSZXF1aXJlKG5vZGUpLFxuICB9LFxuXTtcblxuLyoqXG4gKiBUaGlzIGZvcm1hdHMgcmVxdWlyZXMgYmFzZWQgb24gdGhlIGxlZnQgaGFuZCBzaWRlIG9mIHRoZSByZXF1aXJlLCB1bmxlc3MgaXRcbiAqIGlzIGEgc2ltcGxlIHJlcXVpcmUgZXhwcmVzc2lvbiBpbiB3aGljaCBjYXNlIHRoZXJlIGlzIG5vIGxlZnQgaGFuZCBzaWRlLlxuICpcbiAqIFRoZSBncm91cHMgYXJlOlxuICpcbiAqICAgLSBpbXBvcnQgdHlwZXM6IGltcG9ydCB0eXBlIEZvbyBmcm9tICdhbnl0aGluZyc7XG4gKiAgIC0gcmVxdWlyZSBleHByZXNzaW9uczogcmVxdWlyZSgnYW55dGhpbmcnKTtcbiAqICAgLSBjYXBpdGFsaXplZCByZXF1aXJlczogdmFyIEZvbyA9IHJlcXVpcmUoJ2FueXRoaW5nJyk7XG4gKiAgIC0gbm9uLWNhcGl0YWxpemVkIHJlcXVpcmVzOiB2YXIgZm9vID0gcmVxdWlyZSgnYW55dGhpbmcnKTtcbiAqXG4gKiBBcnJheSBhbmQgb2JqZWN0IGRlc3RydWN0dXJlcyBhcmUgYWxzbyB2YWxpZCBsZWZ0IGhhbmQgc2lkZXMuIE9iamVjdCBwYXR0ZXJuc1xuICogYXJlIHNvcnRlZCBhbmQgdGhlbiB0aGUgZmlyc3QgaWRlbnRpZmllciBpbiBlYWNoIG9mIHBhdHRlcm5zIGlzIHVzZWQgZm9yXG4gKiBzb3J0aW5nLlxuICovXG5mdW5jdGlvbiBmb3JtYXRSZXF1aXJlcyhyb290OiBDb2xsZWN0aW9uKTogdm9pZCB7XG4gIGNvbnN0IGZpcnN0ID0gRmlyc3ROb2RlLmdldChyb290KTtcbiAgaWYgKCFmaXJzdCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBfZmlyc3QgPSBmaXJzdDsgLy8gRm9yIGZsb3cuXG5cbiAgLy8gQ3JlYXRlIGdyb3VwcyBvZiByZXF1aXJlcyBmcm9tIGVhY2ggY29uZmlnXG4gIGNvbnN0IG5vZGVHcm91cHMgPSBDT05GSUcubWFwKGNvbmZpZyA9PiB7XG4gICAgY29uc3QgcGF0aHMgPSByb290XG4gICAgICAuZmluZChjb25maWcuc2VhcmNoVGVybXNbMF0sIGNvbmZpZy5zZWFyY2hUZXJtc1sxXSlcbiAgICAgIC5maWx0ZXIocGF0aCA9PiBjb25maWcuZmlsdGVycy5ldmVyeShmaWx0ZXIgPT4gZmlsdGVyKHBhdGgpKSk7XG5cbiAgICAvLyBTYXZlIHRoZSB1bmRlcmx5aW5nIG5vZGVzIGJlZm9yZSByZW1vdmluZyB0aGUgcGF0aHNcbiAgICBjb25zdCBub2RlcyA9IHBhdGhzLm5vZGVzKCkuc2xpY2UoKTtcbiAgICBwYXRocy5mb3JFYWNoKHBhdGggPT4ganNjcyhwYXRoKS5yZW1vdmUoKSk7XG4gICAgcmV0dXJuIG5vZGVzLm1hcChub2RlID0+IGNvbmZpZy5tYXBwZXIobm9kZSkpLnNvcnQoY29uZmlnLmNvbXBhcmF0b3IpO1xuICB9KTtcblxuICAvLyBCdWlsZCBhbGwgdGhlIG5vZGVzIHdlIHdhbnQgdG8gaW5zZXJ0LCB0aGVuIGFkZCB0aGVtXG4gIGNvbnN0IGFsbEdyb3VwcyA9IFtbTmV3TGluZS5zdGF0ZW1lbnRdXTtcbiAgbm9kZUdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IGFsbEdyb3Vwcy5wdXNoKGdyb3VwLCBbTmV3TGluZS5zdGF0ZW1lbnRdKSk7XG4gIGNvbnN0IG5vZGVzVG9JbnNlcnQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBhbGxHcm91cHMpO1xuICBub2Rlc1RvSW5zZXJ0LnJldmVyc2UoKS5mb3JFYWNoKG5vZGUgPT4gX2ZpcnN0Lmluc2VydEJlZm9yZShub2RlKSk7XG59XG5cbi8qKlxuICogVGVzdHMgaWYgYSB2YXJpYWJsZSBkZWNsYXJhdGlvbiBpcyBhIHZhbGlkIHJlcXVpcmUgZGVjbGFyYXRpb24uXG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWRSZXF1aXJlRGVjbGFyYXRpb24obm9kZTogTm9kZSk6IGJvb2xlYW4ge1xuICBpZiAoIWhhc09uZVJlcXVpcmVEZWNsYXJhdGlvbihub2RlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBkZWNsYXJhdGlvbiA9IG5vZGUuZGVjbGFyYXRpb25zWzBdO1xuICBpZiAoanNjcy5JZGVudGlmaWVyLmNoZWNrKGRlY2xhcmF0aW9uLmlkKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChqc2NzLk9iamVjdFBhdHRlcm4uY2hlY2soZGVjbGFyYXRpb24uaWQpKSB7XG4gICAgcmV0dXJuIGRlY2xhcmF0aW9uLmlkLnByb3BlcnRpZXMuZXZlcnkoXG4gICAgICBwcm9wID0+IHByb3Auc2hvcnRoYW5kICYmIGpzY3MuSWRlbnRpZmllci5jaGVjayhwcm9wLmtleSlcbiAgICApO1xuICB9XG4gIGlmIChqc2NzLkFycmF5UGF0dGVybi5jaGVjayhkZWNsYXJhdGlvbi5pZCkpIHtcbiAgICByZXR1cm4gZGVjbGFyYXRpb24uaWQuZWxlbWVudHMuZXZlcnkoXG4gICAgICBlbGVtZW50ID0+IGpzY3MuSWRlbnRpZmllci5jaGVjayhlbGVtZW50KVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbk5hbWUobm9kZTogTm9kZSk6IHN0cmluZyB7XG4gIGNvbnN0IGRlY2xhcmF0aW9uID0gbm9kZS5kZWNsYXJhdGlvbnNbMF07XG4gIGlmIChqc2NzLklkZW50aWZpZXIuY2hlY2soZGVjbGFyYXRpb24uaWQpKSB7XG4gICAgcmV0dXJuIGRlY2xhcmF0aW9uLmlkLm5hbWU7XG4gIH1cbiAgLy8gT3JkZXIgYnkgdGhlIGZpcnN0IHByb3BlcnR5IG5hbWUgaW4gdGhlIG9iamVjdCBwYXR0ZXJuLlxuICBpZiAoanNjcy5PYmplY3RQYXR0ZXJuLmNoZWNrKGRlY2xhcmF0aW9uLmlkKSkge1xuICAgIHJldHVybiBkZWNsYXJhdGlvbi5pZC5wcm9wZXJ0aWVzWzBdLmtleS5uYW1lO1xuICB9XG4gIC8vIE9yZGVyIGJ5IHRoZSBmaXJzdCBlbGVtZW50IG5hbWUgaW4gdGhlIGFycmF5IHBhdHRlcm4uXG4gIGlmIChqc2NzLkFycmF5UGF0dGVybi5jaGVjayhkZWNsYXJhdGlvbi5pZCkpIHtcbiAgICByZXR1cm4gZGVjbGFyYXRpb24uaWQuZWxlbWVudHNbMF0ubmFtZTtcbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm9ybWF0UmVxdWlyZXM7XG4iXX0=