import React from "react";
import { NavLink } from "react-router";
import { Trophy, Save, BarChart3 } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <div className="card shadow-lg mb-4">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-auto">
            <Trophy className="text-warning" size={48} />
          </div>
          <div className="col">
            <h1 className="mb-0">Torneo de Robótica INACAP 2025</h1>
            <p className="text-muted mb-0">Sistema de Puntuación</p>
          </div>
          <div className="col-auto">
            <div className="btn-group" role="group">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `btn ${isActive ? "btn-primary" : "btn-outline-primary"}`
                }
              >
                <Save
                  className="me-1"
                  size={18}
                  style={{ display: "inline" }}
                />
                Puntuación
              </NavLink>
              <NavLink
                to="/results"
                className={({ isActive }) =>
                  `btn ${isActive ? "btn-success" : "btn-outline-success"}`
                }
              >
                <BarChart3
                  className="me-1"
                  size={18}
                  style={{ display: "inline" }}
                />
                Resultados
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
