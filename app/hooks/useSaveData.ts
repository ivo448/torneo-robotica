import { useState } from "react";
import { guardarEnFirestore } from "../services/firebaseService";
import { CATEGORIAS } from "../config/constants";
import {
  getMejorTiempo,
  calcularTotalShowcase,
  calcularTotalNombre,
} from "../utils/helpers";
import type { ShowcaseData, Intento, NombreData } from "~/utils/helpers";

interface Data {
  // Define los tipos correctos para los datos.  Esto dependerá de la estructura de tus datos.
  [key: string]: any; // Ajusta esto según la estructura real
}

export const useSaveData = (
  mostrarMensaje: (texto: string, tipo?: "success" | "danger") => void,
) => {
  const [guardando, setGuardando] = useState<boolean>(false);

  const guardar = async (
    categoria: string,
    data: any,
    juez: string,
    resetCallback?: () => void,
  ) => {
    if (!juez) {
      mostrarMensaje("Por favor, ingresa tu nombre de juez.", "danger");
      return;
    }

    setGuardando(true);

    try {
      let datos: any = { ...data };

      // Agregar campos calculados según categoría
      switch (categoria) {
        case CATEGORIAS.CARRERA:
          datos = {
            ...datos,
            mejorTiempo: getMejorTiempo(data as Intento[]),
          };
          break;
        case CATEGORIAS.SHOWCASE:
          datos = {
            ...datos,
            total: calcularTotalShowcase(data as ShowcaseData),
          };
          break;
        case CATEGORIAS.NOMBRE:
          datos = { ...datos, total: calcularTotalNombre(data as NombreData) };
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
      mostrarMensaje("✗ Error al guardar. Intenta de nuevo.", "danger");
    } finally {
      setGuardando(false);
    }
  };

  return { guardar, guardando };
};
