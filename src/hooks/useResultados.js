import { useState, useEffect } from 'react';
import { cargarResultados as cargarResultadosApi } from '../services/apiService';
import { initialResultados } from '../utils/initialStates';
import { VISTAS } from '../config/constants';

export const useResultados = (vista, mostrarMensaje) => {
  const [resultados, setResultados] = useState(initialResultados);
  const [cargandoResultados, setCargandoResultados] = useState(false);

  const cargarResultados = async () => {
    setCargandoResultados(true);
    try {
      const data = await cargarResultadosApi();
      setResultados(data);
    } catch (error) {
      console.error('Error al cargar resultados:', error);
      mostrarMensaje('Error al cargar resultados', 'error');
    } finally {
      setCargandoResultados(false);
    }
  };

  useEffect(() => {
    if (vista === VISTAS.RESULTADOS) {
      cargarResultados();
      const intervalo = setInterval(cargarResultados, 30000);
      return () => clearInterval(intervalo);
    }
  }, [vista]);

  return { resultados, cargandoResultados, cargarResultados };
};
