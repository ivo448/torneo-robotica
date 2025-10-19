import React from 'react';
import { Trophy } from 'lucide-react';

export const ResultadosSumo = ({ resultados }) => {
  const datos = resultados.sumo.filter(row => row.Equipo1 || row.equipo1);
  
  return (
    <div className="card shadow-lg mb-4">
      <div className="card-header bg-danger text-white">
        <h3 className="mb-0"><Trophy className="me-2" size={24} style={{display: 'inline'}} />Resultados Sumo</h3>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Round</th>
                <th>Equipo 1</th>
                <th>Equipo 2</th>
                <th>Ganador</th>
                <th>Motivo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {datos.reverse().map((row, idx) => {
                const round = row.Round || row.round;
                const equipo1 = row.Equipo1 || row.equipo1;
                const equipo2 = row.Equipo2 || row.equipo2;
                const ganador = row.Ganador || row.ganador;
                const motivo = row.VictoriaMotivo || row.victoriaMotivo;
                const timestamp = row.Timestamp || row.timestamp;
                
                return (
                  <tr key={idx}>
                    <td><span className="badge bg-secondary">{round}</span></td>
                    <td className={ganador === 'equipo1' ? 'fw-bold text-success' : ''}>{equipo1}</td>
                    <td className={ganador === 'equipo2' ? 'fw-bold text-success' : ''}>{equipo2}</td>
                    <td>
                      <span className={`badge ${ganador === 'empate' ? 'bg-warning' : 'bg-success'}`}>
                        {ganador === 'equipo1' ? 'Equipo 1' : ganador === 'equipo2' ? 'Equipo 2' : 'Empate'}
                      </span>
                    </td>
                    <td className="small">{motivo}</td>
                    <td className="text-muted small">{timestamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
