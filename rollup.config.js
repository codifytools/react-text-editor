import babel from '@rollup/plugin-babel';
import postcss from "rollup-plugin-postcss";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

export default {
	input:'src/Editor.js',
	output: [
		{ file: pkg.main, format: 'cjs', exports: 'default' },
		{ file: pkg.module, format: 'esm', exports: 'default' }
	],
	plugins: [
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
			presets: ['@babel/preset-env','@babel/preset-react']
		}),
		postcss({
			extensions: [".css"],
			minimize: true
		}),
		resolve(),
		commonjs(),
		terser(),
		filesize()
	],
	external: Object.keys(pkg.peerDependencies)
};
