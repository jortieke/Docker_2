
/* ÍNICIO DO SLIDER  */

let atual = 0;
let slides = document.querySelectorAll(".slide");
let bolinhas = document.querySelectorAll(".bolinha");

function mostrarSlide() {
  slides.forEach(s => s.classList.remove("ativo"));
  bolinhas.forEach(b => b.classList.remove("ativa"));

  slides[atual].classList.add("ativo");
  bolinhas[atual].classList.add("ativa");
}

function irPara(index) {
  atual = index;
  mostrarSlide();
}

function proximoSlide() {
  atual++;
  if(atual >= slides.length) {
    atual = 0; 
  }

  mostrarSlide();
}

setInterval(proximoSlide, 10000);

function usuario() {
    if (!sessionStorage.ID_USUARIO) {
    alert("Você precisa estar logado!");
    window.location = "login.html";
    } else {
        window.location.href = "usuario.html"; 
    }
}

/* FIM DO SLIDER */