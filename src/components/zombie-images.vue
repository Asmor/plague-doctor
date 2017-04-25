<script>
"use strict";

export default {
	props: [ "imageClasses" ],
};
</script>

<template>
	<div class="zombie-images">
		<div
			v-for="imageClass in imageClasses"
			class="zombie-images--image"
			:class="imageClass"
		></div>
	</div>
</template>

<style lang="scss">
.zombie-images {
	// background-color: red;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100%;
	display: flex;
	overflow: hidden;
	z-index: -1;

	.zombie-images--image {
		height: 100%;
		flex: 1;

		&.zombie-images--image__ablobination {
			background: url("../assets/ablobination.png") no-repeat center bottom;
			background-size: auto 100%;
		}
		&.zombie-images--image__abominalpha {
			background: url("../assets/abominalpha.png") no-repeat center bottom;
			background-size: auto 100%;
		}
		&.zombie-images--image__abomination {
			background: url("../assets/abomination.png") no-repeat center bottom;
			background-size: auto 100%;
		}
		&.zombie-images--image__abominatroll {
			background: url("../assets/abominatroll.png") no-repeat center bottom;
			background-size: auto 100%;
		}
		&.zombie-images--image__crow {
			background: url("../assets/crow.png") no-repeat center center;
			background-size: auto 100%;
		}
		&.zombie-images--image__deadeye {
			background: url("../assets/deadeye.png") no-repeat center bottom;
			// background-size: auto 100%;
			background-size: auto 100%;
		}
		&.zombie-images--image__npc {
			background: url("../assets/npc.png") no-repeat center bottom;
			background-size: auto 100%;
		}
		&.zombie-images--image__fatty {
			background: url("../assets/fatty.png") no-repeat center bottom;
			background-size: auto 100%;
		}
		&.zombie-images--image__necromancer {
			background: url("../assets/necromancer.png") no-repeat center bottom;
			background-size: auto 100%;
		}
		&.zombie-images--image__runner {
			background: url("../assets/runner.png") no-repeat center bottom;
			background-size: auto 100%;
		}
		&.zombie-images--image__walker {
			background: url("../assets/walker.png") no-repeat center bottom;
			background-size: auto 100%;
		}
		&.zombie-images--image__wolfbomination {
			background: url("../assets/wolfbomination.png") no-repeat center bottom;
			background-size: auto 100%;
		}
		&.zombie-images--image__wolf {
			background: url("../assets/wolf.png") no-repeat center bottom;
			background-size: auto 100%;
		}

	}
}
</style>
