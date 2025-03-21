  import _ from "underscore";
  
  // Esta funcion crea un nuevo deck
  // export const crearDeck = (tiposDeCarta, tiposEspeciales) => {
  // la palabra export se usa para exporta una función o variable individual, luego en el módulo donde se va a importar: import {crearDeck} from "...". Si lo que se quiere es exportar esta función por defecto, ir al final del documento...
  /**
   * Esta función crea un nuevo deck
   * @param {[strings]} tiposDeCarta Ejemplo: ['C', 'D', 'H', 'S']
   * @param {[strings]} tiposEspeciales Ejemplo ['A', 'J', 'Q', 'K']
   * @returns {[strings]} regresa un nuevo deck de cartas
   */
  const crearDeck = (tiposDeCarta, tiposEspeciales) => {

    if (!tiposDeCarta || tiposDeCarta.length === 0)
      throw new Error("Tipos de carta es obligatorio como un arreglo de strring");
    if (!tiposEspeciales || tiposEspeciales.length === 0)
      throw new Error("Tipos de carta es obligatorio como un arreglo de strring");
    

    // Reiniciamos el deck
    let deck = [];

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tiposDeCarta) {
            deck.push(i + tipo);
        }
    
    }
    for (let tipo of tiposDeCarta) {
        for (let esp of tiposEspeciales) {
            deck.push(esp + tipo);
        }
    }

    // Revuelve los elementos del deck
    return _.shuffle(deck);
}

// exportación de una función o variable por defecto:
export default crearDeck
// luego en el módulo de importación: import nombreQueTendraLaFuncionImportada from "..."