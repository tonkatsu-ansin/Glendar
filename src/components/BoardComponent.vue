<template lang="html">
  <div class="board-component" :style="getPosition" draggable="true" v-on:dragend="dragend">
    <img src="https://potato4d.me/res/images/icon.png" alt="">
  </div>
</template>

<style scoped>
.board-component{
  position: absolute;

  top: 0;
  left: 0;

  width: 49px;
  height: 49px;

  background: #fff;
}

img{
  width: 49px;
  height: 49px;
  pointer-events: none;
}
</style>

<script>
module.exports = {
	props: ["component"],
  data: ()=>{
    return {
      x: undefined,
      y: undefined
    }
  },
  computed: {
    getPosition(){
      return {
        transform: `translate(${this.x*50}px, ${this.y*50}px)`
      }
    }
  },
  created(){
    console.log(this);
    this.x = this.component.x;
    this.y = this.component.y;
  },
  methods: {
    dragend(e){
      console.log(e);
      this.x = Math.floor( (e.pageX + 25) / 50);
      this.y = Math.floor( (e.pageY     ) / 50);
    }
  }
}
</script>
