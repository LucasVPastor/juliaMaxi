
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
// --------------------INICIO LOGIN--------------------------------------------------------------------------

function LoginForm(){
console.log("entrei na função LoginForm");
  var usuIdVal = usuId.value;
  var usuSenhaVal = usuSenha.value;

if(!usuIdVal){
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Preencha o campo nome, por favor! ',
  })
  return false;
}

if(!usuSenhaVal){
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'A senha não pode ficar em branco!',
  })
  return false; 
}

  const dbRef = ref(db);
  console.log(usuIdVal);
      get(child(dbRef, "bdTeste/usuario/"+usuIdVal)).then((snapshot)=>{
        if(snapshot.exists()){
          console.log("entrei no snapshot.exists()");
          let dbpass = snapshot.val().usuPassword;
          console.log(cripSenha(dbpass));
          // if(snapshot.val().primAcesso == true){
          //   if(dbpass == usuSenhaVal.value){
          //       window.location = "./primeiroAcesso.html";
          //     }
          //   else{
          //     Swal.fire({
          //       icon: 'error',
          //       title: 'Oops...',
          //       text: 'Senha Incorreta!',
          //       })
          //   }
          // }
          // else{
              if(decPass(dbpass) == usuSenhaL.value){
              localStorage.setItem('auth', 1);
              localStorage.setItem('typeUser', snapshot.val().typeUser);
              Login(snapshot.val());
              }
              else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Senha Incorreta!',
                  })
              }
          // }
        }
      });
}
function Login(user){
  console.log(user);
  localStorage.setItem('keepLoggedIn', 'yes');
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('typeUser', JSON.stringify(user.typeUser));

  Swal.fire({
    icon: 'success',
    title: 'BEM VINDO!',
    text: 'Obrigado pela confiança.',
    timer: 2000,  // Define o tempo em milissegundos (2500 ms = 2.5 segundos)
    showConfirmButton: false // Oculta o botão de confirmação
  }).then(() => {
    // Redireciona após o SweetAlert ser fechado
    window.location = "adm/home.html";
  });
}

btnSubmit.addEventListener('click', LoginForm);
// --------------------FIM LOGIN-----------------------------------------------------------------------------


