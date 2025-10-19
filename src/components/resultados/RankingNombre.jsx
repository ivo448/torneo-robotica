import React from 'react';
import { Star } from 'lucide-react';

export const RankingNombre = ({ resultados }) => {
  const datos = resultados.nombre.map(row => ({
    equipo: row.Equipo || row.equipo,
    nombreRobot: row.NombreRobot || row.nombreRobot,
    total: parseInt(row.Total || row.total) || 0,
    originalidad: row.Originalidad || row.originalidad,
    creatividad: row.Creatividad || row.creatividad
  })).filter(d => d.equipo).sort((a, b) => b.total - a.total);

  return (
    <div className="card shadow-lg mb-4">
      <div className="card-header bg-warning text-dark">
        <h3 className="mb-0"><Star className="me-2" size={24} style={{display: 'inline'}} />Ranking Mejor Nombre</h3>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Posición</th>
                <th>Equipo</th>
                <th>Nombre Robot</th>
                <th>Originalidad</th>
                <th>Creatividad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <span className={`badge ${idx === 0 ? 'bg-warning' : idx === 1 ? 'bg-secondary' : idx === 2 ? 'bg-info' : 'bg-light text-dark'}`}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td className="fw-bold">{item.equipo}</td>
                  <td className="text-primary">{item.nombreRobot}</td>
                  <td>{item.originalidad}/10</td>
                  <td>{item.creatividad}/10</td>
                  <td><span className="badge bg-primary">{item.total}/20</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
