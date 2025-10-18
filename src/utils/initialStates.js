export const initialSumoData = {
  round: '',
  equipo1: '',
  equipo2: '',
  penalizaciones1: { salidaFalsa: 0, intervencion: false, conducta: false },
  penalizaciones2: { salidaFalsa: 0, intervencion: false, conducta: false },
  ganador: '',
  victoriaMotivo: '',
  observaciones: ''
};

export const initialCarreraData = {
  equipo: '',
  intentos: [
    { tiempo: '', completado: null },
    { tiempo: '', completado: null },
    { tiempo: '', completado: null }
  ],
  penalizaciones: { salidaFalsa: 0, salidaPista: 0, noCompleto: 0 },
  observaciones: ''
};

export const initialShowcaseData = {
  equipo: '',
  creatividad: '',
  presentacion: '',
  materiales: ''
};

export const initialNombreData = {
  equipo: '',
  nombreRobot: '',
  originalidad: '',
  creatividad: ''
};

export const initialResultados = {
  sumo: [],
  carrera: [],
  showcase: [],
  nombre: []
};
