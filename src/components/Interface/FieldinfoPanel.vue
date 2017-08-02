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
        <input type="range" class="volume" v-model="music.volume">
        <audio style="display:hidden;" :src="stores.BoardsStore.boards[0].music.path" v-if="stores.BoardsStore.boards[0].music"></audio>
      </div>

      <div class="panel-element">
        <span class="element-icon background-icon" :style="{'background-image': 'url('+stores.BoardsStore.boards[0].background.path+')' }"></span>
        <span class="element-text">{{ getFileBasename(stores.BoardsStore.boards[0].background.key) }}</span>
      </div>
      <a href="#" v-on:click.prevent="openModal">背景/音楽変更</a>

      <music-player :filename="music.name" :playerdata="music.playerdata"></music-player>
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

.element-icon.background-icon{
  width: 25px;
  height: 25px;
  background-size: cover;
  background-repeat: no-repeat;
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

.volume{
  width: 50px;
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
const WSManager = require("../../utilities/WSManager")();
module.exports = {
  data: ()=>{
    return {
      stores: require("../../stores/Stores"),
      music: {
        name: "",
        volume: 10,
        playerdata: {
          "music-player": true,
          "is-animate": false
        }
      }
    };
  },
  watch: {
    "music.volume": function(){
      console.log(+(this.music.volume) * 0.001);
      this.$el.querySelector("audio").volume = +(this.music.volume) * 0.001;
    }
  },
  created(){
    const state = WSManager.database().ref("boards/state");

    setTimeout(()=>{
      this.$el.querySelector("audio").volume = 0.01;

      state.on("child_changed", (data) => {
        if(data.key == "music"){
          this.stores.BoardsStore.boards[0].music = data.val();
          console.log("かわった",  data.val());
          this.$el.querySelector("audio").pause();
          setTimeout(()=>{
            this.$el.querySelector("audio").currentTime = 0;
            this.$el.querySelector("audio").play();

            this.music.playerdata["is-animate"] = true;
            this.music.name = this.stores.BoardsStore.boards[0].music.key;
            console.log(this.music.name);
            setTimeout(()=>{
              this.music.playerdata["is-animate"] = false;
            }, 5000);
          }, 160);
        }
      });
    }, 32);
  },
  methods: {
    openModal(){
      this.stores.ApplicationStore.dialogState = "file";
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
