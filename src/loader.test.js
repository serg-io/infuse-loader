import fs from 'fs';
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
 * @function compiler
 * @param {string} fixture Path to the fixture file.
 * @param {Object} [options=DEFAULT_OPTIONS] Options object.
 * @returns {Promise}
 */
function compiler(fixture, options = DEFAULT_OPTIONS) {
	const webpackCompiler = webpack({
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
					loader: path.resolve(__dirname, './loader.js'),
				},
			}],
		},
	});

	webpackCompiler.outputFileSystem = new MemoryFS();

	return new Promise((resolve, reject) => {
		webpackCompiler.run((error, stats) => {
			if (error) {
				reject(error);
			} else {
				resolve(stats);
			}
		});
	});
}

/**
 * Reads the contents of a text file.
 *
 * @function readFile
 * @param {string} file Path to the file.
 * @returns {Promise}
 */
function readFile(file) {
	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf8', (error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	});
}

describe('infuse-loader', () => {
	it('should convert an HTML file into an ES module', async () => {
		const stats = await compiler('./__fixtures__/template.html');
		const result = stats.toJson();
		const module = result.modules[1];
		const source = await readFile(path.join(result.outputPath, '__fixtures__', 'template.js'));

		expect(result.errors).toEqual([]);
		expect(result.warnings).toEqual([]);
		expect(module.source.trim()).toBe(source.trim());
	});
});