import React from 'react';
import renderer from 'react-test-renderer';
import { Plugin } from '../src/plugin';
import { <%- fixtures.map(f => f.exportName).join(', ') %> } from '../fixtures';
<% fixtures.forEach(function(fixture) { %>
test(<%- fixture.exportName %>.name, () => {
  const component = renderer.create(<Plugin {...<%- fixture.exportName %>.props} />);
  const tree = component.toJSON();
  expect(tree).toBeTruthy();
});
<% }) %>
