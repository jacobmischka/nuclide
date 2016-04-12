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
exports.setHomeFragments = setHomeFragments;
exports.deactivate = deactivate;
exports.consumeGadgetsService = consumeGadgetsService;
exports.consumeToolBar = consumeToolBar;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _atom = require('atom');

var _nuclideFeatureConfig = require('../../nuclide-feature-config');

var _nuclideFeatureConfig2 = _interopRequireDefault(_nuclideFeatureConfig);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var subscriptions = null;
var gadgetsApi = null;

// A stream of all of the fragments. This is essentially the state of our panel.
var allHomeFragmentsStream = new _rx2['default'].BehaviorSubject(_immutable2['default'].Set());

function activate(state) {
  considerDisplayingHome();
  subscriptions = new _atom.CompositeDisposable();
  subscriptions.add(atom.commands.add('atom-workspace', 'nuclide-home:show-settings', function () {
    atom.workspace.open('atom://config/packages/nuclide');
  }));
}

function setHomeFragments(homeFragments) {
  allHomeFragmentsStream.onNext(allHomeFragmentsStream.getValue().add(homeFragments));
  return new _atom.Disposable(function () {
    allHomeFragmentsStream.onNext(allHomeFragmentsStream.getValue().remove(homeFragments));
  });
}

function considerDisplayingHome() {
  if (gadgetsApi == null) {
    return;
  }
  var showHome = _nuclideFeatureConfig2['default'].get('nuclide-home.showHome');
  if (showHome) {
    gadgetsApi.showGadget('nuclide-home');
  }
}

function deactivate() {
  gadgetsApi = null;
  allHomeFragmentsStream.onNext(_immutable2['default'].Set());
  subscriptions.dispose();
  subscriptions = null;
}

function consumeGadgetsService(api) {
  var createHomePaneItem = require('./createHomePaneItem');
  gadgetsApi = api;
  var gadget = createHomePaneItem(allHomeFragmentsStream);
  var disposable = api.registerGadget(gadget);
  considerDisplayingHome();
  return disposable;
}

