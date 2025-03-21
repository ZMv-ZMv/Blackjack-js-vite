import _ from "underscore"

// // importación individual: es necesario que en el módulo origen se agregue la palabra export a la función o variable que se desea exportar
// import { crearDeck } from "./usecases/crear-deck";
// // la importación se puede renombrar con la palabra as:
// // import { crearDeck as crearNuevoDeck } from "./usecases/crear-deck";

// importación por defecto: es necesario que en el módulo de origen se agregue al final: export default funcionAExportar.
import crearDeck from "./usecases/crear-deck";

import { pedirCarta } from "./usecases/pedir-carta";

import { valorCarta } from "./usecases/valor-carta";

/*
Como las cartas estan en ingles, asi se deben manejar internamente
    * 2C = Two of Clubs (Treboles)
    * 2D = Two of Diamonds (Diamantes)
    * 2H = Two of Hearts (Corazones)
    * 2S = Two of Spades (Espadas)
*/

// Sintaxis del Patron Modulo
const miJuegoModulo = ( () => {
  // Valida el codigo 
  'use strict'
  
  // Manejo de las cartas
  let     deck = [],
          puntosJugadores = [];

  const   tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
  
  // Rerefencias del HTML
  const   btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo'),
          divCartasJugadores = document.querySelectorAll ('.divCartas');
  
  let     puntosHTML = document.querySelectorAll('small');
  
  // Esta funcion inicia el juego con el # de jugadores
  const inicializarJuego = ( numJugadores = 2 ) => {
      deck = crearDeck (tipos, especiales);
      puntosJugadores = [];

      for(let i = 0; i < numJugadores; i++){
          puntosJugadores.push(0);
          puntosHTML[i].innerText = 0;
          divCartasJugadores[i].innerHTML = '';
      }

      btnPedir.disabled = false;
      btnDetener.disabled = true;

  }

  
  // En JS un color morado es un numero y gris es un string
  
  const acumularPuntos = (carta,turno) => {

      // Turno:0 = Primer Jugador y el ultimo sera la PC
      puntosJugadores[turno] = puntosJugadores[turno] + valorCarta (carta);
      puntosHTML[turno].innerText = puntosJugadores[turno];

      return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno)=> {

      const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add('carta')

      divCartasJugadores[turno].append(imgCarta);

  }

  const determinarGanador = () => {
      // Destructuracion de arreglos solo para 2 jugadores
      const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

      setTimeout( ()=> {
          if ( puntosComputadora === puntosMinimos ){
              alert('Empate.... nadie gana :( ... otra vez!');
          } else if ( puntosMinimos > 21){
              alert ('La computadora gana!');
          } else if (puntosComputadora > 21){
              alert ('Felicidades, haz ganado!');
          } else if ( puntosMinimos === 21 && puntosComputadora !== 21 ){
              alert ('BlackJack!... Felicidades, haz ganado');
          }
          else{
              alert ('La computadora gana!');
          }
      }, 300); 
  }

  // Eventos
  // Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
      let puntosComputadora = 0;

      do{
  
          const carta = pedirCarta(deck);
          // console.log(puntosHTML);
          puntosComputadora = acumularPuntos ( carta, puntosJugadores.length-1 );
          crearCarta (carta,puntosJugadores.length-1);
  
      } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <=21) );

      determinarGanador();
  
  }
  
  // Para escuchar un evento
  btnPedir.addEventListener('click', () => {
  
      const carta = pedirCarta(deck);

      const puntosJugador = acumularPuntos ( carta, 0);
      crearCarta (carta,0);
  
      if (puntosJugador > 21) {
          btnDetener.disabled = true;
          btnPedir.disabled = true; // Desactiva el boton
          turnoComputadora (puntosJugador); // Estan de manera global
      } else if (puntosJugador === 21) {
          // console.warn ('Buen trabajo!')
          btnDetener.disabled = true;
          btnPedir.disabled = true;
          turnoComputadora (puntosJugador); // Estan de manera global
      } else{
          btnDetener.disabled = false;
          btnPedir.disabled = false;
      }
  
  })
  
  // Escucha cuando hace click en detener
  btnDetener.addEventListener('click', () => {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora (puntosJugadores[0]);
  }) 
  
  // Escucha cuando hace click en Nuevo Juego
  btnNuevo.addEventListener('click', () => {

      inicializarJuego();

  }) 

  return {
      nuevoJuego: inicializarJuego
  };

})();

