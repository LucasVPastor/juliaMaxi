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

console.log("CHAMEI O JS INFOUSUARIOS")
document.addEventListener("DOMContentLoaded", initApp);

var nomeUsu = document.getElementById('nomeUser');
var fotoUser = document.getElementById('imgUser');
  let alogin = document.getElementById('signoutlink');
  let imglogin = document.getElementById('imgLogin');

var currentUser = "!logado";    

function getUsername() {
    let keepLoggedIn = localStorage.getItem("keepLoggedIn");
    if (keepLoggedIn == "yes") {
        currentUser = JSON.parse(localStorage.getItem('user'));
        console.log(currentUser.usuNome);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Atribuir a função Signout ao clicar no ícone ou no link de saída
    alogin.addEventListener('click', Signout);
    imglogin.addEventListener('click', Signout);
});

function Signout() {
    Swal.fire({
        title: 'Tem certeza que deseja sair?',
        showDenyButton: true,
        confirmButtonText: 'Não Quero Sair',
        denyButtonText: `Quero Sair`,
    }).then((result) => {
        if (result.isDenied) {
            localStorage.removeItem('user');
            localStorage.removeItem('keepLoggedIn');
            window.location.reload(); 
        }
        else if (result.isConfirmed) {
            Swal.fire('Entendi, você não vai sair!', '', 'error');
        }
    });
}


getUsername();
console.log(currentUser);
const id =  currentUser.usuId;
console.log(id + " // infoUsuarios.js");

function AddItemToTable(usuFoto, nomeUser){
    console.log("------- AddItemToTable // infoUsuarios.js");
    console.log('infoUsuarios.js // ',nomeUser)
    nomeUsu.innerText = nomeUser;

    console.log('home.js // Foto URL:', usuFoto);

    if(usuFoto == "" || usuFoto == undefined){
        fotoUser.src = "https://firebasestorage.googleapis.com/v0/b/juliamax    imino-7e217.appspot.com/o/fotosUsu%2Fperson.jpg?alt=media&token=01157c5b-63ed-47ba-9b62-4054410729f9";
    } else {
        fotoUser.src = usuFoto;
    }

    if(currentUser == "!logado"){
        alogin.innerText = "LOGIN";

    }
    else{
        alogin.innerText = "SAIR";
        imglogin.src = "/asset/icon/btnlogout.png"
    }

    console.log('home.js // Foto src definida como:', fotoUser.src);
}

function AddAllItemToTable(usuario){
    console.log("------- AddAllItemToTable // infoUsuarios.js");
 usuario.forEach(element => {
    if(element.usuId == id){     
        AddItemToTable(element.urlFoto, element.usuNome);
    }
 });
}

//--------GET ALL DADOS UMA VEZ---------
function GetAllDataOnce(){
     GetAllDataRealTime();
}
//GET ALL DADOS TEMPO REAL
function GetAllDataRealTime(){
 const dbref = ref(db, "bdTeste/usuario/");
 onValue(dbref,(snapshot)=>{ 
     var usuario =[];
     console.log("------- GetAllDataRealTime // infoUsuarios.js");

     snapshot.forEach(childSnapshot => {
        usuario.push(childSnapshot.val());
     });

     AddAllItemToTable(usuario);
 })
}


window.onload = GetAllDataOnce;
