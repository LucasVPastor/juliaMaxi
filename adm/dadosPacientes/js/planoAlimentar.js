  
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

// REFERENCIA
let nomeAqruivo;
// Função para salvar arquivos no Firebase Storage
function salvaArquivo(id, fileInputId) {
    const dbref = ref(db);
    const fileInput = document.getElementById(fileInputId);
    const file = fileInput.files[0];
    let URLdownload;
    nomeAqruivo = file.name;

    if (!file) {
        console.error("Nenhum arquivo foi selecionado!");
        return;
    }

    // Mostra o SweetAlert de carregamento
    Swal.fire({
        title: 'Salvando arquivo...',
        text: 'Por favor, aguarde enquanto o arquivo está sendo salvo.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Cria um nome único para o arquivo a ser salvo
    const uniqueName = id + '_' + Date.now() + '_' + nomeAqruivo;
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
            planos.push({ 
                urlArquivo: URLdownload,
                fileName: nomeAqruivo,
                uniqueFileName: uniqueName // Salva o nome único junto com a URL
             });

            return update(child(dbref, `bdTeste/usuario/${id}`), {
                planosAlimentares: planos
            });
        })
        .then(() => {
            console.log("Dados de 'usuario' atualizados com sucesso!");
            Swal.fire({
                title: 'Sucesso!',
                text: 'O arquivo foi salvo com sucesso.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        })
        .catch((error) => {
            console.error("Erro ao atualizar dados de 'usuario': ", error);
            Swal.fire({
                title: 'Erro!',
                text: 'Houve um problema ao salvar o arquivo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
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

// Função para exibir a lista de planos alimentares com checkboxes
function addPlanoLista(pA) {
    listaContainer.innerHTML = ""; 
    var nInput = 0;

    pA.forEach(plano => {
        const linkElement = document.createElement('li');
        linkElement.className = "list-group-item list-group-item-action";

        const checkLink = document.createElement('input');
        checkLink.className = "form-check-input me-1";
        checkLink.type = "checkbox";
        checkLink.id = pA[nInput].uniqueFileName;

        const labelLink = document.createElement('a');
        labelLink.href = plano.urlArquivo;
        labelLink.textContent = plano.fileName; // Nome do arquivo
        labelLink.target = '_blank'; // Abre em uma nova aba

        checkLink.addEventListener('change', function() {
            if (this.checked) {
                Swal.fire({
                    title: 'Tem certeza?',
                    text: "Você deseja deletar este arquivo?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, deletar!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteFile(this.id, id); // Passando `id` corretamente
                    } else {
                        this.checked = false;
                    }
                });
            }
        });
        

        linkElement.appendChild(checkLink); 
        linkElement.appendChild(labelLink);       
        listaContainer.appendChild(linkElement);

        nInput++;
    });
}

// Função para deletar o arquivo do Firebase Storage e da base de dados
function deleteFile(uniqueFileName) {
    // Referência ao arquivo no Firebase Storage
    const fileRef = storageRef(storage, 'arquivosUsu/' + uniqueFileName);
    
    // Referência à entrada correspondente no Realtime Database
    const dbref = ref(db, `bdTeste/usuario/${id}/planosAlimentares`);
    
    // SweetAlert de confirmação
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter esta ação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Primeiro, deletar o arquivo do Firebase Storage
            deleteObject(fileRef)
                .then(() => {
                    console.log("Arquivo deletado com sucesso!");

                    // Agora, remover a entrada correspondente no Realtime Database
                    return get(dbref);
                })
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const planos = snapshot.val();
                        const updatedPlanos = planos.filter(plano => plano.uniqueFileName !== uniqueFileName);

                        // Atualiza o Realtime Database com a lista filtrada
                        return update(ref(db, `bdTeste/usuario/${id}`), {
                            planosAlimentares: updatedPlanos
                        });
                    } else {
                        throw new Error('O plano alimentar não foi encontrado no banco de dados.');
                    }
                })
                .then(() => {
                    Swal.fire(
                        'Deletado!',
                        'O arquivo foi deletado.',
                        'success'
                    );
                })
                .catch((error) => {
                    console.error("Erro ao deletar arquivo: ", error);
                    Swal.fire(
                        'Erro!',
                        'Houve um problema ao deletar o arquivo ou atualizar o banco de dados.',
                        'error'
                    );
                });
        }
    });
}



