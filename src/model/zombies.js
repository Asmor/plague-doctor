"use strict";

import zombieDefinition from "../data/zombies.json";
import { Table } from "../util.js";

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
.filter(def => def.default)
.forEach(function (definition) {
	var name = definition.name;
	abominationWeights[name] = definition;
	abominations[name] = definition;
});

var zombieTypesTable = new Table({ definition: zombieWeights });
var abominationTypesTable = new Table({ definition: abominations });

export {
	abominations,
	abominationTypesTable,
	zombies,
	zombieTypesTable
};
