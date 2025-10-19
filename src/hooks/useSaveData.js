import { useState } from "react";
import { guardarEnFirestore } from "../services/firebaseService";
import { CATEGORIAS } from "../config/constants";
import {
  getMejorTiempo,
  calcularTotalShowcase,
  calcularTotalNombre,
} from "../utils/helpers";

export const useSaveData = (mostrarMensaje) => {
  const [guardando, setGuardando] = useState(false);

  const guardar = async (categoria, data, juez, resetCallback) => {
    if (!juez) {
      mostrarMensaje("Por favor, ingresa tu nombre de juez.", "error");
      return;
    }

    setGuardando(true);

    try {
      let datos = { ...data };

      // Agregar campos calculados según categoría
      switch (categoria) {
        case CATEGORIAS.CARRERA:
          datos.mejorTiempo = getMejorTiempo(data.intentos);
          break;
        case CATEGORIAS.SHOWCASE:
          datos.total = calcularTotalShowcase(data);
          break;
        case CATEGORIAS.NOMBRE:
          datos.total = calcularTotalNombre(data);
          break;
        default:
          break;
      }

      await guardarEnFirestore(categoria, datos, juez);
      mostrarMensaje("✓ Datos guardados correctamente", "success");

      // Limpiar formulario después de guardar
      if (resetCallback) {
        resetCallback();
      }
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      mostrarMensaje("✗ Error al guardar. Intenta de nuevo.", "error");
    } finally {
      setGuardando(false);
    }
  };

  return { guardar, guardando };
};
