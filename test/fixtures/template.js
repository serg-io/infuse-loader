import { contextFunctions, parsedTemplates } from 'infuse.host/src/core';

const html = `<!DOCTYPE html>
<body><template data-tid="template1_bd3a047">
	<p>Plain text</p>
	<p>Plain \` text</p>
	<p>Plain \`\` text</p>
	<p data-cid="p2_bd3a047">_</p>
	<p data-cid="p3_bd3a047">_</p>
	<p data-cid="p4_bd3a047">_</p>
	<form>
		<input id="count" type="number" data-cid="input5_bd3a047">
		<p data-cid="p6_bd3a047">_<input id="dob" type="date">
			<span data-cid="span7_bd3a047">_</span>
		</p>
		<button type="submit" data-cid="button8_bd3a047">_</button>
	</form>
	<table>
		<thead>
			<tr>
				<th data-cid="th9_bd3a047">_</th>
				<th data-cid="th10_bd3a047">_</th>
			</tr>
		</thead>
		<tbody>
			<template data-pid="template11_bd3a047"></template>
		</tbody>
	</table>
</template><template data-tid="template11_bd3a047" data-cid="template12_bd3a047">
				<tr>
					<td data-cid="td13_bd3a047">_</td>
					<td data-cid="td14_bd3a047">_</td>
				</tr>
			</template></body>`;

const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');
const templates = doc.querySelectorAll('template');

export { doc as document };
export default templates[0];
export const template1_bd3a047 = templates[0];
export const template11_bd3a047 = templates[1];

parsedTemplates.set('template1_bd3a047', template1_bd3a047);
parsedTemplates.set('template11_bd3a047', template11_bd3a047);

contextFunctions.set('p2_bd3a047', function p2_bd3a047() {
	const [host, data, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([[0, (event) => "Expression: " + (host.foo)]])
	};
});
contextFunctions.set('p3_bd3a047', function p3_bd3a047() {
	const [host, data, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([[0, (event) => "Template literal: " + `Foo = ${ host.foo }`]])
	};
});
contextFunctions.set('p4_bd3a047', function p4_bd3a047() {
	const [host, data, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([[0, (event) => "Tagged template literal: " + tags.i18n`localizedText`]])
	};
});
contextFunctions.set('input5_bd3a047', function input5_bd3a047() {
	const [host, data, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([["value", (event) => (host.count)],[".valueAsNumber", (event) => (host.count)]])
	};
});
contextFunctions.set('p6_bd3a047', function p6_bd3a047() {
	const [host, data, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([[0, (event) => "\n\t\t\t" + tags.i18n`dateOfBirth` + ": "]])
	};
});
contextFunctions.set('span7_bd3a047', function span7_bd3a047() {
	const [host, data, tags] = arguments;
	const dob = (this.previousElementSibling);

	return {
		constants: { dob, host, data },
		watches: new Map([["dob", "change"]]),
		parts: new Map([[0, (event) => "\n\t\t\t\t(" + tags.i18n`age` + ": " + (host.ageSince(dob.valueAsDate)) + ")\n\t\t\t"]])
	};
});
contextFunctions.set('button8_bd3a047', function button8_bd3a047() {
	const [host, data, tags] = arguments;

	return {
		constants: { host, data },
		watches: new Map([["host", [['disabled?', 'change #count']]]]),
		parts: new Map([["class", (event) => "btn " + `btn-${ host.btnType }`],["disabled?", (event) => (host.count > 10)],[0, (event) => "\n\t\t\t" + tags.i18n`submit` + "\n\t\t"]])
	};
});
contextFunctions.set('th9_bd3a047', function th9_bd3a047() {
	const [host, data, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([[0, (event) => tags.i18n`firstName`]])
	};
});
contextFunctions.set('th10_bd3a047', function th10_bd3a047() {
	const [host, data, tags] = arguments;

	return {
		constants: { host, data },
		parts: new Map([[0, (event) => tags.i18n`lastName`]])
	};
});
contextFunctions.set('template12_bd3a047', function template12_bd3a047() {
	const [host, data, tags] = arguments;

	return {
		constants: { host, data },
		iterationConstants: {"value":"user","key":"i","collection":"users"},
		parts: new Map([["each", (event) => (host.users)]])
	};
});
contextFunctions.set('td13_bd3a047', function td13_bd3a047() {
	const [host, data, tags] = arguments;
	const { user, i, users } = data;

	return {
		constants: { user, i, users, host, data },
		parts: new Map([[0, (event) => (user.firstName)]])
	};
});
contextFunctions.set('td14_bd3a047', function td14_bd3a047() {
	const [host, data, tags] = arguments;
	const { user, i, users } = data;

	return {
		constants: { user, i, users, host, data },
		parts: new Map([[0, (event) => (user.lastName)]])
	};
});