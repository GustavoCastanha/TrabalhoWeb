const lua = document.getElementById("lua");
const sol = document.getElementById("sol");
const pagina = document.querySelector(".pagina");

// Começa com modo claro
sol.style.display = "none"; // esconder sol no início, só mostrar lua

// Clicar na lua -> muda para modo escuro
lua.addEventListener("click", () => {
    // CORREÇÃO: Usar a classe 'escuro' que é a que o CSS usa (seletor .claro.escuro)
    pagina.classList.add("escuro"); 
    lua.style.display = "none";
    sol.style.display = "inline";
});

// Clicar no sol -> volta para modo claro
sol.addEventListener("click", () => {
    // CORREÇÃO: Remover a classe 'escuro'
    pagina.classList.remove("escuro");
    sol.style.display = "none";
    lua.style.display = "inline";
});