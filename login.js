
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCik4-Od-LFxrYBJ6qFDhB4B3cXVdRLK1I",
    authDomain: "juliamaximino-7e217.firebaseapp.com",
    projectId: "juliamaximino-7e217",
    storageBucket: "juliamaximino-7e217.appspot.com",
    messagingSenderId: "959447436062",
    appId: "1:959447436062:web:44bd65fb5b4d21ba4f170f",
    measurementId: "G-HMKQVWWQR5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
  


  const db = getDatabase();
    //------- Referencias -----------
 
  var usuId = document.getElementById("usuario");
  var usuSenha = document.getElementById("senha");
  var btnSubmit = document.getElementById("btnSubmit");
 //----------------------------------------------------------------------------------------------------
 function validaForm(){
    const dbref = ref(db);
 console.log(usuId.value)
    get(child(dbref,"bdTeste/usuario/"+usuId.value))
    
    .then((snapshot)=>{
        if(snapshot.exists()){
            usuSenha.value = snapshot.val().usuPassword;
            var usuNome = snapshot.val().usuNome;
            alert("Te achamos, "+usuNome+"!!");
            window.location.href = "adm/home.html"
        }
        else{
            alert("Este usuário não existe");
        }

    })
    .catch((error)=>{
        alert("Erro: "+ error);
    })
 }

btnSubmit.onclick = function () {validaForm() ;}

