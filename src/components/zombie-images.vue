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
@mixin auto-dimension($height, $aspect-ratio) {
	$width: $height * $aspect-ratio;
	height: 100%;
	width: $width;
	background-size: auto $height;
	margin-left: $width * -0.5;
}

.zombie-images {
	// background-color: red;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 200px; // Determines size of pictures
	overflow: hidden;
	z-index: -1;
	padding-right: 20px;

	.zombie-images--image {
		height: 100%;
		flex: 1;
		$abom-height: 200px;
		$standard-height: 150px;
		float: right;

		&.zombie-images--image__ablobination {
			background: url("../assets/ablobination.png") no-repeat center bottom;
			$aspect-ratio: 0.9577;
			@include auto-dimension($abom-height, $aspect-ratio);
		}
		&.zombie-images--image__abominalpha {
			background: url("../assets/abominalpha.png") no-repeat center bottom;
			$aspect-ratio: 0.7717;
			@include auto-dimension($abom-height, $aspect-ratio);
		}
		&.zombie-images--image__abominarat {
			background: url("../assets/abominarat.png") no-repeat center bottom;
			$aspect-ratio: 0.9471;
			@include auto-dimension($abom-height, $aspect-ratio);
		}
		&.zombie-images--image__abomination {
			background: url("../assets/abomination.png") no-repeat center bottom;
			$aspect-ratio: 0.6125;
			@include auto-dimension($abom-height, $aspect-ratio);
		}
		&.zombie-images--image__abominatroll {
			background: url("../assets/abominatroll.png") no-repeat center bottom;
			$aspect-ratio: 0.7784;
			@include auto-dimension($abom-height, $aspect-ratio);
		}
		&.zombie-images--image__abominotaur {
			background: url("../assets/abominotaur.png") no-repeat center bottom;
			$aspect-ratio: 0.5704;
			@include auto-dimension($abom-height, $aspect-ratio);
		}
		&.zombie-images--image__crow {
			background: url("../assets/crow.png") no-repeat center top;
			$aspect-ratio: 1.8607;
			@include auto-dimension($standard-height * 2/3, $aspect-ratio);
		}
		&.zombie-images--image__deadeye {
			background: url("../assets/deadeye.png") no-repeat center bottom;
			$aspect-ratio: 1.3846;
			@include auto-dimension($standard-height, $aspect-ratio);
		}
		&.zombie-images--image__fatty {
			background: url("../assets/fatty.png") no-repeat center bottom;
			$aspect-ratio: 0.6723;
			@include auto-dimension($standard-height * 7/6, $aspect-ratio);
		}
		&.zombie-images--image__necromancer {
			background: url("../assets/necromancer.png") no-repeat center bottom;
			$aspect-ratio: 0.7206;
			@include auto-dimension($standard-height, $aspect-ratio);
		}
		&.zombie-images--image__npc {
			background: url("../assets/npc.png") no-repeat center bottom;
			$aspect-ratio: 1.1899;
			@include auto-dimension($standard-height, $aspect-ratio);
		}
		&.zombie-images--image__runner {
			background: url("../assets/runner.png") no-repeat center bottom;
			$aspect-ratio: 0.5933;
			@include auto-dimension($standard-height, $aspect-ratio);
		}
		&.zombie-images--image__walker {
			background: url("../assets/walker.png") no-repeat center bottom;
			$aspect-ratio: 0.6790;
			@include auto-dimension($standard-height, $aspect-ratio);
		}
		&.zombie-images--image__wolf {
			background: url("../assets/wolf.png") no-repeat center bottom;
			$aspect-ratio: 1.3432;
			@include auto-dimension($standard-height * 5/6, $aspect-ratio);
		}
		&.zombie-images--image__wolfbomination {
			background: url("../assets/wolfbomination.png") no-repeat center bottom;
			$aspect-ratio: 1.3514;
			@include auto-dimension($abom-height, $aspect-ratio);
		}
	}
}
</style>
