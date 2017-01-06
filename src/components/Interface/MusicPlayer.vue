<template lang="html">
  <div :class="playerdata">
    <span class="note">♪</span> <span class="name">{{filename}}</span>
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

}
.is-animate{
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
  margin-left: 10px;
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
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
module.exports = {
  props: ["filename", "playerdata"],
  data: ()=>{
    return {
      stores: require("../../stores/Stores"),
      name: "God",
    };
  }
};
</script>
