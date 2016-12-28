<template lang="html">
	<div class="content">
    <board :sizes="{x:40,y:40}"></board>
	</div>
</template>

<style scoped>
.content{
  width: 100%;
  height: 100%;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
}
</style>

<script>
module.exports = {
	data: () => {
		return {
			stores: require("../../stores/Stores.js")
		};
	}
}
</script>
