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
			var spawnResult = spawn({ level: level, difficulty, variety: this.variety });
			this.results.unshift({
				level: resultNames[level],
				difficulty,
				doubled: spawnResult.doubled,
				lines: spawnResult.lines,
			});
		},
	},
};
</script>

<template>
	<div class="spawner">
		<div class="spawner--controls">
			<div class="spawner--buttons">
				<button
					class="spawner--button spawner--button__blue"
					@click="callSpawner(1)"
				>Blue</button>
				<button
					class="spawner--button spawner--button__yellow"
					@click="callSpawner(2)"
				>Yellow</button>
				<button
					class="spawner--button spawner--button__orange"
					@click="callSpawner(3)"
				>Orange</button>
				<button
					class="spawner--button spawner--button__red"
					@click="callSpawner(4)"
				>Red</button>
			</div>

			<div>
				Spawn multiplier: <input v-model="difficulty" class="spawner--difficulty-input">
			</div>
			<div>
				Extreme zombie variety: <input v-model="variety" type="checkbox">
			</div>
		</div>
		<div class="spawner--results">
			<div
				class="spawner--result"
				v-for="result in results"
			>
				<div
					class="spawner--result-header"
					v-bind:class="{
						'spawner--result-header__blue': result.level === 'Blue',
						'spawner--result-header__yellow': result.level === 'Yellow',
						'spawner--result-header__orange': result.level === 'Orange',
						'spawner--result-header__red': result.level === 'Red',
					}"
				>
					<span class="spawner--result-header-info">Level: {{ result.level }}</span><!--
					--><span v-if="result.difficulty !== 1">,
						<span class="spawner--result-header-info">Multiplier: {{ result.difficulty }}</span>
					</span>
					<span
						v-if="result.doubled"
						class="spawner--result-header-info"
					>(doubled)</span>
				</div>
				<div v-for="line in result.lines">{{ line }}</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss">
@mixin spawner-button($button-color) {
	background-color: $button-color;

	&:hover {
		background-color: lighten($button-color, 10%);
	}
}

.spawner {
	$blue: rgba(#59f, 0.6);
	$yellow: rgba(#ff5, 0.6);
	$orange: rgba(#f90, 0.6);
	$red: rgba(#f00, 0.6);

	display: flex;
	font-family: Arial;

	@media ( max-width: 640px ) {
		display: block;
	}

	.spawner--difficulty-input {
		padding: 5px;
		width: 50px;
	}

	.spawner--controls {
		padding: 10px;
		min-width: 285px;
	}

	.spawner--results {
		padding: 10px;
		flex: 1;
	}

	.spawner--result-header {
		font-weight: bold;
		font-size: 1.2em;
		padding: 10px;
		margin-bottom: 10px;
		border-radius: 5px;
		color: #000;

		$opacity: 0.6;

		&.spawner--result-header__blue {
			background-color: $blue;
		}

		&.spawner--result-header__yellow {
			background-color: $yellow;
		}

		&.spawner--result-header__orange {
			background-color: $orange;
		}

		&.spawner--result-header__red {
			background-color: $red;
		}

	}

	.spawner--result-header-info {
		display: inline-block;
	}

	.spawner--result {
		padding-bottom: 30px;
	}

	.spawner--buttons {
		display: flex;
		padding-bottom: 20px;
	}

	.spawner--button {
		$margin: 3px;
		width: calc(25% - #{$margin * 2});
		display: block;
		border: 0;
		padding: 5px;
		margin: 0 $margin;
		cursor: pointer;
		border-radius: 5px;
		height: 44px;

		&.spawner--button__blue {
			@include spawner-button($blue);
		}
		
		&.spawner--button__yellow {
			@include spawner-button($yellow);
		}
		
		&.spawner--button__orange {
			@include spawner-button($orange);
		}
		
		&.spawner--button__red {
			@include spawner-button($red);
		}
	}
}
</style>

