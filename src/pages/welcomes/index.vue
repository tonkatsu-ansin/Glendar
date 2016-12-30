<template lang="html">
	<div class="content">
    <board :sizes="getBoardSize"></board>

    <chat-panel></chat-panel>

    <music-player></music-player>

    <component-infomation v-if="!stores.ApplicationStore.isFullDetail"></component-infomation>
    <charactor-detail v-else></charactor-detail>

    <initiative v-if="!stores.ApplicationStore.isFullDetail"></initiative>

		<file-dialog v-if="stores.ApplicationStore.isOpenFileDialog"></file-dialog>
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
const WSManager = require("../../utilities/WSManager")();
module.exports = {
	data: () => {
		return {
			stores: require("../../stores/Stores.js")
		};
	},
	beforeRouteEnter(from, to, next){
		next(vm=>{
			vm.initialize();
		});
	},
	computed: {
		getBoardSize(){
			return {
				x: this.stores.BoardsStore.boards[0].x,
				y: this.stores.BoardsStore.boards[0].y
			}
		}
	},
	methods: {
		initialize(){
      const components = WSManager.database().ref('boards/components/components');
      components.once("value")
      .then((data)=>{
        console.log(data.val());
        data.val().map((component, key)=>{
          this.stores.ComponentsStore.components.push(
            Object.assign(
              Object.create(null),
              component,
              {
                key
              }
            )
          );
        })

        components.on("child_added", (data) => {
          if(!this.stores.ComponentsStore.components.find((component)=>{
            return data.val().id == component.id;
          })){
            console.log("Add")
            this.stores.ComponentsStore.components.push(
              Object.assign(
                Object.create(null),
                data.val(),
                {
                  key: data.key
                }
              )
            );
          }
        });

        components.on('child_changed', (data) => {
          console.log("get", data.val());
          const target = data.val();
          this.stores.ComponentsStore.components = this.stores.ComponentsStore.components.map((component)=>{
            if(component.id == target.id){
              component = target;
              console.log("Search done");
            }
            return component;
          });

          if(this.stores.ComponentsStore.active.id == target.id){
            this.stores.ComponentsStore.active = target;
          };

          console.log(this.stores.ComponentsStore.components);
        });
      })
		}
	}
}
</script>
