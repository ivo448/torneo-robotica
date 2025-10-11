import React, { useState } from "react";

function SistemaPuntuacion() {
  const [equipos, setEquipos] = useState([
    { nombre: "", advertencias: 0, penalizaciones: 0, tiempo: "" },
  ]);

  const agregarEquipo = () => {
    setEquipos([
      ...equipos,
      { nombre: "", advertencias: 0, penalizaciones: 0, tiempo: "" },
    ]);
  };

  const actualizarCampo = (index, campo, valor) => {
    const nuevosEquipos = [...equipos];
    nuevosEquipos[index][campo] = valor;
    setEquipos(nuevosEquipos);
  };

  const modificarAdvertencia = (index, cambio) => {
    const nuevosEquipos = [...equipos];
    nuevosEquipos[index].advertencias = Math.max(
      0,
      nuevosEquipos[index].advertencias + cambio
    );
    setEquipos(nuevosEquipos);
  };

  const modificarPenalizacion = (index, cambio) => {
    const nuevosEquipos = [...equipos];
    nuevosEquipos[index].penalizaciones = Math.max(
      0,
      nuevosEquipos[index].penalizaciones + cambio
    );
    setEquipos(nuevosEquipos);
  };

  const limpiarTodo = () => {
    setEquipos([{ nombre: "", advertencias: 0, penalizaciones: 0, tiempo: "" }]);
  };

  return (
    <div>
      <h2 className="text-center mb-4">🧮 Hoja de Puntuación del Juez</h2>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={agregarEquipo}>
          ➕ Agregar Equipo
        </button>
        <button className="btn btn-danger" onClick={limpiarTodo}>
          🗑️ Limpiar Todo
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre del Equipo</th>
              <th>Advertencias</th>
              <th>Penalizaciones</th>
              <th>Tiempo (seg)</th>
            </tr>
          </thead>
          <tbody>
            {equipos.map((equipo, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={equipo.nombre}
                    onChange={(e) =>
                      actualizarCampo(index, "nombre", e.target.value)
                    }
                    placeholder="Equipo..."
                  />
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => modificarAdvertencia(index, -1)}
                    >
                      -
                    </button>
                    <span className="px-2 fw-bold">
                      {equipo.advertencias}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => modificarAdvertencia(index, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => modificarPenalizacion(index, -1)}
                    >
                      -
                    </button>
                    <span className="px-2 fw-bold">
                      {equipo.penalizaciones}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => modificarPenalizacion(index, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={equipo.tiempo}
                    onChange={(e) =>
                      actualizarCampo(index, "tiempo", e.target.value)
                    }
                    placeholder="Tiempo"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() => alert("Resultados guardados (simulación).")}
        >
          💾 Guardar Resultados
        </button>
      </div>
    </div>
  );
}

export default SistemaPuntuacion;
