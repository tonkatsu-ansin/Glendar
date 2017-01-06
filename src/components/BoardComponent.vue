<template lang="html">
  <div class="board-component" :style="getPosition" draggable="true" v-on:dragstart="dragstart" v-on:dragend="dragend" v-on:mouseover="mouseover" v-on:contextmenu.prevent="emitContext">
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
const WSManager = require("../utilities/WSManager")();
const gridsize = 40;

module.exports = {
  props: ["component"],
  data: ()=>{
    return {
      stores: require("../stores/Stores")
    };
  },
  computed: {
    getPosition(){
      return {
        transform: `translate(${this.component.x*gridsize}px, ${this.component.y*gridsize}px)`
      };
    }
  },
  methods: {
    emitContext(e){
      this.$emit("rightclick", e);
      return false;
    },
    mouseover(){
      this.stores.ComponentsStore.activeId = this.component.id;
      this.stores.ComponentsStore.active = this.component;
    },
    dragstart(){
      this.stores.ApplicationStore.isDragging = true;
    },
    dragend(e){
      WSManager.database().ref(`/boards/components/components/${this.component.key}`).update(
        Object.assign(
          Object.create(null),
          this.component,
          {
            x: Math.max( Math.min( Math.floor( (e.pageX + 10) / gridsize), this.stores.BoardsStore.boards[0].x), 0),
            y: Math.max( Math.min( Math.floor( (e.pageY     ) / gridsize), this.stores.BoardsStore.boards[0].y), 0),
          }
        )
      );

      this.stores.ApplicationStore.isDragging = false;
    }
  }
};
</script>
