<script>
"use strict";

import { spawn } from "../model/spawner.js";
import { abominations, zombies } from "../model/zombies.js";
import { EventBus } from "../util.js";

var resultNames = {
	1: "Blue",
	2: "Yellow",
	3: "Orange",
	4: "Red",
};

export default {
	data: function () {
		return {
			abominations,
			difficulty: 1,
			results: [],
			optionsExpanded: false,
			variety: true,
			zombies,
			enabled: {
				abominations: Object.keys(abominations).reduce(function (acc, name) {
					var definition = abominations[name];
					acc[definition.name] = definition.default;
					return acc;
				}, {}),
				zombies: Object.keys(zombies).reduce(function (acc, name) {
					var definition = zombies[name];
					acc[definition.name] = definition.default;
					return acc;
				}, {}),
			},
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
		zombieToggled: function ({ type, name }) {
			var enabled = this.enabled.zombies;
			var _default = "Walker";

			if ( type === "abomination" ) {
				enabled = this.enabled.abominations;
				_default = "Abomination";
			}

			var value = enabled[name];

			EventBus.$emit("toggle-zombie", { type, name, value });

			if ( !Object.keys(enabled).some(key => enabled[key]) ) {
				enabled[_default] = true;
				this.zombieToggled({ type, name: _default });
			}
		}
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

			<div
				class="spawner--options-panel"
				v-bind:class="{ 'spawner--options-panel__expanded': optionsExpanded }"
			>
				<div
					class="spawner--option-header spawner--option-toggle"
					@click="optionsExpanded = !optionsExpanded"
				>Options</div>
				<div class="spawner--option">
					<div class="spawner--option-name">Spawn multiplier</div>
					<div class="spawner--option-control">
						<input v-model="difficulty" class="spawner--difficulty-input">
					</div>
				</div>
				<div class="spawner--option">
					<div class="spawner--option-name">Extreme zombie variety</div>
					<div class="spawner--option-control">
						<input v-model="variety" type="checkbox">
					</div>
				</div>

				<div class="spawner--option-header">Zombies</div>
				<div
					class="spawner--option"
					v-for="(definition, name) in zombies"
				>
					<div class="spawner--option-name">{{ definition.plural }}</div>
					<div class="spawner--option-control">
						<input
							v-model="enabled.zombies[name]"
							type="checkbox"
							@change="zombieToggled({ type: 'zombie', name })"
						>
					</div>
				</div>

				<div class="spawner--option-header">Abominations</div>
				<div
					class="spawner--option"
					v-for="(definition, name) in abominations"
				>
					<div class="spawner--option-name">{{ name }}</div>
					<div class="spawner--option-control">
						<input
							v-model="enabled.abominations[name]"
							type="checkbox"
							@change="zombieToggled({ type: 'abomination', name })"
						>
					</div>
				</div>

				<a class="spawner--feedback" href="https://boardgamegeek.com/blogpost/64767/">
					Feedback &amp; Updates
				</a>
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
						need to control spacing so comma is immediately after level
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
	$break-width: 640px;
	$option-toggle-height: 40px;

	display: flex;
	font-family: Arial;

	@media ( max-width: $break-width ) {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: $option-toggle-height;
		overflow: auto;
	}

	.spawner--difficulty-input {
		padding: 5px;
		width: 50px;
	}

	.spawner--controls {
		padding: 10px;
		width: 285px;

		@media ( max-width: $break-width ) {
			margin: auto;
		}
	}

	.spawner--options-panel {
		background: url("../assets/skullbg-red.gif");
		border-radius: 10px;
		padding: 10px;
		color: white;

		@media ( max-width: $break-width ) {
			transition: height 1s;
			position: fixed;

			height: $option-toggle-height;
			bottom: 0;
			left: 0;
			right: 0;
			border-radius: 10px 10px 0 0;

			.spawner--option-toggle {
				cursor: pointer;
			}

			&.spawner--options-panel__expanded {
				height: 95%;
				overflow: auto;
			}
		}
	}

	.spawner--option-header {
		font-size: 1.2em;
		text-align: center;
		padding-bottom: 10px;
	}

	.spawner--option {
		display: flex;
		max-width: 300px;
		margin-left: auto;
		margin-right: auto;

		&:not(:last-child) {
			margin-bottom: 10px;
		}
	}

	.spawner--option-name {
		flex: 1;
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

	.spawner--feedback {
		display: block;
		width: 200px;
		background-color: #ddd;
		color: #000;
		padding: 10px;
		text-align: center;
		border-radius: 10px;
		margin: 30px auto 0;
		text-decoration: none;
		font-weight: bold;

		&:hover {
			background-color: #ccc;
		}
	}
}
</style>

