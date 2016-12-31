<template lang="html">
  <div class="fieldinfo-panel">
    <p>
      a
    </p>
  </div>
</template>

<style scoped>

.logs{
  list-style: none;
  padding: 0;
  margin: 0;

  height: 125px;
  overflow: auto;
}

.logs .log{
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
}

.fieldinfo-panel{
  position: fixed;
  left: calc(100% - 725px);
  bottom: 25px;
  width: 325px;
  height: 175px;

  background: #fff;

  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
}

.dragging{
  pointer-events: none;
  opacity: 0.2;
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
module.exports = {
  
}
</script>
