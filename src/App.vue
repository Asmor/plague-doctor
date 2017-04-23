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
</style>
