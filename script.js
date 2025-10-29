function handleLogin(event) {
    // Impede o envio padrão do formulário
    event.preventDefault();

    const usuario = document.getElementById('username').value;
    const senha = document.getElementById('password').value;

    if (usuario === "admin" && senha === "123") { // Lógica de Verificação: se o usário e a senha estão corretas

        localStorage.setItem('usuarioLogado', 'true'); // Salva na storage que o login foi feito com sucesso

        window.location.href = "index.html"; //se estiver com o login valido, sera direcinado até o index.html

    } else {
        alert("Usuário ou senha incorretos.");
    }
}

//Criado as const para dar funcionalidade aos botões da página Escuro/Claro

const lua = document.getElementById("lua");
const sol = document.getElementById("sol");
const pagina = document.querySelector(".pagina");

//Criado as const para dar funcionalidade para os elementos dos comentários

const btnComentarios = document.getElementById("comentarios-btn");
const sidebarComentarios = document.getElementById("comentarios-sidebar");
const btnFechar = document.getElementById("fechar-comentarios");
const comentariosLista = document.querySelector(".comentarios-lista");
const formComentarios = document.querySelector(".comentarios-form");
const inputNome = formComentarios.querySelector("input[type='text']");
const textareaComentario = formComentarios.querySelector("textarea");
const btnEnviar = formComentarios.querySelector("button");


sol.style.display = "none";  // Começa com modo claro


lua.addEventListener("click", () => { // Clicar na lua -> muda para modo escuro
    pagina.classList.add("escuro");
    lua.style.display = "none";
    sol.style.display = "inline";
});

sol.addEventListener("click", () => { // Clicar no sol -> volta para modo claro
    pagina.classList.remove("escuro");
    sol.style.display = "none";
    lua.style.display = "inline";
});

function renderizarComentarios() { //Função para carregar e renderizar comentários

    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || []; // Pega os comentários do LocalStorage ou um array vazio se não houver

    comentariosLista.innerHTML = "";  // Limpa a lista atual

    if (comentarios.length === 0) {
        comentariosLista.innerHTML = '<p class="comentario-exemplo">Nenhum comentário ainda. Seja o primeiro!</p>';
        return;
    }

    comentarios.forEach(comentario => {  // Cria o HTML para cada comentário
        const divComentario = document.createElement("div");
        divComentario.classList.add("comentario-item");
        divComentario.innerHTML = `
            <strong>${comentario.nome}</strong>
            <p>${comentario.texto}</p>
            <small>${comentario.data}</small>
        `;
        comentariosLista.appendChild(divComentario);
    });
}

btnEnviar.addEventListener("click", (e) => { //Função para salvar um novo comentário
    e.preventDefault(); // Impede o envio padrão do formulário

    const nome = inputNome.value.trim();
    const texto = textareaComentario.value.trim();

    if (nome === "" || texto === "") {
        alert("Por favor, preencha seu nome e comentário.");
        return;
    }

    const data = new Date().toLocaleDateString("pt-BR", {  // Formata a data que foi inserido o comentario
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    const novoComentario = { nome, texto, data };

    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || []; // Pega os comentários existentes, adiciona o novo e salva de volta
    comentarios.push(novoComentario);
    localStorage.setItem("comentarios", JSON.stringify(comentarios));

    inputNome.value = "";  // Limpa o formulário e atualiza a lista
    textareaComentario.value = "";
    renderizarComentarios();
});

btnComentarios.addEventListener("click", () => { //Lógica para abrir/fechar a barra lateral
    sidebarComentarios.classList.add("aberto");
    renderizarComentarios();  // Garante que a lista esteja atualizada ao abrir
});

btnFechar.addEventListener("click", () => {
    sidebarComentarios.classList.remove("aberto");
});

document.addEventListener("DOMContentLoaded", renderizarComentarios); //Inicializa a lista de comentários ao carregar a página