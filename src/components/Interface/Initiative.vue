<template lang="html">
  <div :class="{ 'initiative': true, 'dragging': this.stores.ApplicationStore.isDragging }">
    <charactor-about :charactor="charactor" v-for="charactor in getCharactors" v-on:click="clickCharactor" v-on:hover="hoverCharactor"></charactor-about>
    <charactor-about :charactor="charactor" v-for="charactor in getCharactors" v-on:click="clickCharactor" v-on:hover="hoverCharactor"></charactor-about>
    <charactor-about :charactor="charactor" v-for="charactor in getCharactors" v-on:click="clickCharactor" v-on:hover="hoverCharactor"></charactor-about>
    <charactor-about :charactor="charactor" v-for="charactor in getCharactors" v-on:click="clickCharactor" v-on:hover="hoverCharactor"></charactor-about>
    <charactor-about :charactor="charactor" v-for="charactor in getCharactors" v-on:click="clickCharactor" v-on:hover="hoverCharactor"></charactor-about>
  </div>
</template>

<style scoped>

.initiative-wrapper{
  width: 560px;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  list-style: none;
  flex-wrap: wrap;
}

.initiative-column{
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 12px;
}

.initiative-column li{
  flex: 1;
  text-align: center;
  padding: 10px 0;
  width: 80px;
  height: 15px;
  overflow: auto;
}

.initiative{
  width: 300px;
  height: calc(100% - 530px);

  background: #fff;

  overflow: auto;
}

</style>

<script>
module.exports = {
  props: ["component"],
  data: ()=>{
    return {
      stores: require("../../stores/Stores")
    };
  },
  computed: {
    getCharactors(){
      return this.stores.ComponentsStore.components.filter((component)=>{
        return component.type == "charactor";
      });
    }
  },
  methods: {
    hoverCharactor(charactor){
      console.log(charactor);
      // this.stores.ComponentsStore.activeId = charactor.id;
      // this.stores.ComponentsStore.active = charactor;
    },
    clickCharactor(charactor){
      console.log(charactor);
      this.stores.ComponentsStore.activeId = charactor.id;
      this.stores.ComponentsStore.active = charactor;
    }
  }
};
</script>
