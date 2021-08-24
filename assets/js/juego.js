



let deck = [];
const tipos = ["C", "D", "H", "S"];
const espceciales = ["A", "J", "Q", "K"];

let puntosJudor = 0;
let puntosComputador = 0;

/// estructura html

const small = document.querySelectorAll("small");

const divCartasJugador = document.querySelector("#Jugador-cartas"),
      divCartaComputadora = document.querySelector("#Coputadora-cartas");


const btnpedir = document.querySelector("#btnPedir"),
      btnDetener = document.querySelector("#btnDetener"),
      btnNuevo= document.querySelector('#btnNuevo');


const crearDeck = () => {
  for (let i = 2; i <= 10; i++)
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  for (let tipo of tipos) {
    for (let esp of espceciales) {
      deck.push(esp + tipo);
    }
  }

  deck = _.shuffle(deck);
  
};

crearDeck();

/// esta funcion me permite tomar una carta

const pedirCarta = () => {
  if (deck.length == 0) {
    throw "no hay cartas";
  } else {
    const carta = deck.pop();

    return carta;
  }
};

const valorCarta = (carta) => {
  let puntos = 0;
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor)
    ? (puntos = valor === "A" ? 11 : 10)
    : (puntos = valor * 1);
};

//logica de computaora
const turnoComputador = (PuntosMinimos) => {
  do {
    const carta = pedirCarta();

    puntosComputador = puntosComputador + valorCarta(carta);
    small[1].innerText = puntosComputador;
    console.log(puntosJudor);

    const imgCarta = document.createElement("img");
    imgCarta.src = `/assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartaComputadora.append(imgCarta);
  } while (puntosComputador <= PuntosMinimos && PuntosMinimos <= 21);

  setTimeout(() => {
    if (puntosComputador === PuntosMinimos) {
      alert("nadie gana");
    } else if (PuntosMinimos > 21) {
      alert("computadora Gana");
    } else if (puntosComputador > 21) {
      alert("Jugador Gana");
    }else{
        alert('computadora Gana')
    }
  }, 10);
}







/// eventos

btnpedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJudor = puntosJudor + valorCarta(carta);
  small[0].innerText = puntosJudor;
  console.log(puntosJudor);

  const imgCarta = document.createElement("img");
  imgCarta.src = `/assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);

  if (puntosJudor > 21) {
    btnpedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputador(puntosJudor);
  } else if (puntosJudor === 21) {
    console.warn("llegaste a 21");
  }
});


btnDetener.addEventListener("click", () => {
  btnDetener.disabled = true;
  btnpedir.disabled = true;
  turnoComputador(puntosJudor);
});

btnNuevo.addEventListener('click',()=>{
  console.clear

  crearDeck();
 
  puntosComputador=0;
  puntosJudor=0;

  divCartaComputadora.innerHTML='';
  divCartasJugador.innerHTML='';

  btnDetener.disabled = false;
  btnpedir.disabled = false;


 

})






//
