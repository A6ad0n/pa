import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import html from '@rollup/plugin-html';
import image from '@rollup/plugin-image';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias';
import path from 'path';
import replace from '@rollup/plugin-replace';

const isDev = process.env.NODE_ENV === 'development'; 

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
    input: 'src/index.js',
    output: [
			{
					file: "dist/bundle.js",
					format: 'es',
					sourcemap: true
			}
    ],
    plugins: [
			replace({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
				preventAssignment: true
			}),
			external(),
			resolve({extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']}),
			commonjs(),
			image(),
			alias({
				entries: [
					{ find: '@components', replacement: path.resolve(__dirname, 'src/components') },
					{ find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
					{ find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
					{ find: '@types', replacement: path.resolve(__dirname, 'src/types') },
					{ find: '@context', replacement: path.resolve(__dirname, 'src/context') },
					{ find: '@test', replacement: path.resolve(__dirname, 'src/test') },
				]
			}),
			babel({
					presets: ['@babel/preset-react'],
					babelHelpers: 'bundled',
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
					exclude: 'node_modules/**',
					plugins: [
						["@babel/plugin-transform-react-jsx",
						{
							runtime: "automatic",
						},],
					]
			}),
			typescript({ tsconfig: './tsconfig.json' }),
			postcss({
				extract: true,
				sourceMap: true
			}),
			terser(),
			html({
					title: 'Rollup App',
					template: ({ attributes, files, meta, publicPath, title }) => {
						const scripts = (files.js || [])
							.map(({ fileName }) => `<script src="${publicPath}${fileName}"></script>`)
							.join('\n');
						const links = (files.css || [])
							.map(({ fileName }) => `<link rel="stylesheet" href="${publicPath}${fileName}">`)
							.join('\n');
			
						return `<!DOCTYPE html>
<html ${attributes.html}>
<head>
	<meta charset="UTF-8">
	<title>${title}</title>
	${links}
</head>
<body>
	<div id="root"></div>
	${scripts}
</body>
</html>`;
            }
          }),
					isDev && serve({
						open: true,
						contentBase: 'dist',
						port: 3000,
					}),
					isDev && livereload({
						watch: 'dist',
					}),
    ]
}