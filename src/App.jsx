import React, { useState } from "react";
import { Mensaje } from "./components/common/Mensaje";
import { Header } from "./components/common/Header";
import { VistaPuntuacion } from "./components/vistas/VistaPuntuacion";
import { VistaResultados } from "./components/vistas/VistaResultados";
import { useMensaje } from "./hooks/useMensaje";
import { useResultados } from "./hooks/useResultados";
import { useSaveData } from "./hooks/useSaveData";
import { VISTAS, CATEGORIAS } from "./config/constants";
import {
  initialSumoData,
  initialCarreraData,
  initialShowcaseData,
  initialNombreData,
} from "./utils/initialStates";

export default function App() {
  const [vista, setVista] = useState(VISTAS.PUNTUACION);
  const [categoria, setCategoria] = useState(CATEGORIAS.SUMO);
  const [juez, setJuez] = useState("");

  const [sumoData, setSumoData] = useState(initialSumoData);
  const [carreraData, setCarreraData] = useState(initialCarreraData);
  const [showcaseData, setShowcaseData] = useState(initialShowcaseData);
  const [nombreData, setNombreData] = useState(initialNombreData);

  const { mensaje, mostrarMensaje } = useMensaje();
  const { resultados, cargandoResultados, cargarResultados } = useResultados(
    vista,
    mostrarMensaje,
  );
  const { guardar, guardando } = useSaveData(
    mostrarMensaje,
    vista,
    cargarResultados,
  );

  const resetSumo = () => setSumoData(initialSumoData);
  const resetCarrera = () => setCarreraData(initialCarreraData);

  const handleGuardar = () => {
    let data;
    switch (categoria) {
      case CATEGORIAS.SUMO:
        data = sumoData;
        break;
      case CATEGORIAS.CARRERA:
        data = carreraData;
        break;
      case CATEGORIAS.SHOWCASE:
        data = showcaseData;
        break;
      case CATEGORIAS.NOMBRE:
        data = nombreData;
        break;
      default:
        return;
    }
    guardar(categoria, data, juez);
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div
        className="min-vh-100"
        style={{
          background:
            "linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)",
        }}
      >
        <div className="container-fluid p-4">
          <Mensaje mensaje={mensaje} />

          <Header vista={vista} setVista={setVista} />

          {vista === VISTAS.PUNTUACION ? (
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
          ) : (
            <VistaResultados
              resultados={resultados}
              cargarResultados={cargarResultados}
              cargandoResultados={cargandoResultados}
            />
          )}
        </div>
      </div>
    </>
  );
}
