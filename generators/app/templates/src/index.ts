import { Plugin } from './plugin';

import type { PluginConfig } from '@pluginsdotdev/react-plugin';

(window as any).pluginFactory = ({ pluginId, hostId, userId, exposedComponents }: PluginConfig) => Plugin;
