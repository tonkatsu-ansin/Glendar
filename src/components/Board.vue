<template lang="html">
  <div class="map">
    <div class="map-body" v-on:contextmenu.prevent="makeContextMenu" :style="getMapStyle" v-on:click="dismissContextMenu">
      <board-component :component="component" v-for="component in getComponents" v-on:rightclick="makeContextMenu"></board-component>
    </div>
    <context-menu v-if="stores.ApplicationStore.isShowContextMenu" :pos="mouse"></context-menu>
  </div>
</template>

<style scoped>

.map{
  width: 100%;
  height: calc(100% - 180px);
  overflow: auto;
  position: relative;
}

.map-body{
  position: relative;

  width: 100%;
  height: 100%;

  background-size: cover;
  background-repeat: no-repeat;

  /*border: solid 400px #333;*/
}

.map-body::before{
  content: "";
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-repeat: repeat;
  background-size: 40px 40px;
  background-image: linear-gradient(
    transparent         0px,
    transparent        39px,
    rgba(0, 0, 0, 1.0) 39px
  ),
  linear-gradient(
    90deg,
    transparent        0px,
    transparent        39px,
    rgba(0, 0, 0, 1.0) 39px
  );
}
</style>

<script>
const WSManager = require("../utilities/WSManager")();
module.exports = {
  props: [ "sizes" ],
  data: () => {
    return {
      stores: require("../stores/Stores"),
      mouse: {
        x: 0,
        y: 0
      }
    };
  },
  created(){
    const state = WSManager.database().ref("boards/state");

    state.on("child_changed", (data) => {
      if(data.key == "background"){
        this.stores.BoardsStore.boards[0].background = data.val();
        console.log("かわった",  data.val());
      }
    });
  },
  computed: {
    getComponents(){
      return this.stores.ComponentsStore.components;
    },
    getMapStyle(){
      return {
        width : `${this.sizes.x * 40}px`,
        height: `${this.sizes.y * 40}px`,
        backgroundImage: `url(${this.stores.BoardsStore.boards[0].background.path})`
      };
    }
  },
  methods: {
    emitContext(e){
      this.$emit("rightclick", e);
      return false;
    },
    dismissContextMenu(){
      this.stores.ApplicationStore.isShowContextMenu = false;
    },
    makeContextMenu(e){
      this.stores.ApplicationStore.isShowContextMenu = true;
      console.log("コンテキストメニューつけた");
      console.log(e);
      this.mouse = {
        x: e.layerX,
        y: e.layerY
      };
    }
  }
};
</script>
