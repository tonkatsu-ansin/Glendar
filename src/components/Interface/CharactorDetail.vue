<template lang="html">
  <div :class="{ 'charactor-detail': true, 'dragging': this.stores.ApplicationStore.isDragging }">
    <div class="charactor-about" v-if="active">
      <img :src="active.image" alt="" class="charactor-about-image">

      <div class="charactor-about-status">
        <div class="status-name">{{active.name}}</div>
        <div class="status-params">HP: 10 / 17 MP: 8 / 14</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.charactor-detail{
  position: fixed;
  top: 25px;
  right: 25px;
  width: 350px;
  height: 88px;
  padding: 1px 0;
  /*height: calc(50% - 50px);*/

  background: #fff;

  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
}

.charactor-about{
  display: flex;
  align-items: center;
  padding: 10px;
}

.charactor-about-image{
  width: 60px;
  height: 60px;
  border-radius: 2px;
  background: #f0f0f0;
}

.charactor-about-status{
  margin: 10px;
  display: block;
}

.status-name{
  font-weight: 600;
}

.status-params{
  color: #999;
  font-size: 12px;
  margin-top: 5px;
}

.dragging{
  pointer-events: none;
  opacity: 0.2;
}
</style>

<script>
module.exports = {
	props: ["charactor"],
  data: ()=>{
    return {
      stores: require("../../stores/Stores")
    }
  },
  computed: {
    active(){
      return this.stores.ComponentsStore.components.find((charactor)=>{
        return this.stores.ComponentsStore.activeId == charactor.id;
      }) || false;
    }
  },
  methods: {

  }
}
</script>
