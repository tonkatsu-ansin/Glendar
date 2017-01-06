<template lang="html">
  <div class="base-dialog">
    <div class="dialog-overlay" v-on:click="dismiss"></div>
    <div class="dialog-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.base-dialog{
  position: fixed;
  left: 0;
  top: 0;

  margin: 0;
  padding: 0;

  width: 100%;
  height: 100%;
}

.dialog-overlay{
  position: fixed;
  left: 0;
  top: 0;

  margin: 0;
  padding: 0;

  width: 100%;
  height: 100%;

  background: rgba(0,0,0,0.4);
}

.dialog-body{
  position: fixed;
  left: calc(50% - 225px);
  top: 0;
  bottom: 0;
  width: 450px;
  height: 400px;

  font-family: "Hiragino Mincho ProN";

  color: #fff;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  transition: left 0.4s ease-out;

  margin: auto;
}
</style>

<script>
module.exports = {
  data: ()=>{
    return {
      stores: require("../../stores/Stores"),
    };
  },
  methods: {
    dismiss(){
      this.stores.ApplicationStore.isOpenFileDialog = false;
    },
  }
};
</script>
