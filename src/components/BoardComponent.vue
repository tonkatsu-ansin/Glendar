<template lang="html">
  <div class="board-component" :style="getPosition" draggable="true" v-on:dragstart="dragstart" v-on:dragend="dragend" v-on:mouseover="mouseover" v-on:contextmenu.prevent="emitContext">
    <img :src="component.image" alt="" v-if="component.type != 'range'">
    <div class="range" v-else><canvas width="400" height="400"></canvas></div>
  </div>
</template>

<style scoped>
.board-component{
  position: absolute;

  top: 0;
  left: 0;

  width: 39px;
  height: 39px;

  cursor: pointer;

  transition: transform 0.3s ease-out;
}

img{
  width: 39px;
  height: 39px;
  pointer-events: none;

  background: #fff;
}

.range{
  width: 40px;
  height: 40px;
  position: relative;
  background: rgba(0,0,0,0.01);
}

canvas{
  position: absolute;
  width: 200px;
  height: 200px;
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
  created(){
    setTimeout(()=>{
      if(this.component.type == "range"){
        const context = this.$el.querySelector("canvas").getContext("2d");
        const range = [
          [0,0,1,0,0],
          [0,1,1,1,0],
          [1,1,1,1,1],
          [0,1,1,1,0],
          [0,0,1,0,0]
        ];
        context.fillStyle = "rgba(0,0,0,0.6)";
        range.forEach((column, y)=>{
          column.forEach((point, x)=>{
            console.log(x, y, " = ", point);
            if(point) context.fillRect(x*80+2, y*80+2, 76, 76);
          });
        });
      }
    }, 32);
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
      console.log(e);
      WSManager.database().ref(`/boards/components/components/${this.component.key}`).update(
        Object.assign(
          Object.create(null),
          this.component,
          {
            x: Math.max( Math.min( Math.floor( (e.layerX + 10) / gridsize), this.stores.BoardsStore.boards[0].x), 0),
            y: Math.max( Math.min( Math.floor( (e.layerY     ) / gridsize), this.stores.BoardsStore.boards[0].y), 0),
          }
        )
      );

      this.stores.ApplicationStore.isDragging = false;
    }
  }
};
</script>
