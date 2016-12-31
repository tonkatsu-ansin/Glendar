<template lang="html">
  <div :class="{ 'chat-panel': true, 'dragging': this.stores.ApplicationStore.isDragging }">
    <ul class="logs">
      <li v-for="message in stores.MessagesStore.messages" class="log" :style="{color: message.color}">{{message.time}}: {{message.user}} {{message.text}}</li>
    </ul>
    <form v-on:submit.prevent="send">
      <input v-model="message.user" class="user" placeholder="名無し" required>
      <input v-model="message.text" class="text" placeholder="body here..." required>
      <button type="submit" name="button">送信</button>
    </form>
  </div>
</template>

<style scoped>

.logs{
  list-style: none;
  padding: 0;
  margin: 10px;

  height: 120px;
  overflow: auto;
  background: #fff;
}

.logs .log{
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
}

.chat-panel{
  width: calc(100% - 310px);
  height: 180px;

  background: #555;
}

.dragging{
  pointer-events: none;
  opacity: 0.2;
}

form{
  width: calc(100% - 20px);
  height: 40px;
  display: flex;
  align-items: flex-start;;
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
const Fetch = require("../../utilities/Fetch");
module.exports = {
	props: ["component"],
	beforeRouteEnter(from, to, next){
		next(vm=>{
			vm.initialize();
		});
	},
  data: ()=>{
    return {
      message: {
        user: "",
        text: ""
      },
      stores: require("../../stores/Stores")
    }
  },
  created(){
    const messages = WSManager.database().ref('boards/chat');
    messages.once("value")
    .then((data)=>{
      data = data.val()
      console.log(data);
      Object.keys(data).forEach((key)=>{
        this.stores.MessagesStore.messages.push(data[key]);
      })

      messages.on("child_added", (data) => {
        this.stores.MessagesStore.messages.push(data.val())
        this.goBottom();
      });
    })
  },
  computed: {
    getActiveComponent(){
      return this.stores.ComponentsStore.components.find((component)=>{
        return this.stores.ComponentsStore.activeId == component.id;
      })
    }
  },
  methods: {
    goBottom(){
      const obj = this.$el.querySelector(".logs");
      console.log(obj.scrollHeight);
      obj.scrollTop = obj.scrollHeight + 50;
    },
    send(e){
      const TimeStamp = require("../../utilities/TimeStamp");
      Fetch("",
        "POST",
        JSON.stringify({
          color : "#999",
          user  : this.message.user || "名無し",
          text  : this.message.text,
          time  : TimeStamp.makeTime()
        })
      );
      this.message.text =  "";
    }
  }
}
</script>
