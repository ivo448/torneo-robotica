import React from 'react';
import { Plus, Minus } from 'lucide-react';

export const FormularioSumo = ({ sumoData, setSumoData, onReset }) => {
  return (
    <div className="card shadow-lg">
      <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Sumo de Robots</h2>
        <button onClick={onReset} className="btn btn-light btn-sm">
          Limpiar
        </button>
      </div>
      <div className="card-body">
        <div className="mb-4">
          <label className="form-label fw-bold">Round</label>
          <input
            type="text"
            value={sumoData.round}
            onChange={(e) => setSumoData({...sumoData, round: e.target.value})}
            className="form-control"
            placeholder="Ej: Semifinal 1"
          />
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Equipo 1</h4>
              </div>
              <div className="card-body">
                <input
                  type="text"
                  value={sumoData.equipo1}
                  onChange={(e) => setSumoData({...sumoData, equipo1: e.target.value})}
                  className="form-control mb-3"
                  placeholder="Nombre del equipo"
                />
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold">Salida falsa</span>
                  <div className="btn-group">
                    <button
                      onClick={() => setSumoData({
                        ...sumoData,
                        penalizaciones1: {
                          ...sumoData.penalizaciones1,
                          salidaFalsa: Math.max(0, sumoData.penalizaciones1.salidaFalsa - 1)
                        }
                      })}
                      className="btn btn-sm btn-secondary"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="btn btn-sm btn-light disabled">{sumoData.penalizaciones1.salidaFalsa}/3</span>
                    <button
                      onClick={() => setSumoData({
                        ...sumoData,
                        penalizaciones1: {
                          ...sumoData.penalizaciones1,
                          salidaFalsa: Math.min(3, sumoData.penalizaciones1.salidaFalsa + 1)
                        }
                      })}
                      className="btn btn-sm btn-secondary"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    checked={sumoData.penalizaciones1.intervencion}
                    onChange={(e) => setSumoData({
                      ...sumoData,
                      penalizaciones1: {...sumoData.penalizaciones1, intervencion: e.target.checked}
                    })}
                    className="form-check-input"
                  />
                  <label className="form-check-label">Intervención humana</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    checked={sumoData.penalizaciones1.conducta}
                    onChange={(e) => setSumoData({
                      ...sumoData,
                      penalizaciones1: {...sumoData.penalizaciones1, conducta: e.target.checked}
                    })}
                    className="form-check-input"
                  />
                  <label className="form-check-label">Conducta antideportiva</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card border-danger">
              <div className="card-header bg-danger text-white">
                <h4 className="mb-0">Equipo 2</h4>
              </div>
              <div className="card-body">
                <input
                  type="text"
                  value={sumoData.equipo2}
                  onChange={(e) => setSumoData({...sumoData, equipo2: e.target.value})}
                  className="form-control mb-3"
                  placeholder="Nombre del equipo"
                />
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold">Salida falsa</span>
                  <div className="btn-group">
                    <button
                      onClick={() => setSumoData({
                        ...sumoData,
                        penalizaciones2: {
                          ...sumoData.penalizaciones2,
                          salidaFalsa: Math.max(0, sumoData.penalizaciones2.salidaFalsa - 1)
                        }
                      })}
                      className="btn btn-sm btn-secondary"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="btn btn-sm btn-light disabled">{sumoData.penalizaciones2.salidaFalsa}/3</span>
                    <button
                      onClick={() => setSumoData({
                        ...sumoData,
                        penalizaciones2: {
                          ...sumoData.penalizaciones2,
                          salidaFalsa: Math.min(3, sumoData.penalizaciones2.salidaFalsa + 1)
                        }
                      })}
                      className="btn btn-sm btn-secondary"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    checked={sumoData.penalizaciones2.intervencion}
                    onChange={(e) => setSumoData({
                      ...sumoData,
                      penalizaciones2: {...sumoData.penalizaciones2, intervencion: e.target.checked}
                    })}
                    className="form-check-input"
                  />
                  <label className="form-check-label">Intervención humana</label>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    checked={sumoData.penalizaciones2.conducta}
                    onChange={(e) => setSumoData({
                      ...sumoData,
                      penalizaciones2: {...sumoData.penalizaciones2, conducta: e.target.checked}
                    })}
                    className="form-check-input"
                  />
                  <label className="form-check-label">Conducta antideportiva</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="mb-3">Resultado</h4>
          <div className="btn-group w-100 mb-3" role="group">
            <button
              onClick={() => setSumoData({...sumoData, ganador: 'equipo1'})}
              className={`btn ${sumoData.ganador === 'equipo1' ? 'btn-primary' : 'btn-outline-primary'}`}
            >
              Ganador: Equipo 1
            </button>
            <button
              onClick={() => setSumoData({...sumoData, ganador: 'equipo2'})}
              className={`btn ${sumoData.ganador === 'equipo2' ? 'btn-danger' : 'btn-outline-danger'}`}
            >
              Ganador: Equipo 2
            </button>
            <button
              onClick={() => setSumoData({...sumoData, ganador: 'empate'})}
              className={`btn ${sumoData.ganador === 'empate' ? 'btn-warning' : 'btn-outline-warning'}`}
            >
              Empate
            </button>
          </div>

          <label className="form-label fw-bold">Victoria por:</label>
          <select
            value={sumoData.victoriaMotivo}
            onChange={(e) => setSumoData({...sumoData, victoriaMotivo: e.target.value})}
            className="form-select"
          >
            <option value="">Seleccionar motivo</option>
            <option value="empuje">Empuje fuera de arena</option>
            <option value="inactivo">Oponente inactivo mayor a 10 seg</option>
            <option value="muertesubita">Muerte súbita</option>
            <option value="descalificacion">Descalificación o 3 advertencias</option>
          </select>
        </div>

        <div>
          <label className="form-label fw-bold">Observaciones</label>
          <textarea
            value={sumoData.observaciones}
            onChange={(e) => setSumoData({...sumoData, observaciones: e.target.value})}
            className="form-control"
            rows="3"
            placeholder="Notas adicionales..."
          />
        </div>
      </div>
    </div>
  );
};
