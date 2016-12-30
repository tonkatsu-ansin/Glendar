const firebase = require("firebase");
let instance = undefined;

module.exports = ()=>{
  if(!instance){
    const config = {
    };
    firebase.initializeApp(config);
    instance = firebase;
  }
  return instance;
};
