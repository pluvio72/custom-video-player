// ./rollup.config.js
/* eslint-disable @typescript-eslint/no-var-requires */
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const typescript = require('rollup-plugin-typescript2')
const external = require('rollup-plugin-peer-deps-external')

const pkg = require('./package.json')

const config = {
  input: ['src/index.ts'],
  output: [
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    external(),
    nodeResolve(),
    typescript(),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'node_modules/react-js/index.js': ['isValidElementType'],
      },
    }),
  ],
  external: ['react', 'react-dom', 'screenfull'],
}

// eslint-disable-next-line no-undef
module.exports = config
