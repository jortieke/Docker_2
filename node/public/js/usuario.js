export function usuario() {
    if (!sessionStorage.ID_USUARIO) {
    alert("Você precisa estar logado!");
    window.location = "login.html";
    } else {
        window.location.href = "usuario.html"; 
    }
}

export function usuarioTipo(){
    const funcao = sessionStorage.getItem("FUNCAO_USUARIO");

    if (!funcao === "Gestor") {
        alert("Você não tem autorização de acessar essa página!");
        window.location = "painel.html";
    }
    
}

window.onload = () => {
const idUsuario = sessionStorage.ID_USUARIO;
    
fetch(`/perfil/imagemPerfil/${idUsuario}`)
    .then(res => res.json())
    .then(dados => {
    const imgPerfilNav = document.getElementById("imgPerfilNav");
    
    if (dados.imagem) {
        if (imgPerfilNav) { 
        imgPerfilNav.src = `../assets/imgsBd/${dados.imagem}`;
        }
    } else {
        if (imgPerfilNav) { 
        imgPerfilNav.src = `/assets/imgs/usuario/usuario.png`;
        }
    }
            
    });
};