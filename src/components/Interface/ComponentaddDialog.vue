<template lang="html">
  <div class="">
    <form class="upload-form" style="display:none;">
      <input type="file" name="file" class="upload-input" v-on:change="executeUpload">
    </form>
    <base-dialog width="650" height="500">
      <form v-on:submit.prevent="createComponent">
        <header>
          <div class="header-icon" :style="getIconStyle" v-on:click="clickFileUploadButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" v-if="!form.image">
              <path d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"/>
            </svg>
          </div>

          <div class="header-edit">
            <input v-model="form.name" placeholder="コンポーネント名">

            <div class="position">
              <label>x</label>
              <input v-model="form.x">
              <label>y</label>
              <input v-model="form.y">
            </div>
          </div>
        </header>

        <div class="row">
          <div class="column">
            <h3 class="column-title">Status</h3>

            <div class="status">
              <p>
                <label>HP</label>
                <div class="inputs">
                  <input v-model="form.hp" class="input-half"> / <input v-model="form.max_hp" class="input-half">
                </div>
              </p>
              <p>
                <label>MP</label>
                <div class="inputs">
                  <input v-model="form.mp" class="input-half"> / <input v-model="form.max_mp" class="input-half">
                </div>
              </p>
              <p>
                <label>Move</label>
                <div class="inputs">
                  <input v-model="form.mp" class="input-mp">
                </div>
              </p>
              <p>
                <label>Protection</label>
                <div class="inputs">
                  <input v-model="form.protection" class="input-mp">
                </div>
              </p>
            </div>
          </div>

          <div class="column">
            <h3 class="column-title">Memo</h3>
            <textarea v-model="form.memo"></textarea>
          </div>

          <div class="column">
            <h3 class="column-title">Image</h3>

              <ul class="file-list">
                <!-- <li class="list-element">
                  <div class="list-filetype">
                    <span>+</span>
                  </div>

                  <div class="list-info">
                    <span class="list-filename">アップロード</span>
                  </div>
                </li> -->
                <li class="list-element" v-if="assets.length == 0">
                  <div class="list-filetype">⌛</div>

                  <div class="list-info">
                    <span class="list-filename">Loading...</span>
                  </div>
                </li>

                <li v-for="(asset, index) in assets" :class="{'list-element': true, 'active': index == active}" v-on:click="selectFile(asset.filename)">

                  <div v-if="getFileType(asset.filename) == 'image'" class="list-filetype" :style="{'background-image': 'url(http://glendar.s3-website-ap-northeast-1.amazonaws.com/'+ asset.filename + ')'  }"></div>
                  <div v-else-if="getFileType(asset.filename) == 'music'" class="list-filetype">♪</div>
                  <div v-else class="list-filetype">?</div>

                  <div class="list-info">
                    <span class="list-filename">{{asset.key}}</span>
                  </div>
                </li>
              </ul>

          </div>
        </div>

        <input v-model="form.id" type="hidden">

        <div class="dialog-buttons">
          <button type="submit" name="button" class="submit-button">決定</button>
          <button type="button" name="button" class="cancel-button" v-on:click="dismiss">キャンセル</button>
        </div>
      </form>
    </base-dialog>
  </div>
</template>

<style scoped>
form{
  width: 100%;
  height: 100%;
  color: #555;
}

header{
  padding: 20px;
  display: flex;
  align-items: stretch;
}

.header-edit{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
}

.header-icon{
  width: 80px;
  height: 80px;
  margin-right: 20px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  background-size: cover;
  background-position: center;
  background-color: #f0f0f0;
}

.header-icon:hover svg{
  transform: scale(1.5);
}
.header-icon svg{
  fill: #555;
  transition: transform 0.2s ease-out;
}

input{
  color: #999;
  background: #F0F0F0;
  padding: 5px;
  border: none;
  outline: none;
  font-size: 14px;
}

.row{
  width: calc(100% - 40px);
  padding: 0 20px 0;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}

.row .column{
  width: 180px;
  min-height: 300px;
}

.column-title{
  font-size: 16px;
  margin: 0 0 15px;
  padding: 0;
}

