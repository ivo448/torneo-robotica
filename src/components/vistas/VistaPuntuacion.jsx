import React from 'react';
import { BarraJuezGuardar } from '../common/BarraJuezGuardar';
import { SelectorCategoria } from '../common/SelectorCategoria';
import { FormularioSumo } from '../formularios/FormularioSumo';
import { FormularioCarrera } from '../formularios/FormularioCarrera';
import { FormularioShowcase } from '../formularios/FormularioShowcase';
import { FormularioNombre } from '../formularios/FormularioNombre';
import { CATEGORIAS } from '../../config/constants';

export const VistaPuntuacion = ({
  juez,
  setJuez,
  categoria,
  setCategoria,
  sumoData,
  setSumoData,
  carreraData,
  setCarreraData,
  showcaseData,
  setShowcaseData,
  nombreData,
  setNombreData,
  onGuardar,
  guardando,
  resetSumo,
  resetCarrera
}) => {
  return (
    <>
      <BarraJuezGuardar 
        juez={juez}
        setJuez={setJuez}
        onGuardar={onGuardar}
        guardando={guardando}
      />

      <SelectorCategoria 
        categoria={categoria}
        setCategoria={setCategoria}
      />

      {categoria === CATEGORIAS.SUMO && (
        <FormularioSumo 
          sumoData={sumoData}
          setSumoData={setSumoData}
          onReset={resetSumo}
        />
      )}

      {categoria === CATEGORIAS.CARRERA && (
        <FormularioCarrera 
          carreraData={carreraData}
          setCarreraData={setCarreraData}
          onReset={resetCarrera}
        />
      )}

      {categoria === CATEGORIAS.SHOWCASE && (
        <FormularioShowcase 
          showcaseData={showcaseData}
          setShowcaseData={setShowcaseData}
        />
      )}

      {categoria === CATEGORIAS.NOMBRE && (
        <FormularioNombre 
          nombreData={nombreData}
          setNombreData={setNombreData}
        />
      )}
    </>
  );
};
