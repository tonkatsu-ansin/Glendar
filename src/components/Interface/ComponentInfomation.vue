<template lang="html">
  <div :class="{ 'component-infomation': true, 'dragging': this.stores.ApplicationStore.isDragging }">

    <div class="component-about" v-if="active">
      <img :src="active.image" alt="" class="component-about-image">

      <div class="component-about-status" v-if="active.type == 'charactor'">
        <div class="status-name">{{active.name}}</div>
        <div class="status-params">HP: 10 / 17 MP: 8 / 14</div>
      </div>

      <div class="component-about-status" v-if="active.type == 'object'">
        <div class="status-name">{{active.name}}</div>
        <div class="status-params">{{active.memo}}</div>
      </div>
    </div>

    <div class="component-about" v-else>
      <img src="https://placehold.it/120x120" alt="" class="component-about-image">
      <div class="component-about-status">
        <div class="status-name">Unselected</div>
        <div class="status-params" style="color:transparent;">.</div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.component-infomation{
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

.component-about{
  display: flex;
  align-items: center;
  padding: 10px;
}

.component-about-image{
  width: 60px;
  height: 60px;
  border-radius: 2px;
  background: #f0f0f0;
}

.component-about-status{
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
	props: ["component"],
  data: ()=>{
    return {
      stores: require("../../stores/Stores")
    }
  },
  computed: {
    active(){
      return this.stores.ComponentsStore.components.find((component)=>{
        return this.stores.ComponentsStore.activeId == component.id;
      }) || false;
    }
  },
  methods: {

  }
}
</script>
