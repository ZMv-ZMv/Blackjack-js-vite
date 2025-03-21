

/**
 * Permite tomar una carta de un deck dado
 * @param {[string]} deck La baraja de la que se eligirá la carta
 * @returns {string} Devuelve una carta del deck
 */
export const pedirCarta = (deck) => {
  if (!deck || deck.length === 0) {
      throw 'No hay cartas en el deck'
  }

  return deck.pop();
}
