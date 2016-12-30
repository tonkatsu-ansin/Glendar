<template lang="html">
	<div class="content">
    <board :sizes="getBoardSize"></board>

    <chat-panel></chat-panel>

    <component-infomation v-if="!stores.ApplicationStore.isFullDetail"></component-infomation>
    <charactor-detail v-else></charactor-detail>

    <initiative v-if="!stores.ApplicationStore.isFullDetail"></initiative>
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
	},
	computed: {
		getBoardSize(){
			return {
				x: this.stores.BoardsStore.boards[0].x,
				y: this.stores.BoardsStore.boards[0].y
			}
		}
	}
}
</script>
