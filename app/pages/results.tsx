import { VistaResultados } from "../components/vistas/VistaResultados";
import { useMensaje } from "../hooks/useMensaje";
import { useResultados } from "../hooks/useResultados";
import { VISTAS } from "../config/constants";

export default function Resultados() {
  const { mostrarMensaje } = useMensaje();
  const { resultados, cargandoResultados } = useResultados(
    VISTAS.RESULTADOS,
    mostrarMensaje,
  );

  return (
    <VistaResultados
      resultados={resultados}
      cargandoResultados={cargandoResultados}
    />
  );
}
