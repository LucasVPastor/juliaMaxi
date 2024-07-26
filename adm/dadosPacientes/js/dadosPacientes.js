
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
 
    const params = new URLSearchParams(window.location.search);
    const id = params.get('usuId')
 //----------------------------------------------------------------------------------------------------

 function InserirDados(){
    set(ref(db, "livros/"+nomeLivro.value),{
        nomeLivro: nomeLivro.value
    })
    .then(()=>{
        alert("dados inseridos");
    })
    .catch((error)=>{
        alert("Erro: "+ error);
    });
  }
    // ---------- select function ---------------------------
 
    function SelecionarDados(){
        const dbref = ref(db);
 
        get(child(dbref,"livros/"+nomeLivro.value))
        .then((snapshot)=>{
            if(snapshot.exists()){
                 nomeLivroP.value = snapshot.val().nomeLivro;
            }
            else{
                alert("Não há dados");
            }
 
        })
        .catch((error)=>{
            alert("Erro: "+ error);
        })
    }
 
    function SelecionarDadosFiltro(){
     window.location = "../index.php";
     const dbref = ref(db);
 
     get(child(dbref,"livros/"+nomeLivro.value))
     .then((snapshot)=>{
         if(snapshot.exists()){
          // FILTRO COM IF :
          if(snapshot.val().gênero == 'Romance'){
              nomeLivroP.value = snapshot.val().nomeLivro; 
           }
         }
         else{
             alert("Não há dados");
         }
 
     })
     .catch((error)=>{
         alert("Erro: "+ error);
     })
 }
 
    //  GET ALL 
    var stdNo= 0;
    var tbody = document.getElementById('body1');
 
    function AddItemToTable(nomPaci){
        console.log("------- AddItemToTable");
       console.log(nomPaci)
        const h1 = document.createElement("h1");
            h1.innerText = nomPaci;
        
        tbody.appendChild(h1);    
    } 
 
    function AddAllItemToTable(usuario){
        console.log("------- AddAllItemToTable");
     stdNo = 0;
     tbody.innerHTML="";
     usuario.forEach(element => {
        if(element.usuId == id){     
         AddItemToTable(element.usuNome);
        }
     });
    }
 
  //-------- get all dados ---------
  function GetAllDataOnce(){
     const dbref = ref(db);
 
     get(child(dbref, "livros"))
     .then((snapshot)=>{
         var livros =[];
 
         snapshot.forEach(childSnapshot => {
 
             livros.push(childSnapshot.val());
         });
 
         GetAllDataRealTime();
 
     });
  }
 //GET ALL TEMPO REAL
  function GetAllDataRealTime(){
     const dbref = ref(db, "bdTeste/usuario/");
 console.log(id);
     onValue(dbref,(snapshot)=>{ 
         var usuario =[];
         console.log("------- GetAllDataRealTime");

         snapshot.forEach(childSnapshot => {
 
            usuario.push(childSnapshot.val());
         });
 
         AddAllItemToTable(usuario);
     })
  }
  
  window.onload = GetAllDataOnce;
 

