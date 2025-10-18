import { useState } from 'react';
import { guardarDatos } from '../services/apiService';
import { CATEGORIAS } from '../config/constants';
import {
  transformSumoData,
  transformCarreraData,
  transformShowcaseData,
  transformNombreData
} from '../utils/dataTransformers';

export const useSaveData = (mostrarMensaje, vista, cargarResultados) => {
  const [guardando, setGuardando] = useState(false);

  const guardar = async (categoria, data, juez) => {
    setGuardando(true);
    
    try {
      let datosTransformados;
      
      switch (categoria) {
        case CATEGORIAS.SUMO:
          datosTransformados = transformSumoData(data, juez);
          break;
        case CATEGORIAS.CARRERA:
          datosTransformados = transformCarreraData(data, juez);
          break;
        case CATEGORIAS.SHOWCASE:
          datosTransformados = transformShowcaseData(data, juez);
          break;
        case CATEGORIAS.NOMBRE:
          datosTransformados = transformNombreData(data, juez);
          break;
        default:
          throw new Error('Categoría no válida');
      }

      await guardarDatos(categoria, datosTransformados, juez);
      mostrarMensaje('✓ Datos guardados correctamente', 'success');
      
      if (vista === 'resultados') {
        setTimeout(() => cargarResultados(), 1000);
      }
      
    } catch (error) {
      console.error('Error:', error);
      mostrarMensaje('✗ Error al guardar. Verifica la conexión.', 'error');
    } finally {
      setGuardando(false);
    }
  };

  return { guardar, guardando };
};
