# <%- name %> plugin for <%- hostName %>

<%- description %>

## Overview

Welcome to your [plugins.dev](https://plugins.dev) plugin!

This repo contains the code for the [<%- name %> plugin](<%- pluginUrl %>) for the [<%- pluginPoint %> plugin point](<%- pluginPointUrl %>) of host, [<%- hostName %>](<%- hostUrl %>).

A plugin is third-party code that [plugins.dev](https://plugins.dev) runs securely and transparently within a host app.
Host apps provide plugin points with well-defined props that they provide to plugins they mount.
[plugins.dev](https://plugins.dev) hosts a plugin store for each host and allows plugin developers like *YOU* to publish bespoke integrations to extend the functionality of host apps in ways hosts could never have dreamed of.

## Developing

You can use the docker development flow (recommended) or local development flow.
If you switch between the two, you are likely to run into dependency problems.
If you must switch, `rm -rf node_modules` first.

### Getting started

Now that you've cloned this repo locally, set up your dependencies:

(Docker development flow)
```
docker-compose run --rm npm ci
```

(Local development flow)
```
npm ci
```

We recommend that you develop your plugin in [storybook](https://storybook.js.org/) for the best development experience.

To start storybook locally:

(Docker development flow)
```
docker-compose up storybook
```

(Local development flow)
```
npm start
```

Connect to your local storybook by opening a browser to [http://localhost:9090](http://localhost:9090).
Navigate to the Plugin stories to see your plugin rendered with the host-provided fixtures.

Now, open up `src/plugin.tsx` to edit your plugin. Save and see your changes reflected in your storybook.

### Navigating the repository

- `plugin.yml` contains metadata about your plugin. Set your plugin's user-visible name, description, price, screenshots, privacy policy, allowed domains, etc.
- `src` contains all typescript source code.
  - `src/plugin.tsx` exports a react component named `Plugin` that takes `PluginProps` (defined by the host plugin point).
  - `src/plugin-props.ts` defines `PluginProps` as provided by the host plugin point.
  - `src/index.ts` wires up the plugin exported in `src/plugin.tsx`.
- `stories` contains all storybook stories for your plugin.
  - `stories/plugin.stories.tsx` contains your plugin's default stories for all host-provided fixtures.
  - `stories/readme.stories.mdx` contains this readme.
- `fixtures` contains all fixtures provided by the host plugin point.
- `test` contains... you guessed it... your tests!
  - `test/fixtures.test.tsx` contains some basic sanity tests for your plugin, asserting that you render *something* for every host-provided fixture.
- `.storybook` contains the storybook configuration

### Getting to work

This is **your** repository. Add npm modules, restructure directories, code up a storm.

Can't stand typescript?
Clojurescript more your style?
Go for it (maybe officially-supported one day--we'll keep an eye on our metrics ;)

The main requirement is that `src/plugins.tsx` should export a react component that handles takes `PluginProps` and renders correctly.
In short, you can do just about anything you want here. You can see the full set of plugin guidelines [below](#plugin-guidelines).
One important requirement: any domain you connect to must be allowed in your plugin.yml.

### Test

(Docker development flow)
```
docker-compose run --rm npm test
```

(Local development flow)
```
npm test
```

### Build

(Docker development flow)
```
docker-compose run --rm npm run build
```

(Local development flow)
```
npm run build
```

### Stage and submit a new version of your plugin

[plugins.dev](https://plugins.dev) builds every commit to master and prepares it for publishing.

```
git push origin master
```

Most publishers require approval before making plugins available to users.

You can check your build status and submit your build for approval by logging into [plugins.dev](https://plugins.dev).

# Plugin guidelines

You can write your plugin however you'd like so long as you adhere to the following interface:
 - `npm ci && npm run build` must produce a dist/index.js file of es5 javascript and must place any referenced static assets in dist/assets. These commands should not connect to any sites other than standard package repositories (e.g. npmjs.com, maven.org, clojars.org, etc).
 - dist/index.js should declare a single window variable, `window.pluginFactory`.
 - `window.pluginFactory` must be a function that returns a component and conforms to the PluginFactory type of @pluginsdotdev/react-plugin (`(pluginConfig) => Component`).
 - All domains your code connects to must be allowed in plugin.yml. In production, running on the host, your code will fail to connect to any domain not in this allowed list.
 - `npm test` must exit with code 0

Current plugin limitations:
 - Canvas elements are not yet supported
 - External CSS is not yet supported. Please use inline element styles.
 - DOM modifications made outside of React rendering will not be visible when running in the host.
