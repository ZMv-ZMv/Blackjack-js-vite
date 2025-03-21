

  // Esta funcion sirve para 
  /**
   * obtiene el valor numérico de una carta
   * @param {string} carta 
   * @returns {number} Valor numérico de la carta
   */
  export const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    // Se valida si no es un numero valido
    return (isNaN(valor)) ?
        (valor === 'A' ? 11 : 10)
        : valor * 1;
}

