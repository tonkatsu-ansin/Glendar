<template lang="html">
  <div :class="getMusicPlayerState">
    <span class="note">♪</span> <span class="name" v-if="stores.BoardsStore.boards[0].music">{{ stores.BoardsStore.boards[0].music.key }}</span>
    <input type="range" class="volume" v-model="volume">
    <audio :src="stores.BoardsStore.boards[0].music.path" v-if="stores.BoardsStore.boards[0].music" autoplay></audio>
  </div>
</template>

<style scoped>
.music-player{
  position: fixed;
  left: -200px;
  top: 25px;
  width: 190px;
  height: 55px;

  font-family: Lato;

  color: #fff;
  background: #111;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;

  transition: left 0.35s ease-out;
}

.music-player.first{
  transition: all 0.0s;

  animation: musicanim 5s ease-in-out 1;
}

.music-player:hover{
  left: 0px;
  transition: left 0.35s ease-out;
}

.note{
  font-size: 30px;
  color: #00BEFF;
}

.name{
  font-size: 16px;
  display: block;
  margin-left: 10px;
}

.volume{
  position: absolute;
  right: -9px;
  top: 18px;
  width: 40px;
  transform: rotate(-90deg);
  outline: none;
  cursor: pointer;
}

@keyframes musicanim {
   0% {left: -200px}
   5%{left: -200px}
   15%{left: 0px}
   85%{left: 0px}
   95%{left: -200px}
  100%{left: -200px}
}

</style>

<script>
const WSManager = require("../../utilities/WSManager")();
module.exports = {
  props: ["component"],
  data: ()=>{
    return {
      stores: require("../../stores/Stores"),
      name: "God",
      volume: 50,
      isFirst: true
    };
  },
  watch: {
    "volume": function(){
      this.$el.querySelector("audio").volume = this.volume * 0.01;
    }
  },
  created(){
    const state = WSManager.database().ref("boards/state");

    state.on("child_changed", (data) => {
      if(data.key == "music"){
        this.stores.BoardsStore.boards[0].music = data.val();
        console.log("かわった",  data.val());
      }
    });
  },
  computed: {
    getCharactors(){
      return this.stores.ComponentsStore.components.filter((component)=>{
        return component.type == "charactor";
      });
    },
    getMusicPlayerState(){
      return {
        "music-player": true,
        "first": this.isFirst,
        "dragging": this.stores.ApplicationStore.isDragging
      };
    }
  },
};
</script>
