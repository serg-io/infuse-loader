import { contextFunctions, parsedTemplates } from 'infuse.host/src/configs.js';

const html = `<!DOCTYPE html>
<body><template data-tid="template1_cbf9ce2">
	<p>Plain text</p>
	<p>Plain \` text</p>
	<p>Plain \`\` text</p>
	<p data-cid="p2_cbf9ce2">_</p>
	<p data-cid="p3_cbf9ce2">_</p>
	<p data-cid="p4_cbf9ce2">_</p>
	<form>
		<input id="count" type="number" data-cid="input5_cbf9ce2">
		<p data-cid="p6_cbf9ce2">_<input id="dob" type="date">
			<span data-cid="span7_cbf9ce2">_</span>
		</p>
		<button type="submit" data-cid="button8_cbf9ce2">_</button>
	</form>
	<table>
		<thead>
			<tr>
				<th data-cid="th9_cbf9ce2">_</th>
				<th data-cid="th10_cbf9ce2">_</th>
			</tr>
		</thead>
		<tbody>
			<template data-pid="template11_cbf9ce2"></template>
		</tbody>
	</table>
</template><template data-tid="template11_cbf9ce2" data-cid="template12_cbf9ce2">
				<tr>
					<td data-cid="td13_cbf9ce2">_</td>
					<td data-cid="td14_cbf9ce2">_</td>
				</tr>
			</template></body>`;

const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');
const templates = doc.getElementsByTagName('template');

export { doc as document };
export default templates[0];
export const template1_cbf9ce2 = templates[0];
export const template11_cbf9ce2 = templates[1];

parsedTemplates.set('template1_cbf9ce2', template1_cbf9ce2);
parsedTemplates.set('template11_cbf9ce2', template11_cbf9ce2);

contextFunctions.set('p2_cbf9ce2', function(
) {
	const [host, data, iterationData, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([[0, (event) => "Expression: " + (host.foo)]])
	};
});
contextFunctions.set('p3_cbf9ce2', function(
) {
	const [host, data, iterationData, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([[0, (event) => "Template literal: " + `Foo = ${ host.foo }`]])
	};
});
contextFunctions.set('p4_cbf9ce2', function(
) {
	const [host, data, iterationData, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([[0, (event) => "Tagged template literal: " + tags.i18n`localizedText`]])
	};
});
contextFunctions.set('input5_cbf9ce2', function(
) {
	const [host, data, iterationData, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([["value", (event) => (host.count)],[".valueAsNumber", (event) => (host.count)]])
	};
});
contextFunctions.set('p6_cbf9ce2', function(
) {
	const [host, data, iterationData, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([[0, (event) => "\n\t\t\t" + tags.i18n`dateOfBirth` + ": "]])
	};
});
contextFunctions.set('span7_cbf9ce2', function(
) {
	const [host, data, iterationData, tags] = arguments;
	const dob = (this.previousElementSibling);

	return {
		constants: { dob, host, data },
		watches: new Map([["dob", "change"]]),
		parts: new Map([[0, (event) => "\n\t\t\t\t(" + tags.i18n`age` + ": " + (host.ageSince(dob.valueAsDate)) + ")\n\t\t\t"]])
	};
});
contextFunctions.set('button8_cbf9ce2', function(
) {
	const [host, data, iterationData, tags] = arguments;

	return {
		constants: { host, data },
		watches: new Map([["host", [['disabled?', 'change #count']]]]),
		parts: new Map([["class", (event) => "btn " + `btn-${ host.btnType }`],["disabled?", (event) => (host.count > 10)],[0, (event) => "\n\t\t\t" + tags.i18n`submit` + "\n\t\t"]])
	};
});
contextFunctions.set('th9_cbf9ce2', function(
) {
	const [host, data, iterationData, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([[0, (event) => tags.i18n`firstName`]])
	};
});
contextFunctions.set('th10_cbf9ce2', function(
) {
	const [host, data, iterationData, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([[0, (event) => tags.i18n`lastName`]])
	};
});
contextFunctions.set('template12_cbf9ce2', function(
) {
	const [host, data, iterationData, tags] = arguments;

	return {
		constants: { host, data },
		forVariableNames: ["user","i","users"],
		parts: new Map([["each", (event) => (host.users)]])
	};
});
contextFunctions.set('td13_cbf9ce2', function(
) {
	const [host, data, iterationData, tags] = arguments;
	const { user, i, users } = iterationData || {};

	return {
		constants: { user, i, users, host, data },
		parts: new Map([[0, (event) => (user.firstName)]])
	};
});
contextFunctions.set('td14_cbf9ce2', function(
) {
	const [host, data, iterationData, tags] = arguments;
	const { user, i, users } = iterationData || {};

	return {
		constants: { user, i, users, host, data },
		parts: new Map([[0, (event) => (user.lastName)]])
	};
});