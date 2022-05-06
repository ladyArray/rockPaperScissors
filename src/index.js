// Este array no se puede modificar,
const posibilidades = ["piedra", "papel", "tijera"];
//

// Editar imagenes
const imagenJugador = document.querySelectorAll("#jugador img");

function rellenarImg() {
  imagenJugador[0].src = "img/piedraJugador.png";
  imagenJugador[1].src = "img/papelJugador.png";
  imagenJugador[2].src = "img/tijeraJugador.png";
}

rellenarImg();

const nombreJugador = document.getElementsByTagName("input")[0];

// Un nombre será válido si tiene más de tres caracteres y el primero de ellos no es un número.
function compruebaNombre() {
  const regex = /([^0-9][a-zA-Z]{3,})/g;

  if (!nombreJugador.value.match(regex)) {
    return false;
  } else {
    console.log("correcto");
    return true;
  }
}

const actual = document.querySelector("#actual");
const total = document.querySelector("#total");

const partidas = document.getElementsByTagName("input")[1];

function compruebaPartida() {
  const regex = /[1-9]/g;
  if (!partidas.value.match(regex)) {
    return false;
  } else {
    total.innerHTML = partidas.value;
    return true;
  }
}

imagenJugador.forEach((element, index) => {
  element.addEventListener("click", () => cambiarMarco(index));
});

let jugadorEleccion = null;

function cambiarMarco(index) {
  imagenJugador.forEach(element => {
    element.classList.remove("seleccionado");
    element.classList.add("noSeleccionado");
  });
  imagenJugador[index].classList.add("seleccionado");
  imagenJugador[index].classList.remove("noSeleccionado");
  jugadorEleccion = index;
}

// aleatoriedad del ordenador
function getRandomPosibilidades() {
  const indice = Math.floor(Math.random() * 3);
  maquinaEleccion = indice;
  return posibilidades[indice];
}

// Accion de los botones
const botones = document.querySelectorAll("button");
const jugarBoton = botones[0];
const yaBoton = botones[1];
const resetBoton = botones[2];

// Evento jugar
function jugar() {
  if (!compruebaNombre()) {
    console.log("incorrecto");
    nombreJugador.classList.add("fondoRojo");
  } else {
    console.log("correcto");
    nombreJugador.classList.remove("fondoRojo");
  }

  if (!compruebaPartida()) {
    console.log("incorrecto");
    partidas.classList.add("fondoRojo");
  } else {
    console.log("correcto");
    partidas.classList.remove("fondoRojo");
  }
}

const imagenOrdenador = document.querySelector("#maquina img");

let maquinaEleccion = null;

// Evento ya
function ya() {
  if (actual.textContent < total.textContent) {
    const maquinaImagen = getRandomPosibilidades();
    imagenOrdenador.src = `img/${maquinaImagen}Ordenador.png`;
    ++actual.innerHTML;
    esGanador();
  }
}

// Comparacion de los resultados

function esGanador() {
  let mensaje = "";

  if (posibilidades[maquinaEleccion] == posibilidades[jugadorEleccion]) {
    mensaje = "Empate";
  } else if (posibilidades[(jugadorEleccion + 1) % 3] == posibilidades[maquinaEleccion]) {
    mensaje = "Gana el ordenador";
  } else if (posibilidades[jugadorEleccion] == posibilidades[(maquinaEleccion + 1) % 3]) {
    mensaje = `Gana ${nombreJugador.value}`;
  }

  historial(mensaje);
}

// Evento reset
function reset() {
  total.innerHTML = 0;
  actual.innerHTML = 0;
  // cambiarMarco(null);
  const arrayLi = document.querySelectorAll("li");
  arrayLi.forEach(element => {
    element.parentNode.removeChild(element);
  });

  imagenJugador.forEach(element => {
    element.classList.remove("seleccionado");
  });
}

// Eventos de botón

jugarBoton.addEventListener("click", jugar);

yaBoton.addEventListener("click", ya);

resetBoton.addEventListener("click", reset);

// Historial
function historial(result) {
  const Ul = document.querySelector("#historial");
  const nuevoLI = document.createElement("li");
  nuevoLI.textContent = result;
  Ul.appendChild(nuevoLI);
}
