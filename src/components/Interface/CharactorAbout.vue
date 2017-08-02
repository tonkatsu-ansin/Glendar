<template lang="html">
  <div class="charactor-about" v-on:click="clickAbout" v-on:mouseover="hoverAbout">
    <img :src="charactor.image" alt="" class="charactor-about-image">

    <div class="charactor-about-status" v-if="charactor.type == 'charactor'">
      <div class="status-name">{{charactor.name}}</div>
      <div class="status-params">HP: {{charactor.status.hp}} / {{charactor.status.max_hp}} MP: {{charactor.status.mp}}/ {{charactor.status.max_mp}} 防:{{charactor.status.protection}} 移動:{{charactor.status.move}}</div>
    </div>

    <div class="charactor-about-status" v-if="charactor.type == 'object'">
      <div class="status-name">{{charactor.name}}</div>
      <div class="status-params">{{charactor.memo}}</div>
    </div>
  </div>
</template>

<style scoped>

.charactor-about{
  display: flex;
  align-items: center;
  padding: 10px;

  color: #333;
  background: #fff;
  cursor: pointer;
}

.charactor-about:hover{
  background: #f5f5f5;
}

.charactor-about-image{
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.charactor-about-status{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;
}

.status-name{
  font-size: 14px;
  font-weight: 600;
}

.status-params{
  color: #999;
  font-size: 12px;
}
</style>

<script>
module.exports = {
  props: ["charactor"],
  data: ()=>{
    return {
      stores: require("../../stores/Stores")
    };
  },
  methods: {
    hoverAbout(){
      this.$emit("hover", this.charactor);
    },
    clickAbout(){
      this.$emit("click", this.charactor);
    }
  }
};
</script>
