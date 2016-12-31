<template lang="html">
  <div class="music-player">
    <span class="note">♪</span> <span class="name">ファイル選択</span>
  </div>
</template>

<style scoped>
.music-player{
  position: fixed;
  left: -175px;
  top: 105px;
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
   95%{left: -175px}
  100%{left: -175px}
}

</style>
