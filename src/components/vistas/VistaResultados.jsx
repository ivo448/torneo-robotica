import React from 'react';
import { RefreshCw } from 'lucide-react';
import { ResultadosSumo } from '../resultados/ResultadosSumo';
import { RankingCarrera } from '../resultados/RankingCarrera';
import { RankingShowcase } from '../resultados/RankingShowcase';
import { RankingNombre } from '../resultados/RankingNombre';

export const VistaResultados = ({ resultados, cargarResultados, cargandoResultados }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Resultados en Tiempo Real</h2>
        <button onClick={cargarResultados} disabled={cargandoResultados} className="btn btn-primary">
          <RefreshCw className={`me-2 ${cargandoResultados ? 'spinner-border spinner-border-sm' : ''}`} size={20} />
          Actualizar
        </button>
      </div>

      <ResultadosSumo resultados={resultados} />
      <RankingCarrera resultados={resultados} />
      <RankingShowcase resultados={resultados} />
      <RankingNombre resultados={resultados} />
    </div>
  );
};
