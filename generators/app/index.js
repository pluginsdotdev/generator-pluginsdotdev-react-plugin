"use strict";
const nfs = require("fs");
const path = require("path");
const Generator = require("yeoman-generator");
const yosay = require("yosay");

const neededData = [
  {
    type: "input",
    name: "name",
    message: "Plugin name"
  },
  {
    type: "input",
    name: "description",
    message: "Plugin description"
  },
  {
    type: "input",
    name: "hostName",
    message: "Host name"
  },
  {
    type: "input",
    name: "pluginPoint",
    message: "Plugin point"
  },
  {
    type: "input",
    name: "gitUrl",
    message: "Git url"
  },
  {
    type: "input",
    name: "authorEmail",
    message: "Author email"
  },
  {
    type: "input",
    name: "hostPluginPointPropsFile",
    message: "Typescript file exporting PluginProps type"
  },
  {
    type: "input",
    name: "hostFixturesDir",
    message: "Directory containing a file for each host fixture"
  }
];

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    const cwdOpt = {
      type: "input",
      name: "cwd",
      message: "Working directory to use as a base for project creation",
      default: "."
    };

    neededData
      .concat([cwdOpt])
      .forEach(({ name, message }) => {
        this.option(name, {
          desc: message,
          type: String
        });
      });
  }

  prompting() {
    this.log(yosay(`Your plugin awaits!`));

    const prompts = neededData
      .filter(({ name }) => !this.options[name])
      .map(prompt =>
        Object.assign({}, prompt, { message: prompt.message + ":" })
      );

    return this.prompt(prompts).then(props => {
      this.props = Object.assign({}, this.options, props);
    });
  }

  writing() {
    const hostPluginPointPropsFile = path.resolve(
      this.props.hostPluginPointPropsFile
    );
    const hostFixturesDir = path.resolve(this.props.hostFixturesDir);
    const hostFixturesDirGlob = path.join(hostFixturesDir, "*");

    const projectDir = path.join(this.props.cwd, this.props.name);
    this.destinationRoot(projectDir);

    // Do this first, we want to overwrite if there's anything to overwrite
    this.fs.copy(hostFixturesDirGlob, this.destinationPath("fixtures"));

    const fixtures = nfs.readdirSync(hostFixturesDir);
    const fixtureData = fixtures.map(f => {
      const fileWithoutExt = f.replace(/\.[^.]+$/, "");
      const exportName = fileWithoutExt.replace(/[^A-Za-z0-9_]+/g, "_");
      return {
        exportName,
        fileWithoutExt,
        storyName: exportName + "Story"
      };
    });

    const urlSafeName = x => x; // TODO
    const ctx = Object.assign({}, this.props, {
      fixtures: fixtureData,
      pluginUrl: `https://plugins.dev/h/${urlSafeName(
        this.props.hostName
      )}/${urlSafeName(this.props.pluginPoint)}/${urlSafeName(
        this.props.name
      )}`,
      pluginPointUrl: `https://plugins.dev/h/${urlSafeName(
        this.props.hostName
      )}/${urlSafeName(this.props.pluginPoint)}`,
      hostUrl: `https://plugins.dev/h/${urlSafeName(this.props.hostName)}`
    });

    const staticFiles = [
      "_gitignore",
      "docker-compose.yml",
      "jest.config.js",
      "tsconfig.json",
      ".storybook"
    ];
    const tplFiles = [
      "README.md",
      "plugin.yml",
      "package.json",
      "src/index.ts",
      "src/plugin.tsx",
      "fixtures/index.ts",
      "stories/plugin.stories.tsx",
      "stories/readme.stories.mdx",
      "test/fixtures.test.tsx"
    ];

    staticFiles.forEach(f =>
      this.fs.copy(
        this.templatePath(f),
        this.destinationPath(f.replace(/^_/, "."))
      )
    );

    tplFiles.forEach(f =>
      this.fs.copyTpl(
        this.templatePath(f),
        this.destinationPath(f.replace(/^_/, ".")),
        ctx
      )
    );

    this.fs.copy(
      hostPluginPointPropsFile,
      this.destinationPath("src/plugin-props.ts")
    );
  }

  install() {
    if (!this.props.skipInstall) {
      this.installDependencies({ npm: true, bower: false });
    }
  }
};
