<% fixtures.forEach(function(fixture) { %>
import * as <%- fixture.exportName %> from './<%- fixture.fileWithoutExt %>';
<% }) %>

export {
  <%- fixtures.map(f => f.exportName).join(', ') %>
};
