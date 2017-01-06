<template lang="html">
  <div class="range-dialog">
    <base-dialog>
      <form v-on:submit.prevent="executeMake">
        <p>
          範囲：<input type="number" v-model="form.range">
        </p>

        <p>
          色：<input type="color" v-model="form.color">
        </p>

        <p class="dialog-buttons">
          <button type="submit" name="button" class="submit-button">作成</button>
          <button type="submit" name="button" class="cancel-button" v-on:click="dismiss">キャンセル</button>
        </p>
      </form>
    </base-dialog>
  </div>
</template>

<style scoped>

form{
  width: calc(100% - 40px);
  color: #333;
  font-family: Lato;
  padding: 20px;
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
const WSManager = require("../../utilities/WSManager")();
module.exports = {
  components: {
    "base-dialog": require("./BaseDialog.vue")
  },
  data: ()=>{
    return {
      stores: require("../../stores/Stores"),
      form: {
        color: "#000000",
        range: 1
      }
    };
  },
  methods: {
    dismiss(){
      this.stores.ApplicationStore.dialogStateString = false;
    },
    executeMake(){
    }
  }
};
</script>
