import { getMejorTiempo, calcularTotalShowcase, calcularTotalNombre } from './helpers';

export const transformSumoData = (sumoData, juez) => {
  return {
    juez: juez,
    round: sumoData.round,
    equipo1: sumoData.equipo1,
    equipo2: sumoData.equipo2,
    penalizaciones1_salidaFalsa: sumoData.penalizaciones1.salidaFalsa,
    penalizaciones1_intervencion: sumoData.penalizaciones1.intervencion ? 'Sí' : 'No',
    penalizaciones1_conducta: sumoData.penalizaciones1.conducta ? 'Sí' : 'No',
    penalizaciones2_salidaFalsa: sumoData.penalizaciones2.salidaFalsa,
    penalizaciones2_intervencion: sumoData.penalizaciones2.intervencion ? 'Sí' : 'No',
    penalizaciones2_conducta: sumoData.penalizaciones2.conducta ? 'Sí' : 'No',
    ganador: sumoData.ganador,
    victoriaMotivo: sumoData.victoriaMotivo,
    observaciones: sumoData.observaciones
  };
};

export const transformCarreraData = (carreraData, juez) => {
  return {
    juez: juez,
    equipo: carreraData.equipo,
    intento1_tiempo: carreraData.intentos[0].tiempo,
    intento1_completado: carreraData.intentos[0].completado === true ? 'Sí' : carreraData.intentos[0].completado === false ? 'No' : '-',
    intento2_tiempo: carreraData.intentos[1].tiempo,
    intento2_completado: carreraData.intentos[1].completado === true ? 'Sí' : carreraData.intentos[1].completado === false ? 'No' : '-',
    intento3_tiempo: carreraData.intentos[2].tiempo,
    intento3_completado: carreraData.intentos[2].completado === true ? 'Sí' : carreraData.intentos[2].completado === false ? 'No' : '-',
    mejorTiempo: getMejorTiempo(carreraData.intentos),
    penalizaciones_salidaFalsa: carreraData.penalizaciones.salidaFalsa,
    penalizaciones_salidaPista: carreraData.penalizaciones.salidaPista,
    penalizaciones_noCompleto: carreraData.penalizaciones.noCompleto,
    observaciones: carreraData.observaciones
  };
};

export const transformShowcaseData = (showcaseData, juez) => {
  return {
    juez: juez,
    equipo: showcaseData.equipo,
    creatividad: showcaseData.creatividad,
    presentacion: showcaseData.presentacion,
    materiales: showcaseData.materiales,
    total: calcularTotalShowcase(showcaseData)
  };
};

export const transformNombreData = (nombreData, juez) => {
  return {
    juez: juez,
    equipo: nombreData.equipo,
    nombreRobot: nombreData.nombreRobot,
    originalidad: nombreData.originalidad,
    creatividad: nombreData.creatividad,
    total: calcularTotalNombre(nombreData)
  };
};
