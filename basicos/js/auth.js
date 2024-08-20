const initApp = () => {
    const url = window.location.href;
    const pageName = window.location.pathname.split("/").pop(); // Obtém apenas o nome da página

    console.log(url);  // Exibe a URL completa
    console.log(pageName);  // Exibe apenas o nome da página

    const keepLoggedIn = localStorage.getItem('keepLoggedIn') === "yes";
    const typeUser = localStorage.getItem('typeUser');  // Obtém o tipo de usuário do localStorage

    if (!keepLoggedIn || (typeUser !== '"dev"' && typeUser !== '"admin"')) {
        if (pageName !== "index.html" && pageName !== "") {
            window.location.href = '/index.html';
        }
    } else {
        // Não permitir voltar à tela de login se estiver logado
        if (pageName == "index.html" || pageName == "") { 

            console.log("login // auth.js");
                window.location.href = 'adm/home.html';
            // setTimeout(() => {
            //     window.location.href = 'adm/home.html';
            // }, 7000);
        } else {
            console.log("tudo ok  // auth.js");
        }
    }
};

initApp();
