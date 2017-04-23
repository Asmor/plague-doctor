"use strict";

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
		this.results = [];
		this.size = 0;

		Object.keys(definition).forEach(key => {
			var quantity = definition[key];
			var value = key;

			// Instead of passing in a number, can also pass in an object with a weight property. In
			// that case, that object is the return value
			if ( typeof quantity === "object" ) {
				value = quantity;
				quantity = quantity.weight;
			}

			this.size += quantity;

			for ( var i = 0; i < quantity; i++ ) {
				this.results.push(value);
			}
		});

	}

	roll () {
		var index = Math.floor(Math.random() * this.size);

		return this.results[index];
	}
}

export {
	exploding,
	roll,
	Table
};
