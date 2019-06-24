import 'dotenv/config'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import svelte from 'rollup-plugin-svelte'
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'
import config from 'sapper/config/rollup.js'
import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import sveltePreprocess from 'svelte-preprocess'

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const { plugins } = require('./postcss.config.js')

const preprocess = sveltePreprocess({
	transformers: {
		postcss: { plugins }
	}
})

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' &&  /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning)

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
				'process.env.GOOGLE_ANALYTICS_ID': JSON.stringify(process.env.GOOGLE_ANALYTICS_ID),
				'process.env.GOOGLE_RECAPTCHA_SITEKEY': JSON.stringify(process.env.GOOGLE_RECAPTCHA_SITEKEY),
				'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN)
			}),
			svelte({
				dev,
				preprocess,
				hydratable: true
			}),
			postcss({
				plugins,
				extract: './static/css/app.css'
			}),
			resolve({ browser: true }),
			commonjs(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', { 
						targets: "> 0.25%, not dead"
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true,
				numWorkers: 1
			}),
		],
		onwarn
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode),
				'process.env.GOOGLE_RECAPTCHA_SITEKEY': JSON.stringify(process.env.GOOGLE_RECAPTCHA_SITEKEY),
				'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
				'process.env.REDIS_HOST': JSON.stringify(process.env.REDIS_HOST),
				'process.env.REDIS_PORT': JSON.stringify(process.env.REDIS_PORT),
				'process.env.REDIS_PASS': JSON.stringify(process.env.REDIS_PASS)
			}),
			svelte({
				dev,
				preprocess,
				generate: 'ssr'
			}),
			resolve(),
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),
		onwarn
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser({ numWorkers: 1 })
		],
		onwarn
	}
}