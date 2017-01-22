<template>
  <div class="context-menu" :style="getContextMenuStyle">
    <ul>
      <li v-on:click='openDialog("componentadd")'>コンポーネントの追加</li>
      <li>範囲を作成</li>
      <li v-on:click="dismiss">消す</li>
    </ul>
  </div>
</template>

<style scoped>
.context-menu{
  position: absolute;

  width: 150px;

  z-index: 10000;

  font-size: 12px;

  background: #fff;
  box-shadow: 0 3px 3px rgba(0,0,0,0.2);
}

ul{
  list-style: none;
  padding: 0;
  margin: 0;
}

li{
  padding: 5px 10px;
  cursor: pointer;
}

li:hover{
  background: rgba(0,0,0,0.04);
}
</style>

<script>
module.exports = {
  props: ["pos"],
  data: ()=>{
    return {
      stores: require("../../stores/Stores"),
    };
  },
  computed: {
    getContextMenuStyle(){
      return {
        top : `${this.pos.y}px`,
        left: `${this.pos.x}px`,
      };
    }
  },
  methods: {
    openDialog(name){
      this.dismiss();
      this.stores.ApplicationStore.dialogState = name;
    },
    dismiss(){
      this.stores.ApplicationStore.isShowContextMenu = false;
    }
  }
};
</script>
