import fs from 'fs';
import path from 'path';
import compiler from './compiler.mjs';

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
		const stats = await compiler('./fixtures/template.html');
		const result = stats.toJson();
		const module = result.modules[1];
		const source = await readFile(path.join(result.outputPath, 'fixtures', 'template.js'));

		expect(result.errors).toEqual([]);
		expect(result.warnings).toEqual([]);
		expect(module.source.trim()).toBe(source.trim());
	});
});
