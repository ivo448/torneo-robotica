export const getMejorTiempo = (intentos) => {
  const tiemposValidos = intentos
    .filter(i => i.completado === true && i.tiempo)
    .map(i => i.tiempo);
  
  if (tiemposValidos.length === 0) return '-';
  return Math.min(...tiemposValidos.map(t => parseFloat(t) || Infinity)).toFixed(2);
};

export const calcularTotalShowcase = (showcaseData) => {
  const c = parseInt(showcaseData.creatividad) || 0;
  const p = parseInt(showcaseData.presentacion) || 0;
  const m = parseInt(showcaseData.materiales) || 0;
  return c + p + m;
};

export const calcularTotalNombre = (nombreData) => {
  const o = parseInt(nombreData.originalidad) || 0;
  const c = parseInt(nombreData.creatividad) || 0;
  return o + c;
};

export const formatTimestamp = () => {
  return new Date().toLocaleString('es-CL');
};
