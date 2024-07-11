var calend = document.getElementById("cardsCalendario");
var mesAno = document.getElementById("mesAno");

var monName = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
var dayName = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
var now = new Date();

var numMes = now.getMonth();
var numAno = now.getFullYear();
var numDia = now.getDate();

var proxMes = document.getElementById("proxMes");
proxMes.onclick = function () {proxxMes();}

var antMes = document.getElementById("antMes");
antMes.onclick = function () {anttMes();}

function proxxMes() {
    if (numMes === 11) {
        numMes = 0;
        numAno += 1;
    } else {
        numMes += 1;
    }
    geraCalen();
}

function anttMes() {
    if (numMes === 0) {
        numMes = 11;
        numAno -= 1;
    } else {
        numMes -= 1;
    }
    geraCalen();
}

function geraCalen() {
    calend.innerHTML = '';
    mesAno.innerText = monName[numMes] + " de " + numAno;
    var ultimoDia = monthLength(numMes, numAno);

    // Criar uma linha inicial para os dias da semana
    var row = document.createElement("div");
    row.className = "row";

    // Adicionar dias vazios antes do primeiro dia do mês, se necessário
    var primeiroDiaSemana = new Date(numAno, numMes, 1).getDay();
    for (var j = 0; j < primeiroDiaSemana; j++) {
        var emptyCol = document.createElement("div");
        emptyCol.className = "col";
        row.appendChild(emptyCol);
    }

    // Adicionar os dias do mês
    for (var i = 1; i <= ultimoDia; i++) {
        if ((i + primeiroDiaSemana - 1) % 7 === 0) {
            calend.appendChild(row);
            row = document.createElement("div");
            row.className = "row";
        }

        const cardDia = document.createElement("div");
            cardDia.className = "cardDia col text-center";
            cardDia.setAttribute("data-bs-toggle", "modal");
            cardDia.setAttribute("data-bs-target", "#exampleModal");
            cardDia.id = i;

        const dia = document.createElement("div");
            dia.className = "dia";
            dia.innerText = i;

        const dataAtual = new Date(numAno, numMes, i);
        const diaSemana = dataAtual.getDay();
        if (dayName[diaSemana] === "Sábado" || dayName[diaSemana] === "Domingo") {
            cardDia.classList.add("nUtil");
        }
        if (numDia === i && numMes === now.getMonth() && numAno === now.getFullYear() && dayName[diaSemana] !== "Sábado" && dayName[diaSemana] !== "Domingo") {
            cardDia.classList.add("cardHoje");
        }

        cardDia.appendChild(dia);
        row.appendChild(cardDia);

        // Adicionar evento de clique ao card para atualizar o modal
        cardDia.onclick = function () {
            const exampleModalLabel = document.getElementById("exampleModalLabel");
            exampleModalLabel.innerText = "Dia " + this.id;
        };
    }

    // Adicionar colunas vazias após o último dia do mês, se necessário
    var ultimoDiaSemana = new Date(numAno, numMes, ultimoDia).getDay();
    for (var k = ultimoDiaSemana + 1; k < 7; k++) {
        var emptyCol = document.createElement("div");
        emptyCol.className = "col";
        row.appendChild(emptyCol);
    }

    // Adicionar a última linha ao calendário
    calend.appendChild(row);
}

function monthLength(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

geraCalen();
