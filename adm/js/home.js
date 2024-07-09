// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCik4-Od-LFxrYBJ6qFDhB4B3cXVdRLK1I",
//     authDomain: "juliamaximino-7e217.firebaseapp.com",
//     projectId: "juliamaximino-7e217",
//     storageBucket: "juliamaximino-7e217.appspot.com",
//     messagingSenderId: "959447436062",
//     appId: "1:959447436062:web:44bd65fb5b4d21ba4f170f",
//     measurementId: "G-HMKQVWWQR5"
//   };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// import { getDatabase, ref, set, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

var card1 = document.getElementById("card1");
var card2 = document.getElementById("card2");


card1.onclick = function () {trocaPag("agenda") ;}
card2.onclick = function () {trocaPag("home") ;}


function trocaPag(pag){
    console.log("ENtrei")
    window.location.href = pag+".html";
}