import React, { useState, useEffect } from 'react';
import { Trophy, X, Check, Plus, Minus, Save, RefreshCw, BarChart3, Award, Clock, Star } from 'lucide-react';

export default function SistemaPuntuacion() {
  const SHEET_ID = '1jMdEp8oTOhHLYzddm8Ohm_GbJbG5k9QNTMaWSgPTQNY';
  const API_KEY = 'AIzaSyB6qq6RPIcPcvb92rwCetn7RG3PfEk4aig';
  
  const [vista, setVista] = useState('puntuacion'); // 'puntuacion' o 'resultados'
  const [categoria, setCategoria] = useState('sumo');
  const [juez, setJuez] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [cargandoResultados, setCargandoResultados] = useState(false);
  const [mensaje, setMensaje] = useState('');
  
  const [resultados, setResultados] = useState({
    sumo: [],
    carrera: [],
    showcase: [],
    nombre: []
  });
  
  const [sumoData, setSumoData] = useState({
    round: '',
    equipo1: '',
    equipo2: '',
    penalizaciones1: { salidaFalsa: 0, intervencion: false, conducta: false },
    penalizaciones2: { salidaFalsa: 0, intervencion: false, conducta: false },
    ganador: '',
    victoriaMotivo: '',
    observaciones: ''
  });

  const [carreraData, setCarreraData] = useState({
    equipo: '',
    intentos: [
      { tiempo: '', completado: null },
      { tiempo: '', completado: null },
      { tiempo: '', completado: null }
    ],
    penalizaciones: { salidaFalsa: 0, salidaPista: 0, noCompleto: 0 },
    observaciones: ''
  });

  const [showcaseData, setShowcaseData] = useState({
    equipo: '',
    creatividad: '',
    presentacion: '',
    materiales: ''
  });

  const [nombreData, setNombreData] = useState({
    equipo: '',
    nombreRobot: '',
    originalidad: '',
    creatividad: ''
  });

  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(''), 3000);
  };

  const cargarResultados = async () => {
    setCargandoResultados(true);
    try {
      const hojas = ['Sumo', 'Carrera', 'Showcase', 'MejorNombre'];
      const promises = hojas.map(hoja => 
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${hoja}!A:Z?key=${API_KEY}`)
          .then(res => res.json())
          .catch(() => ({ values: [] }))
      );
      
      const responses = await Promise.all(promises);
      
      setResultados({
        sumo: responses[0].values || [],
        carrera: responses[1].values || [],
        showcase: responses[2].values || [],
        nombre: responses[3].values || []
      });
    } catch (error) {
      console.error('Error al cargar resultados:', error);
      mostrarMensaje('Error al cargar resultados', 'error');
    } finally {
      setCargandoResultados(false);
    }
  };

  useEffect(() => {
    if (vista === 'resultados') {
      cargarResultados();
      const intervalo = setInterval(cargarResultados, 30000);
      return () => clearInterval(intervalo);
    }
  }, [vista]);

  const guardarEnGoogleSheets = async () => {
    setGuardando(true);
    
    try {
      let datos = {};
      let hoja = '';
      
      if (categoria === 'sumo') {
        hoja = 'Sumo';
        datos = {
          timestamp: new Date().toLocaleString('es-CL'),
          juez: juez,
          round: sumoData.round,
          equipo1: sumoData.equipo1,
          equipo2: sumoData.equipo2,
          penalizaciones1_salidaFalsa: sumoData.penalizaciones1.salidaFalsa,
          penalizaciones1_intervencion: sumoData.penalizaciones1.intervencion ? 'Sí' : 'No',
          penalizaciones1_conducta: sumoData.penalizaciones1.conducta ? 'Sí' : 'No',
          penalizaciones2_salidaFalsa: sumoData.penalizaciones2.salidaFalsa,
          penalizaciones2_intervencion: sumoData.penalizaciones2.intervencion ? 'Sí' : 'No',
          penalizaciones2_conducta: sumoData.penalizaciones2.conducta ? 'Sí' : 'No',
          ganador: sumoData.ganador,
          victoriaMotivo: sumoData.victoriaMotivo,
          observaciones: sumoData.observaciones
        };
      } else if (categoria === 'carrera') {
        hoja = 'Carrera';
        datos = {
          timestamp: new Date().toLocaleString('es-CL'),
          juez: juez,
          equipo: carreraData.equipo,
          intento1_tiempo: carreraData.intentos[0].tiempo,
          intento1_completado: carreraData.intentos[0].completado === true ? 'Sí' : carreraData.intentos[0].completado === false ? 'No' : '-',
          intento2_tiempo: carreraData.intentos[1].tiempo,
          intento2_completado: carreraData.intentos[1].completado === true ? 'Sí' : carreraData.intentos[1].completado === false ? 'No' : '-',
          intento3_tiempo: carreraData.intentos[2].tiempo,
          intento3_completado: carreraData.intentos[2].completado === true ? 'Sí' : carreraData.intentos[2].completado === false ? 'No' : '-',
          mejorTiempo: getMejorTiempo(),
          penalizaciones_salidaFalsa: carreraData.penalizaciones.salidaFalsa,
          penalizaciones_salidaPista: carreraData.penalizaciones.salidaPista,
          penalizaciones_noCompleto: carreraData.penalizaciones.noCompleto,
          observaciones: carreraData.observaciones
        };
      } else if (categoria === 'showcase') {
        hoja = 'Showcase';
        datos = {
          timestamp: new Date().toLocaleString('es-CL'),
          juez: juez,
          equipo: showcaseData.equipo,
          creatividad: showcaseData.creatividad,
          presentacion: showcaseData.presentacion,
          materiales: showcaseData.materiales,
          total: calcularTotalShowcase()
        };
      } else if (categoria === 'nombre') {
        hoja = 'MejorNombre';
        datos = {
          timestamp: new Date().toLocaleString('es-CL'),
          juez: juez,
          equipo: nombreData.equipo,
          nombreRobot: nombreData.nombreRobot,
          originalidad: nombreData.originalidad,
          creatividad: nombreData.creatividad,
          total: calcularTotalNombre()
        };
      }

      const valores = Object.values(datos);
      const scriptURL = 'https://script.google.com/macros/s/AKfycbz1CC3yPNBnTz_xiRZTG_mF_j4fWcUh1gbXdVz-FtQo6_EEKPPQY6iFWy5msfXgtBJfgQ/exec';
      
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spreadsheetId: SHEET_ID,
          sheetName: hoja,
          values: valores
        })
      });

      mostrarMensaje('✓ Datos guardados correctamente', 'success');
      
    } catch (error) {
      console.error('Error:', error);
      mostrarMensaje('✗ Error al guardar. Verifica la conexión.', 'error');
    } finally {
      setGuardando(false);
    }
  };

  const resetSumo = () => {
    setSumoData({
      round: '',
      equipo1: '',
      equipo2: '',
      penalizaciones1: { salidaFalsa: 0, intervencion: false, conducta: false },
      penalizaciones2: { salidaFalsa: 0, intervencion: false, conducta: false },
      ganador: '',
      victoriaMotivo: '',
      observaciones: ''
    });
  };

  const resetCarrera = () => {
    setCarreraData({
      equipo: '',
      intentos: [
        { tiempo: '', completado: null },
        { tiempo: '', completado: null },
        { tiempo: '', completado: null }
      ],
      penalizaciones: { salidaFalsa: 0, salidaPista: 0, noCompleto: 0 },
      observaciones: ''
    });
  };

  const getMejorTiempo = () => {
    const tiemposValidos = carreraData.intentos
      .filter(i => i.completado === true && i.tiempo)
      .map(i => i.tiempo);
    
    if (tiemposValidos.length === 0) return '-';
    return Math.min(...tiemposValidos.map(t => parseFloat(t) || Infinity)).toFixed(2);
  };

  const calcularTotalShowcase = () => {
    const c = parseInt(showcaseData.creatividad) || 0;
    const p = parseInt(showcaseData.presentacion) || 0;
    const m = parseInt(showcaseData.materiales) || 0;
    return c + p + m;
  };

  const calcularTotalNombre = () => {
    const o = parseInt(nombreData.originalidad) || 0;
    const c = parseInt(nombreData.creatividad) || 0;
    return o + c;
  };

  const RankingCarrera = () => {
    const datos = resultados.carrera.slice(1).map(row => ({
      equipo: row[2],
      mejor: row[10],
      timestamp: row[0]
    })).filter(d => d.mejor && d.mejor !== '-');

    const ranking = datos.reduce((acc, curr) => {
      const existing = acc.find(e => e.equipo === curr.equipo);
      if (existing) {
        if (parseFloat(curr.mejor) < parseFloat(existing.mejor)) {
          existing.mejor = curr.mejor;
          existing.timestamp = curr.timestamp;
        }
      } else {
        acc.push({...curr});
      }
      return acc;
    }, []).sort((a, b) => parseFloat(a.mejor) - parseFloat(b.mejor));

    return (
      <div className="card shadow-lg mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0"><Clock className="me-2" size={24} style={{display: 'inline'}} />Ranking Carrera</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{width: '80px'}}>Posición</th>
                  <th>Equipo</th>
                  <th>Mejor Tiempo</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className={`badge ${idx === 0 ? 'bg-warning' : idx === 1 ? 'bg-secondary' : idx === 2 ? 'bg-info' : 'bg-light text-dark'}`}>
                        #{idx + 1}
                      </span>
                    </td>
                    <td className="fw-bold">{item.equipo}</td>
                    <td><span className="badge bg-success">{item.mejor}s</span></td>
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

  const RankingShowcase = () => {
    const datos = resultados.showcase.slice(1).map(row => ({
      equipo: row[2],
      total: parseInt(row[6]) || 0,
      creatividad: row[3],
      presentacion: row[4],
      materiales: row[5]
    })).sort((a, b) => b.total - a.total);

    return (
      <div className="card shadow-lg mb-4">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0"><Award className="me-2" size={24} style={{display: 'inline'}} />Ranking Showcase</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Posición</th>
                  <th>Equipo</th>
                  <th>Creatividad</th>
                  <th>Presentación</th>
                  <th>Materiales</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className={`badge ${idx === 0 ? 'bg-warning' : idx === 1 ? 'bg-secondary' : idx === 2 ? 'bg-info' : 'bg-light text-dark'}`}>
                        #{idx + 1}
                      </span>
                    </td>
                    <td className="fw-bold">{item.equipo}</td>
                    <td>{item.creatividad}/10</td>
                    <td>{item.presentacion}/10</td>
                    <td>{item.materiales}/10</td>
                    <td><span className="badge bg-primary">{item.total}/30</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const RankingNombre = () => {
    const datos = resultados.nombre.slice(1).map(row => ({
      equipo: row[2],
      nombreRobot: row[3],
      total: parseInt(row[6]) || 0,
      originalidad: row[4],
      creatividad: row[5]
    })).sort((a, b) => b.total - a.total);

    return (
      <div className="card shadow-lg mb-4">
        <div className="card-header bg-warning text-dark">
          <h3 className="mb-0"><Star className="me-2" size={24} style={{display: 'inline'}} />Ranking Mejor Nombre</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Posición</th>
                  <th>Equipo</th>
                  <th>Nombre Robot</th>
                  <th>Originalidad</th>
                  <th>Creatividad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className={`badge ${idx === 0 ? 'bg-warning' : idx === 1 ? 'bg-secondary' : idx === 2 ? 'bg-info' : 'bg-light text-dark'}`}>
                        #{idx + 1}
                      </span>
                    </td>
                    <td className="fw-bold">{item.equipo}</td>
                    <td className="text-primary">{item.nombreRobot}</td>
                    <td>{item.originalidad}/10</td>
                    <td>{item.creatividad}/10</td>
                    <td><span className="badge bg-primary">{item.total}/20</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const ResultadosSumo = () => {
    const datos = resultados.sumo.slice(1);
    
    return (
      <div className="card shadow-lg mb-4">
        <div className="card-header bg-danger text-white">
          <h3 className="mb-0"><Trophy className="me-2" size={24} style={{display: 'inline'}} />Resultados Sumo</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Round</th>
                  <th>Equipo 1</th>
                  <th>Equipo 2</th>
                  <th>Ganador</th>
                  <th>Motivo</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {datos.reverse().map((row, idx) => (
                  <tr key={idx}>
                    <td><span className="badge bg-secondary">{row[2]}</span></td>
                    <td className={row[11] === 'equipo1' ? 'fw-bold text-success' : ''}>{row[3]}</td>
                    <td className={row[11] === 'equipo2' ? 'fw-bold text-success' : ''}>{row[4]}</td>
                    <td>
                      <span className={`badge ${row[11] === 'empate' ? 'bg-warning' : 'bg-success'}`}>
                        {row[11] === 'equipo1' ? 'Equipo 1' : row[11] === 'equipo2' ? 'Equipo 2' : 'Empate'}
                      </span>
                    </td>
                    <td className="small">{row[12]}</td>
                    <td className="text-muted small">{row[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      
      <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)'}}>
        <div className="container-fluid p-4">
          {mensaje && (
            <div className={`alert ${mensaje.tipo === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible position-fixed top-0 end-0 m-3`} style={{zIndex: 9999}}>
              {mensaje.texto}
            </div>
          )}

          <div className="card shadow-lg mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-auto">
                  <Trophy className="text-warning" size={48} />
                </div>
                <div className="col">
                  <h1 className="mb-0">Torneo de Robótica INACAP 2025</h1>
                  <p className="text-muted mb-0">Sistema de Puntuación - Google Sheets</p>
                </div>
                <div className="col-auto">
                  <div className="btn-group" role="group">
                    <button
                      onClick={() => setVista('puntuacion')}
                      className={`btn ${vista === 'puntuacion' ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                      <Save className="me-1" size={18} style={{display: 'inline'}} />
                      Puntuación
                    </button>
                    <button
                      onClick={() => setVista('resultados')}
                      className={`btn ${vista === 'resultados' ? 'btn-success' : 'btn-outline-success'}`}
                    >
                      <BarChart3 className="me-1" size={18} style={{display: 'inline'}} />
                      Resultados
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {vista === 'puntuacion' ? (
            <>
              <div className="card shadow-lg mb-4">
                <div className="card-body">
                  <div className="row align-items-center g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Juez:</label>
                      <input
                        type="text"
                        value={juez}
                        onChange={(e) => setJuez(e.target.value)}
                        className="form-control"
                        placeholder="Nombre del juez"
                      />
                    </div>
                    <div className="col-md-6 text-end">
                      <button
                        onClick={guardarEnGoogleSheets}
                        disabled={guardando}
                        className="btn btn-success btn-lg"
                      >
                        {guardando ? (
                          <>
                            <RefreshCw className="me-2 spinner-border spinner-border-sm" size={20} />
                            Guardando...
                          </>
                        ) : (
                          <>
                            <Save className="me-2" size={20} />
                            Guardar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card shadow-lg mb-4">
                <div className="card-body">
                  <div className="btn-group w-100" role="group">
                    <button
                      onClick={() => setCategoria('sumo')}
                      className={`btn ${categoria === 'sumo' ? 'btn-danger' : 'btn-outline-danger'}`}
                    >
                      Sumo
                    </button>
                    <button
                      onClick={() => setCategoria('carrera')}
                      className={`btn ${categoria === 'carrera' ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                      Carrera
                    </button>
                    <button
                      onClick={() => setCategoria('showcase')}
                      className={`btn ${categoria === 'showcase' ? 'btn-success' : 'btn-outline-success'}`}
                    >
                      Showcase
                    </button>
                    <button
                      onClick={() => setCategoria('nombre')}
                      className={`btn ${categoria === 'nombre' ? 'btn-warning' : 'btn-outline-warning'}`}
                    >
                      Mejor Nombre
                    </button>
                  </div>
                </div>
              </div>

              {categoria === 'sumo' && (
                <div className="card shadow-lg">
                  <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">Sumo de Robots</h2>
                    <button onClick={resetSumo} className="btn btn-light btn-sm">
                      Limpiar
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="mb-4">
                      <label className="form-label fw-bold">Round</label>
                      <input
                        type="text"
                        value={sumoData.round}
                        onChange={(e) => setSumoData({...sumoData, round: e.target.value})}
                        className="form-control"
                        placeholder="Ej: Semifinal 1"
                      />
                    </div>

                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <div className="card border-primary">
                          <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Equipo 1</h4>
                          </div>
                          <div className="card-body">
                            <input
                              type="text"
                              value={sumoData.equipo1}
                              onChange={(e) => setSumoData({...sumoData, equipo1: e.target.value})}
                              className="form-control mb-3"
                              placeholder="Nombre del equipo"
                            />
                            
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="fw-bold">Salida falsa</span>
                              <div className="btn-group">
                                <button
                                  onClick={() => setSumoData({
                                    ...sumoData,
                                    penalizaciones1: {
                                      ...sumoData.penalizaciones1,
                                      salidaFalsa: Math.max(0, sumoData.penalizaciones1.salidaFalsa - 1)
                                    }
                                  })}
                                  className="btn btn-sm btn-secondary"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="btn btn-sm btn-light disabled">{sumoData.penalizaciones1.salidaFalsa}/3</span>
                                <button
                                  onClick={() => setSumoData({
                                    ...sumoData,
                                    penalizaciones1: {
                                      ...sumoData.penalizaciones1,
                                      salidaFalsa: Math.min(3, sumoData.penalizaciones1.salidaFalsa + 1)
                                    }
                                  })}
                                  className="btn btn-sm btn-secondary"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="form-check mb-2">
                              <input
                                type="checkbox"
                                checked={sumoData.penalizaciones1.intervencion}
                                onChange={(e) => setSumoData({
                                  ...sumoData,
                                  penalizaciones1: {...sumoData.penalizaciones1, intervencion: e.target.checked}
                                })}
                                className="form-check-input"
                              />
                              <label className="form-check-label">Intervención humana</label>
                            </div>
                            
                            <div className="form-check">
                              <input
                                type="checkbox"
                                checked={sumoData.penalizaciones1.conducta}
                                onChange={(e) => setSumoData({
                                  ...sumoData,
                                  penalizaciones1: {...sumoData.penalizaciones1, conducta: e.target.checked}
                                })}
                                className="form-check-input"
                              />
                              <label className="form-check-label">Conducta antideportiva</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card border-danger">
                          <div className="card-header bg-danger text-white">
                            <h4 className="mb-0">Equipo 2</h4>
                          </div>
                          <div className="card-body">
                            <input
                              type="text"
                              value={sumoData.equipo2}
                              onChange={(e) => setSumoData({...sumoData, equipo2: e.target.value})}
                              className="form-control mb-3"
                              placeholder="Nombre del equipo"
                            />
                            
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="fw-bold">Salida falsa</span>
                              <div className="btn-group">
                                <button
                                  onClick={() => setSumoData({
                                    ...sumoData,
                                    penalizaciones2: {
                                      ...sumoData.penalizaciones2,
                                      salidaFalsa: Math.max(0, sumoData.penalizaciones2.salidaFalsa - 1)
                                    }
                                  })}
                                  className="btn btn-sm btn-secondary"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="btn btn-sm btn-light disabled">{sumoData.penalizaciones2.salidaFalsa}/3</span>
                                <button
                                  onClick={() => setSumoData({
                                    ...sumoData,
                                    penalizaciones2: {
                                      ...sumoData.penalizaciones2,
                                      salidaFalsa: Math.min(3, sumoData.penalizaciones2.salidaFalsa + 1)
                                    }
                                  })}
                                  className="btn btn-sm btn-secondary"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="form-check mb-2">
                              <input
                                type="checkbox"
                                checked={sumoData.penalizaciones2.intervencion}
                                onChange={(e) => setSumoData({
                                  ...sumoData,
                                  penalizaciones2: {...sumoData.penalizaciones2, intervencion: e.target.checked}
                                })}
                                className="form-check-input"
                              />
                              <label className="form-check-label">Intervención humana</label>
                            </div>
                            
                            <div className="form-check">
                              <input
                                type="checkbox"
                                checked={sumoData.penalizaciones2.conducta}
                                onChange={(e) => setSumoData({
                                  ...sumoData,
                                  penalizaciones2: {...sumoData.penalizaciones2, conducta: e.target.checked}
                                })}
                                className="form-check-input"
                              />
                              <label className="form-check-label">Conducta antideportiva</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="mb-3">Resultado</h4>
                      <div className="btn-group w-100 mb-3" role="group">
                        <button
                          onClick={() => setSumoData({...sumoData, ganador: 'equipo1'})}
                          className={`btn ${sumoData.ganador === 'equipo1' ? 'btn-primary' : 'btn-outline-primary'}`}
                        >
                          Ganador: Equipo 1
                        </button>
                        <button
                          onClick={() => setSumoData({...sumoData, ganador: 'equipo2'})}
                          className={`btn ${sumoData.ganador === 'equipo2' ? 'btn-danger' : 'btn-outline-danger'}`}
                        >
                          Ganador: Equipo 2
                        </button>
                        <button
                          onClick={() => setSumoData({...sumoData, ganador: 'empate'})}
                          className={`btn ${sumoData.ganador === 'empate' ? 'btn-warning' : 'btn-outline-warning'}`}
                        >
                          Empate
                        </button>
                      </div>

                      <label className="form-label fw-bold">Victoria por:</label>
                      <select
                        value={sumoData.victoriaMotivo}
                        onChange={(e) => setSumoData({...sumoData, victoriaMotivo: e.target.value})}
                        className="form-select"
                      >
                        <option value="">Seleccionar motivo</option>
                        <option value="empuje">Empuje fuera de arena</option>
                        <option value="inactivo">Oponente inactivo mayor a 10 seg</option>
                        <option value="muertesubita">Muerte súbita</option>
                        <option value="descalificacion">Descalificación o 3 advertencias</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label fw-bold">Observaciones</label>
                      <textarea
                        value={sumoData.observaciones}
                        onChange={(e) => setSumoData({...sumoData, observaciones: e.target.value})}
                        className="form-control"
                        rows="3"
                        placeholder="Notas adicionales..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {categoria === 'carrera' && (
                <div className="card shadow-lg">
                  <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">Carrera de Robots</h2>
                    <button onClick={resetCarrera} className="btn btn-light btn-sm">
                      Limpiar
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="mb-4">
                      <label className="form-label fw-bold">Nombre del equipo</label>
                      <input
                        type="text"
                        value={carreraData.equipo}
                        onChange={(e) => setCarreraData({...carreraData, equipo: e.target.value})}
                        className="form-control"
                        placeholder="Nombre del equipo"
                      />
                    </div>

                    <div className="mb-4">
                      <h4 className="mb-3">Tiempos</h4>
                      {carreraData.intentos.map((intento, index) => (
                        <div key={index} className="card mb-3">
                          <div className="card-body">
                            <div className="row align-items-center">
                              <div className="col-auto">
                                <span className="badge bg-secondary">Intento {index + 1}</span>
                              </div>
                              <div className="col">
                                <input
                                  type="number"
                                  step="0.01"
                                  value={intento.tiempo}
                                  onChange={(e) => {
                                    const nuevosIntentos = [...carreraData.intentos];
                                    nuevosIntentos[index].tiempo = e.target.value;
                                    setCarreraData({...carreraData, intentos: nuevosIntentos});
                                  }}
                                  className="form-control"
                                  placeholder="Tiempo en segundos"
                                />
                              </div>
                              <div className="col-auto">
                                <button
                                  onClick={() => {
                                    const nuevosIntentos = [...carreraData.intentos];
                                    nuevosIntentos[index].completado = true;
                                    setCarreraData({...carreraData, intentos: nuevosIntentos});
                                  }}
                                  className={`btn ${intento.completado === true ? 'btn-success' : 'btn-outline-success'} me-2`}
                                >
                                  <Check size={20} />
                                </button>
                                <button
                                  onClick={() => {
                                    const nuevosIntentos = [...carreraData.intentos];
                                    nuevosIntentos[index].completado = false;
                                    setCarreraData({...carreraData, intentos: nuevosIntentos});
                                  }}
                                  className={`btn ${intento.completado === false ? 'btn-danger' : 'btn-outline-danger'}`}
                                >
                                  <X size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="alert alert-info">
                        <strong>Mejor tiempo:</strong> {getMejorTiempo()} segundos
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="mb-3">Penalizaciones</h4>
                      <div className="card mb-2">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold">Salida falsa</span>
                            <div className="btn-group">
                              <button
                                onClick={() => setCarreraData({
                                  ...carreraData,
                                  penalizaciones: {
                                    ...carreraData.penalizaciones,
                                    salidaFalsa: Math.max(0, carreraData.penalizaciones.salidaFalsa - 1)
                                  }
                                })}
                                className="btn btn-sm btn-secondary"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="btn btn-sm btn-light disabled">{carreraData.penalizaciones.salidaFalsa}</span>
                              <button
                                onClick={() => setCarreraData({
                                  ...carreraData,
                                  penalizaciones: {
                                    ...carreraData.penalizaciones,
                                    salidaFalsa: carreraData.penalizaciones.salidaFalsa + 1
                                  }
                                })}
                                className="btn btn-sm btn-secondary"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card mb-2">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold">Salida de pista</span>
                            <div className="btn-group">
                              <button
                                onClick={() => setCarreraData({
                                  ...carreraData,
                                  penalizaciones: {
                                    ...carreraData.penalizaciones,
                                    salidaPista: Math.max(0, carreraData.penalizaciones.salidaPista - 1)
                                  }
                                })}
                                className="btn btn-sm btn-secondary"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="btn btn-sm btn-light disabled">{carreraData.penalizaciones.salidaPista}</span>
                              <button
                                onClick={() => setCarreraData({
                                  ...carreraData,
                                  penalizaciones: {
                                    ...carreraData.penalizaciones,
                                    salidaPista: carreraData.penalizaciones.salidaPista + 1
                                  }
                                })}
                                className="btn btn-sm btn-secondary"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold">No completó recorrido</span>
                            <div className="btn-group">
                              <button
                                onClick={() => setCarreraData({
                                  ...carreraData,
                                  penalizaciones: {
                                    ...carreraData.penalizaciones,
                                    noCompleto: Math.max(0, carreraData.penalizaciones.noCompleto - 1)
                                  }
                                })}
                                className="btn btn-sm btn-secondary"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="btn btn-sm btn-light disabled">{carreraData.penalizaciones.noCompleto}</span>
                              <button
                                onClick={() => setCarreraData({
                                  ...carreraData,
                                  penalizaciones: {
                                    ...carreraData.penalizaciones,
                                    noCompleto: carreraData.penalizaciones.noCompleto + 1
                                  }
                                })}
                                className="btn btn-sm btn-secondary"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="form-label fw-bold">Observaciones</label>
                      <textarea
                        value={carreraData.observaciones}
                        onChange={(e) => setCarreraData({...carreraData, observaciones: e.target.value})}
                        className="form-control"
                        rows="3"
                        placeholder="Notas adicionales..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {categoria === 'showcase' && (
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
                        onChange={(e) => setShowcaseData({...showcaseData, equipo: e.target.value})}
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
                          onChange={(e) => setShowcaseData({...showcaseData, creatividad: e.target.value})}
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
                          onChange={(e) => setShowcaseData({...showcaseData, presentacion: e.target.value})}
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
                          onChange={(e) => setShowcaseData({...showcaseData, materiales: e.target.value})}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="alert alert-success">
                      <h4 className="mb-0">Puntaje Total: {calcularTotalShowcase()}/30</h4>
                    </div>
                  </div>
                </div>
              )}

              {categoria === 'nombre' && (
                <div className="card shadow-lg">
                  <div className="card-header bg-warning text-dark">
                    <h2 className="mb-0">Mejor Nombre</h2>
                  </div>
                  <div className="card-body">
                    <div className="mb-4">
                      <label className="form-label fw-bold">Nombre del equipo</label>
                      <input
                        type="text"
                        value={nombreData.equipo}
                        onChange={(e) => setNombreData({...nombreData, equipo: e.target.value})}
                        className="form-control mb-3"
                        placeholder="Nombre del equipo"
                      />

                      <label className="form-label fw-bold">Nombre del robot</label>
                      <input
                        type="text"
                        value={nombreData.nombreRobot}
                        onChange={(e) => setNombreData({...nombreData, nombreRobot: e.target.value})}
                        className="form-control"
                        placeholder="Nombre del robot"
                      />
                    </div>

                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Originalidad (0-10)</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={nombreData.originalidad}
                          onChange={(e) => setNombreData({...nombreData, originalidad: e.target.value})}
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-bold">Creatividad (0-10)</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={nombreData.creatividad}
                          onChange={(e) => setNombreData({...nombreData, creatividad: e.target.value})}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="alert alert-warning">
                      <h4 className="mb-0">Puntaje Total: {calcularTotalNombre()}/20</h4>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Resultados en Tiempo Real</h2>
                <button onClick={cargarResultados} disabled={cargandoResultados} className="btn btn-primary">
                  <RefreshCw className={`me-2 ${cargandoResultados ? 'spinner-border spinner-border-sm' : ''}`} size={20} />
                  Actualizar
                </button>
              </div>

              <ResultadosSumo />
              <RankingCarrera />
              <RankingShowcase />
              <RankingNombre />
            </div>
          )}
        </div>
      </div>
    </>
  );
}