<script>
"use strict";

import { spawn } from "../model/spawner.js";

var resultNames = {
	1: "Blue",
	2: "Yellow",
	3: "Orange",
	4: "Red",
};

export default {
	data: function () {
		return {
			difficulty: 1,
			variety: true,
			results: [],
		}
	},
	methods: {
		callSpawner: function (level) {
			var difficulty = Number.parseFloat(this.difficulty) || 1;
			var lines = spawn({ level: level, difficulty, variety: this.variety });
			this.results.unshift({
				level: resultNames[level],
				difficulty,
				lines,
			});
			window.results = this.results;
		},
	},
};
</script>

<template>
	<div class="spawner">
		<div>
			Spawn multiplier: <input v-model="difficulty">
		</div>
		<div>
			Extreme zombie variety: <input v-model="variety" type="checkbox">
		</div>

		<div>
			<button @click="callSpawner(1)">Blue</button>
			<button @click="callSpawner(2)">Yellow</button>
			<button @click="callSpawner(3)">Orange</button>
			<button @click="callSpawner(4)">Red</button>
		</div>

		<div
			class="spawner--result"
			v-for="result in results"
		>
			<div class="spawner--result-header">
				Level: {{ result.level }}, Difficulty: {{ result.difficulty }}
			</div>
			<div v-for="line in result.lines">{{ line }}</div>
		</div>
	</div>
</template>


<style lang="scss">
.spawner {
	.spawner--result-header {
		font-weight: bold;
		font-size: 1.2em;
	}

	.spawner--result {
		padding: 20px;
		&:not(:last-child) {
			border-bottom: 1px solid black;
		}
	}
}
</style>

