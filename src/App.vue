<script>
import spawner from "./components/spawner.vue";

export default {
	name: 'app',
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	},
	components: {
		spawner,
	},
}
</script>

<template>
	<div id="app">
		<spawner></spawner>
	</div>
</template>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	background: url("./assets/skullbg-green.gif");
	color: white;
}
</style>
