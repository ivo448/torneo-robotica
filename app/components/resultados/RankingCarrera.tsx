import React from "react";
import { Clock } from "lucide-react";

interface CarreraResult {
  Equipo?: string;
  equipo?: string;
  MejorTiempo?: string;
  mejorTiempo?: string;
  Timestamp?: string;
  timestamp?: string;
}

interface RankedData {
  equipo: string;
  mejor: string;
  timestamp: string;
}

interface RankingCarreraProps {
  resultados: {
    carrera: CarreraResult[];
  };
}

export const RankingCarrera: React.FC<RankingCarreraProps> = ({
  resultados,
}) => {
  const datos: RankedData[] = resultados.carrera
    .map((row) => ({
      equipo: row.Equipo || row.equipo || "",
      mejor: row.MejorTiempo || row.mejorTiempo || "",
      timestamp: row.Timestamp || row.timestamp || "",
    }))
    .filter((d) => d.mejor && d.mejor !== "-" && d.equipo) as RankedData[];

  const ranking: RankedData[] = datos
    .reduce<RankedData[]>((acc, curr) => {
      const existing = acc.find((e) => e.equipo === curr.equipo);
      if (existing) {
        if (parseFloat(curr.mejor) < parseFloat(existing.mejor)) {
          existing.mejor = curr.mejor;
          existing.timestamp = curr.timestamp;
        }
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, [])
    .sort((a, b) => parseFloat(a.mejor) - parseFloat(b.mejor));

  return (
    <div className="card shadow-lg mb-4">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">
          <Clock className="me-2" size={24} style={{ display: "inline" }} />
          Ranking Carrera
        </h3>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: "80px" }}>Posición</th>
                <th>Equipo</th>
                <th>Mejor Tiempo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <span
                      className={`badge ${idx === 0 ? "bg-warning" : idx === 1 ? "bg-secondary" : idx === 2 ? "bg-info" : "bg-light text-dark"}`}
                    >
                      #{idx + 1}
                    </span>
                  </td>
                  <td className="fw-bold">{item.equipo}</td>
                  <td>
                    <span className="badge bg-success">{item.mejor}s</span>
                  </td>
                  <td className="text-muted small">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
