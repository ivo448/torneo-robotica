import React from 'react';
import { CATEGORIAS } from '../../config/constants';

export const SelectorCategoria = ({ categoria, setCategoria }) => {
  return (
    <div className="card shadow-lg mb-4">
      <div className="card-body">
        <div className="btn-group w-100" role="group">
          <button
            onClick={() => setCategoria(CATEGORIAS.SUMO)}
            className={`btn ${categoria === CATEGORIAS.SUMO ? 'btn-danger' : 'btn-outline-danger'}`}
          >
            Sumo
          </button>
          <button
            onClick={() => setCategoria(CATEGORIAS.CARRERA)}
            className={`btn ${categoria === CATEGORIAS.CARRERA ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            Carrera
          </button>
          <button
            onClick={() => setCategoria(CATEGORIAS.SHOWCASE)}
            className={`btn ${categoria === CATEGORIAS.SHOWCASE ? 'btn-success' : 'btn-outline-success'}`}
          >
            Showcase
          </button>
          <button
            onClick={() => setCategoria(CATEGORIAS.NOMBRE)}
            className={`btn ${categoria === CATEGORIAS.NOMBRE ? 'btn-warning' : 'btn-outline-warning'}`}
          >
            Mejor Nombre
          </button>
        </div>
      </div>
    </div>
  );
};
