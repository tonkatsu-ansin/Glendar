<template lang="html">
  <div :class="{ 'charactor-detail': true, 'dragging': this.stores.ApplicationStore.isDragging }">
    <charactor-about :charactor="active" v-if="active"></charactor-about>

    <div class="charactor-status" v-if="active">
      <dl v-for="(param, name) in active.status" v-if="active.type == 'charactor'">
        <dt>{{name}}</dt>
        <dd>
          <input v-model="active.status[name]" v-on:blur.prevent="updateStatus(active.key, name, param)">
          <div class="error-message" v-if="!validator(param)">数値を入れてね</div>
        </dd>
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
  width: 300px;
  height: 350px;

  color: #333;

  background: #fff;


  overflow: auto;
}

.charactor-about{
  display: flex;
  align-items: center;
  padding: 10px;
}

.charactor-about-image{
  width: 40px;
  height: 40px;
  background: #f0f0f0;
  margin-right: 10px;
}

.charactor-about-status{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.status-name{
  font-size: 14px;
  font-weight: 600;
}

.status-params{
  color: #999;
  font-size: 12px;
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
.error-message {
  color: #D03B3B;

}
</style>

<script>
const WSManager = require("../../utilities/WSManager")();
const calcFormula = require("calcFormula");

module.exports = {
  props: ["charactor"],
  data: ()=>{
    return {
      stores: require("../../stores/Stores")
    };
  },
  computed: {
    active(){
      return this.stores.ComponentsStore.active;
    }
  },
  methods: {
    close(){
      this.stores.ApplicationStore.isFullDetail = false;
    },
    validator(param) {
      return isFinite(param);
    },
    updateStatus(key, name, param){
      this.stores.ComponentsStore.active.status[name] = calcFormula.calcFormula(param.toString());

      console.log(key, name, param);
      if(!this.validator(param)) return;
      const data = {status: {}};
      data.status[name] = param;

      const sendData = this.stores.ComponentsStore.active;
      sendData.status = Object.assign(
        Object.create(null),
        this.stores.ComponentsStore.active.status,
        data.status
      );

      WSManager.database().ref(`/boards/components/components/${key}`).update(
        sendData
      );
    }
  }
};
</script>
