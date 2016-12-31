<template lang="html">
  <div :class="{ 'initiative': true, 'dragging': this.stores.ApplicationStore.isDragging }">
    <charactor-about :charactor="charactor" v-for="charactor in getCharactors" v-on:click="clickCharactor" v-on:hover="hoverCharactor"></charactor-about>
      <charactor-about :charactor="charactor" v-for="charactor in getCharactors" v-on:click="clickCharactor" v-on:hover="hoverCharactor"></charactor-about>
        <charactor-about :charactor="charactor" v-for="charactor in getCharactors" v-on:click="clickCharactor" v-on:hover="hoverCharactor"></charactor-about>
          <charactor-about :charactor="charactor" v-for="charactor in getCharactors" v-on:click="clickCharactor" v-on:hover="hoverCharactor"></charactor-about>
            <charactor-about :charactor="charactor" v-for="charactor in getCharactors" v-on:click="clickCharactor" v-on:hover="hoverCharactor"></charactor-about>

    <!-- <ul class="initiative-wrapper">
      <li>
        <ul class="initiative-header initiative-column">
          <li>名前</li>
          <li>HP</li>
          <li>MP</li>
          <li>防護点</li>
          <li>移動力</li>
          <li>行動</li>
          <li>その他</li>
        </ul>
      </li>

      <li v-for="charactor in getCharactors">
        <ul class="initiative-component initiative-column">
          <li>{{charactor.name}}</li>
          <li>{{charactor.status.hp}} / {{charactor.status.max_hp}}</li>
          <li>{{charactor.status.mp}} / {{charactor.status.max_mp}}</li>
          <li>{{charactor.status.move}}</li>
          <li>{{charactor.status.protection}}</li>
          <li><input type="checkbox" name="" value=""></li>
          <li>{{charactor.memo}}</li>
        </ul>
      </li>
    </ul> -->
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
  /*position: fixed;
  bottom: 25px;
  right: 25px;*/
  width: 300px;
  height: calc(100% - 530px);

  background: #fff;

  overflow: auto;
}

.dragging{
  pointer-events: none;
  opacity: 0.2;
}
</style>

<script>
module.exports = {
	props: ["component"],
  data: ()=>{
    return {
      stores: require("../../stores/Stores")
    }
  },
  computed: {
    getCharactors(){
      return this.stores.ComponentsStore.components.filter((component)=>{
        return component.type == "charactor";
      })
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
}
</script>
