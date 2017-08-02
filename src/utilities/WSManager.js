const firebase = require("firebase");
let instance = undefined;

module.exports = ()=>{
  if(!instance){
    const config = {
      apiKey            : process.env.FIREBASE_APIKEY,
      authDomain        : process.env.FIREBASE_DOMAIN,
      databaseURL       : process.env.FIREBASE_DATABASE_URL,
      storageBucket     : process.env.FIREBASE_BUCKET,
      messagingSenderId : process.env.FIREBASE_SENDER
    };
    firebase.initializeApp(config);
    instance = firebase;
  }
  return instance;
};