.inputs{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.inputs input{
  flex: 1;
}

.inputs .input-half{
  width: calc(50% - 20px);
  flex: none;
}

textarea{
  width: calc(100% - 10px);
  height: 240px;
  margin-top: 5px;
  background: #f0f0f0;
  border: none;
  resize: none;
  outline: none;
  color: #999;
  padding: 5px;
}

p{
  margin: 5px 0 10px;
}

.dialog-buttons{
  width: 100%;
  height: 80px;
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

.file-list{
  padding: 0;
  margin: 0;
  list-style: none;
  color: #333;
  width: 100%;
  height: 248px;
  font-family: Lato;

  overflow: auto;

  border: solid 1px #e5e5e5;
}

.list-element{
  display: flex;
  padding: 10px;
  align-items: center;
  border-bottom: solid 1px #e5e5e5;
}

.list-element:hover,
.list-element.active{
  color: #fff;
  background: #55aaff;
  cursor: pointer;
}

.list-filetype{
  width: 30px;
  height: 30px;
  margin-right: 10px;
  font-size: 20px;
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
  width: calc(100% - 50px);
}

.list-filename{
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}

.list-filepath{
  font-size: 12px;
}
</style>

<script>
const WSManager = require("../../utilities/WSManager")();
module.exports = {
  components: {
    "base-dialog": require("./BaseDialog.vue")
  },
  data: () => {
    return {
      stores: require("../../stores/Stores"),
      currentFile: "", //コンポーネントのアイコンにする画像のファイル名が入ります
      form: {
        name: "",
        id: 0,
        image: 0,
        memo: "",
        hp: 0,
        max_hp: 0,
        mp: 0,
        max_mp: 0,
        move: 0,
        protection: 0,
        x: 0,
        y: 0
      },
      assets: []
    };
  },
  created(){
    const assetsListener = WSManager.database().ref("boards/assets");
    assetsListener.on("child_added", (data) => {
      if(this.getFileType(data.val().key) == "image") this.assets.push(data.val());
    });
  },
  computed: {
    getIconStyle(){
      if(this.form.image){
        return {
          backgroundImage: `url(${this.form.image})`
        };
      }else{
        return {};
      }
    }
  },
  methods: {
    getFileType(filename){
      const f = filename.split(".");

      switch ( (f[f.length-1].toLowerCase()) ) {
      case "jpg":
      case "jpeg":
      case "png":
        return "image";
      case "wav":
      case "mp3":
        return "music";
      }
      return;
    },
    selectFile(filename){
      this.form.image = `http://glendar.s3-website-ap-northeast-1.amazonaws.com/${filename}`;
    },
    clickFileUploadButton(){
      this.$el.querySelector("input[type='file']").click();
    },
    changeButtonState(){
      let btns = this.$el.querySelectorAll(".dialogButton");
      console.log(btns);
      for(const btn of btns){
        btn.disabled = !btn.disabled;
      }
    },
    executeUpload(){
      this.changeButtonState();
      fetch(
        `${process.env["DICEAPI_ROOT"]}/upload`,
        {
          method: "POST",
          body: new FormData(this.$el.querySelector(".upload-form"))
        }
      )
      .then((data)=>{
        return data.json();
      }).then((data) => {
        this.currentFile = data.filename;
        console.log(this.currentFile);
        this.form.image = `http://glendar.s3-website-ap-northeast-1.amazonaws.com/${this.currentFile}`;
        console.log(this.form.image);
        this.changeButtonState();
        console.log(this);
      })
      .catch((err)=>{
        console.log(err);
      });
    },
    dismiss(){
      this.stores.ApplicationStore.dialogStateString = "";
    },
    createComponent(){
      WSManager.database().ref("boards/components/components").push({
        image: `http://glendar.s3-website-ap-northeast-1.amazonaws.com/${this.currentFile}`,
        is_locking: false,
        name: this.form.name,
        memo: this.form.memo,
        type: "charactor",
        status:{
          hp: parseInt(this.form.hp, 10),
          max_hp: parseInt(this.form.max_hp, 10),
          mp: parseInt(this.form.max_mp, 10),
          max_mp: parseInt(this.form.max_mp, 10),
          move: parseInt(this.form.move, 10),
          protection: parseInt(this.form.protection, 10),
        },
        x: parseInt(this.form.x, 10),
        y: parseInt(this.form.y, 10)
      })
      .then(() => {
        this.dismiss();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
};
</script>
