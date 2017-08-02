<template lang="html">
  <div class="base-dialog">
    <div class="dialog-overlay" v-on:click="dismiss"></div>
    <div class="dialog-body" :style="getDialogSize">
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

  display: flex;
  align-content: center;
  justify-content: center;
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
  z-index: 10000;

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
  props: ["width", "height"],
  data: ()=>{
    return {
      stores: require("../../stores/Stores"),
    };
  },
  computed: {
    getDialogSize(){
      return {
        width: `${this.width || 450}px`,
        height: `${this.height || 400}px`
      };
    }
  },
  methods: {
    dismiss(){
      this.stores.ApplicationStore.dialogState = "";
    },
  }
};
</script>
