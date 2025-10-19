import React from 'react';
import { calcularTotalNombre } from '../../utils/helpers';

export const FormularioNombre = ({ nombreData, setNombreData }) => {
  return (
    <div className="card shadow-lg">
      <div className="card-header bg-warning text-dark">
        <h2 className="mb-0">Mejor Nombre</h2>
      </div>
      <div className="card-body">
        <div className="mb-4">
          <label className="form-label fw-bold">Nombre del equipo</label>
          <input
            type="text"
            value={nombreData.equipo}
            onChange={(e) => setNombreData({...nombreData, equipo: e.target.value})}
            className="form-control mb-3"
            placeholder="Nombre del equipo"
          />

          <label className="form-label fw-bold">Nombre del robot</label>
          <input
            type="text"
            value={nombreData.nombreRobot}
            onChange={(e) => setNombreData({...nombreData, nombreRobot: e.target.value})}
            className="form-control"
            placeholder="Nombre del robot"
          />
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-bold">Originalidad (0-10)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={nombreData.originalidad}
              onChange={(e) => setNombreData({...nombreData, originalidad: e.target.value})}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Creatividad (0-10)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={nombreData.creatividad}
              onChange={(e) => setNombreData({...nombreData, creatividad: e.target.value})}
              className="form-control"
            />
          </div>
        </div>

        <div className="alert alert-warning">
          <h4 className="mb-0">Puntaje Total: {calcularTotalNombre(nombreData)}/20</h4>
        </div>
      </div>
    </div>
  );
};
