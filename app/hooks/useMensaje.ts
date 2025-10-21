import { useState } from "react";

interface Mensaje {
  texto: string;
  tipo: "success" | "danger";
}

export const useMensaje = () => {
  const [mensaje, setMensaje] = useState<Mensaje | "">("");

  const mostrarMensaje = (
    texto: string,
    tipo: "success" | "danger" = "success",
  ) => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(""), 3000);
  };

  return { mensaje, mostrarMensaje };
};
