infuse-loader
=============

This library can be used with [webpack](https://webpack.js.org/) to parse and import HTML templates
to be used with [infuse.host](https://github.com/serg-io/infuse.host).

## Usage ##

To be able to use infuse-loader in your webpack project you must first install it:

	npm install infuse-loader --save-dev

Then, you need to modify your webpack configuration file to use infuse-loader for HTML files:

	const path = require('path');

	module.exports = {
		context: __dirname,
		devServer: {
			contentBase: [path.resolve(__dirname, 'dist')]
		},
		entry: './src/index.js',
		mode: 'development',
		module: {
			rules: [{
				test: /\.html$/,
				use: [{ loader: 'infuse-loader' }]
			}],
		},
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist')
		}
	};

## Example ##

Lets say you want to define a custom element to use as a page header. You would write the HTML file
with template for the custom element. We'll call this file _header.html_.

	<template>
		<h1>${ host.pageTitle }</p>
	</template>

Then, you simply import that template into an ES module where you define the custom element:

	// Import template and Infuse.Host.
	import headerTemplate from './header.html';
	import * as Infuse from 'path/to/infuse.host/src/infuse.js';

	// Extend `Infuse.Host` to define a class for the new custom element.
	class CustomHeader extends Infuse.Host {
		// `Infuse.Host` uses `this.template` to obtain the parsed template to clone/infuse.
		get template() {
			return headerTemplate;
		}

		// This is the property used in the template.
		get pageTitle() {
			return 'Page Title';
		}
	}

	// Define the custom element using the `CustomHeader` class.
	window.customElements.define('custom-header', CustomHeader);

Whenever the `<custom-header>` element is used on the page (after this module has been loaded by
the browser), `Infuse.Host` will clone and infuse the template and add the resulting fragment to
the custom element, which will result in:

	<custom-header>
		<h1>Page Title</h1>
	</custom-header>

The first template in an HTML file is used as the default value in the import statement. In the
previous example, the HTML file contained only one template, which was imported as `headerTemplate`.

When using HTML files with multiple template elements (including nested templates), you can use the
template ID to access different templates in an import statement. By default, infuse.host uses the
`data-tid` as the name of the template ID attribute. This attribute is added to the template element
(if it doesn't have it already) when a template is parsed. You can add this attribute to your
templates to uniquely identify them. You can use the default attribute name (`data-tid`) or you can
use a different attribute name by setting the `templateId` [configuration
option](https://github.com/serg-io/infuse.host#configuration-options) in your webpack config file:

	module.exports = {
		/* Other webpack configuration options. */
		module: {
			rules: [{
				test: /\.html$/,
				use: [{
					loader: 'infuse-loader',
					// infuse.host configuration options
					options: {
						templateId: 'id'
					}
				}]
			}]
		},
		/* Other webpack configuration options. */
	};

You can then optionally add the `id` attribute to your templates. For instance:

	<template>
		<table>
			<thead>
				<tr>
					<th>Index</th>
					<th>ISBN</th>
					<th>Title</th>
					<th>Author</th>
				</tr>
			</thead>
			<tbody>
				<template id="rowTemplate" for="book, index" each="${ host.getBooksArray() }">
					<tr>
						<td>${ index }</td>
						<td>${ book.isbn }</td>
						<td>${ book.title }</td>
						<td>${ book.author }</td>
					</tr>
				</template>
			</tbody>
		</table>
	</template>
	<template id="headerTemplate">
		<h1>${ host.pageTitle }</p>
	</template>

The first template element is still used as the default value in the import statement, but you can
access other templates using their `id`, for instance:

	import rootTemplate, { rowTemplate, headerTemplate } from './template.html';

## Configuration Options ##

All the configuration options that you can pass to infuse-loader, in your webpack config file, are
listed in the [infuse.host](https://github.com/serg-io/infuse.host#configuration-options)
repository.