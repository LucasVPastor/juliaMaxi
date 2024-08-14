import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, get, child, onValue } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCik4-Od-LFxrYBJ6qFDhB4B3cXVdRLK1I",
    authDomain: "juliamaximino-7e217.firebaseapp.com",
    projectId: "juliamaximino-7e217",
    storageBucket: "juliamaximino-7e217.appspot.com",
    messagingSenderId: "959447436062",
    appId: "1:959447436062:web:44bd65fb5b4d21ba4f170f",
    measurementId: "G-HMKQVWWQR5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

var tbody = document.getElementById('tbody');
var searchInput = document.getElementById('search-input');

function AddItemToTable(idPaci, nomPacientes, idadePaci, dtEntradaPaci){
    const tr = document.createElement("tr");
    tr.id = idPaci;

    const td1 = document.createElement("td");
    td1.innerText = idPaci;
    const td2 = document.createElement("td");
    td2.innerText = nomPacientes;
    const td3 = document.createElement("td");
    td3.innerText = idadePaci;
    const td7 = document.createElement("td");
    td7.innerText = dtEntradaPaci;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td7);

    tbody.appendChild(tr);

    tr.onclick = function () {
        window.location.href = "dadosPacientes/index.html?usuId=" + this.id;
    };
} 

function AddAllItemToTable(pacientes){
    tbody.innerHTML = "";
    pacientes.forEach(element => {
        AddItemToTable(element.usuId, element.usuNome, element.usuIdade, element.usuDataEntrada);
    });
}

function GetAllDataRealTime(){
    const dbref = ref(db, "bdTeste/usuario");
    onValue(dbref, (snapshot) => {
        var pacientes = [];
        snapshot.forEach(childSnapshot => {
            console.log("3");
            pacientes.push(childSnapshot.val());
        });
        AddAllItemToTable(pacientes);
    });
}

function filterPatients() {
    const query = searchInput.value.toLowerCase();
    const allPatients = Array.from(tbody.getElementsByTagName('tr'));

    allPatients.forEach(row => {
        const id = row.cells[0].innerText.toLowerCase();
        const name = row.cells[1].innerText.toLowerCase();
        row.style.display = (id.includes(query) || name.includes(query)) ? '' : 'none';
    });
}

window.onload = () => {
    GetAllDataRealTime();
    searchInput.addEventListener('input', filterPatients);
};
