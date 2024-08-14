  
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-storage.js";
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
 
    //  REFERENCIAS 
    var stdNo= 0;
    var nomePaci = document.getElementById('nomePaci');


    function AddItemToTable(nomPacientes, usuIdadePaci, altuPaci, usuPesoInicial, usuPesoAtual, usuFoto ){
        console.log("------- AddItemToTable");
        
        nomePaci.innerText = nomPacientes;

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
         buscaPlanoAlimentar();
 
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

// Função para salvar arquivos no Firebase Storage
function salvaArquivo(id, fileInputId) {
    const dbref = ref(db);
    const fileInput = document.getElementById(fileInputId);
    const file = fileInput.files[0];
    let URLdownload;

    if (!file) {
        console.error("Nenhum arquivo foi selecionado!");
        return;
    }

    // Cria um nome único para o arquivo a ser salvo
    const uniqueName = id + '_' + Date.now() + '_' + file.name;
    const newStorageRef = storageRef(storage, 'arquivosUsu/' + uniqueName);

    // Faz o upload do arquivo para o Firebase Storage
    uploadBytes(newStorageRef, file)
        .then((snapshot) => {
            console.log("Sucesso ao salvar novo arquivo!");
            return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
            URLdownload = downloadURL;
            console.log('Novo arquivo disponível para ' + id + ' em:', downloadURL);
            return get(child(dbref, `bdTeste/usuario/${id}/planosAlimentares`))
        })
        .then((snapshot) => {
            const planos = snapshot.val() || [];
            planos.push({ urlArquivo: URLdownload });

            return update(child(dbref, `bdTeste/usuario/${id}`), {
                planosAlimentares: planos
            });
        })
        .then(() => {
            console.log("Dados de 'usuario' atualizados com sucesso!");
        })
        .catch((error) => {
            console.error("Erro ao atualizar dados de 'usuario': ", error);
        });
}
// Botão para salvar o arquivo e um input file com id "arquivoInput"
var btnSalvaArquivo = document.getElementById("btnSalvaArquivo");
    btnSalvaArquivo.addEventListener('click', () => salvaArquivo(id, "arquivoInput"));

// REFERÊNCIA
const listaContainer = document.getElementById('listaPlanos');
function buscaPlanoAlimentar(){
    const dbref = ref(db, "bdTeste/usuario/" + id + "/planosAlimentares/");
    let pA = [];
    
    onValue(dbref, (snapshot) => { 
        pA = []; // Reinicia o array para garantir que não haja duplicações
        snapshot.forEach(childSnapshot => {
            pA.push(childSnapshot.val());
        });

        addPlanoLista(pA);
    });
}

// Função auxiliar para adicionar os links à lista no HTML
function addPlanoLista(pA){
    listaContainer.innerHTML = ""; // Limpa a lista antes de preencher
    pA.forEach(plano => {
        const linkElement = document.createElement('a');
        linkElement.href = plano.urlArquivo;
        linkElement.textContent = plano.urlArquivo.split('/').pop(); // Nome do arquivo
        linkElement.target = '_blank'; // Abre em uma nova aba
        
        const listItem = document.createElement('li');
        listItem.appendChild(linkElement);
        listaContainer.appendChild(listItem);
    });
}