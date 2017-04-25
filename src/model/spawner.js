"use strict";

import { exploding, Table } from "../util.js";
import outcomes from "../data/outcomes.json";
import {
	abominationTypesTable,
	zombies,
	zombieTypesTable,
} from "./zombies.js";

var outcomesTable = new Table({ definition: outcomes });
var doublesCount = 0;
var invasionTitle = "Zombie Invasion!";

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
	var titleParts = [];
	var invasions = 0;

	// In case we had doubles and got spawn points for both, go through the results and tally them
	draws.forEach(function (draw) {
		titleParts.push(draw.title);
		if ( draw.type === "SPAWN" ) {
			spawnPoints += draw.spawnPoints;

			invasions++;
		} else if ( draw.type === "SPECIAL" ) {
			lines.push(draw.text);
		}
	});

	if ( invasions >= 2 ) {
		titleParts = titleParts.filter(title => title !== invasionTitle);
		titleParts.push("Double Zombie Invasion!");
	}

	var zombies;

	if ( spawnPoints ) {
		zombies = spendSpawnPoints({ spawnPoints, variety });
	}

	return {
		title: titleParts.join(" + "),
		lines,
		zombies,
	};
}

function draw({ level, difficulty }) {
	var result;
	var outcome = outcomesTable.roll();

	if ( outcome === "abomination" ) {
		let abom = abominationTypesTable.roll();
		result = {
			type: "SPECIAL",
			title: abom.name + "!",
			text: "Spawn the " + abom.spawnText + ".",
		};
	}
	else if ( outcome === "extraActivation" ) {
		let zombie = zombieTypesTable.roll();
		result = {
			type: "SPECIAL",
			title: "Extra Activation: " + zombie.plural + "!",
			text: "All " + zombie.plural + " immediately gain an extra activation.",
		};
	}
	else if ( outcome === "necromancer" ) {
		result = {
			type: "SPECIAL",
			title: "Necromancer!",
			text: "All Necromancers immediately gain an extra activation. Then spawn a necromancer.",
		};
	}
	else if ( outcome === "double" ) {
		doublesCount++;
		result = {
			type: "SPECIAL",
			title: "Double Spawn!",
			text: "The next spawn will be doubled.",
		};
	}
	else if ( outcome === "zombies" ) {
		result = {
			type: "SPAWN",
			title: invasionTitle,
			spawnPoints: generatePoints({ difficulty, level }),
		};
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
