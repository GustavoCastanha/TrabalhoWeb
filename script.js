const lua = document.getElementById("lua");
const sol = document.getElementById("sol");
const pagina = document.querySelector(".pagina");

// Elementos do novo recurso de comentários
const btnComentarios = document.getElementById("comentarios-btn");
const sidebarComentarios = document.getElementById("comentarios-sidebar");
const btnFechar = document.getElementById("fechar-comentarios");
const comentariosLista = document.querySelector(".comentarios-lista");
const formComentarios = document.querySelector(".comentarios-form");
const inputNome = formComentarios.querySelector("input[type='text']");
const textareaComentario = formComentarios.querySelector("textarea");
const btnEnviar = formComentarios.querySelector("button");

// --- Lógica de Tema Claro/Escuro ---

// Começa com modo claro
sol.style.display = "none"; 

// Clicar na lua -> muda para modo escuro
lua.addEventListener("click", () => {
    pagina.classList.add("escuro");
    lua.style.display = "none";
    sol.style.display = "inline";
});

// Clicar no sol -> volta para modo claro
sol.addEventListener("click", () => {
    pagina.classList.remove("escuro");
    sol.style.display = "none";
    lua.style.display = "inline";
});

// --- Lógica de Comentários com LocalStorage ---

// 1. Função para carregar e renderizar comentários
function renderizarComentarios() {
    // Pega os comentários do LocalStorage ou um array vazio se não houver
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    
    // Limpa a lista atual
    comentariosLista.innerHTML = "";

    if (comentarios.length === 0) {
        comentariosLista.innerHTML = '<p class="comentario-exemplo">Nenhum comentário ainda. Seja o primeiro!</p>';
        return;
    }

    // Cria o HTML para cada comentário
    comentarios.forEach(comentario => {
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

// 2. Função para salvar um novo comentário
btnEnviar.addEventListener("click", (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    const nome = inputNome.value.trim();
    const texto = textareaComentario.value.trim();

    if (nome === "" || texto === "") {
        alert("Por favor, preencha seu nome e comentário.");
        return;
    }

    // Formata a data
    const data = new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    const novoComentario = { nome, texto, data };

    // Pega os comentários existentes, adiciona o novo e salva de volta
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    comentarios.push(novoComentario);
    localStorage.setItem("comentarios", JSON.stringify(comentarios));

    // Limpa o formulário e atualiza a lista
    inputNome.value = "";
    textareaComentario.value = "";
    renderizarComentarios();
});

// 3. Lógica para abrir/fechar a barra lateral
btnComentarios.addEventListener("click", () => {
    sidebarComentarios.classList.add("aberto");
    // Garante que a lista esteja atualizada ao abrir
    renderizarComentarios(); 
});

btnFechar.addEventListener("click", () => {
    sidebarComentarios.classList.remove("aberto");
});

// 4. Inicializa a lista de comentários ao carregar a página
document.addEventListener("DOMContentLoaded", renderizarComentarios);