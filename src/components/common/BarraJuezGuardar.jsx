import React from 'react';
import { Save, RefreshCw } from 'lucide-react';

export const BarraJuezGuardar = ({ juez, setJuez, onGuardar, guardando }) => {
  return (
    <div className="card shadow-lg mb-4">
      <div className="card-body">
        <div className="row align-items-center g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Juez:</label>
            <input
              type="text"
              value={juez}
              onChange={(e) => setJuez(e.target.value)}
              className="form-control"
              placeholder="Nombre del juez"
            />
          </div>
          <div className="col-md-6 text-end">
            <button
              onClick={onGuardar}
              disabled={guardando}
              className="btn btn-success btn-lg"
            >
              {guardando ? (
                <>
                  <RefreshCw className="me-2 spinner-border spinner-border-sm" size={20} />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="me-2" size={20} />
                  Guardar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
