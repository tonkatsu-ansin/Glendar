<template lang="html">
  <div class="fieldinfo-panel">
    <ul class="element-list">
      <div class="panel-element">
        <span class="element-icon" style="color:#E6BD4D">☀</span>
        <span class="element-text">12:00</span>
      </div>

      <div class="panel-element">
        <span class="element-icon" style="color:#00A6F0">♪</span>
        <span class="element-text">{{ getFileBasename(stores.BoardsStore.boards[0].music.key) }}</span>
      </div>

      <div class="panel-element">
        <span class="element-icon">🌊</span>
        <span class="element-text">{{ getFileBasename(stores.BoardsStore.boards[0].background.key) }}</span>
      </div>
      <a href="#" v-on:click.prevent="openModal">背景/音楽変更</a>
    </ul>
  </div>
</template>

<style scoped>

.element-list{
  margin: 10px;
  padding: 0;
  list-style: none;
}

.panel-element{
  margin-bottom: 10px;
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.element-icon{
  font-size: 24px;
  display: inline-block;
  width: 30px;
}

.element-text{
  width: calc(100% - 40px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  font-size: 14px;
  vertical-align: middle;
  margin-left: 10px;
}

.fieldinfo-panel{
  width: 315px;
  height: 180px;

  background: #555;

  /*box-shadow: 0 3px 6px rgba(0,0,0,0.1);*/
  font-family: "Hiragino Sans";
}

form{
  background: #f5f5f5;
  width: calc(100% - 20px);
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

form .user{
  width: 100px;
  height: 24px;
  outline: none;

  font-size: 12px;
}

form .text{
  width: calc(100% - 220px);
  height: 24px;
  outline: none;

  font-size: 12px;
}

form button{
  display: block;
  background: #00aaee;
  border: none;
  color: #fff;
  width: 80px;
  height: 28px;
  font-size: 16px;
  margin-left: 10px;
}
</style>

<script>
module.exports = {
  data: ()=>{
    return {
      stores: require("../../stores/Stores")
    };
  },
  methods: {
    openModal(){
      this.stores.ApplicationStore.dialogStateString = "file";
    },
    getFileBasename(filename){
      if(!filename) return filename;
      const elements = filename.split(".");
      if(elements.length >= 1){
        elements.pop();
      }
      return elements.join("");
    }
  }
};
</script>
