import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA4qkpas_wmwT-0qoq0AOq3izCPhebr0Mw",
    authDomain: "dmsociallogin.firebaseapp.com",
    databaseURL: "https://dmsociallogin.firebaseio.com",
    projectId: "dmsociallogin",
    storageBucket: "dmsociallogin.appspot.com",
    messagingSenderId: "236306127459"
  };

firebase.initializeApp(config);

const database = firebase.database();
const fireDataBase = firebase.database().ref();

var finalData; 

fireDataBase.on("value",snap => {
    finalData = snap.val()
    console.log(finalData)
})


console.log(finalData)

export default finalData;