/**
 * The ancillary file provides necessary build-time constructs for the
 * plugins.dev build system.
 *
 * This includes:
 *   - fixtures - used for generating screenshots
 **/

import * as fixtures from './fixtures';

(window as any)._pluginsdotdev_ancillary = {
  fixtures
};
