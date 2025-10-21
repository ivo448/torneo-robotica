import { useState } from "react";
import { VistaPuntuacion } from "../components/vistas/VistaPuntuacion";
import { useMensaje } from "../hooks/useMensaje";
import { useSaveData } from "../hooks/useSaveData";
import { CATEGORIAS } from "../config/constants";
import {
  initialSumoData,
  initialCarreraData,
  initialShowcaseData,
  initialNombreData,
} from "../utils/initialStates";

export default function Puntuacion() {
  const [categoria, setCategoria] = useState(CATEGORIAS.SUMO);
  const [juez, setJuez] = useState("");

  const [sumoData, setSumoData] = useState(initialSumoData);
  const [carreraData, setCarreraData] = useState(initialCarreraData);
  const [showcaseData, setShowcaseData] = useState(initialShowcaseData);
  const [nombreData, setNombreData] = useState(initialNombreData);

  const { mostrarMensaje } = useMensaje();
  const { guardar, guardando } = useSaveData(mostrarMensaje);

  const resetSumo = () => setSumoData(initialSumoData);
  const resetCarrera = () => setCarreraData(initialCarreraData);
  const resetShowcase = () => setShowcaseData(initialShowcaseData);
  const resetNombre = () => setNombreData(initialNombreData);

  const handleGuardar = () => {
    let data, resetCallback;

    switch (categoria) {
      case CATEGORIAS.SUMO:
        data = sumoData;
        resetCallback = resetSumo;
        break;
      case CATEGORIAS.CARRERA:
        data = carreraData;
        resetCallback = resetCarrera;
        break;
      case CATEGORIAS.SHOWCASE:
        data = showcaseData;
        resetCallback = resetShowcase;
        break;
      case CATEGORIAS.NOMBRE:
        data = nombreData;
        resetCallback = resetNombre;
        break;
      default:
        return;
    }

    guardar(categoria, data, juez, resetCallback);
  };

  return (
    <VistaPuntuacion
      juez={juez}
      setJuez={setJuez}
      categoria={categoria}
      setCategoria={setCategoria}
      sumoData={sumoData}
      setSumoData={setSumoData}
      carreraData={carreraData}
      setCarreraData={setCarreraData}
      showcaseData={showcaseData}
      setShowcaseData={setShowcaseData}
      nombreData={nombreData}
      setNombreData={setNombreData}
      onGuardar={handleGuardar}
      guardando={guardando}
      resetSumo={resetSumo}
      resetCarrera={resetCarrera}
    />
  );
}
