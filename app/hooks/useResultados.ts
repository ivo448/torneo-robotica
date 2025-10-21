import { useState, useEffect } from "react";
import { suscribirseAResultados } from "../services/firebaseService";
import { initialResultados } from "../utils/initialStates";
import { VISTAS } from "../config/constants";

interface Resultados {
  // Define el tipo correcto para Resultados.  Esto dependerá de la estructura de tus datos.
  // Ejemplo:
  [key: string]: any; // Ajusta esto según la estructura real
}

export const useResultados = (
  vista: string,
  mostrarMensaje: (texto: string, tipo?: "success" | "danger") => void,
) => {
  const [resultados, setResultados] = useState<Resultados>(initialResultados);
  const [cargandoResultados, setCargandoResultados] = useState<boolean>(false);

  useEffect(() => {
    if (vista === VISTAS.RESULTADOS) {
      setCargandoResultados(true);

      const callbacks = {
        onSuccess: (keyEstado: string, datos: any) => {
          // Ajusta 'any' según el tipo de datos
          setResultados((prev) => ({ ...prev, [keyEstado]: datos }));
        },
        onError: (nombreColeccion: string) => {
          mostrarMensaje(`Error al cargar ${nombreColeccion}`, "danger");
        },
      };

      const unsubscribe = suscribirseAResultados(callbacks);
      setCargandoResultados(false);

      // Cleanup: desuscribirse cuando se desmonte o cambie de vista
      return () => {
        unsubscribe();
      };
    }
  }, [vista]);

  return { resultados, cargandoResultados };
};
