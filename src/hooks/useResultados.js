import { useState, useEffect } from "react";
import { suscribirseAResultados } from "../services/firebaseService";
import { initialResultados } from "../utils/initialStates";
import { VISTAS } from "../config/constants";

export const useResultados = (vista, mostrarMensaje) => {
  const [resultados, setResultados] = useState(initialResultados);
  const [cargandoResultados, setCargandoResultados] = useState(false);

  useEffect(() => {
    if (vista === VISTAS.RESULTADOS) {
      setCargandoResultados(true);

      const callbacks = {
        onSuccess: (keyEstado, datos) => {
          setResultados((prev) => ({ ...prev, [keyEstado]: datos }));
        },
        onError: (nombreColeccion) => {
          mostrarMensaje(`Error al cargar ${nombreColeccion}`, "error");
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
