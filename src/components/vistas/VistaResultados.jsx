import React from "react";
import { ResultadosSumo } from "../resultados/ResultadosSumo";
import { RankingCarrera } from "../resultados/RankingCarrera";
import { RankingShowcase } from "../resultados/RankingShowcase";
import { RankingNombre } from "../resultados/RankingNombre";

export const VistaResultados = ({ resultados, cargandoResultados }) => {
  return (
    <div>
      <div className="mb-4">
        <h2>Resultados en Tiempo Real</h2>
        {cargandoResultados && (
          <div className="alert alert-info">Cargando resultados...</div>
        )}
        <p className="text-muted">
          Los resultados se actualizan automáticamente cuando se agregan nuevos
          datos
        </p>
      </div>

      <ResultadosSumo resultados={resultados} />
      <RankingCarrera resultados={resultados} />
      <RankingShowcase resultados={resultados} />
      <RankingNombre resultados={resultados} />
    </div>
  );
};
