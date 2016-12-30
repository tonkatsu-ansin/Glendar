<template lang="html">
  <div :class="{ 'charactor-detail': true, 'dragging': this.stores.ApplicationStore.isDragging }" :style="{ 'height': active ? 'calc(100% - 50px)' : 'auto'}">
    <div class="charactor-about" v-if="active">
      <img :src="active.image" alt="" class="charactor-about-image">

      <div class="charactor-about-status" v-if="active.type == 'charactor'">
        <div class="status-name">{{active.name}}</div>
        <div class="status-params">HP: {{active.status.hp}} / {{active.status.max_hp}} MP: {{active.status.mp}}/ {{active.status.max_mp}} <a href="#" v-on:click.prevent="close">閉じる</a></div>
      </div>

      <div class="charactor-about-status" v-if="active.type == 'object'">
        <div class="status-name">{{active.name}}</div>
        <div class="status-params">{{active.memo}}</div>
      </div>
    </div>

    <div class="charactor-status" v-if="active">
      <h2>Status</h2>
      <dl v-for="(param, name) in active.status" v-if="active.type == 'charactor'">
        <dt>{{name}}</dt>
        <dd>{{param}}</dd>
      </dl>

      <dl class="">
        <dt>その他メモ</dt>
        <dd>{{active.memo}}</dd>
      </dl>
    </div>

    <div class="charactor-about" v-if="!active">
      <img src="https://placehold.it/120x120" alt="" class="charactor-about-image">
      <div class="charactor-about-status">
        <div class="status-name">Unselected</div>
        <div class="status-params" style="color:transparent;">.</div>
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
  /*height: calc(50% - 50px);*/

  color: #333;

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
  height: 20px;
}

.status-params{
  color: #999;
  font-size: 12px;
  margin-top: 5px;
  height: 25px;
}

.dragging{
  pointer-events: none;
  opacity: 0.2;
}

.charactor-status{
  margin: 10px;
}

.charactor-status dl{
  margin: 10px 0;
  padding: 0;
  display: flex;
}

.charactor-status dt{
  width: 100px;
}

.charactor-status dd{

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
    close(){
      this.stores.ApplicationStore.isFullDetail = false;
    }
  }
}
</script>
