"use strict";

import zombieDefinition from "../data/zombies.json";
import { EventBus, Table } from "../util.js";

var abominations = {};
var abominationWeights = {};
var zombies = {};
var zombieWeights = {};

zombieDefinition.standard.forEach(function (definition) {
	var name = definition.name;
	zombieWeights[name] = definition;
	zombies[name] = definition;
});

zombieDefinition.abominations
.forEach(function (definition) {
	var name = definition.name;
	abominationWeights[name] = definition;
	abominations[name] = definition;
});

var zombieTypesTable = new Table({ definition: zombieWeights });
var abominationTypesTable = new Table({ definition: abominations });

EventBus.$on("toggle-zombie", function ({ type, name, value }) {
	var table = zombieTypesTable;
	if ( type === "abomination" ) {
		table = abominationTypesTable;
	}

	table.toggle({ name, enabled: value });
});

export {
	abominations,
	abominationTypesTable,
	zombies,
	zombieTypesTable
};
