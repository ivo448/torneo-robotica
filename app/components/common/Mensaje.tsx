import React from "react";

interface MensajeProps {
  mensaje: {
    texto: string;
    tipo: "success" | "danger"; // O define los tipos posibles
  } | null;
}

export const Mensaje: React.FC<MensajeProps> = ({ mensaje }) => {
  if (!mensaje) return null;

  return (
    <div
      className={`alert ${mensaje.tipo === "success" ? "alert-success" : "alert-danger"} alert-dismissible position-fixed top-0 end-0 m-3`}
      style={{ zIndex: 9999 }}
    >
      {mensaje.texto}
    </div>
  );
};
