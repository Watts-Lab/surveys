import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser';


const packageJson = require('./package.json')

export default {
    input: "src/index.js",
    output: {
        dir: 'build',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        nodeResolve(),
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
