import { getOptions } from 'loader-utils';
import createESModule from 'infuse.host/lib/createESModule.mjs';

/**
 * Parses all template elements in the given HTML document and generates an ES module.
 *
 * @param {(string|Document)} htmlDocument The HTML document, as a string or as an instance of
 *     `Document`, to parse and convert into an ES module.
 * @returns {string} The source code of the generated ES module.
 */
export default function loader(htmlDocument) {
	return createESModule(htmlDocument, getOptions(this));
}
