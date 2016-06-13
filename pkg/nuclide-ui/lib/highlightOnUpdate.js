'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import {React} from 'react-for-atom';

/**
 * Wraps DecoratedComponent in a special `span` with a configurable classname whenever the
 * component's props change.
 */
export function highlightOnUpdate<T : ReactClass<any>>(
  ComposedComponent: T,
  /**
   * The result of this function determines whether to apply the highlight or not.
   */
  arePropsEqual?: (p1: {[key: string]: mixed}, p2: {[key: string]: mixed}) => boolean
    = require('shallowequal'),
  /**
   * className used in the wrapper. You can style both `className` and `<className>-highlight`.
   */
  className?: string = 'nuclide-ui-highlight-on-render',
  /**
   * Delay in ms until the `*-highlight` className gets removed from the wrapper.
   * Effectively throttles the frequency of highlight pulses.
   */
  unhighlightDelay?: number = 200,
): T {
  // $FlowIssue The return type is guaranteed to be the same as the type of ComposedComponent.
  return class extends React.Component {
    props: {[key: string]: mixed};
    showFlash: boolean;
    timeout: ?number;

    constructor(props: mixed) {
      super(props);
      this.showFlash = false;
    }

    componentWillUpdate(nextProps: {[key: string]: mixed}, nextState: void): void {
      if (arePropsEqual(nextProps, this.props)) {
        // Skip if prop values didn't actually change.
        return;
      }
      if (this.timeout != null || this.showFlash) {
        // Skip if already scheduled.
        return;
      }
      this.showFlash = true;
      this.timeout = setTimeout(
        () => {
          this.showFlash = false;
          this.timeout = null;
          this.forceUpdate();
        },
        unhighlightDelay
      );
    }

    render(): React.Element<any> {
      return (
        <span className={`${className} ${this.showFlash ? className + '-highlight' : ''}`}>
          <ComposedComponent {...this.props} />
        </span>
      );
    }
  };
}
