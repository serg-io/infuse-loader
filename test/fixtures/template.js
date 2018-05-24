import { contextFunctions, parsedTemplates } from 'infuse.host/lib/core.mjs';

const html = `<!DOCTYPE html>
<body><template data-tid="template1_ba72c74">
	<p>Plain text</p>
	<p>Plain \` text</p>
	<p>Plain \`\` text</p>
	<p data-cid="p2_ba72c74">_</p>
	<p data-cid="p3_ba72c74">_</p>
	<p data-cid="p4_ba72c74">_</p>
	<form>
		<input id="count" type="number" data-cid="input5_ba72c74">
		<p data-cid="p6_ba72c74">_<input id="dob" type="date">
			<span data-cid="span7_ba72c74">_</span>
		</p>
		<button type="submit" data-cid="button8_ba72c74">_</button>
	</form>
	<table>
		<thead>
			<tr>
				<th data-cid="th9_ba72c74">_</th>
				<th data-cid="th10_ba72c74">_</th>
			</tr>
		</thead>
		<tbody>
			<template data-pid="template11_ba72c74"></template>
		</tbody>
	</table>
</template><template data-tid="template11_ba72c74" data-cid="template12_ba72c74">
				<tr>
					<td data-cid="td13_ba72c74">_</td>
					<td data-cid="td14_ba72c74">_</td>
				</tr>
			</template></body>`;

const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');
const templates = doc.querySelectorAll('template');

export { doc as document };
export default templates[0];
export const template1_ba72c74 = templates[0];
export const template11_ba72c74 = templates[1];

parsedTemplates.set('template1_ba72c74', template1_ba72c74);
parsedTemplates.set('template11_ba72c74', template11_ba72c74);

contextFunctions.set('p2_ba72c74', function p2_ba72c74() {
	const [host, data, tags] = arguments;

	return {
		parts: new Map([[0, (event) => "Expression: " + (host.foo)]])
	};
});
contextFunctions.set('p3_ba72c74', function p3_ba72c74() {
	const [host, data, tags] = arguments;

	return {
		parts: new Map([[0, (event) => "Template literal: " + `Foo = ${ host.foo }`]])
	};
});
contextFunctions.set('p4_ba72c74', function p4_ba72c74() {
	const [host, data, tags] = arguments;

	return {
		parts: new Map([[0, (event) => "Tagged template literal: " + tags.i18n`localizedText`]])
	};
});
contextFunctions.set('input5_ba72c74', function input5_ba72c74() {
	const [host, data, tags] = arguments;

	return {
		parts: new Map([["value", (event) => (host.count)],[".valueAsNumber", (event) => (host.count)]])
	};
});
contextFunctions.set('p6_ba72c74', function p6_ba72c74() {
	const [host, data, tags] = arguments;

	return {
		parts: new Map([[0, (event) => "\n\t\t\t" + tags.i18n`dateOfBirth` + ": "]])
	};
});
contextFunctions.set('span7_ba72c74', function span7_ba72c74() {
	const [host, data, tags] = arguments;
	const dob = (this.previousElementSibling);

	return {
		constants: { dob },
		events: { dob: "change" },
		parts: new Map([[0, (event) => "\n\t\t\t\t(" + tags.i18n`age` + ": " + (host.ageSince(dob.valueAsDate)) + ")\n\t\t\t"]])
	};
});
contextFunctions.set('button8_ba72c74', function button8_ba72c74() {
	const [host, data, tags] = arguments;

	return {
		events: { host: [['disabled?', 'change #count']] },
		parts: new Map([["class", (event) => "btn " + `btn-${ host.btnType }`],["disabled?", (event) => (host.count > 10)],[0, (event) => "\n\t\t\t" + tags.i18n`submit` + "\n\t\t"]])
	};
});
contextFunctions.set('th9_ba72c74', function th9_ba72c74() {
	const [host, data, tags] = arguments;

	return {
		parts: new Map([[0, (event) => tags.i18n`firstName`]])
	};
});
contextFunctions.set('th10_ba72c74', function th10_ba72c74() {
	const [host, data, tags] = arguments;

	return {
		parts: new Map([[0, (event) => tags.i18n`lastName`]])
	};
});
contextFunctions.set('template12_ba72c74', function template12_ba72c74() {
	const [host, data, tags] = arguments;

	return {
		iterationConstants: {"value":"user","key":"i","collection":"users"},
		parts: new Map([["each", (event) => (host.users)]])
	};
});
contextFunctions.set('td13_ba72c74', function td13_ba72c74() {
	const [host, data, tags] = arguments;
	const { user, i, users } = data;

	return {
		constants: { user, i, users },
		parts: new Map([[0, (event) => (user.firstName)]])
	};
});
contextFunctions.set('td14_ba72c74', function td14_ba72c74() {
	const [host, data, tags] = arguments;
	const { user, i, users } = data;

	return {
		constants: { user, i, users },
		parts: new Map([[0, (event) => (user.lastName)]])
	};
});
