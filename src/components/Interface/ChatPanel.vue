<template lang="html">
  <div :class="{ 'chat-panel': true, 'dragging': this.stores.ApplicationStore.isDragging }">
    <ul class="logs">
      <li v-for="message in stores.MessagesStore.messages" class="log" :style="{color: message.color}">{{message.time}}: {{message.user}} {{message.text}}</li>
    </ul>
    <form v-on:submit.prevent="send">
      <input v-model="message.user" class="user" placeholder="名無し">
      <input v-model="message.text" class="text" placeholder="body here..." required="">
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
  font-weight: bold;
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
const Fetch = require("../../utilities/Fetch");
module.exports = {
	props: ["component"],
  data: ()=>{
    return {
      message: {
        user: "",
        text: ""
      },
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
      Fetch("",
        "POST",
        {
          color : "#999",
          user  : this.message.user || "名無し",
          text  : this.message.text,
          time  : TimeStamp.makeTime()
        }
      );
      this.message.text =  "";
    }
  }
}
</script>
