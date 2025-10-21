export interface SumoData {
  round: string;
  equipo1: string;
  equipo2: string;
  penalizaciones1: {
    salidaFalsa: number;
    intervencion: boolean;
    conducta: boolean;
  };
  penalizaciones2: {
    salidaFalsa: number;
    intervencion: boolean;
    conducta: boolean;
  };
  ganador: string;
  victoriaMotivo: string;
  observaciones: string;
}

export const initialSumoData: SumoData = {
  round: "",
  equipo1: "",
  equipo2: "",
  penalizaciones1: { salidaFalsa: 0, intervencion: false, conducta: false },
  penalizaciones2: { salidaFalsa: 0, intervencion: false, conducta: false },
  ganador: "",
  victoriaMotivo: "",
  observaciones: "",
};

export interface CarreraData {
  equipo: string;
  intentos: { tiempo: string; completado: boolean | null }[];
  penalizaciones: {
    salidaFalsa: number;
    salidaPista: number;
    noCompleto: number;
  };
  observaciones: string;
}

export const initialCarreraData: CarreraData = {
  equipo: "",
  intentos: [
    { tiempo: "", completado: null },
    { tiempo: "", completado: null },
    { tiempo: "", completado: null },
  ],
  penalizaciones: { salidaFalsa: 0, salidaPista: 0, noCompleto: 0 },
  observaciones: "",
};

export interface ShowcaseData {
  equipo: string;
  creatividad: string;
  presentacion: string;
  materiales: string;
}

export const initialShowcaseData: ShowcaseData = {
  equipo: "",
  creatividad: "",
  presentacion: "",
  materiales: "",
};

export interface NombreData {
  equipo: string;
  nombreRobot: string;
  originalidad: string;
  creatividad: string;
}

export const initialNombreData: NombreData = {
  equipo: "",
  nombreRobot: "",
  originalidad: "",
  creatividad: "",
};

export interface Resultados {
  sumo: SumoData[];
  carrera: CarreraData[];
  showcase: ShowcaseData[];
  nombre: NombreData[];
}

export const initialResultados: Resultados = {
  sumo: [],
  carrera: [],
  showcase: [],
  nombre: [],
};