function consumeToolBar(getToolBar) {
  var priority = require('../../nuclide-commons').toolbar.farEndPriority(500);
  var toolBar = getToolBar('nuclide-home');
  toolBar.addSpacer({
    priority: priority - 1
  });
  toolBar.addButton({
    icon: 'gear',
    callback: 'nuclide-home:show-settings',
    tooltip: 'Open Nuclide Settings',
    priority: priority
  });
  subscriptions.add(new _atom.Disposable(function () {
    toolBar.removeItems();
  }));
}
//# sourceMappingURL=data:application/json;base64,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O0FBQ3JDLFdBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztHQUN2QixDQUFDLENBQUMsQ0FBQztDQUNMIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbi8qIEBmbG93ICovXG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgdHlwZSB7R2FkZ2V0c1NlcnZpY2V9IGZyb20gJy4uLy4uL251Y2xpZGUtZ2FkZ2V0cy1pbnRlcmZhY2VzJztcbmltcG9ydCB0eXBlIHtIb21lRnJhZ21lbnRzfSBmcm9tICcuLi8uLi9udWNsaWRlLWhvbWUtaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7Q29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZmVhdHVyZUNvbmZpZyBmcm9tICcuLi8uLi9udWNsaWRlLWZlYXR1cmUtY29uZmlnJztcbmltcG9ydCBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBSeCBmcm9tICdyeCc7XG5cbmxldCBzdWJzY3JpcHRpb25zOiBDb21wb3NpdGVEaXNwb3NhYmxlID0gKG51bGw6IGFueSk7XG5sZXQgZ2FkZ2V0c0FwaTogP0dhZGdldHNTZXJ2aWNlID0gbnVsbDtcblxuLy8gQSBzdHJlYW0gb2YgYWxsIG9mIHRoZSBmcmFnbWVudHMuIFRoaXMgaXMgZXNzZW50aWFsbHkgdGhlIHN0YXRlIG9mIG91ciBwYW5lbC5cbmNvbnN0IGFsbEhvbWVGcmFnbWVudHNTdHJlYW06IFJ4LkJlaGF2aW9yU3ViamVjdDxJbW11dGFibGUuU2V0PEhvbWVGcmFnbWVudHM+PiA9XG4gIG5ldyBSeC5CZWhhdmlvclN1YmplY3QoSW1tdXRhYmxlLlNldCgpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlKHN0YXRlOiA/T2JqZWN0KTogdm9pZCB7XG4gIGNvbnNpZGVyRGlzcGxheWluZ0hvbWUoKTtcbiAgc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gIHN1YnNjcmlwdGlvbnMuYWRkKFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsICdudWNsaWRlLWhvbWU6c2hvdy1zZXR0aW5ncycsICgpID0+IHtcbiAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4oJ2F0b206Ly9jb25maWcvcGFja2FnZXMvbnVjbGlkZScpO1xuICAgIH0pXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRIb21lRnJhZ21lbnRzKGhvbWVGcmFnbWVudHM6IEhvbWVGcmFnbWVudHMpOiBEaXNwb3NhYmxlIHtcbiAgYWxsSG9tZUZyYWdtZW50c1N0cmVhbS5vbk5leHQoYWxsSG9tZUZyYWdtZW50c1N0cmVhbS5nZXRWYWx1ZSgpLmFkZChob21lRnJhZ21lbnRzKSk7XG4gIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgYWxsSG9tZUZyYWdtZW50c1N0cmVhbS5vbk5leHQoYWxsSG9tZUZyYWdtZW50c1N0cmVhbS5nZXRWYWx1ZSgpLnJlbW92ZShob21lRnJhZ21lbnRzKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjb25zaWRlckRpc3BsYXlpbmdIb21lKCkge1xuICBpZiAoZ2FkZ2V0c0FwaSA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHNob3dIb21lID0gZmVhdHVyZUNvbmZpZy5nZXQoJ251Y2xpZGUtaG9tZS5zaG93SG9tZScpO1xuICBpZiAoc2hvd0hvbWUpIHtcbiAgICBnYWRnZXRzQXBpLnNob3dHYWRnZXQoJ251Y2xpZGUtaG9tZScpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWFjdGl2YXRlKCk6IHZvaWQge1xuICBnYWRnZXRzQXBpID0gbnVsbDtcbiAgYWxsSG9tZUZyYWdtZW50c1N0cmVhbS5vbk5leHQoSW1tdXRhYmxlLlNldCgpKTtcbiAgc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XG4gIHN1YnNjcmlwdGlvbnMgPSAobnVsbDogYW55KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN1bWVHYWRnZXRzU2VydmljZShhcGk6IEdhZGdldHNTZXJ2aWNlKTogSURpc3Bvc2FibGUge1xuICBjb25zdCBjcmVhdGVIb21lUGFuZUl0ZW0gPSByZXF1aXJlKCcuL2NyZWF0ZUhvbWVQYW5lSXRlbScpO1xuICBnYWRnZXRzQXBpID0gYXBpO1xuICBjb25zdCBnYWRnZXQgPSBjcmVhdGVIb21lUGFuZUl0ZW0oYWxsSG9tZUZyYWdtZW50c1N0cmVhbSk7XG4gIGNvbnN0IGRpc3Bvc2FibGUgPSBhcGkucmVnaXN0ZXJHYWRnZXQoZ2FkZ2V0KTtcbiAgY29uc2lkZXJEaXNwbGF5aW5nSG9tZSgpO1xuICByZXR1cm4gZGlzcG9zYWJsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN1bWVUb29sQmFyKGdldFRvb2xCYXI6IChncm91cDogc3RyaW5nKSA9PiBPYmplY3QpOiB2b2lkIHtcbiAgY29uc3QgcHJpb3JpdHkgPSByZXF1aXJlKCcuLi8uLi9udWNsaWRlLWNvbW1vbnMnKS50b29sYmFyLmZhckVuZFByaW9yaXR5KDUwMCk7XG4gIGNvbnN0IHRvb2xCYXIgPSBnZXRUb29sQmFyKCdudWNsaWRlLWhvbWUnKTtcbiAgdG9vbEJhci5hZGRTcGFjZXIoe1xuICAgIHByaW9yaXR5OiBwcmlvcml0eSAtIDEsXG4gIH0pO1xuICB0b29sQmFyLmFkZEJ1dHRvbih7XG4gICAgaWNvbjogJ2dlYXInLFxuICAgIGNhbGxiYWNrOiAnbnVjbGlkZS1ob21lOnNob3ctc2V0dGluZ3MnLFxuICAgIHRvb2x0aXA6ICdPcGVuIE51Y2xpZGUgU2V0dGluZ3MnLFxuICAgIHByaW9yaXR5LFxuICB9KTtcbiAgc3Vic2NyaXB0aW9ucy5hZGQobmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgIHRvb2xCYXIucmVtb3ZlSXRlbXMoKTtcbiAgfSkpO1xufVxuIl19