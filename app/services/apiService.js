import { SCRIPT_URL, SHEET_NAMES } from '../config/constants';
import { formatTimestamp } from '../utils/helpers';

export const guardarDatos = async (categoria, datos, juez) => {
  const hoja = SHEET_NAMES[categoria];
  const valores = Object.values({
    timestamp: formatTimestamp(),
    juez: juez,
    ...datos
  });
  
  await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sheetName: hoja,
      values: valores
    })
  });
};

export const cargarResultados = async () => {
  const response = await fetch(`${SCRIPT_URL}?action=getResults`);
  const result = await response.json();
  
  if (result.status === 'success') {
    return {
      sumo: result.data.sumo || [],
      carrera: result.data.carrera || [],
      showcase: result.data.showcase || [],
      nombre: result.data.mejornombre || []
    };
  }
  
  throw new Error('Error al cargar resultados');
};
