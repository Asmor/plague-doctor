"use strict";

import zombieDefinition from "../data/zombies.json";
import { Table } from "../util.js";

var zombieWeights = {};
var zombies = {};

zombieDefinition.standard.forEach(function (definition) {
	var name = definition.name;
	zombieWeights[name] = definition;
	zombies[name] = definition;
});

var zombieTypesTable = new Table({ definition: zombieWeights });

export {
	zombies,
	zombieTypesTable
};
