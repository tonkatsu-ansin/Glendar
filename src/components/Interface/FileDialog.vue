<template lang="html">
  <div class="file-dialog">
    <div class="dialog-overlay" v-on:click="dismiss"></div>
    <div class="dialog-body">
      <ul class="file-list">
        <li class="list-element" v-on:click="openUploadDialog">
          <div class="list-filetype">
            <span>+</span>
          </div>

          <div class="list-info">
            <span class="list-filename">ファイルをアップロード</span>
          </div>
        </li>

        <li v-for="(asset, index) in assets" :class="{'list-element': true, 'active': index == active}" v-on:click="selectFile(index)">

          <div v-if="getFileType(asset.filename) == 'image'" class="list-filetype" :style="{'background-image': 'url(http://glendar.s3-website-ap-northeast-1.amazonaws.com/'+ asset.filename + ')'  }"></div>
          <div v-else-if="getFileType(asset.filename) == 'music'" class="list-filetype">♪</div>
          <div v-else class="list-filetype">?</div>

          <div class="list-info">
            <span class="list-filename">{{asset.key}}</span>
            <span class="list-filepath">http://glendar.s3-website-ap-northeast-1.amazonaws.com/{{asset.filename}}</span>
          </div>
        </li>
      </ul>

      <div class="dialog-buttons">
        <button type="button" name="button" class="submit-button" v-on:click="enterFile">決定</button>
        <button type="button" name="button" class="cancel-button" v-on:click="dismiss">キャンセル</button>
      </div>

      <form class="upload-form">
        <input type="file" name="file" class="upload-input" v-on:change="executeUpload">
      </form>
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
  width: 100%;
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
  width: 45px;
  height: 45px;
  margin-right: 10px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-size: cover;
  background-repeat: no-repeat;
}

.list-info{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  flex: 1;
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

.upload-form{
  display: none;
}
</style>

<script>
const Fetch = require("../../utilities/Fetch");
const WSManager = require("../../utilities/WSManager")();
module.exports = {
  data: ()=>{
    return {
      stores: require("../../stores/Stores"),
      active: -1,
      assets: []
    }
  },
  created(){
    const assetsListener = WSManager.database().ref('boards/assets');
    assetsListener.on("child_added", (data) => {
      this.assets.push(data.val());
    });
  },
  methods: {
    getFileType(filename){
      const f = filename.split('.');

      switch ( (f[f.length-1].toLowerCase()) ) {
        case "jpg":
        case "jpeg":
        case "png":
          return "image";
          break;

        case "wav":
        case "mp3":
          return "music";
          break;
        default:
      }
      return ;
    },
    selectFile(target){
      this.active = target;
    },
    dismiss(){
      this.stores.ApplicationStore.isOpenFileDialog = false;
    },
    openUploadDialog(){
      this.$el.querySelector(".upload-input").click();
    },
    executeUpload(){
      console.log(this.$el.querySelector(".upload-form"));
      console.log(new FormData(this.$el.querySelector(".upload-form")));
      fetch(
        `${process.env["DICEAPI_ROOT"]}/upload`,
        {
          method: "POST",
          body: new FormData(document.querySelector(".upload-form"))
        }
      )
      .then((data)=>{
        console.log(data);
      })
      .catch((err)=>{
        console.log(err);
      });
    },
    enterFile(){
      const target = this.assets[this.active];
      console.log(target);

      switch (this.getFileType(target.key)) {
        case "image": {
          const background = `http://glendar.s3-website-ap-northeast-1.amazonaws.com/${target.filename}`;
          console.log(background);
          WSManager.database().ref(`/boards/state`).update({
            background
          });
        }
          break;

        case "music": {

        }
          break;
      }
      this.dismiss();
    }
  }
}
</script>
