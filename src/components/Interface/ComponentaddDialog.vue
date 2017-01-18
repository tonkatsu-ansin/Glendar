<template lang="html">
  <div class="">
    <base-dialog>
      <form>
        <label>name</label>
        <input v-model="form.name"></input>
        <input v-model="form.id" type="hidden"></input>
        <label>memo</label>
        <textarea v-model="form.memo"></textarea>
        <form class="upload-form">
          <input type="file" name="file" class="upload-input" v-on:change="executeUpload">
        </form>
        <div class="status">
          <label>hp</label>
          <input v-model="form.hp"></input>
          <label>maxhp</label>
          <input v-model="form.max_hp"></input>
          <label>mp</label>
          <input v-model="form.mp"></input>
          <label>maxmp</label>
          <input v-model="form.max_mp"></input>
          <label>move</label>
          <input v-model="form.move"></input>
          <label>protection</label>
          <input v-model="form.protection"></input>
        </div>
        <div class="position">
          <label>x</label>
          <input v-model="form.x"></input>
          <label>y</label>
          <input v-model="form.y"></input>
        </div>
        <button type="submit" class="dialogButton" value="OK" v-on:click="onClickOKButton">OK</button>
        <button type="button" class="dialogButton" value="Cancel" v-on:click="dismiss">Cancel</button>
      </form>
    </base-dialog>
  </div>
</template>

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
      }
    };
  },
  methods: {
    *changeButtonState(){
      let btns = document.querySelectorAll(".dialogButton");
      console.log(btns);
      for(;;){
        for(let btn of btns){
          btn.disabled = true;
        }
        yield;
        for(let btn of btns){
          btn.disabled = false;
        }
        yield;
      }
    },
    executeUpload(){
      const changeButtonState = this.changeButtonState();
      changeButtonState.next();
      fetch(
        `${process.env["DICEAPI_ROOT"]}/upload`,
        {
          method: "POST",
          body: new FormData(document.querySelector(".upload-form"))
        }
      )
      .then((data)=>{
        return data.json();
      }).then((data) => {
        this.currentFile = data.filename;
        console.log(this.currentFile);
        changeButtonState.next();
      })
      .catch((err)=>{
        console.log(err);
      });
    },
    createComponent(){
      return WSManager.database().ref("boards/components").push({
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
      });
    },
    dismiss(){
      this.stores.ApplicationStore.dialogStateString = "";
    },
    onClickOKButton(){
      this.createComponent()
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
