import { contextFunctions, parsedTemplates } from 'infuse.host/lib/core.mjs';

const html = `<!DOCTYPE html>
<body><template data-tid="template1_a854068">
	<p>Plain text</p>
	<p>Plain \` text</p>
	<p>Plain \`\` text</p>
	<p data-cid="p2_a854068">_</p>
	<p data-cid="p3_a854068">_</p>
	<p data-cid="p4_a854068">_</p>
	<form>
		<input id="count" type="number" data-cid="input5_a854068">
		<p data-cid="p6_a854068">_<input id="dob" type="date">
			<span data-cid="span7_a854068">_</span>
		</p>
		<button type="submit" data-cid="button8_a854068">_</button>
	</form>
</template></body>`;

const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');
const templates = doc.querySelectorAll('template');

export { doc as document };
export default templates[0];
export const template1_a854068 = templates[0];

parsedTemplates.set('template1_a854068', template1_a854068);

contextFunctions.set('p2_a854068', function p2_a854068() {
	const [host, data, tags] = arguments;

	return {
		parts: new Map([[0, (event) => "Expression: " + (host.foo)]])
	};
});
contextFunctions.set('p3_a854068', function p3_a854068() {
	const [host, data, tags] = arguments;

	return {
		parts: new Map([[0, (event) => "Template literal: " + `Foo = ${ host.foo }`]])
	};
});
contextFunctions.set('p4_a854068', function p4_a854068() {
	const [host, data, tags] = arguments;

	return {
		parts: new Map([[0, (event) => "Tagged template literal: " + tags.i18n`localizedText`]])
	};
});
contextFunctions.set('input5_a854068', function input5_a854068() {
	const [host, data, tags] = arguments;

	return {
		parts: new Map([["value", (event) => (host.count)],[".valueAsNumber", (event) => (host.count)]])
	};
});
contextFunctions.set('p6_a854068', function p6_a854068() {
	const [host, data, tags] = arguments;

	return {
		parts: new Map([[0, (event) => "\n\t\t\t" + tags.i18n`dateOfBirth` + ": "]])
	};
});
contextFunctions.set('span7_a854068', function span7_a854068() {
	const [host, data, tags] = arguments;
	const dob = (this.previousElementSibling);

	return {
		constants: { dob },
		events: { dob: "change" },
		parts: new Map([[0, (event) => "\n\t\t\t\t(" + tags.i18n`age` + ": " + (host.ageSince(dob.valueAsDate)) + ")\n\t\t\t"]])
	};
});
contextFunctions.set('button8_a854068', function button8_a854068() {
	const [host, data, tags] = arguments;

	return {
		events: { host: [['disabled?', 'change #count']] },
		parts: new Map([["class", (event) => "btn " + `btn-${ host.btnType }`],["disabled?", (event) => (host.count > 10)],[0, (event) => "\n\t\t\t" + tags.i18n`submit` + "\n\t\t"]])
	};
});
