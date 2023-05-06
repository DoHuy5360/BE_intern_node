function replaceScript(script) {
	const scriptTag = document.createElement("script");
	scriptTag.type = "module";
	scriptTag.src = script;
	document.body.appendChild(scriptTag);
	const exitsScript = document.querySelector(`script[src="${script}"`);
	exitsScript.remove();
}

export { replaceScript };
