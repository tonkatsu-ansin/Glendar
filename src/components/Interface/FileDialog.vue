<template lang="html">
  <div class="file-dialog">
    <div class="dialog-overlay" v-on:click="dismiss"></div>
    <div class="dialog-body">
      <ul class="file-list">
        <li class="list-element" v-on:click="selectFile(number)">
          <div class="list-filetype">
            <span>+</span>
          </div>

          <div class="list-info">
            <span class="list-filename">ファイルをアップロード</span>
          </div>
        </li>

        <li v-for="number in 10" :class="{'list-element': true, 'active': number == active}" v-on:click="selectFile(number)">
          <div class="list-filetype">
            <span>♪</span>
          </div>

          <div class="list-info">
            <span class="list-filename">ファイル名ファイル名ファイル名</span>
            <span class="list-filepath">https://potato4d.me/res/images/icon.png</span>
          </div>
        </li>
      </ul>

      <div class="dialog-buttons">
        <button type="button" name="button" class="submit-button">決定</button>
        <button type="button" name="button" class="cancel-button" v-on:click="dismiss">キャンセル</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-dialog{
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

.file-list{
  padding: 0;
  margin: 0;
  list-style: none;
  color: #333;
  height: calc(100% - 75px);
  font-family: Lato;

  overflow: auto;
}

.list-element{
  display: flex;
  padding: 10px;
  align-items: center;
}

.list-element:hover,
.list-element.active{
  color: #fff;
  background: #55aaff;
  cursor: pointer;
}

.list-filetype{
  width: 60px;
  height: 45px;
  margin-right: 10px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-info{
  display: flex;
  flex-wrap: wrap;
}

.list-filename{
  font-size: 16px;
  font-weight: bold;
}

.list-filepath{
  font-size: 12px;
}

.dialog-buttons{
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button{
  width: 120px;
  height: 30px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin: 10px;
  outline: none;
}

.submit-button{
  background: #00aaff;
  color: #fff;
}

.cancel-button{
  background: #aaa;
  color: #fff;
}
</style>

<script>
module.exports = {
  data: ()=>{
    return {
      stores: require("../../stores/Stores"),
      active: -1
    }
  },
  methods: {
    selectFile(target){
      this.active = target;
    },
    dismiss(){
      this.stores.ApplicationStore.isOpenFileDialog = false;
    }
  }
}
</script>
