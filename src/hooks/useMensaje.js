import { useState } from 'react';

export const useMensaje = () => {
  const [mensaje, setMensaje] = useState('');

  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(''), 3000);
  };

  return { mensaje, mostrarMensaje };
};
