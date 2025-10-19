import React from 'react';
import { Award } from 'lucide-react';

export const RankingShowcase = ({ resultados }) => {
  const datos = resultados.showcase.map(row => ({
    equipo: row.Equipo || row.equipo,
    total: parseInt(row.Total || row.total) || 0,
    creatividad: row.Creatividad || row.creatividad,
    presentacion: row.Presentacion || row.presentacion,
    materiales: row.Materiales || row.materiales
  })).filter(d => d.equipo).sort((a, b) => b.total - a.total);

  return (
    <div className="card shadow-lg mb-4">
      <div className="card-header bg-success text-white">
        <h3 className="mb-0"><Award className="me-2" size={24} style={{display: 'inline'}} />Ranking Showcase</h3>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Posición</th>
                <th>Equipo</th>
                <th>Creatividad</th>
                <th>Presentación</th>
                <th>Materiales</th>
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
                  <td>{item.creatividad}/10</td>
                  <td>{item.presentacion}/10</td>
                  <td>{item.materiales}/10</td>
                  <td><span className="badge bg-primary">{item.total}/30</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
