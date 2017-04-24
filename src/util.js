"use strict";

import Vue from 'vue';

var EventBus = new Vue();

function exploding({ qty, sides, explodeOn }) {
	var rolled;
	var total = 0;

	qty = qty || 1;
	explodeOn = explodeOn || sides;

	do {
		rolled = roll({ qty, sides });
		total += rolled;
	} while ( rolled >= explodeOn );

	return total;
}

function roll({ qty, sides }) {
	var total = 0;
	for ( var i = 0; i < qty; i++ ) {
		total += Math.floor(Math.random() * sides) + 1;
	}

	return total;
}

class Table {
	constructor({ definition }) {
		this.definition = definition;
		this.results = [];
		this.size = 0;

		Object.keys(definition).forEach(name => this.addEntries({ name }));

		this.setSize();
	}

	addEntries({ name, ignoreDefault }) {
		var quantity = this.definition[name];
		var value = name;

		// Instead of passing in a number, can also pass in an object with a weight property. In
		// that case, that object is the return value
		if ( typeof quantity === "object" ) {
			value = quantity;
			quantity = quantity.weight;

			if ( !ignoreDefault && value.default === false ) {
				return;
			}
		}

		for ( var i = 0; i < quantity; i++ ) {
			this.results.push(value);
		}

	}

	roll() {
		var index = Math.floor(Math.random() * this.size);

		return this.results[index];
	}

	setSize() {
		this.size = this.results.length;
	}

	toggle({ name, enabled }) {
		if ( !enabled ) {
			// Remove the specified entries
			this.results = this.results.filter(result => {
				if ( typeof result === "string" ) {
					return result !== name;
				} else {
					return result.name !== name;
				}
			});
		} else {
			// Add the specified entries
			this.addEntries({ name, ignoreDefault: true });
		}

		this.setSize();
	}
}

export {
	EventBus,
	exploding,
	roll,
	Table
};
