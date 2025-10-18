import React from 'react';
import { Trophy, Save, BarChart3 } from 'lucide-react';
import { VISTAS } from '../../config/constants';

export const Header = ({ vista, setVista }) => {
  return (
    <div className="card shadow-lg mb-4">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-auto">
            <Trophy className="text-warning" size={48} />
          </div>
          <div className="col">
            <h1 className="mb-0">Torneo de Robótica INACAP 2025</h1>
            <p className="text-muted mb-0">Sistema de Puntuación - Google Sheets</p>
          </div>
          <div className="col-auto">
            <div className="btn-group" role="group">
              <button
                onClick={() => setVista(VISTAS.PUNTUACION)}
                className={`btn ${vista === VISTAS.PUNTUACION ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                <Save className="me-1" size={18} style={{display: 'inline'}} />
                Puntuación
              </button>
              <button
                onClick={() => setVista(VISTAS.RESULTADOS)}
                className={`btn ${vista === VISTAS.RESULTADOS ? 'btn-success' : 'btn-outline-success'}`}
              >
                <BarChart3 className="me-1" size={18} style={{display: 'inline'}} />
                Resultados
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
