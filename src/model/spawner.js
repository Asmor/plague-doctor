"use strict";

import EventBus from "../event-bus.js";
import { exploding, Table } from "../util.js";
import outcomes from "../data/outcomes.json";
import { zombies, zombieTypesTable } from "./zombies.js";

var outcomesTable = new Table({ definition: outcomes });
var doublesCount = 0;

function spawn({ level, difficulty, variety }) {
	var draws = [];
	var doubled = false;

	// Each spawn can cause at most two draws, if we have any doubles banked.
	if ( doublesCount ) {
		doublesCount--;
		draws.push(draw({ level, difficulty }));
		doubled = true;
	}

	draws.push(draw({ level, difficulty }));

	var spawnPoints = 0;
	var lines = [];

	// In case we had doubles and got spawn points for both, go through the results and tally them
	draws.forEach(function (draw) {
		if ( draw.spawnPoints ) {
			spawnPoints += draw.spawnPoints;
		}

		if ( draw.special ) {
			lines.push(draw.special);
		}
	});

	if ( spawnPoints ) {
		lines = lines.concat(spendSpawnPoints({ spawnPoints, variety }));
	}

	return {
		doubled,
		lines,
	};
}

function draw({ level, difficulty }) {
	var result;
	var outcome = outcomesTable.roll();

	if ( outcome === "abomination" ) {
		result = { special: "Abomination" };
	}
	else if ( outcome === "extraActivation" ) {
		result = { special: "Extra Activation: " + zombieTypesTable.roll().plural };
	}
	else if ( outcome === "necromancer" ) {
		result = { special: "Necromancer" };
	}
	else if ( outcome === "double" ) {
		doublesCount++;
		result = { special: "Double Spawn" };
	}
	else if ( outcome === "zombies" ) {
		result = { spawnPoints: generatePoints({ difficulty, level }) };
	}

	return result;
}

function generatePoints({ level, difficulty }) {
	var total = 0;

	for ( var i = 0; i < 2 * level; i++ ) {
		total += exploding({ sides: 6 });
	}

	return Math.ceil(total * difficulty);
}

var softLimit = 5;
function spendSpawnPoints({ spawnPoints, variety }) {
	var totals = {};
	var type;

	do {
		if (
			// We don't have a type yet
			!type
			// We want a new type every time
			|| variety
			// We've got too many of these already and want to pump the breaks
			|| totals[type.name] >= type.softLimit
		) {
			type = zombieTypesTable.roll();
			totals[type.name] = totals[type.name] || 0;
		}

		totals[type.name]++;
		spawnPoints -= type.points;
	} while ( spawnPoints > 0 );

	return Object.keys(totals)
	.sort(function (a, b) {
		return zombies[a].sortOrder - zombies[b].sortOrder;
	})
	.map(function (name) {
		var definition = zombies[name];
		var qty = totals[name];

		if ( qty === 1 ) {
			return "1x " + name;
		} else {
			return qty + "x " + definition.plural;
		}
	});
}

export {
	outcomesTable,
	spawn
};
