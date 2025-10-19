import React from 'react';

export const Mensaje = ({ mensaje }) => {
  if (!mensaje) return null;

  return (
    <div 
      className={`alert ${mensaje.tipo === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible position-fixed top-0 end-0 m-3`} 
      style={{zIndex: 9999}}
    >
      {mensaje.texto}
    </div>
  );
};
