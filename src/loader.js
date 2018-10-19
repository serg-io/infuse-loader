import utils from 'loader-utils';
import configs, { setConfigs } from 'infuse.host/lib/configs';
import createESModule from 'infuse.host/lib/createESModule';

/**
 * Parses all template elements in the given HTML document and generates an ES module.
 *
 * @param {(string|Document)} htmlDocument The HTML document, as a string or as an instance of
 *     `Document`, to parse and convert into an ES module.
 * @returns {string} The source code of the generated ES module.
 */
export default function loader(htmlDocument) {
	// Get options for this loader given.
	const options = utils.getOptions(this) || {};
	// Find all the keys in `options` that are configuration options.
	const configKeys = Object.keys(options).filter(key => configs.has(key));

	// Set configurations, if `options` includes configuration options.
	if (configKeys.length > 0) {
		// An array of key/value configuration pairs (an array or arrays).
		const configOptions = configKeys.map(key => ([key, options[key]]));
		setConfigs(configOptions);
	}

	return createESModule(htmlDocument, options);
}