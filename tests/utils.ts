export const createEl = (TAG_NAME, { attributes = {}, props = {}, events = {}, slots = {} } = {}) => {
	const el = document.createElement(TAG_NAME);
	const attrKeys = Object.keys(attributes);
	const propsKeys = Object.keys(props);
	const eventsKeys = Object.keys(events);
	const slotsKeys = Object.keys(slots);

	if (attrKeys.length) {
		attrKeys.forEach((attrKey) => el.setAttribute(attrKey, attributes[attrKey]));
	}

	if (propsKeys.length) {
		propsKeys.forEach((propKey) => (el[propKey] = props[propKey]));
	}

	if (eventsKeys.length) {
		eventsKeys.forEach((eventKey) => el.addEventListener(eventKey, events[eventKey]));
	}

	if (slotsKeys.length) {
		slotsKeys.forEach((slotKey) => (el.innerHTML += slots[slotKey]));
	}
	document.body.appendChild(el);

	return el;
};

export const removeEl = (TAG_NAME) => {
	document.body.getElementsByTagName(TAG_NAME)[0].remove();
};
