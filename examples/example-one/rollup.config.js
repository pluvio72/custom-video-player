// ./rollup.config.js
/* eslint-disable @typescript-eslint/no-var-requires */
const typescript = require('rollup-plugin-typescript2')
const serve = require('rollup-plugin-serve')
const babel = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')
const replace = require('@rollup/plugin-replace')

const config = {
  input: ['./examples/example-one/index.tsx'],
  output: [
    {
      file: './examples/example-one/dist/bundle.js',
      format: 'iife',
    },
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript(),
    babel({
      // presets: [['@babel/preset-react', { runtime: 'automatic' }]],
      exclude: 'node_modules/**',
    }),
    serve({
      open: true,
      contentBase: './examples/example-one/',
      port: 3002,
    }),
    replace({
      preventAssignment: false,
      'process.env.NODE_ENV': '"development"',
    }),
  ],
}

// eslint-disable-next-line no-undef
module.exports = config
