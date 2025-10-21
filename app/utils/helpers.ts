export interface Intento {
  completado: boolean;
  tiempo: string | number | readonly string[] | undefined;
}

export const getMejorTiempo = (intentos: Intento[]): string => {
  const tiemposValidos = intentos
    .filter((i) => i.completado === true && i.tiempo)
    .map((i) => i.tiempo) as string[];

  if (tiemposValidos.length === 0) return "-";
  return Math.min(
    ...tiemposValidos.map((t) => parseFloat(t) || Infinity),
  ).toFixed(2);
};

export interface ShowcaseData {
  creatividad: string | number;
  presentacion: string | number;
  materiales: string | number;
}

export const calcularTotalShowcase = (showcaseData: ShowcaseData): number => {
  const c = parseInt(String(showcaseData.creatividad)) || 0;
  const p = parseInt(String(showcaseData.presentacion)) || 0;
  const m = parseInt(String(showcaseData.materiales)) || 0;
  return c + p + m;
};

export interface NombreData {
  originalidad: string | number;
  creatividad: string | number;
}

export const calcularTotalNombre = (nombreData: NombreData): number => {
  const o = parseInt(String(nombreData.originalidad)) || 0;
  const c = parseInt(String(nombreData.creatividad)) || 0;
  return o + c;
};

export const formatTimestamp = (): string => {
  return new Date().toLocaleString("es-CL");
};
