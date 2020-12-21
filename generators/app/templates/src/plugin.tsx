import React from 'react';

import type { FC } from 'react';
import type { PluginProps } from './plugin-props';

/**
 * Your new plugin!
 **/
export const Plugin: FC<PluginProps> = (props: PluginProps) => (
  <p>
    Hello world from <%- name %>!
  </p>
);
