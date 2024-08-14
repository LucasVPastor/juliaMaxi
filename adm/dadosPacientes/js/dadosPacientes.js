  
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject  } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-storage.js";
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
  
const storage = getStorage(app);
  const db = getDatabase();
    //------- Referencias -----------
 
    const params = new URLSearchParams(window.location.search);
    const id = params.get('usuId')
 //----------------------------------------------------------------------------------------------------

 
    //  REFERENCIAS 
    var stdNo= 0;
    var nomePaci = document.getElementById('nomePaci');
    var idadePaci = document.getElementById('idadePaci');
    var alturaPaci = document.getElementById('alturaPaci');
    var pesoIniPaci = document.getElementById('pesoIniPaci');
    var pesoAtuPaci = document.getElementById('pesoAtuPaci');
    var fotoUsuario = document.getElementById('fotoUsuario');


    function AddItemToTable(nomPacientes, usuIdadePaci, altuPaci, usuPesoInicial, usuPesoAtual, usuFoto ){
        console.log("------- AddItemToTable");
        
        nomePaci.innerText = nomPacientes;

        idadePaci.value = usuIdadePaci;
        alturaPaci.value = altuPaci;
        pesoIniPaci.value = usuPesoInicial;
        pesoAtuPaci.value = usuPesoAtual;
        
        if(usuFoto == ""){
           fotoUsuario.src= "../../asset/img/person.jpg";
        }
        else{
            fotoUsuario.src= usuFoto;
        }

    } 
 
    function AddAllItemToTable(usuario){
        console.log("------- AddAllItemToTable");
     stdNo = 0;
     usuario.forEach(element => {
        if(element.usuId == id){     
            AddItemToTable(element.usuNome, element.usuIdade, element.usuAltura, element.usuPesoInicial, element.usuPesoAtual, element.urlFoto);
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
         addParametros();
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


  var btnSalvaFoto = document.getElementById("btnSalvaFoto");
        btnSalvaFoto.addEventListener('click', () => salvaImagem(id));
    let cropper;

document.querySelector("#fotoUsu").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageElement = document.querySelector("#imagePreview");
            imageElement.src = event.target.result;
            imageElement.style.display = "block";  // Mostra a imagem de visualização

            // Destruir qualquer instância anterior do Cropper para evitar bugs
            if (cropper) {
                cropper.destroy();
            }

            // Inicializar o Cropper.js
            cropper = new Cropper(imageElement, {
                aspectRatio: 1,  // Defina a proporção de aspecto se necessário
                viewMode: 1
            });
        };
        reader.readAsDataURL(file);
    }
});

function salvaImagem(id) {
    const dbref = ref(db);
    if (!cropper) {
        console.error("Nenhuma imagem foi selecionada!");
        return;
    }

    // Primeiro, obtenha a URL atual da foto do usuário
    get(child(dbref, "bdTeste/usuario/" + id + "/urlFoto"))
        .then((snapshot) => {
            const currentPhotoURL = snapshot.val();
            if (currentPhotoURL) {
                // Se existir uma foto atual, exclua-a do armazenamento
                const oldStorageRef = storageRef(storage, currentPhotoURL);
                deleteObject(oldStorageRef).then(() => {
                    console.log("Imagem anterior excluída com sucesso!");
                }).catch((error) => {
                    console.error("Erro ao excluir imagem anterior: ", error);
                });
            }

            // Agora, faça o upload da nova imagem
            cropper.getCroppedCanvas().toBlob((blob) => {
                if (blob) {
                    const uniqueName = id + '_' + Date.now() + '.jpg';
                    const usuFoto = new File([blob], uniqueName, { type: "image/jpeg" });
                    const newStorageRef = storageRef(storage, 'fotosUsu/' + usuFoto.name);

                    uploadBytes(newStorageRef, usuFoto)
                        .then((snapshot) => {
                            console.log("Sucesso ao salvar nova imagem!");
                            return getDownloadURL(snapshot.ref);
                        })
                        .then((downloadURL) => {
                            console.log('Nova imagem disponível para ' + id + ' em:', downloadURL);
                            return update(child(dbref, "bdTeste/usuario/" + id), {
                                urlFoto: downloadURL
                            });
                        })
                        .then(() => {
                            console.log("Dados de 'usuario' atualizados com sucesso!");
                        })
                        .catch((error) => {
                            console.error("Erro ao atualizar dados de 'usuario': ", error);
                        });
                }
            }, 'image/jpeg');
        })
        .catch((error) => {
            console.error("Erro ao obter a URL da foto atual: ", error);
        });
}


var pA = document.getElementById("pA");
var hC = document.getElementById("hC");
var gD = document.getElementById("gD");

function addParametros(){

    pA.href= "planoAlimentar.html?usuId="+id;
    hC.href= "#"+id;
    gD.href= "#";

}