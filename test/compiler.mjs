import path from 'path';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';

const DEFAULT_OPTIONS = {
	tags: ['i18n'],
};

/**
 * Compiles a fixture, at the given path, into an ES module. This function follows the webpack
 * documentation for writing loaders: https://webpack.js.org/contribute/writing-a-loader/#testing
 *
 * @function infuseCompiler
 * @param {string} fixture Path to the fixture file.
 * @param {Object} [options=DEFAULT_OPTIONS] Options object.
 * @returns {Promise}
 */
export default function infuseCompiler(fixture, options = DEFAULT_OPTIONS) {
	const compiler = webpack({
		context: __dirname,
		mode: 'development',
		entry: fixture,
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname),
		},
		module: {
			rules: [{
				test: /\.html$/,
				use: {
					options,
					loader: path.resolve(__dirname, '../lib/loader.mjs'),
				},
			}],
		},
	});

	compiler.outputFileSystem = new MemoryFS();

	return new Promise((resolve, reject) => {
		compiler.run((error, stats) => {
			if (error) {
				reject(error);
			} else {
				resolve(stats);
			}
		});
	});
}
