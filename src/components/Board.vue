<template lang="html">
  <div class="map" :style="getMapStyle">
    <div class="map-body">
      <board-component :component="component" v-for="component in getComponents"></board-component>
    </div>
  </div>
</template>

<style scoped>

.map-body{
  position: relative;

  width: 100%;
  height: 100%;

  background: url(http://blogimg.goo.ne.jp/user_image/6a/58/8961aa1199fcd7141921790d1b222527.jpg);
  background-size: cover;
  background-repeat: no-repeat;

  border-left: solid 1px #000;
  border-top: solid 1px #000;
}

.map-body::before{
  content: "";
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-repeat: repeat;
  background-size: 50px 50px;
  background-image: linear-gradient(
    transparent         0px,
    transparent        49px,
    rgba(0, 0, 0, 1.0) 49px
  ),
  linear-gradient(
    90deg,
    transparent        0px,
    transparent        49px,
    rgba(0, 0, 0, 1.0) 49px
  );
}
</style>

<script>
module.exports = {
	props: [ "sizes" ],
  data: () => {
		return {
      stores: require("../stores/Stores")
		}
	},
  computed: {
    getComponents(){
      return this.stores.ComponentsStore.components;
    },
    getMapStyle(){
      return {
        width : `${this.sizes.x * 50}px`,
        height: `${this.sizes.y * 50}px`,
      }
    }
  },
  methods: {

  }
}
</script>
