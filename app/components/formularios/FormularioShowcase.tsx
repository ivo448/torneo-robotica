import React from "react";
import { calcularTotalShowcase } from "../../utils/helpers";

interface ShowcaseData {
  equipo: string;
  creatividad: string;
  presentacion: string;
  materiales: string;
}

interface FormularioShowcaseProps {
  showcaseData: ShowcaseData;
  setShowcaseData: React.Dispatch<React.SetStateAction<ShowcaseData>>;
}

export const FormularioShowcase: React.FC<FormularioShowcaseProps> = ({
  showcaseData,
  setShowcaseData,
}) => {
  return (
    <div className="card shadow-lg">
      <div className="card-header bg-success text-white">
        <h2 className="mb-0">Bot Showcase - Mejor Diseño</h2>
      </div>
      <div className="card-body">
        <div className="mb-4">
          <label className="form-label fw-bold">Nombre del equipo</label>
          <input
            type="text"
            value={showcaseData.equipo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setShowcaseData({ ...showcaseData, equipo: e.target.value })
            }
            className="form-control"
            placeholder="Nombre del equipo"
          />
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label fw-bold">Creatividad (0-10)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={showcaseData.creatividad}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShowcaseData({
                  ...showcaseData,
                  creatividad: e.target.value,
                })
              }
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Presentación (0-10)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={showcaseData.presentacion}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShowcaseData({
                  ...showcaseData,
                  presentacion: e.target.value,
                })
              }
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Materiales (0-10)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={showcaseData.materiales}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShowcaseData({ ...showcaseData, materiales: e.target.value })
              }
              className="form-control"
            />
          </div>
        </div>

        <div className="alert alert-success">
          <h4 className="mb-0">
            Puntaje Total: {calcularTotalShowcase(showcaseData)}/30
          </h4>
        </div>
      </div>
    </div>
  );
};
