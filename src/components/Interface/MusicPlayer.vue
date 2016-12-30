<template lang="html">
  <div :class="getMusicPlayerState">
    <span class="note">♪</span> <span class="name">サリアの歌</span>
    <input type="range" class="volume" v-model="volume">
    <audio src="/test.mp3" autoplay></audio>
  </div>
</template>

<style scoped>
.music-player{
  position: fixed;
  left: -170px;
  top: 25px;
  width: 190px;
  height: 55px;

  font-family: "Hiragino Mincho ProN";

  color: #fff;
  background: #111;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;

  transition: left 0.4s ease-out;
}

.music-player.first{
  transition: all 0.0s;

  animation: musicanim 5s ease-in-out 1;
}

.music-player:hover{
  left: 0px;
  transition: left 0.4s ease-out;
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
  right: -7px;
  top: 18px;
  width: 40px;
  transform: rotate(-90deg);
  outline: none;
  cursor: pointer;
}

.dragging{
  pointer-events: none;
  opacity: 0.2;
}

@keyframes musicanim {
   0% {left: -190px}
   5%{left: -190px}
   15%{left: 0px}
   85%{left: 0px}
   95%{left: -170px}
  100%{left: -170px}
}

</style>

<script>
module.exports = {
	props: ["component"],
  data: ()=>{
    return {
      stores: require("../../stores/Stores"),
      name: "God",
      volume: 100,
      isFirst: true
    }
  },
  watch: {
    "volume": function(e){
      this.$el.querySelector("audio").volume = this.volume * 0.01;
    }
  },
  created(){
    console.log(this);
    setTimeout(()=>{
      this.isFirst = false;
    }, 5000);
  },
  computed: {
    getCharactors(){
      return this.stores.ComponentsStore.components.filter((component)=>{
        return component.type == "charactor";
      })
    },
    getMusicPlayerState(){
      return {
        'music-player': true,
        'first': this.isFirst,
        'dragging': this.stores.ApplicationStore.isDragging
      }
    }
  },
}
</script>
