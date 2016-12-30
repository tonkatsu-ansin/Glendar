<template lang="html">
  <div :class="{ 'chat-panel': true, 'dragging': this.stores.ApplicationStore.isDragging }">
    <ul class="logs">
      <li v-for="message in stores.MessagesStore.messages" class="log">{{message}}</li>
    </ul>
    <form v-on:submit.prevent="send">
      <input v-model="message">
      <button type="submit" name="button">送信</button>
    </form>
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
}

.chat-panel{
  position: fixed;
  left: 25px;
  bottom: 25px;
  width: calc(100% - 425px);
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
  justify-content: flex-start;
  padding: 0 10px;
}

form input{
  width: calc(100% - 100px);
  height: 24px;
  outline: none;

  font-size: 14px;
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
	props: ["component"],
  data: ()=>{
    return {
      message: "",
      stores: require("../../stores/Stores")
    }
  },
  computed: {
    getActiveComponent(){
      return this.stores.ComponentsStore.components.find((component)=>{
        return this.stores.ComponentsStore.activeId == component.id;
      })
    }
  },
  methods: {
    send(e){
      const TimeStamp = require("../../utilities/TimeStamp");
      this.stores.MessagesStore.messages.push(
        `${TimeStamp.makeTime()} ${this.message}`
      );
      this.message = "";
    }
  }
}
</script>
