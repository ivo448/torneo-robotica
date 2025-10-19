import React from 'react';
import { Check, X, Plus, Minus } from 'lucide-react';
import { getMejorTiempo } from '../../utils/helpers';

export const FormularioCarrera = ({ carreraData, setCarreraData, onReset }) => {
  return (
    <div className="card shadow-lg">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Carrera de Robots</h2>
        <button onClick={onReset} className="btn btn-light btn-sm">
          Limpiar
        </button>
      </div>
      <div className="card-body">
        <div className="mb-4">
          <label className="form-label fw-bold">Nombre del equipo</label>
          <input
            type="text"
            value={carreraData.equipo}
            onChange={(e) => setCarreraData({...carreraData, equipo: e.target.value})}
            className="form-control"
            placeholder="Nombre del equipo"
          />
        </div>

        <div className="mb-4">
          <h4 className="mb-3">Tiempos</h4>
          {carreraData.intentos.map((intento, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <span className="badge bg-secondary">Intento {index + 1}</span>
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      step="0.01"
                      value={intento.tiempo}
                      onChange={(e) => {
                        const nuevosIntentos = [...carreraData.intentos];
                        nuevosIntentos[index].tiempo = e.target.value;
                        setCarreraData({...carreraData, intentos: nuevosIntentos});
                      }}
                      className="form-control"
                      placeholder="Tiempo en segundos"
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      onClick={() => {
                        const nuevosIntentos = [...carreraData.intentos];
                        nuevosIntentos[index].completado = true;
                        setCarreraData({...carreraData, intentos: nuevosIntentos});
                      }}
                      className={`btn ${intento.completado === true ? 'btn-success' : 'btn-outline-success'} me-2`}
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => {
                        const nuevosIntentos = [...carreraData.intentos];
                        nuevosIntentos[index].completado = false;
                        setCarreraData({...carreraData, intentos: nuevosIntentos});
                      }}
                      className={`btn ${intento.completado === false ? 'btn-danger' : 'btn-outline-danger'}`}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="alert alert-info">
            <strong>Mejor tiempo:</strong> {getMejorTiempo(carreraData.intentos)} segundos
          </div>
        </div>

        <div className="mb-4">
          <h4 className="mb-3">Penalizaciones</h4>
          <div className="card mb-2">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Salida falsa</span>
                <div className="btn-group">
                  <button
                    onClick={() => setCarreraData({
                      ...carreraData,
                      penalizaciones: {
                        ...carreraData.penalizaciones,
                        salidaFalsa: Math.max(0, carreraData.penalizaciones.salidaFalsa - 1)
                      }
                    })}
                    className="btn btn-sm btn-secondary"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="btn btn-sm btn-light disabled">{carreraData.penalizaciones.salidaFalsa}</span>
                  <button
                    onClick={() => setCarreraData({
                      ...carreraData,
                      penalizaciones: {
                        ...carreraData.penalizaciones,
                        salidaFalsa: carreraData.penalizaciones.salidaFalsa + 1
                      }
                    })}
                    className="btn btn-sm btn-secondary"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-2">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Salida de pista</span>
                <div className="btn-group">
                  <button
                    onClick={() => setCarreraData({
                      ...carreraData,
                      penalizaciones: {
                        ...carreraData.penalizaciones,
                        salidaPista: Math.max(0, carreraData.penalizaciones.salidaPista - 1)
                      }
                    })}
                    className="btn btn-sm btn-secondary"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="btn btn-sm btn-light disabled">{carreraData.penalizaciones.salidaPista}</span>
                  <button
                    onClick={() => setCarreraData({
                      ...carreraData,
                      penalizaciones: {
                        ...carreraData.penalizaciones,
                        salidaPista: carreraData.penalizaciones.salidaPista + 1
                      }
                    })}
                    className="btn btn-sm btn-secondary"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">No completó recorrido</span>
                <div className="btn-group">
                  <button
                    onClick={() => setCarreraData({
                      ...carreraData,
                      penalizaciones: {
                        ...carreraData.penalizaciones,
                        noCompleto: Math.max(0, carreraData.penalizaciones.noCompleto - 1)
                      }
                    })}
                    className="btn btn-sm btn-secondary"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="btn btn-sm btn-light disabled">{carreraData.penalizaciones.noCompleto}</span>
                  <button
                    onClick={() => setCarreraData({
                      ...carreraData,
                      penalizaciones: {
                        ...carreraData.penalizaciones,
                        noCompleto: carreraData.penalizaciones.noCompleto + 1
                      }
                    })}
                    className="btn btn-sm btn-secondary"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="form-label fw-bold">Observaciones</label>
          <textarea
            value={carreraData.observaciones}
            onChange={(e) => setCarreraData({...carreraData, observaciones: e.target.value})}
            className="form-control"
            rows="3"
            placeholder="Notas adicionales..."
          />
        </div>
      </div>
    </div>
  );
};
