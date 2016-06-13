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

type Props = {
  children?: React.Element<any>;
  headline: React.Element<any> | string;
};

/** A vertical divider with a title. */
export const Section = (props: Props) => {
  const {
    headline,
    children,
  } = props;
  return (
    <div>
      <h3>{headline}</h3>
      {children}
    </div>
  );
};
