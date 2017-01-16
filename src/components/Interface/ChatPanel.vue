<template lang="html">
  <div :class="{ 'chat-panel': true, 'dragging': this.stores.ApplicationStore.isDragging }">
    <ul class="logs">
      <li v-for="message in stores.MessagesStore.messages" class="log" :style="{color: message.color}">{{message.time}}: {{message.user}} {{message.text}}</li>
    </ul>
    <form v-on:submit.prevent="send">
      <input v-model="message.user" class="user" placeholder="名無し" required>
      <div class="text">
        <input v-model="message.text" placeholder="body here..." v-on:focus="openChatPallet" v-on:click="openChatPallet" v-on:keyup.esc="dismissChatPallet" required>
        <ul class="chat-pallet" v-if="isOpenChatPallet">
          <li class="pallet-element pallet-template" v-on:click="test('2d6+'+number)" v-for="number in 5">
            {{"2d6+"+number}}
            <a href="#" v-on:click.prevent="test('2d6')">&times;</a>
          </li>
          <li class="pallet-element">
            <input type="text" name="" value="" placeholder="追加する">
          </li>
        </ul>
      </div>
      <input v-model="message.color" class="color" required>
      <input v-model="message.color" class="picker" type="color" required>
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
  word-break: break-all;
}

.chat-panel{
  width: calc(100% - 310px);
  height: 180px;

  background: #555;
}

form{
  width: calc(100% - 20px);
  height: 40px;
  display: flex;
  align-items: flex-start;;
  justify-content: space-between;
  padding: 0 10px;
}

form input {
  margin-left: 5px;
  margin-right: 5px;
  height: 28px;
  outline: none;
}

form .user{
  width: 100px;
  outline: none;

  font-size: 12px;
  margin-left: 0;
}

form .color{
  width: 80px;
  outline: none;
  font-size: 12px;
  margin-right: 0;
  border: solid 1px #AFAFAF;
  border-right: none;
  height: 30px;
}

form .picker{
  width: 50px;
  height: 32px;
  margin-left: 0;
}

form button{
  display: block;
  background: #00aaee;
  border: none;
  color: #fff;
  width: 100px;
  height: 34px;
  font-size: 16px;
  margin-left: 10px;
}

form .text{
  flex: 1;
  outline: none;

  font-size: 12px;
  margin: 0 5px;
  position: relative;
}

.text input{
  width: calc(100% - 5px);
  margin: 0;
}

.chat-pallet{
  position: absolute;
  bottom: 33px;
  left: 0;
  width: calc(100% + 1px);
  background: #fff;
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: 0 0 3px rgba(0,0,0,0.093);
}

.pallet-element{
  padding: 10px 5px;
  border-bottom: solid 1px #e5e5e5;
  cursor: pointer;
}

.pallet-element:hover{
  color: #fff;
  background: #50A8FF;
}

.pallet-element:empty::before{
  content: "test";
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
        text: "",
        color: "#000"
      },
      stores: require("../../stores/Stores"),
      isOpenChatPallet: false
    };
  },
  created(){
    const messages = WSManager.database().ref("boards/chat");

    messages.on("child_added", (data) => {
      this.stores.MessagesStore.messages.push(data.val());
      setTimeout(()=>{
        this.goBottom();
      }, 32);
    });
  },
  computed: {
    getActiveComponent(){
      return this.stores.ComponentsStore.components.find((component)=>{
        return this.stores.ComponentsStore.activeId == component.id;
      });
    }
  },
  methods: {
    goBottom(){
      const obj = this.$el.querySelector(".logs");
      console.log(obj.scrollHeight);
      obj.scrollTop = obj.scrollHeight + 50;
    },
    send(){
      const TimeStamp = require("../../utilities/TimeStamp");
      Fetch("",
        "POST",
        JSON.stringify({
          color : this.message.color,
          user  : this.message.user || "名無し",
          text  : this.message.text,
          time  : TimeStamp.makeTime()
        })
      );
      this.message.text =  "";
      this.dismissChatPallet();
    },
    test(comment){
      this.message.text =  comment;
      this.dismissChatPallet();
    },
    openChatPallet(){
      this.isOpenChatPallet = true;
    },
    dismissChatPallet(){
      setTimeout(()=>{
        this.isOpenChatPallet = false;
      }, 50);
    }
  }
};
</script>
