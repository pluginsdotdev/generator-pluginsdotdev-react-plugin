import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import copy from 'rollup-plugin-copy';

const plugins = [
  // Allow json resolution
  json(),

  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) 
  }),

  // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
  commonjs(),

  // Allow node_modules resolution, so you can use 'external' to control
  // which external modules to include in the bundle
  // https://github.com/rollup/rollup-plugin-node-resolve#usage
  resolve(),

  // Compile TypeScript files
  typescript({ useTsconfigDeclarationDir: true }),

  // Resolve source maps to the original source
  sourceMaps()
];

export default [
  {
    input: `src/index.ts`,
    output: [
      { file: 'dist/plugin.js', format: 'es', sourcemap: true },
    ],
    external: [],
    watch: {
      include: 'src/**',
    },
    plugins: plugins.cocncat([
      copy({
        targets: [ { src: 'assets/**/*', dest: 'dist/assets' } ],
        flatten: false
      })
    ]),
  },
  {
    input: `ancillary.ts`,
    output: [
      { file: 'dist/ancillary.js', format: 'es', sourcemap: true },
    ],
    external: [],
    watch: {
      include: [
        'ancillary.ts',
        'fixtures/**'
      ]
    },
    plugins
  }
];
