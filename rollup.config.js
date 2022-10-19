import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

const packageJson = require('./package.json')

export default {
    input: "src/index.js",
    output: {
        file: 'dist/bundle.js',
        format: 'umd',
        sourcemap: true,
        name: "@watts-lab/surveys"
    },
    external: ["react", "react-dom"],
    plugins: [
        nodeResolve(),
        babel({
            presets: ["@babel/preset-react"],
          }),
        json(),
        postcss(),
        commonjs({
            dynamicRequireTargets: [
                'surveys/*/*.json'
            ]
        }),
        dynamicImportVars(),
        terser(),
    ]
}
