<template lang="html">
  <div class="board-component" :style="getPosition" draggable="true" v-on:dragstart="dragstart" v-on:dragend="dragend" v-on:mouseover="mouseover">
    <img :src="component.image" alt="">
  </div>
</template>

<style scoped>
.board-component{
  position: absolute;

  top: 0;
  left: 0;

  width: 39px;
  height: 39px;

  background: #fff;

  cursor: pointer;

  transition: transform 0.3s ease-out;
}

img{
  width: 39px;
  height: 39px;
  pointer-events: none;
}
</style>

<script>
const gridsize = 40;

module.exports = {
	props: ["component"],
  data: ()=>{
    return {
      stores: require("../stores/Stores")
    }
  },
  computed: {
    getPosition(){
      return {
        transform: `translate(${this.component.x*gridsize}px, ${this.component.y*gridsize}px)`
      }
    }
  },
  methods: {
    mouseover(e){
      console.log(e);
      this.stores.ComponentsStore.activeId = this.component.id;
      console.log(this.stores.ComponentsStore.activeId);
    },
    dragstart(e){
      this.stores.ApplicationStore.isDragging = true;
    },
    dragend(e){
      console.log(e);
      this.component.x = Math.max(
        0,
        Math.min(
          Math.floor( (e.pageX - 390) / gridsize),
          this.stores.BoardsStore.boards[0].x-1
        )
      );

      this.component.y = Math.max(
        0,
        Math.min(
          Math.floor( (e.pageY - 400) / gridsize),
          this.stores.BoardsStore.boards[0].y-1
        )
      );

      this.stores.ApplicationStore.isDragging = false;
    }
  }
}
</script>
