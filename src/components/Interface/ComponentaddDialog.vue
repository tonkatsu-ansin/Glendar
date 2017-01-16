<template lang="html">
  <div class="">
    <base-dialog>
      <form>
        <input v-model="form.id" type="hidden"></input>
        <input type=""v-model="form.image"></input>
        <input v-model="form.memo"></input>
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
        <div class="form.position">
          <label>x</label>
          <input v-model="form.x"></input>
          <label>y</label>
          <input v-model="form.y"></input>
        </div>
        <button type="submit" class="dialogButton" value="OK">OK</button>
        <button type="submit" class="dialogButton" value="Cancel">Cancel</button>
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
      currentFile: "", //コンポーネントのアイコンにする画像のファイル名が入ります
      form: {
        id: 0,
        image: 0,
        memo: 0,
        hp: 0,
        max_hp: 0,
        mp: 0,
        max_mp: 0,
        move: 0,
        protection: 0,
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    * changeButtonState(){
      const btns = document.querySelectorAll(".dialogButton");
      console.log(btns);
      while(true){
        for(const btn of btns){
          btn.disabled = true;
        }
        yield;
        for(const btn of btns){
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

    },
    dismiss(){

    }
  }
}
</script>
