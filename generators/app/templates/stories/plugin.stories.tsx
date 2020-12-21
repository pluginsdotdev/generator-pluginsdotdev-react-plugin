import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Plugin } from '../src/plugin';
import { <%- fixtures.map(f => f.exportName).join(', ') %> } from '../fixtures';

import type { PluginProps } from '../src/plugin-props';

export default {
  title: 'Plugin/Plugin States',
  component: Plugin
} as Meta;

const Template: Story<PluginProps> = (args) => <Plugin {...args} />;

<% fixtures.forEach(function(fixture) { %>
export const <%- fixture.storyName %> = Template.bind({});
<%- fixture.storyName %>.args = <%- fixture.exportName %>.props;
<% }) %>
