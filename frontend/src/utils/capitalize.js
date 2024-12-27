export function capitalize(str) {
    // Compruebe si la cadena no está vacía
    if (str.length === 0) {
      return str;
    }
  
    // Ponga en mayúscula la primera letra y concatene con el resto de la cadena.
    return str.charAt(0).toUpperCase() + str.slice(1);
  }