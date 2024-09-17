import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCik4-Od-LFxrYBJ6qFDhB4B3cXVdRLK1I",
    authDomain: "juliamaximino-7e217.firebaseapp.com",
    projectId: "juliamaximino-7e217",
    storageBucket: "juliamaximino-7e217.appspot.com",
    messagingSenderId: "959447436062",
    appId: "1:959447436062:web:44bd65fb5b4d21ba4f170f",
    measurementId: "G-HMKQVWWQR5"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Função para calcular o IMC
function calcularIMC() {
    const peso = parseFloat(document.getElementById('pesoPaciente').value);
    const altura = parseFloat(document.getElementById('alturaPaciente').value) / 100;
    const imc = peso / (altura * altura);
    if (!isNaN(imc)) {
        document.getElementById('imcPaciente').value = imc.toFixed(2);
    }
}

document.getElementById('pesoPaciente').addEventListener('input', calcularIMC);
document.getElementById('alturaPaciente').addEventListener('input', calcularIMC);

// Inserir dados do formulário no Firebase
document.getElementById('add-paciente-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const pacienteId = document.getElementById('nomePaciente').value.replace(/\s+/g, '_').toLowerCase();

    set(ref(db, 'bdTeste/usuario/' + pacienteId), {
        nome: document.getElementById('nomePaciente').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        email: document.getElementById('emailPaciente').value,
        telefone: document.getElementById('telefonePaciente').value,
        peso: document.getElementById('pesoPaciente').value,
        altura: document.getElementById('alturaPaciente').value,
        imc: document.getElementById('imcPaciente').value,
        historicoMedico: document.getElementById('historicoMedico').value,
        objetivos: document.getElementById('objetivosPaciente').value,
        observacoes: document.getElementById('observacoes').value
    }).then(() => {
        alert("Paciente adicionado com sucesso!");
        document.getElementById('add-paciente-form').reset();
        document.getElementById('imcPaciente').value = '';
    }).catch((error) => {
        alert("Erro ao adicionar paciente: " + error);
    });
});

// Função para selecionar dados de um paciente específico
function selecionarPaciente() {
    const pacienteId = document.getElementById('nomePaciente').value.replace(/\s+/g, '_').toLowerCase();
    const dbref = ref(db);

    get(child(dbref, 'bdTeste/usuario/' + pacienteId))
    .then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Atualiza os campos com os dados retornados
            document.getElementById('emailPaciente').value = data.email;
            document.getElementById('telefonePaciente').value = data.telefone;
            document.getElementById('pesoPaciente').value = data.peso;
            document.getElementById('alturaPaciente').value = data.altura;
            document.getElementById('imcPaciente').value = data.imc;
            document.getElementById('historicoMedico').value = data.historicoMedico;
            document.getElementById('objetivosPaciente').value = data.objetivos;
            document.getElementById('observacoes').value = data.observacoes;
        } else {
            alert("Paciente não encontrado.");
        }
    }).catch((error) => {
        alert("Erro: " + error);
    });
}

// Função para atualizar dados de um paciente
function atualizarPaciente() {
    const pacienteId = document.getElementById('nomePaciente').value.replace(/\s+/g, '_').toLowerCase();
    update(ref(db, 'bdTeste/usuario/' + pacienteId), {
        // Atualiza apenas os campos necessários
        telefone: document.getElementById('telefonePaciente').value,
        email: document.getElementById('emailPaciente').value,
        observacoes: document.getElementById('observacoes').value
    }).then(() => {
        alert("Dados do paciente atualizados com sucesso!");
    }).catch((error) => {
        alert("Erro ao atualizar paciente: " + error);
    });
}

// Função para remover um paciente
function removerPaciente() {
    const pacienteId = document.getElementById('nomePaciente').value.replace(/\s+/g, '_').toLowerCase();
    remove(ref(db, 'bdTeste/usuario/' + pacienteId))
    .then(() => {
        alert("Paciente removido com sucesso!");
        document.getElementById('add-paciente-form').reset();
        document.getElementById('imcPaciente').value = '';
    }).catch((error) => {
        alert("Erro ao remover paciente: " + error);
    });
}

// Event listeners para as funções de selecionar, atualizar e remover
document.getElementById('selecionar-paciente').addEventListener('click', selecionarPaciente);
document.getElementById('atualizar-paciente').addEventListener('click', atualizarPaciente);
document.getElementById('remover-paciente').addEventListener('click', removerPaciente);
