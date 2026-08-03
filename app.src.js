/* ──────────────────────────────────────────────
   HITSS Tickets — App Logic v7
   ────────────────────────────────────────────── */

// ════════════════════════════════
//  MODELOS
// ════════════════════════════════
const MODELOS = {
  hfc:  ['CGA2121 CM','F@ST3686 CM','FAST3686V2.2 CM','FAST3890V3 CM','Infinity601 CM','TG2482AL CM','TG3442A CM'],
  ftth: ['HG8145V5','F6600PV9.0.12','F680V6.0.08','HG8145X6-10','HG8145X6-13','HG8245W5-6T'],
};

// Decos: IPTV (ambas techs) + exclusivos HFC
const MODELOS_DECO = {
  iptv: ['B866V2','B866V2-H'],
  hfc:  ['DCX525','DTA 101','DCX700'],
};

// Repetidores WiFi
const MODELOS_REPETIDOR = [
  'REPETIDOR ZXHN H3601P 180000528400 ZTE',
  'ROUTER K562E-10 50087708 HUAWEI'
];

// ════════════════════════════════
//  GESTIONES ESTÁNDAR
// ════════════════════════════════
const GESTIONES = {
  activacion:          { titulo:'ACTIVACION',          labelEquipo:'EQUIPO ACTIVADO',             labelEstado:'ESTADO',      mostrarEquipo:true,  mostrarMesh:false, mostrarAgregar:true  },
  migracion:           { titulo:'MIGRACION',           labelEquipo:'EQUIPO ACTIVADO',             labelEstado:'ESTADO',      mostrarEquipo:true,  mostrarMesh:false, mostrarAgregar:true  },
  cambio_plan:         { titulo:'CAMBIO DE PLAN',      labelEquipo:'EQUIPO ACTIVADO',             labelEstado:'ESTADO',      mostrarEquipo:true,  mostrarMesh:false, mostrarAgregar:true  },
  traslado_externo:    { titulo:'TRASLADO EXTERNO',    labelEquipo:'EQUIPO ACTIVADO',             labelEstado:'ESTADO',      mostrarEquipo:true,  mostrarMesh:false, mostrarAgregar:true  },
  reenvio_senal:       { titulo:'REENVIO DE SEÑAL',    labelEquipo:'EQUIPO CON REENVIO DE SEÑAL', labelEstado:'CONFORMIDAD', mostrarEquipo:true,  mostrarMesh:false, mostrarAgregar:true  },
  activacion_mesh:     { titulo:'ACTIVACION MESH',     labelEquipo:null,                          labelEstado:'ESTADO',      mostrarEquipo:false, mostrarMesh:true,  mostrarAgregar:false },
  codigo_autorizacion: { titulo:'CODIGO AUTORIZACION', labelEquipo:'EQUIPO CON CODIGO',           labelEstado:'ESTADO',      mostrarEquipo:true,  mostrarMesh:false, mostrarAgregar:true  },
  cambio_equipo:       { titulo:'CAMBIO DE EQUIPO',    labelEquipo:'EQUIPO DENEGADO / DAÑADO',    labelEstado:'ESTADO',      mostrarEquipo:true,  mostrarMesh:false, mostrarAgregar:true  },
  sot_mantto:          { titulo:'SOT DE MANTO',        labelEquipo:'EQUIPO AFECTADO',             labelEstado:'ESTADO',      mostrarEquipo:true,  mostrarMesh:false, mostrarAgregar:true  },
  cambio_plano:        { titulo:'CAMBIO DE PLANO',     labelEquipo:'EQUIPO AFECTADO',             labelEstado:'ESTADO',      mostrarEquipo:true,  mostrarMesh:false, mostrarAgregar:true  },
};

// ════════════════════════════════
//  DERIVACION PEXT HFC SUBTIPOS
// ════════════════════════════════
const DERIVACION_PEXT_HFC_SUBTIPOS = {
  'PROBLEMAS CALIDAD CONECTIVIDAD': {
    campos: [
      { key:'niv_tap_us', key2:'niv_tap_ds', type:'dual', label:'Niveles TAP',  pre1:'Us=', pre2:'Ds=' },
      { key:'niv_cm_us',  key2:'niv_cm_ds',  type:'dual', label:'Niveles CM',   pre1:'Us=', pre2:'Ds=' },
      { key:'snr_ud',    label:'SNR Us-Ds',            type:'text', ph:'Ej. 30/38 dB' },
      { key:'ping',      label:'PING EXTENDIDO =',      type:'text', ph:'Ej. 100 ENV / 0 PERD' },
      { key:'ubic_tap',  label:'Ubicación TAP',         type:'text' },
      { key:'torre', key2:'piso', type:'dual', label:'TORRE / PISO', pre1:'TORRE:', pre2:'PISO:' },
      { key:'plano',     label:'Plano',                 type:'text' },
      { key:'valor_tap', label:'Valor TAP',             type:'text' },
      { key:'cint_cli',  label:'Cintillo CLI',          type:'text' },
      { key:'cint_ref',  label:'Cintillo REF',          type:'text' },
      { key:'obs',       label:'OBS',                   type:'text' },
    ],
    tmpl: [
      'Niveles TAP: Us={niv_tap_us}        Ds={niv_tap_ds}',
      'Niveles CM: Us={niv_cm_us}          Ds={niv_cm_ds}',
      'SNR Us-Ds: {snr_ud}',
      'PING EXTENDIDO = {ping}',
      'Ubicación TAP: {ubic_tap}',
      'TORRE: {torre}                 PISO: {piso}',
      'Plano: {plano}',
      'Valor TAP: {valor_tap}',
      'Cintillo CLI: {cint_cli}',
      'Cintillo REF: {cint_ref}',
      'OBS: {obs}',
    ],
  },
  'MALA SEÑAL CATV BASICO/DIGITAL': {
    campos: [
      { key:'snr_ib',  key2:'sig_ib',  type:'dual', label:'IN BAND SNR / SIGNAL POWER', pre1:'IN BAND SNR=', pre2:'SIGNAL POWER=' },
      { key:'frec_ib', label:'FRECUENCIA INBAND=',      type:'text', ph:'Ej. 123.45 MHz' },
      { key:'errores', label:'ERRORES / CORRECCIONES=', type:'text' },
      { key:'canal_tv',label:'CANAL TV PRUEBA=',         type:'text' },
      { key:'snr_obb', key2:'sig_obb', type:'dual', label:'OBB SNR / SIGNAL POWER', pre1:'OBB SNR=', pre2:'SIGNAL POWER=' },
      { key:'valor_tap',  label:'Valor TAP=',        type:'text' },
      { key:'ubic_tap',   label:'Ubicación TAP=',    type:'text' },
      { key:'torre', key2:'piso', type:'dual', label:'TORRE= / PISO=', pre1:'TORRE=', pre2:'PISO=' },
      { key:'plano',      label:'Plano=',             type:'text' },
      { key:'cint_cli',   label:'Cintillo CLI=',     type:'text' },
      { key:'cint_ref',   label:'Cintillo REF=',     type:'text' },
      { key:'obs',        label:'OBS', type:'text', def:'PRUEBA EN TAP, IMAGEN PIXELEADA' },
    ],
    tmpl: [
      'IN BAND SNR={snr_ib}            SIGNAL POWER={sig_ib}',
      'FRECUENCIA INBAND= {frec_ib}',
      'ERRORES / CORRECCIONES= {errores}',
      'CANAL TV PRUEBA= {canal_tv}',
      'OBB SNR={snr_obb}                SIGNAL POWER={sig_obb}',
      'Valor TAP= {valor_tap}',
      'Ubicación TAP= {ubic_tap}',
      'TORRE= {torre}                  PISO= {piso}',
      'Plano= {plano}',
      'Cintillo CLI= {cint_cli}',
      'Cintillo REF= {cint_ref}',
      'OBS: {obs}',
    ],
  },
  'PROBLEMAS DE INTERMITENCIA': {
    campos: [
      { key:'mac_cm',    label:'MAC CM',                     type:'text' },
      { key:'frec_prob', label:'Frecuencia con problemas',   type:'text' },
      { key:'iface',     label:'Interface(s) con problemas', type:'text' },
      { key:'niv_tap_us', key2:'niv_tap_ds', type:'dual', label:'Niveles TAP', pre1:'Us=', pre2:'Ds=' },
      { key:'niv_cm_us',  key2:'niv_cm_ds',  type:'dual', label:'Niveles CM',  pre1:'Us=', pre2:'Ds=' },
      { key:'snr_us',  key2:'snr_ds',  type:'dual', label:'SNR',       pre1:'Us=', pre2:'Ds=' },
      { key:'mod_us',  key2:'mod_ds',  type:'dual', label:'Modulación', pre1:'Us=', pre2:'Ds=' },
      { key:'atten',     label:'Atenuación (mts.)',           type:'text', ph:'Ej. 45' },
      { key:'ubic_tap',  label:'Ubicación TAP',               type:'text' },
      { key:'torre', key2:'piso', type:'dual', label:'TORRE / PISO', pre1:'TORRE:', pre2:'PISO:' },
      { key:'plano',     label:'Plano',                       type:'text' },
      { key:'valor_tap', label:'Valor TAP',                   type:'text' },
      { key:'cint_cli',  label:'Cintillo CLI',                type:'text' },
      { key:'cint_ref',  label:'Cintillo REF',                type:'text' },
      { key:'obs',       label:'OBS',                         type:'text' },
    ],
    tmpl: [
      'MAC CM: {mac_cm}',
      'Frecuencia con problemas: {frec_prob}',
      'Interface(s) con problemas: {iface}',
      'Niveles TAP: Us={niv_tap_us}        Ds={niv_tap_ds}',
      'Niveles CM: Us={niv_cm_us}          Ds={niv_cm_ds}',
      'SNR: Us={snr_us}                Ds={snr_ds}',
      'Modulación: Us={mod_us}         Ds={mod_ds}',
      'Atenuación: {atten}             mts.',
      'Ubicación TAP: {ubic_tap}',
      'TORRE: {torre}                  PISO: {piso}',
      'Plano: {plano}',
      'Valor TAP: {valor_tap}',
      'Cintillo CLI: {cint_cli}',
      'Cintillo REF: {cint_ref}',
      'OBS: {obs}',
    ],
  },
  'SIN SERVICIO HFC': {
    campos: [
      { key:'tipo_sot',  label:'Tipo SOT',           type:'text' },
      { key:'cmts',      label:'CMTS',                type:'text' },
      { key:'valor_tap', label:'VALOR TAP',           type:'text' },
      { key:'mac',       label:'MAC',                 type:'text' },
      { key:'niv_us', key2:'niv_ds', type:'dual', label:'NIVELES', pre1:'US=', pre2:'DS=' },
      { key:'dir_tap',   label:'DIRECCIÓN TAP',       type:'text' },
      { key:'plano',     label:'PLANO',               type:'text' },
      { key:'distrito',  label:'Distrito',            type:'text' },
      { key:'torre', key2:'piso', type:'dual', label:'TORRE / PISO', pre1:'TORRE:', pre2:'PISO:' },
      { key:'cint_cli',  label:'CINTILLO CLI',        type:'text' },
      { key:'cint_ref',  label:'CINTILLO REF',        type:'text' },
      { key:'contacto',  label:'CONTACTO CLIENTE',    type:'text' },
      { key:'nombres',   label:'NOMBRES CLIENTE',     type:'text' },
      { key:'obs',       label:'OBS',                 type:'text' },
    ],
    tmpl: [
      'Tipo SOT: {tipo_sot}',
      'CMTS: {cmts}',
      'VALOR TAP: {valor_tap}',
      'MAC: {mac}',
      'NIVELES: US={niv_us}            DS={niv_ds}',
      'DIRECCIÓN TAP: {dir_tap}',
      'PLANO: {plano}',
      'Distrito: {distrito}',
      'TORRE: {torre}                  PISO: {piso}',
      'CINTILLO CLI: {cint_cli}',
      'CINTILLO REF: {cint_ref}',
      'CONTACTO CLIENTE: {contacto}',
      'NOMBRES CLIENTE: {nombres}',
      'OBS: {obs}',
    ],
  },
};

// ════════════════════════════════
//  DERIVACION PEXT FTTH SUBTIPOS
// ════════════════════════════════
const DERIVACION_PEXT_FTTH_SUBTIPOS = {
  'NIVELES FUERA DE RANGO': {
    campos: [
      { key:'ont',        label:'ONT',                type:'text' },
      { key:'plano',      label:'PLANO',              type:'text' },
      { key:'fat',        label:'FAT',                type:'text' },
      { key:'coordenadas',label:'COORDENADAS',        type:'text' },
      { key:'borne_fat',  label:'BORNE DE FAT',       type:'text' },
      { key:'pot_tx', key2:'pot_rx', type:'dual', label:'POTENCIA OPTICA', pre1:'TX=', pre2:'RX=' },
      { key:'dir_fat',    label:'DIRECCIÓN DE FAT',   type:'text' },
      { key:'torre', key2:'piso', type:'dual', label:'TORRE / PISO', pre1:'TORRE:', pre2:'PISO:' },
      { key:'cint_cli',   label:'CINTILLO CLI',       type:'text' },
      { key:'cint_ref',   label:'CINTILLO REF',       type:'text' },
      { key:'obs',        label:'OBS',                type:'text' },
    ],
    tmpl: [
      'Derivación PEXT',
      'ONT: {ont}',
      'PLANO: {plano}',
      'FAT: {fat}',
      'COORDENADAS: {coordenadas}',
      'BORNE DE FAT: {borne_fat}',
      'POTENCIA OPTICA: TX={pot_tx}        RX={pot_rx}',
      'DIRECCIÓN DE FAT: {dir_fat}',
      'TORRE: {torre}                      PISO: {piso}',
      'CINTILLO CLI: {cint_cli}',
      'CINTILLO REF: {cint_ref}',
      'OBS: {obs}',
    ],
  },
  'SIN SERVICIO FTTH': {
    campos: [
      { key:'tipo',     label:'Tipo', type:'select', options:['','Mantenimiento','Instalación','Postventa'] },
      { key:'cmts_olt', label:'CMTS/OLT',       type:'text' },
      { key:'serie_ont',label:'SERIE ONT',       type:'text', ph:'*MANTT/POSTV* + Serie',  def:'*MANTT/POSTV*' },
      { key:'fat',      label:'FAT',             type:'text' },
      { key:'borne_fat',label:'BORNE DE FAT',    type:'text' },
      { key:'coordenadas',label:'COORDENADAS',   type:'text' },
      { key:'pot_opt',  label:'POTENCIA OPTICA', type:'text', ph:'Ej. LOW', def:'LOW' },
      { key:'dir_fat',  label:'DIRECCIÓN FAT',   type:'text' },
      { key:'torre', key2:'piso', type:'dual', label:'TORRE / PISO', pre1:'TORRE:', pre2:'PISO:' },
      { key:'plano',    label:'PLANO',            type:'text' },
      { key:'distrito', label:'Distrito',         type:'text' },
      { key:'cint_cli', label:'CINTILLO CLI',     type:'text' },
      { key:'cint_ref', label:'CINTILLO REF',     type:'text' },
      { key:'obs',      label:'OBS',              type:'text' },
    ],
    tmpl: [
      'Tipo: {tipo}',
      'CMTS/OLT: {cmts_olt}',
      'SERIE ONT: {serie_ont}',
      'FAT: {fat}',
      'BORNE DE FAT: {borne_fat}',
      'COORDENADAS: {coordenadas}',
      'POTENCIA OPTICA: {pot_opt}',
      'DIRECCIÓN FAT: {dir_fat}',
      'TORRE: {torre}                      PISO: {piso}',
      'PLANO: {plano}',
      'Distrito: {distrito}',
      'CINTILLO CLI: {cint_cli}',
      'CINTILLO REF: {cint_ref}',
      'OBS: {obs}',
    ],
  },
};

// ════════════════════════════════
//  RECHAZOS TÉCNICOS SUBTIPOS
// ════════════════════════════════
const RECHAZO_SUBTIPOS = {
  'RED SATURADA': {
    campos: [
      { key:'tecnico',       label:'TÉCNICO',         type:'text', ph:'Nombre del técnico' },
      { key:'tipo_actividad',label:'TIPO DE ACTIVIDAD',type:'select', options:['','Instalación','Postventa'] },
      { key:'sub_motivo',    label:'SUB-MOTIVO RECHAZO',type:'select', options:['','TAP o FAT saturado en plano horizontal','TAP O FAT saturado en plano vertical'] },
      { key:'plano',         label:'PLANO',            type:'text' },
      { key:'coord_cli',     label:'COORDENADA CLIENTE',    type:'text' },
      { key:'coord_tec',     label:'COORDENADA DEL TÉCNICO',type:'text' },
      { key:'obs', label:'OBSERVACIONES', type:'text', def:'PROCEDE RECHAZO; se verifica con plantilla TAP o FAT SATURADO.' },
    ],
    tmpl: [
      'RECHAZO EN CAMPO',
      'TÉCNICO: {tecnico}',
      'ASESOR: {asesor}',
      'TIPO DE CASO: Rechazo',
      'TIPO DE ACTIVIDAD: {tipo_actividad}',
      'ESTADO DE SOLICITUD: Atendido',
      'SUB-ESTADO DE SOLICITUD: Se rechaza SOT',
      'MOTIVO RECHAZO: RED SATURADA',
      'SUB-MOTIVO RECHAZO: {sub_motivo}',
      'PLANO: {plano}',
      'COORDENADA CLIENTE: {coord_cli}',
      'COORDENADA DEL TÉCNICO: {coord_tec}',
      'OBSERVACIONES: {obs}',
    ],
  },
  'FACTIBILIDAD TÉCNICA': {
    campos: [
      { key:'tecnico',       label:'TÉCNICO',          type:'text', ph:'Nombre del técnico' },
      { key:'tipo_actividad',label:'TIPO DE ACTIVIDAD', type:'select', options:['','Instalación','Postventa'] },
      { key:'sub_motivo',    label:'SUB-MOTIVO RECHAZO',type:'select', options:['','FALTA DE PUNTOS DE APOYO PARA ACOMETIDA','ACOMETIDA EXCEDE METRAJE','ACOMETIDA CRUZARIA DOBLE VIA'] },
      { key:'coord_cli',     label:'COORDENADA CLIENTE',    type:'text' },
      { key:'coord_tec',     label:'COORDENADA DEL TÉCNICO',type:'text' },
      { key:'obs', label:'OBSERVACIONES', type:'text', def:'PROCEDE RECHAZO; realizar quiebre en TOA y validar condiciones del domicilio.' },
    ],
    tmpl: [
      'RECHAZO EN CAMPO',
      'TÉCNICO: {tecnico}',
      'ASESOR: {asesor}',
      'TIPO DE CASO: Rechazo',
      'TIPO DE ACTIVIDAD: {tipo_actividad}',
      'ESTADO DE SOLICITUD: Atendido',
      'SUB-ESTADO DE SOLICITUD: Se rechaza SOT',
      'MOTIVO RECHAZO: FACTIBILIDAD TÉCNICA',
      'SUB-MOTIVO RECHAZO: {sub_motivo}',
      'COORDENADA CLIENTE: {coord_cli}',
      'COORDENADA DEL TÉCNICO: {coord_tec}',
      'OBSERVACIONES: {obs}',
    ],
  },
  'EDIFICIO NO LIBERADO': {
    campos: [
      { key:'tecnico',       label:'TÉCNICO',          type:'text', ph:'Nombre del técnico' },
      { key:'tipo_actividad',label:'TIPO DE ACTIVIDAD', type:'select', options:['','Instalación','Postventa'] },
      { key:'direccion',     label:'DIRECCIÓN',         type:'text' },
      { key:'coord_cli',     label:'COORDENADA CLIENTE',    type:'text' },
      { key:'coord_tec',     label:'COORDENADA DEL TÉCNICO',type:'text' },
      { key:'obs', label:'OBSERVACIONES', type:'text', def:'PROCEDE RECHAZO; el edificio no se encuentra liberado para instalación.' },
    ],
    tmpl: [
      'RECHAZO EN CAMPO',
      'TÉCNICO: {tecnico}',
      'ASESOR: {asesor}',
      'TIPO DE CASO: Rechazo',
      'TIPO DE ACTIVIDAD: {tipo_actividad}',
      'ESTADO DE SOLICITUD: Atendido',
      'SUB-ESTADO DE SOLICITUD: Se rechaza SOT',
      'MOTIVO RECHAZO: EDIFICIO NO LIBERADO',
      'SUB-MOTIVO RECHAZO: Edificio no liberado para atención',
      'DIRECCIÓN: {direccion}',
      'COORDENADA CLIENTE: {coord_cli}',
      'COORDENADA DEL TÉCNICO: {coord_tec}',
      'OBSERVACIONES: {obs}',
    ],
  },
  'FALTA DE INFRAESTRUCTURA DE RED': {
    campos: [
      { key:'tecnico', key2:'dni', type:'dual', label:'TÉCNICO / DNI', pre1:'Técnico:', pre2:'DNI:' },
      { key:'tipo_actividad',label:'TIPO DE ACTIVIDAD', type:'select', options:['','Instalación','Postventa'] },
      { key:'coord_cli',     label:'COORDENADA CLIENTE',    type:'text' },
      { key:'coord_tec',     label:'COORDENADA DEL TÉCNICO',type:'text' },
      { key:'obs', label:'OBSERVACIONES', type:'text', def:'PROCEDE RECHAZO; se valida domicilio fuera de cobertura.' },
    ],
    tmpl: [
      'RECHAZO EN CAMPO',
      'TÉCNICO: {tecnico}                    DNI: {dni}',
      'ASESOR: {asesor}',
      'TIPO DE CASO: Rechazo',
      'TIPO DE ACTIVIDAD: {tipo_actividad}',
      'ESTADO DE SOLICITUD: Atendido',
      'SUB-ESTADO DE SOLICITUD: Se rechaza SOT',
      'MOTIVO RECHAZO: FALTA DE INFRAESTRUCTURA DE RED',
      'SUB-MOTIVO RECHAZO: No hay red HFC/FTTH en la zona o avenida',
      'COORDENADA CLIENTE: {coord_cli}',
      'COORDENADA DEL TÉCNICO: {coord_tec}',
      'OBSERVACIONES: {obs}',
    ],
  },
};

// ════════════════════════════════
//  GESTIONES ESPECIALES
// ════════════════════════════════
const GESTIONES_ESPECIALES = {
  codigo_autorizacion: {
    titulo:'CODIGO AUTORIZACION', header:'MESA MULTISKILL HITSS - CODIGO AUTORIZACION', realizadoPorSuffix:'',
    campos:[
      { key:'equipo_retirar',  label:'EQUIPO A RETIRAR',  type:'text', ph:'Ej. MODEM HFC / ONT FTTH' },
      { key:'modelo',          label:'MODELO',             type:'model_select' },
      { key:'motivo',          label:'MOTIVO',             type:'text', ph:'Ej. EQUIPO EN MAL ESTADO' },
      { key:'se_autoriza_cod', label:'SE AUTORIZA CÓDIGO', type:'text' },
    ],
  },
  cambio_equipo: {
    titulo:'CAMBIO DE EQUIPO', header:'MESA MULTISKILL HITSS - CAMBIO DE EQUIPO', realizadoPorSuffix:'',
    campos:[
      { key:'equipo_retirar', label:'EQUIPO A RETIRAR',  type:'text', ph:'Ej. MODEM HFC / ONT FTTH' },
      { key:'modelo_ret',     label:'MODELO A RETIRAR',   type:'model_select' },
      { key:'equipo_activar', label:'EQUIPO POR ACTIVAR', type:'text', ph:'Ej. ONT FTTH / MODEM HFC' },
      { key:'modelo_act',     label:'MODELO POR ACTIVAR', type:'model_select' },
      { key:'motivo_cambio',  label:'MOTIVO DEL CAMBIO',  type:'text', ph:'Ej. INCOMPATIBILIDAD / DAÑADO' },
      { key:'cod_aut',        label:'CODIGO DE AUT.',      type:'text' },
      { key:'estado',         label:'ESTADO', type:'select', options:['', 'ATENDIDA', 'ATENDIDA SIN CONFORMIDAD', 'PENDIENTE SE DERIVA A SISTEMAS', 'DENEGADA'] },
    ],
  },
  sot_mantto: {
    titulo:'SOT DE MANTO', header:'MESA MULTISKILL HITSS - SOT DE MANTO', realizadoPorSuffix:'',
    campos:[
      { key:'motivo', label:'MOTIVO', type:'select', options:['','CAMBIO DE ACOMETIDA','CAMBIO DE EQUIPO POR COMPATIBILIDAD','CAMBIO DE EQUIPO DAÑADO'], onchange:'onManttoMotivoChange()' },
      { key:'equipo_retirar',   label:'EQUIPO A RETIRAR',    type:'text', ph:'Ej. MODEM HFC / ONT FTTH', grupo:'mantto_equipo' },
      { key:'modelo_ret',       label:'MODELO',             type:'model_select', grupo:'mantto_equipo' },
      { key:'cod_autorizacion', label:'COD. DE AUTORIZACION', type:'text', ph:'Ej. COD-001',            grupo:'mantto_equipo' },
      { key:'tecnico',  label:'TECNICO',  type:'text', ph:'Nombre del técnico' },
      { key:'contrata', label:'CONTRATA', type:'text', ph:'Nombre de la contrata' },
    ],
  },
  cambio_plano: {
    titulo:'CAMBIO DE PLANO', header:'MESA MULTISKILL HITSS', realizadoPorSuffix:' - HITSS',
    campos:[
      { key:'plano_correcto', label:'PLANO CORRECTO',     type:'text',  ph:'Ej. PL-2024-001' },
      { key:'coordenada',     label:'COORDENADA CLIENTE', type:'text',  ph:'Ej. -12.0464, -77.0428' },
    ],
  },
  activacion_plume: {
    titulo: 'ACTIVACION PLUME', header: 'MESA MULTISKILL HITSS – ACTIVACION PLUME', realizadoPorSuffix: '',
    campos: [
      { key: 'mac',    label: 'MAC',                   type: 'text', ph: 'Ej. 00:1A:2B:3C:4D:5E' },
      { key: 'sn',     label: 'SN (Número de Serie)',  type: 'text', ph: 'Ej. 1234567890' },
      { key: 'correo', label: 'CORREO',                type: 'text', ph: 'Ej. cliente@gmail.com' },
      { key: 'estado', label: 'ESTADO',                type: 'select', options: ['', 'ATENDIDA', 'ATENDIDA SIN CONFORMIDAD', 'PENDIENTE SE DERIVA A SISTEMAS', 'DENEGADA'] }
    ]
  },
  // Custom rendered types (no campos array)
  cintillos_ftth:       { titulo:'CONSULTA DE CINTILLOS FTTH', realizadoPorSuffix:'' },
  cintillos_hfc:        { titulo:'CONSULTA DE CINTILLOS HFC',  realizadoPorSuffix:'' },
  derivacion_pext_hfc:  { titulo:'DERIVACION PEXT HFC',  header:'MESA MULTISKILL - DERIVACION PEXT', realizadoPorSuffix:'' },
  derivacion_pext_ftth: { titulo:'DERIVACION PEXT FTTH', header:'MESA MULTISKILL - DERIVACION PEXT', realizadoPorSuffix:'' },
  rechazo_tecnico:      { titulo:'RECHAZO TÉCNICO', header:'MESA MULTISKILL HITSS', realizadoPorSuffix:'' },
};

// ════════════════════════════════
//  HELPERS DE TIPO
// ════════════════════════════════
function esEspecial(tipo) { return tipo in GESTIONES_ESPECIALES; }
function esEstandar(tipo) { return tipo in GESTIONES; }
function esCintillo(tipo) { return tipo === 'cintillos_ftth' || tipo === 'cintillos_hfc'; }
function esPext(tipo)     { return tipo === 'derivacion_pext_hfc' || tipo === 'derivacion_pext_ftth'; }
function esRechazo(tipo)  { return tipo === 'rechazo_tecnico'; }

// ════════════════════════════════
//  DATA STORE
// ════════════════════════════════
let secciones     = [];
let seccionActiva = 0;
let eqCounter     = 0;
let fatCounter    = 0;
let tapCounter    = 0;
let cintCounter   = 0;

// ════════════════════════════════
//  PERFIL DE USUARIO / ASESOR
// ════════════════════════════════
function getStoredUserName() {
  return (localStorage.getItem('hitss_username') || '').toUpperCase().trim();
}

function getStoredUserE() {
  return (localStorage.getItem('hitss_euser') || '').toUpperCase().trim();
}

function checkInitialUserProfile() {
  const savedName = localStorage.getItem('hitss_username');
  const savedE    = localStorage.getItem('hitss_euser');
  updateHeaderProfileDisplay();
  if (!savedName || !savedE) {
    setTimeout(() => openUserProfileModal(), 300);
  }
}

function updateHeaderProfileDisplay() {
  const name = getStoredUserName();
  const euser = getStoredUserE();
  const hdrEl = g('hdrUserName');
  if (hdrEl) {
    if (name && euser) {
      hdrEl.textContent = `${name} (${euser})`;
    } else if (name) {
      hdrEl.textContent = name;
    } else {
      hdrEl.textContent = 'Configurar Asesor';
    }
  }
}

function openUserProfileModal() {
  const m = g('userProfileModal');
  if (!m) return;
  const pName = g('profNombre');
  const pE = g('profUserE');
  if (pName) pName.value = getStoredUserName();
  if (pE) pE.value = getStoredUserE();
  m.classList.remove('hidden');
}

function closeUserProfileModal() {
  const m = g('userProfileModal');
  if (m) m.classList.add('hidden');
}

function saveUserProfile(e) {
  if (e) e.preventDefault();
  const name = gv('profNombre').trim().toUpperCase();
  const euser = gv('profUserE').trim().toUpperCase();

  if (!name || !euser) {
    alert('Por favor completa tu Nombre y Usuario E');
    return;
  }

  localStorage.setItem('hitss_username', name);
  localStorage.setItem('hitss_euser', euser);

  // Actualizar inputs en pantalla
  sv('realizadoPor', name);
  sv('codeEUser', euser);

  // Actualizar objeto sección activa
  if (secciones.length > 0) {
    secciones[seccionActiva].realizadoPor = name;
  }

  updateHeaderProfileDisplay();
  closeUserProfileModal();

  if (typeof mostrarAvisoSerial === 'function') {
    mostrarAvisoSerial(`👤 Perfil guardado: ${name} (${euser})`);
  }
}

function crearSeccion() {
  return {
    id: Date.now() + Math.random(),
    numero: '',
    tipoGestion: '',
    tecnologia: '',
    nTicket: '',
    equipoActivado: '', modeloEquipo: '',
    repetidorActivado: '', modeloRepetidor: '',
    equiposAdicionales: [],
    estado: '', observaciones: '',
    camposPersonalizados: {},
    realizadoPor: getStoredUserName(),
    notas: '', plantillaGenerada: '',
  };
}

// ════════════════════════════════
//  INIT / SECCIONES
// ════════════════════════════════
function inicializar() {
  secciones.push(crearSeccion());
  renderSidebar();
  cargarSeccion(0);
  initCuentas();
  initCodeGenerator();
  setupNotesSmartPaste();
  checkInitialUserProfile();
}

function nuevaSeccion() {
  guardarFormActual();
  secciones.push(crearSeccion());
  renderSidebar();
  cambiarSeccion(secciones.length - 1);
}

function cambiarSeccion(idx) {
  guardarFormActual();
  seccionActiva = idx;
  cargarSeccion(idx);
  renderSidebar();
}

// ════════════════════════════════
//  GUARDAR FORM → OBJETO
// ════════════════════════════════
function guardarFormActual() {
  if (secciones.length === 0) return;
  const s = secciones[seccionActiva];
  s.numero       = gv('seccionNumero').trim();
  s.tipoGestion  = gv('tipoGestion');
  s.nTicket      = gv('nTicket');
  s.realizadoPor = gv('realizadoPor');
  s.notas        = gv('notasTexto');

  if (s.tipoGestion === 'cintillos_ftth') {
    guardarCintillosFTTH(s);
  } else if (s.tipoGestion === 'cintillos_hfc') {
    guardarCintillosHFC(s);
  } else if (esEspecial(s.tipoGestion)) {
    guardarCamposCustom(s);
  } else if (esEstandar(s.tipoGestion)) {
    // Read modelo: if manual option selected, read from text input
    const rawModelo = gv('modeloEquipo');
    s.modeloEquipo  = rawModelo === '__manual__' ? gv('modeloManual') : rawModelo;
    s.equipoActivado    = gv('equipoActivado');
    s.repetidorActivado = gv('repetidorActivado');

    // Read modeloRepetidor select & manual fallback
    const rawRepMod = gv('modeloRepetidor');
    s.modeloRepetidor = (rawRepMod === '__manual__') ? gv('modeloRepetidorManual') : rawRepMod;

    // Read estado select & manual fallback
    const rawEstado = gv('estado');
    s.estado = (rawEstado === '__manual__') ? gv('estadoManual') : rawEstado;

    s.observaciones     = gv('observaciones');
    const ab = document.querySelector('.tech-btn.active');
    s.tecnologia = ab ? ab.dataset.tech : '';
    s.equiposAdicionales = capturarEquiposDOM();
  }
}

function guardarCamposCustom(s) {
  s.camposPersonalizados = s.camposPersonalizados || {};
  document.querySelectorAll('#customFormArea [id^="cesp_"]').forEach(el => {
    if (el.id.endsWith('_manual')) return;
    const key = el.id.replace('cesp_', '');
    if (el.tagName === 'SELECT' && el.value === '__manual__') {
      const manEl = g(`cesp_${key}_manual`);
      s.camposPersonalizados[key] = manEl ? manEl.value : '';
    } else {
      s.camposPersonalizados[key] = el.value;
    }
  });
}

function capturarEquiposDOM() {
  const r = [];
  document.querySelectorAll('#equiposAdicionales .eq-block-adicional').forEach(b => {
    const modSel = b.querySelector('.input-mod');
    const modMan = b.querySelector('.input-mod-manual');
    // If "__manual__" selected, use the text input value
    const modelo = (modSel?.value === '__manual__') ? (modMan?.value || '') : (modSel?.value || '');
    r.push({ uid:b.dataset.uid, tipo:b.dataset.tipo, equipo:b.querySelector('.input-eq')?.value||'', modelo });
  });
  return r;
}

// ════════════════════════════════
//  CARGAR OBJETO → FORM
// ════════════════════════════════
function cargarSeccion(idx) {
  const s = secciones[idx];
  g('seccionNumero').value = s.numero;
  sv('tipoGestion', s.tipoGestion);
  sv('nTicket',     s.nTicket);
  sv('realizadoPor', s.realizadoPor || getStoredUserName());
  sv('notasTexto',  s.notas);

  if (esEspecial(s.tipoGestion)) {
    ocultarBloquesEstandar();
    renderFormEspecial(s.tipoGestion, s.camposPersonalizados || {});
    show('bloqueRealizadoPor'); show('actionRow');
  } else {
    hide('customFormArea'); g('customFormArea').innerHTML = '';
    sv('equipoActivado', s.equipoActivado);
    sv('repetidorActivado', s.repetidorActivado);

    // Cargar modeloRepetidor select & manual text input
    const knownRepMods = ['REPETIDOR ZXHN H3601P 180000528400 ZTE', 'ROUTER K562E-10 50087708 HUAWEI'];
    const repModVal = s.modeloRepetidor || '';
    const isManRep = repModVal !== '' && !knownRepMods.includes(repModVal);
    if (g('modeloRepetidor')) sv('modeloRepetidor', isManRep ? '__manual__' : repModVal);
    const manRep = g('modeloRepetidorManual');
    if (manRep) {
      manRep.value = isManRep ? repModVal : '';
      if (isManRep) manRep.classList.remove('hidden');
      else manRep.classList.add('hidden');
    }

    // Cargar estado select & manual text input
    const knownEstados = ['ATENDIDA', 'ATENDIDA SIN CONFORMIDAD', 'PENDIENTE SE DERIVA A SISTEMAS', 'DENEGADA'];
    const estVal = s.estado || '';
    const isManEst = estVal !== '' && !knownEstados.includes(estVal);
    if (g('estado')) sv('estado', isManEst ? '__manual__' : estVal);
    const manEst = g('estadoManual');
    if (manEst) {
      manEst.value = isManEst ? estVal : '';
      if (isManEst) manEst.classList.remove('hidden');
      else manEst.classList.add('hidden');
    }

    sv('observaciones', s.observaciones);
    g('equiposAdicionales').innerHTML = '';
    s.equiposAdicionales.forEach(eq => renderEqAdicional(eq.tipo, eq.uid, eq.equipo, eq.modelo));
    resetTechBtns();
    if (s.tecnologia) {
      setTech(s.tecnologia, false);
      // Restore modelo value in select
      const storedModel = s.modeloEquipo;
      const modSel = g('modeloEquipo');
      const modMan = g('modeloManual');
      if (modSel && storedModel) {
        const isInList = Array.from(modSel.options).some(o => o.value === storedModel && o.value !== '' && o.value !== '__manual__');
        if (isInList) {
          modSel.value = storedModel;
          if (modMan) modMan.classList.add('hidden');
        } else {
          modSel.value = '__manual__';
          if (modMan) { modMan.value = storedModel; modMan.classList.remove('hidden'); }
        }
      }
    }
    aplicarVisibilidad(s.tipoGestion);
  }

  actualizarBadge(s.tipoGestion);

  if (s.plantillaGenerada) {
    g('plantillaTexto').textContent = s.plantillaGenerada;
    hide('previewEmpty'); show('previewContent'); g('btnCopy').disabled = false;
  } else {
    show('previewEmpty'); hide('previewContent'); g('btnCopy').disabled = true;
  }
  hide('copyFeedback');
}

function ocultarBloquesEstandar() {
  ['bloqueEquipoPrincipal','bloqueRepetidor','botonesAgregar','bloqueEstado','bloqueObs'].forEach(hide);
  g('equiposAdicionales').innerHTML = '';
  const modMan = g('modeloManual'); if (modMan) modMan.classList.add('hidden');
  resetTechBtns();
}

// ════════════════════════════════
//  CAMBIO TIPO ── FIX: guardar tipoGestion antes de cambiar
// ════════════════════════════════
function onTipoChange() {
  const tipo = gv('tipoGestion');

  // 1) Save datos del tipo ANTERIOR si era especial
  if (secciones.length > 0) {
    const prevTipo = secciones[seccionActiva].tipoGestion;
    if (prevTipo === 'cintillos_ftth') guardarCintillosFTTH(secciones[seccionActiva]);
    else if (prevTipo === 'cintillos_hfc') guardarCintillosHFC(secciones[seccionActiva]);
    else if (esEspecial(prevTipo)) guardarCamposCustom(secciones[seccionActiva]);
    // 2) Actualizar tipo en la sección AHORA para que los helpers del render lo vean correctamente
    secciones[seccionActiva].tipoGestion = tipo;
  }

  if (esEspecial(tipo)) {
    ocultarBloquesEstandar();
    hide('customFormArea');
    const vals = secciones.length > 0 ? (secciones[seccionActiva].camposPersonalizados || {}) : {};
    renderFormEspecial(tipo, vals);
    show('bloqueRealizadoPor'); show('actionRow');
  } else {
    hide('customFormArea'); g('customFormArea').innerHTML = '';
    aplicarVisibilidad(tipo);
  }
  actualizarBadge(tipo);
  if (secciones.length > 0) secciones[seccionActiva].plantillaGenerada = '';
  hide('previewContent'); show('previewEmpty'); g('btnCopy').disabled = true;
  renderSidebar();
}

// ════════════════════════════════
//  RENDER FORM ESPECIAL (dispatch)
// ════════════════════════════════
function renderFormEspecial(tipo, vals) {
  if (tipo === 'cintillos_ftth')        { renderFormCintillosFTTH(vals); return; }
  if (tipo === 'cintillos_hfc')         { renderFormCintillosHFC(vals);  return; }
  if (esPext(tipo))                     { renderFormDerivacionPext(tipo, vals); return; }
  if (esRechazo(tipo))                  { renderFormRechazo(vals); return; }

  // Genérico (codigo_autorizacion, cambio_equipo, sot_mantto, cambio_plano)
  const cfg = GESTIONES_ESPECIALES[tipo];
  if (!cfg || !cfg.campos) return;
  const area = g('customFormArea');
  let html = '<div class="custom-form-area">';
  html += renderSubtipoCampos(cfg.campos, vals);
  html += '</div>';
  area.innerHTML = html;
  area.classList.remove('hidden');
  if (tipo === 'sot_mantto') onManttoMotivoChange();
}

// ════════════════════════════════
//  CONDICIONAL SOT MANTTO
// ════════════════════════════════
function onManttoMotivoChange() {
  const m = gv('cesp_motivo');
  const ok = ['CAMBIO DE EQUIPO POR COMPATIBILIDAD','CAMBIO DE EQUIPO DAÑADO'].includes(m);
  document.querySelectorAll('[data-grupo="mantto_equipo"]').forEach(el =>
    ok ? el.classList.remove('hidden') : el.classList.add('hidden'));
}

// ════════════════════════════════
//  ── CINTILLOS FTTH ──
// ════════════════════════════════
function renderFormCintillosFTTH(vals) {
  const plano = vals.plano !== undefined ? vals.plano : '';
  g('customFormArea').innerHTML = `
    <div class="custom-form-area">
      <div class="field-group">
        <label class="field-label">🗺️ PLANO</label>
        <input type="text" id="cesp_plano" value="${plano}" placeholder="Ej. PL-001" />
      </div>
      <div id="fatItemsContainer"></div>
      <div class="add-btns"><div class="add-btns-row">
        <button type="button" class="btn-add" onclick="addFATItem()">📡 Agregar FAT</button>
      </div></div>
    </div>`;
  g('customFormArea').classList.remove('hidden');
  const items = vals.fat_items || [];
  if (items.length > 0) items.forEach(item => addFATItem(item));
  else addFATItem();
}

function addFATItem(data) {
  fatCounter++;
  const fatId  = `fat_${fatCounter}`;
  const numero = data?.numero || '';
  const status = data?.status || 'saturado';
  const cints  = data?.cintillos || [];
  const div    = document.createElement('div');
  div.className = 'item-block fat-item'; div.dataset.fatId = fatId; div.dataset.status = status;
  div.innerHTML = `
    <div class="item-header-row">
      <span class="item-label">📡 FAT #</span>
      <input type="text" class="item-num" placeholder="18" value="${numero}" />
      <div class="status-toggle">
        <button type="button" class="stog-btn stog-sat ${status==='saturado'?'active-sat':''}" onclick="setFATStatus('${fatId}','saturado')">SATURADO</button>
        <button type="button" class="stog-btn stog-nosat ${status==='no_saturado'?'active-nosat':''}" onclick="setFATStatus('${fatId}','no_saturado')">NO SATURADO</button>
      </div>
      <button type="button" class="btn-remove" onclick="removeFATItem('${fatId}')">✕ Quitar</button>
    </div>
    <div class="cintillos-area ${status==='saturado'?'hidden':''}" id="cints_${fatId}">
      <div class="cint-list" id="cint_list_${fatId}"></div>
      <button type="button" class="btn-add-cint" onclick="addFATCintillo('${fatId}')">+ Agregar cintillo</button>
    </div>`;
  g('fatItemsContainer').appendChild(div);
  if (cints.length > 0) cints.forEach(c => addFATCintillo(fatId, c));
  else if (status === 'no_saturado') addFATCintillo(fatId);
}

function removeFATItem(fatId) {
  const el = document.querySelector(`[data-fat-id="${fatId}"]`);
  if (el) { el.style.opacity='0'; el.style.transition='opacity 0.15s'; setTimeout(()=>el.remove(),160); }
}

function setFATStatus(fatId, status) {
  const block = document.querySelector(`[data-fat-id="${fatId}"]`);
  if (!block) return;
  block.dataset.status = status;
  block.querySelectorAll('.stog-btn')[0].className = `stog-btn stog-sat ${status==='saturado'?'active-sat':''}`;
  block.querySelectorAll('.stog-btn')[1].className = `stog-btn stog-nosat ${status==='no_saturado'?'active-nosat':''}`;
  const ca = g(`cints_${fatId}`);
  if (status === 'saturado') { ca.classList.add('hidden'); }
  else { ca.classList.remove('hidden'); if (!g(`cint_list_${fatId}`).children.length) addFATCintillo(fatId); }
}

function addFATCintillo(fatId, value='') {
  cintCounter++;
  const cintId = `cint_${cintCounter}`;
  const li = document.createElement('div');
  li.className = 'cint-item'; li.dataset.cintId = cintId;
  li.innerHTML = `<input type="text" class="cint-input" placeholder="Número de cintillo" value="${value}" /><button type="button" class="btn-remove-sm" onclick="removeFATCintillo('${fatId}','${cintId}')">✕</button>`;
  g(`cint_list_${fatId}`).appendChild(li);
}
function removeFATCintillo(_, cintId) { document.querySelector(`[data-cint-id="${cintId}"]`)?.remove(); }

function guardarCintillosFTTH(s) {
  s.camposPersonalizados = s.camposPersonalizados || {};
  s.camposPersonalizados.plano = gv('cesp_plano');
  const items = [];
  document.querySelectorAll('#fatItemsContainer .fat-item').forEach(block => {
    const numero = block.querySelector('.item-num').value;
    const status = block.dataset.status || 'saturado';
    const cintillos = [];
    block.querySelectorAll('.cint-input').forEach(inp => { if (inp.value.trim()) cintillos.push(inp.value.trim()); });
    items.push({ numero, status, cintillos });
  });
  s.camposPersonalizados.fat_items = items;
}

function generarTextoCintillosFTTH(s) {
  const vals = s.camposPersonalizados || {};
  const L = ['MESA MULTISKILL HITSS - CONSULTA DE CINTILLOS FTTH', `N. TICKET: ${s.nTicket||'—'}`, `PLANO: ${vals.plano||'—'}`];
  (vals.fat_items||[]).forEach(item => {
    const num = item.numero||'?';
    if (item.status === 'saturado') L.push(`FAT #${num} SATURADO`);
    else { const c = (item.cintillos||[]).length > 0 ? item.cintillos.join(' / ') : '—'; L.push(`FAT #${num} NO SATURADO / ${c}`); }
  });
  L.push(`REALIZADO POR: ${s.realizadoPor||'ANGEL LLAMACPONCCA'}`);
  return L.join('\n');
}

// ════════════════════════════════
//  ── CINTILLOS HFC ──
// ════════════════════════════════
function renderFormCintillosHFC(vals) {
  const plano = vals.plano !== undefined ? vals.plano : '';
  g('customFormArea').innerHTML = `
    <div class="custom-form-area">
      <div class="field-group">
        <label class="field-label">🗺️ PLANO</label>
        <input type="text" id="cesp_plano" value="${plano}" placeholder="Ej. PL-001" />
      </div>
      <div id="tapItemsContainer"></div>
      <div class="add-btns"><div class="add-btns-row">
        <button type="button" class="btn-add" onclick="addTAPItem()">📡 Agregar TAP</button>
      </div></div>
    </div>`;
  g('customFormArea').classList.remove('hidden');
  const items = vals.tap_items || [];
  if (items.length > 0) items.forEach(item => addTAPItem(item));
  else addTAPItem();
}

function addTAPItem(data) {
  tapCounter++;
  const tapId = `tap_${tapCounter}`;
  const tap   = data?.tap   || '';
  const borne = data?.borne || '';
  const status = data?.status || 'saturado';
  const cints  = data?.cintillos || [];
  const div = document.createElement('div');
  div.className = 'item-block tap-item'; div.dataset.tapId = tapId; div.dataset.status = status;
  div.innerHTML = `
    <div class="item-header-row">
      <span class="item-label">📡 TAP #</span>
      <input type="text" class="item-num tap-a" placeholder="12" value="${tap}" />
      <span class="item-sep">X</span>
      <input type="text" class="item-num borne-b" placeholder="8" value="${borne}" />
      <div class="status-toggle">
        <button type="button" class="stog-btn stog-sat ${status==='saturado'?'active-sat':''}" onclick="setTAPStatus('${tapId}','saturado')">SATURADO</button>
        <button type="button" class="stog-btn stog-nosat ${status==='no_saturado'?'active-nosat':''}" onclick="setTAPStatus('${tapId}','no_saturado')">NO SATURADO</button>
      </div>
      <button type="button" class="btn-remove" onclick="removeTAPItem('${tapId}')">✕ Quitar</button>
    </div>
    <div class="cintillos-area ${status==='saturado'?'hidden':''}" id="cints_${tapId}">
      <div class="cint-list" id="cint_list_${tapId}"></div>
      <button type="button" class="btn-add-cint" onclick="addTAPCintillo('${tapId}')">+ Agregar cintillo</button>
    </div>`;
  g('tapItemsContainer').appendChild(div);
  if (cints.length > 0) cints.forEach(c => addTAPCintillo(tapId, c));
  else if (status === 'no_saturado') addTAPCintillo(tapId);
}

function removeTAPItem(tapId) {
  const el = document.querySelector(`[data-tap-id="${tapId}"]`);
  if (el) { el.style.opacity='0'; el.style.transition='opacity 0.15s'; setTimeout(()=>el.remove(),160); }
}

function setTAPStatus(tapId, status) {
  const block = document.querySelector(`[data-tap-id="${tapId}"]`);
  if (!block) return;
  block.dataset.status = status;
  block.querySelectorAll('.stog-btn')[0].className = `stog-btn stog-sat ${status==='saturado'?'active-sat':''}`;
  block.querySelectorAll('.stog-btn')[1].className = `stog-btn stog-nosat ${status==='no_saturado'?'active-nosat':''}`;
  const ca = g(`cints_${tapId}`);
  if (status === 'saturado') ca.classList.add('hidden');
  else { ca.classList.remove('hidden'); if (!g(`cint_list_${tapId}`).children.length) addTAPCintillo(tapId); }
}

function addTAPCintillo(tapId, value='') {
  cintCounter++;
  const cintId = `cint_${cintCounter}`;
  const li = document.createElement('div');
  li.className = 'cint-item'; li.dataset.cintId = cintId;
  li.innerHTML = `<input type="text" class="cint-input" placeholder="Número de cintillo" value="${value}" /><button type="button" class="btn-remove-sm" onclick="removeTAPCintillo('${tapId}','${cintId}')">✕</button>`;
  g(`cint_list_${tapId}`).appendChild(li);
}
function removeTAPCintillo(_, cintId) { document.querySelector(`[data-cint-id="${cintId}"]`)?.remove(); }

function guardarCintillosHFC(s) {
  s.camposPersonalizados = s.camposPersonalizados || {};
  s.camposPersonalizados.plano = gv('cesp_plano');
  const items = [];
  document.querySelectorAll('#tapItemsContainer .tap-item').forEach(block => {
    const inputs = block.querySelectorAll('.item-num');
    const tap = inputs[0]?.value||''; const borne = inputs[1]?.value||'';
    const status = block.dataset.status || 'saturado';
    const cintillos = [];
    block.querySelectorAll('.cint-input').forEach(inp => { if (inp.value.trim()) cintillos.push(inp.value.trim()); });
    items.push({ tap, borne, status, cintillos });
  });
  s.camposPersonalizados.tap_items = items;
}

function generarTextoCintillosHFC(s) {
  const vals = s.camposPersonalizados || {};
  const L = ['MESA MULTISKILL HITSS - CONSULTA DE CINTILLOS HFC', `N. TICKET: ${s.nTicket||'—'}`, `PLANO: ${vals.plano||'—'}`];
  (vals.tap_items||[]).forEach(item => {
    const t = item.tap||'?'; const b = item.borne||'?';
    if (item.status === 'saturado') L.push(`TAP #${t}X${b} SATURADO`);
    else { const c = (item.cintillos||[]).length > 0 ? item.cintillos.join(' / ') : '—'; L.push(`TAP #${t}X${b} NO SATURADO / ${c}`); }
  });
  L.push(`REALIZADO POR: ${s.realizadoPor||'ANGEL LLAMACPONCCA'}`);
  return L.join('\n');
}

// ════════════════════════════════
//  ── DERIVACION PEXT ──
// ════════════════════════════════
function renderFormDerivacionPext(tipo, vals) {
  // FIX: use the TYPE passed as parameter (not from stale section data)
  const isHFC    = tipo === 'derivacion_pext_hfc';
  const subtipos = isHFC ? DERIVACION_PEXT_HFC_SUBTIPOS : DERIVACION_PEXT_FTTH_SUBTIPOS;
  const currSub  = vals.pext_subtipo || '';
  const opts     = Object.keys(subtipos).map(k =>
    `<option value="${k}" ${currSub===k?'selected':''}>${k}</option>`).join('');

  let html = `
    <div class="field-group">
      <label class="field-label">⚠️ Motivo de Derivación</label>
      <div class="sel-wrap">
        <select id="cesp_pext_subtipo" onchange="onPextSubtipoChange()">
          <option value="">— Selecciona el motivo —</option>
          ${opts}
        </select>
        <span class="sel-arrow">▾</span>
      </div>
    </div>`;

  if (currSub && subtipos[currSub]) {
    html += renderSubtipoCampos(subtipos[currSub].campos, vals);
  }

  const area = g('customFormArea');
  area.innerHTML = html;
  area.classList.remove('hidden');
}

// FIX: get tipo from DOM (not from section which may be stale)
function onPextSubtipoChange() {
  if (secciones.length === 0) return;
  const s    = secciones[seccionActiva];
  const tipo = gv('tipoGestion'); // ← KEY FIX: always read from DOM
  guardarCamposCustom(s);
  renderFormDerivacionPext(tipo, s.camposPersonalizados);
}

function generarTextoDerivacionPext(s) {
  const tipo     = s.tipoGestion;
  const cfg      = GESTIONES_ESPECIALES[tipo];
  const vals     = s.camposPersonalizados || {};
  const sub      = vals.pext_subtipo || '';
  if (!sub) return `${cfg.header}\n[Sin motivo seleccionado]`;
  const isHFC    = tipo === 'derivacion_pext_hfc';
  const subtipos = isHFC ? DERIVACION_PEXT_HFC_SUBTIPOS : DERIVACION_PEXT_FTTH_SUBTIPOS;
  const scfg     = subtipos[sub];
  if (!scfg) return '';
  const L = [cfg.header, sub, `N. TICKET: ${s.nTicket||'—'}`];
  scfg.tmpl.forEach(line => L.push(line.replace(/\{(\w+)\}/g, (_, k) => vals[k]||'—')));
  L.push(`REALIZADO POR: ${s.realizadoPor||'ANGEL LLAMACPONCCA'}`);
  return L.join('\n');
}

// ════════════════════════════════
//  ── RECHAZOS TÉCNICOS ──
// ════════════════════════════════
function renderFormRechazo(vals) {
  const currSub = vals.rechazo_subtipo || '';
  const opts    = Object.keys(RECHAZO_SUBTIPOS).map(k =>
    `<option value="${k}" ${currSub===k?'selected':''}>${k}</option>`).join('');

  let html = `
    <div class="field-group">
      <label class="field-label">⚠️ Motivo de Rechazo</label>
      <div class="sel-wrap">
        <select id="cesp_rechazo_subtipo" onchange="onRechazoSubtipoChange()">
          <option value="">— Selecciona el motivo —</option>
          ${opts}
        </select>
        <span class="sel-arrow">▾</span>
      </div>
    </div>`;

  if (currSub && RECHAZO_SUBTIPOS[currSub]) {
    html += renderSubtipoCampos(RECHAZO_SUBTIPOS[currSub].campos, vals);
  }

  const area = g('customFormArea');
  area.innerHTML = html;
  area.classList.remove('hidden');
}

function onRechazoSubtipoChange() {
  if (secciones.length === 0) return;
  const s = secciones[seccionActiva];
  guardarCamposCustom(s);
  renderFormRechazo(s.camposPersonalizados);
}

function generarTextoRechazo(s) {
  const cfg  = GESTIONES_ESPECIALES[s.tipoGestion];
  const vals = s.camposPersonalizados || {};
  const sub  = vals.rechazo_subtipo || '';
  if (!sub) return `${cfg.header}\n[Sin motivo seleccionado]`;
  const scfg = RECHAZO_SUBTIPOS[sub];
  if (!scfg) return '';
  const L = [cfg.header];
  const ticketVal = (s.nTicket || '').trim();
  if (ticketVal !== '') {
    L.push(`N. TICKET: ${ticketVal}`);
  }
  const asesorName = s.realizadoPor?.trim() || getStoredUserName();
  scfg.tmpl.forEach(line => L.push(line.replace(/\{(\w+)\}/g, (_, k) => k === 'asesor' ? asesorName : (vals[k] || '—'))));
  L.push(`REALIZADO POR: ${asesorName}`);
  return L.join('\n');
}

// ════════════════════════════════
//  RENDER CAMPOS SUBTIPO (shared by PEXT + RECHAZO)
// ════════════════════════════════
function renderSubtipoCampos(campos, vals) {
  let html = '';
  campos.forEach(c => {
    const isManttoGroup = c.grupo === 'mantto_equipo';
    const motivoVal     = vals.motivo || '';
    const esCambioEq    = ['CAMBIO DE EQUIPO POR COMPATIBILIDAD','CAMBIO DE EQUIPO DAÑADO'].includes(motivoVal);
    const hiddenCls     = (isManttoGroup && !esCambioEq) ? 'hidden' : '';
    const groupAttr     = isManttoGroup ? 'data-grupo="mantto_equipo"' : '';

    if (c.type === 'dual') {
      const v1 = (c.key  in vals) ? vals[c.key]  : '';
      const v2 = (c.key2 in vals) ? vals[c.key2] : '';
      html += `
        <div class="field-group ${hiddenCls}" ${groupAttr}>
          <label class="field-label">${c.label}</label>
          <div class="dual-inputs">
            <div class="dual-part"><span class="dual-prefix">${c.pre1}</span><input type="text" id="cesp_${c.key}" class="dual-input" value="${v1}" placeholder="—"/></div>
            <div class="dual-part"><span class="dual-prefix">${c.pre2}</span><input type="text" id="cesp_${c.key2}" class="dual-input" value="${v2}" placeholder="—"/></div>
          </div>
        </div>`;
    } else if (c.type === 'select') {
      const currVal = (c.key in vals) ? vals[c.key] : '';
      const onchAttr = c.onchange ? `onchange="${c.onchange}"` : '';
      const opts = c.options.map(o => `<option value="${o}" ${currVal===o?'selected':''}>${o||'— Selecciona —'}</option>`).join('');
      html += `<div class="field-group ${hiddenCls}" ${groupAttr}><label class="field-label">${c.label}</label><div class="sel-wrap"><select id="cesp_${c.key}" ${onchAttr}>${opts}</select><span class="sel-arrow">▾</span></div></div>`;
    } else if (c.type === 'model_select') {
      const currVal = (c.key in vals) ? vals[c.key] : '';
      const knownAll = [
        ...MODELOS.hfc,
        ...MODELOS.ftth,
        ...MODELOS_DECO.iptv,
        ...MODELOS_DECO.hfc
      ];
      const uniqueModels = [...new Set(knownAll)];
      const isMan = currVal !== '' && !uniqueModels.includes(currVal);
      const selVal = isMan ? '__manual__' : currVal;
      const manVal = isMan ? currVal : '';

      let optsHtml = `<option value="">— Selecciona modelo —</option>`;
      uniqueModels.forEach(m => {
        optsHtml += `<option value="${m}" ${selVal===m?'selected':''}>${m}</option>`;
      });
      optsHtml += `<option value="__manual__" ${selVal==='__manual__'?'selected':''}>✏️ Escribir manualmente…</option>`;

      html += `
        <div class="field-group ${hiddenCls}" ${groupAttr}>
          <label class="field-label">${c.label}</label>
          <div class="sel-wrap">
            <select id="cesp_${c.key}" onchange="onModelSelectChange(this, 'cesp_${c.key}_manual')">
              ${optsHtml}
            </select>
            <span class="sel-arrow">▾</span>
          </div>
          <input type="text" id="cesp_${c.key}_manual" class="input-mod-manual ${isMan ? '' : 'hidden'}"
                 value="${manVal}" placeholder="Escribe el modelo…" style="margin-top:0.4rem" />
        </div>`;
    } else {
      const val = (c.key in vals) ? vals[c.key] : (c.def || '');
      html += `<div class="field-group ${hiddenCls}" ${groupAttr}><label class="field-label">${c.label}</label><input type="text" id="cesp_${c.key}" value="${val}" placeholder="${c.ph||''}"/></div>`;
    }
  });
  return html;
}

function onModelSelectChange(sel, manualId) {
  const man = g(manualId);
  if (!man) return;
  if (sel.value === '__manual__') {
    man.classList.remove('hidden');
    man.focus();
  } else {
    man.classList.add('hidden');
  }
}

function onModeloRepetidorChange() {
  const sel = g('modeloRepetidor');
  const man = g('modeloRepetidorManual');
  if (!sel || !man) return;
  if (sel.value === '__manual__') {
    man.classList.remove('hidden');
    man.focus();
  } else {
    man.classList.add('hidden');
  }
}

// ════════════════════════════════
//  VISIBILIDAD / BADGE
// ════════════════════════════════
function aplicarVisibilidad(tipo) {
  const cfg    = tipo ? GESTIONES[tipo] : null;
  const extras = ['bloqueEstado','bloqueObs','bloqueRealizadoPor','actionRow'];
  hide('customFormArea');
  if (!cfg) {
    ['bloqueEquipoPrincipal','bloqueRepetidor','botonesAgregar'].forEach(hide);
    extras.forEach(hide); return;
  }
  if (cfg.mostrarEquipo) {
    show('bloqueEquipoPrincipal');
    g('labelEquipoActivado').textContent  = cfg.labelEquipo;
    g('equipoPrincipalLabel').textContent = cfg.labelEquipo;
    populateModelosSelect(tipo, getCurrentTech());
  } else hide('bloqueEquipoPrincipal');
  cfg.mostrarMesh    ? show('bloqueRepetidor') : hide('bloqueRepetidor');
  cfg.mostrarAgregar ? show('botonesAgregar')  : hide('botonesAgregar');
  g('labelEstado').textContent = cfg.labelEstado;
  extras.forEach(show);
}

function actualizarBadge(tipo) {
  const badge = g('seccionTipoBadge');
  badge.className = 'sec-tipo-badge';
  if (!tipo) { badge.textContent = 'Sin gestión'; return; }
  const titulo = esEspecial(tipo) ? GESTIONES_ESPECIALES[tipo].titulo : GESTIONES[tipo]?.titulo;
  badge.textContent = titulo || tipo;
  badge.classList.add(`badge-${tipo}`);
}

// ════════════════════════════════
//  TECNOLOGÍA / MODELOS ── SELECT COMPLETO O POR TECNOLOGÍA
// ════════════════════════════════
function populateModelosSelect(tipo, tech) {
  const sel = g('modeloEquipo');
  if (!sel) return;

  const sinDiscriminar = ['cambio_equipo', 'codigo_autorizacion', 'sot_mantto'].includes(tipo);

  let modelosList = [];
  if (sinDiscriminar) {
    modelosList = [
      ...MODELOS.hfc,
      ...MODELOS.ftth,
      ...MODELOS_DECO.iptv,
      ...MODELOS_DECO.hfc
    ];
    modelosList = [...new Set(modelosList)];
  } else if (tech === 'hfc') {
    modelosList = MODELOS.hfc;
  } else if (tech === 'ftth') {
    modelosList = MODELOS.ftth;
  } else {
    modelosList = [...MODELOS.hfc, ...MODELOS.ftth];
  }

  const promptTxt = sinDiscriminar
    ? '— Selecciona modelo (Todos) —'
    : tech
      ? `— Selecciona modelo ${tech.toUpperCase()} —`
      : '— Selecciona modelo —';

  sel.innerHTML = `<option value="">${promptTxt}</option>`;
  modelosList.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m; opt.textContent = m; sel.appendChild(opt);
  });
  const manOpt = document.createElement('option');
  manOpt.value = '__manual__'; manOpt.textContent = '✏️ Escribir manualmente…';
  sel.appendChild(manOpt);
}

function setTech(tech, save=true) {
  resetTechBtns();
  const btn = document.querySelector(`.tech-btn[data-tech="${tech}"]`);
  if (btn) btn.classList.add('active', tech);

  const tipo = gv('tipoGestion');
  populateModelosSelect(tipo, tech);

  // Hide manual input when tech changes
  const man = g('modeloManual');
  if (man) { man.classList.add('hidden'); man.value = ''; }

  if (save && secciones.length > 0) secciones[seccionActiva].tecnologia = tech;
}

function onModeloChange() {
  const man = g('modeloManual');
  if (!man) return;
  if (gv('modeloEquipo') === '__manual__') {
    man.classList.remove('hidden');
    man.focus();
  } else {
    man.classList.add('hidden');
  }
}

function resetTechBtns() {
  document.querySelectorAll('.tech-btn').forEach(b => b.classList.remove('active','hfc','ftth'));
}

// ════════════════════════════════
//  EQUIPOS ADICIONALES
// ════════════════════════════════
function agregarEquipoAdicional(tipo) {
  eqCounter++;
  const uid = `eq_${Date.now()}_${eqCounter}`;
  renderEqAdicional(tipo, uid, '', '');
  if (secciones.length > 0) secciones[seccionActiva].equiposAdicionales.push({uid,tipo,equipo:'',modelo:''});
}

function getCurrentTech() {
  const ab = document.querySelector('.tech-btn.active');
  if (ab) return ab.dataset.tech;
  return secciones.length > 0 ? secciones[seccionActiva].tecnologia : '';
}

function buildDecoOptions(modelo) {
  const tech   = getCurrentTech();
  // IPTV decos always visible; HFC-only decos only when HFC selected
  const all = tech === 'ftth'
    ? [...MODELOS_DECO.iptv]
    : [...MODELOS_DECO.hfc, ...MODELOS_DECO.iptv];
  let html = `<option value="">— Selecciona modelo —</option>`;
  all.forEach(m => html += `<option value="${m}" ${modelo===m?'selected':''}>${m}</option>`);
  html += `<option value="__manual__" ${modelo==='__manual__'?'selected':''}>✏️ Escribir manualmente…</option>`;
  return html;
}

function buildRepetidorOptions(modelo) {
  let html = `<option value="">— Selecciona modelo —</option>`;
  MODELOS_REPETIDOR.forEach(m => html += `<option value="${m}" ${modelo===m?'selected':''}>${m}</option>`);
  html += `<option value="__manual__" ${modelo==='__manual__'?'selected':''}>✏️ Escribir manualmente…</option>`;
  return html;
}

function onAdicionalModeloChange(sel) {
  const block = sel.closest('.eq-block-adicional');
  if (!block) return;
  const man = block.querySelector('.input-mod-manual');
  if (!man) return;
  if (sel.value === '__manual__') { man.classList.remove('hidden'); man.focus(); }
  else man.classList.add('hidden');
}

function renderEqAdicional(tipo, uid, equipo, modelo) {
  const esDeco  = tipo === 'deco';
  const label   = esDeco ? '📺 DECO ACTIVADO' : '📡 REPETIDOR ACTIVADO';
  const clase   = esDeco ? 'adicional-deco' : 'adicional-rep';
  const color   = esDeco ? 'var(--accent)' : 'var(--accent2)';
  const phEq    = esDeco ? 'Ej. DECO HD / 4K' : 'Ej. Repetidor WiFi';
  const lblEq   = esDeco ? 'Deco Activado' : 'Repetidor Activado';

  // Resolve model value for the select
  const knownList = esDeco
    ? [...MODELOS_DECO.hfc, ...MODELOS_DECO.iptv]
    : MODELOS_REPETIDOR;
  const isManual  = modelo !== '' && !knownList.includes(modelo);
  const selVal    = isManual ? '__manual__' : modelo;
  const manVal    = isManual ? modelo : '';

  const optsHtml  = esDeco ? buildDecoOptions(selVal) : buildRepetidorOptions(selVal);

  const div = document.createElement('div');
  div.className = `eq-block-adicional ${clase}`;
  div.dataset.uid  = uid;
  div.dataset.tipo = tipo;
  div.innerHTML = `
    <div class="block-row">
      <span class="blk-label" style="color:${color}">${label}</span>
      <button type="button" class="btn-remove" onclick="quitarEqAdicional('${uid}')">✕ Quitar</button>
    </div>
    <div class="field-group inner">
      <label class="field-label">${lblEq}</label>
      <input type="text" class="input-eq" value="${equipo}" placeholder="${phEq}"/>
    </div>
    <div class="field-group inner">
      <label class="field-label">Modelo</label>
      <div class="sel-wrap">
        <select class="input-mod" onchange="onAdicionalModeloChange(this)">${optsHtml}</select>
        <span class="sel-arrow">▾</span>
      </div>
      <input type="text" class="input-mod-manual ${isManual ? '' : 'hidden'}"
             value="${manVal}" placeholder="Escribe el modelo…" style="margin-top:0.4rem"/>
    </div>`;
  g('equiposAdicionales').appendChild(div);
}

function quitarEqAdicional(uid) {
  const el = document.querySelector(`[data-uid="${uid}"]`);
  if (!el) return;
  el.style.transition='opacity 0.15s'; el.style.opacity='0';
  setTimeout(()=>{ el.remove(); if(secciones.length>0) secciones[seccionActiva].equiposAdicionales=secciones[seccionActiva].equiposAdicionales.filter(e=>e.uid!==uid); },160);
}

// ════════════════════════════════
//  GENERAR PLANTILLA
// ════════════════════════════════
function generarPlantilla() {
  guardarFormActual();
  const s = secciones[seccionActiva];
  if (!s.tipoGestion) return;
  let texto;
  if (s.tipoGestion === 'cintillos_ftth')       texto = generarTextoCintillosFTTH(s);
  else if (s.tipoGestion === 'cintillos_hfc')   texto = generarTextoCintillosHFC(s);
  else if (esPext(s.tipoGestion))               texto = generarTextoDerivacionPext(s);
  else if (esRechazo(s.tipoGestion))            texto = generarTextoRechazo(s);
  else if (esEspecial(s.tipoGestion))           texto = generarTextoEspecial(s);
  else                                          texto = generarTextoEstandar(s);
  s.plantillaGenerada = texto;
  g('plantillaTexto').textContent = texto;
  hide('previewEmpty'); show('previewContent'); g('btnCopy').disabled=false;
  renderSidebar();
}

function generarTextoEstandar(s) {
  const cfg = GESTIONES[s.tipoGestion]; const L=[];
  L.push(`MESA MULTISKILL HITSS – ${cfg.titulo}`);
  
  const ticketVal = (s.nTicket || '').trim();
  if (ticketVal !== '') {
    L.push(`N. TICKET: ${ticketVal}`);
  }

  // Omit EQUIPO ACTIVADO and MODELO if empty
  const eqName = (s.equipoActivado || '').trim();
  const eqMod  = (s.modeloEquipo || '').trim();
  if (cfg.mostrarEquipo && (eqName !== '' || eqMod !== '')) {
    L.push(`${cfg.labelEquipo}: ${eqName || '—'}`);
    L.push(`MODELO: ${eqMod || '—'}`);
  }

  // Omit REPETIDOR ACTIVADO and MODELO if empty
  const repName = (s.repetidorActivado || '').trim();
  const repMod  = (s.modeloRepetidor || '').trim();
  if (cfg.mostrarMesh && (repName !== '' || repMod !== '')) {
    L.push(`REPETIDOR ACTIVADO: ${repName || '—'}`);
    L.push(`MODELO: ${repMod || '—'}`);
  }

  // Equipos adicionales (decos / repetidores)
  (s.equiposAdicionales || []).forEach(eq => {
    const eName = (eq.equipo || '').trim();
    const eMod  = (eq.modelo || '').trim();
    if (eName !== '' || eMod !== '') {
      L.push(`${eq.tipo==='deco'?'DECO ACTIVADO':'REPETIDOR ACTIVADO'}: ${eName || '—'}`);
      L.push(`MODELO: ${eMod || '—'}`);
    }
  });

  const estVal = (s.estado || '').trim();
  if (estVal !== '') {
    L.push(`${cfg.labelEstado}: ${estVal}`);
  }

  const obsVal = (s.observaciones || '').trim();
  if (obsVal !== '') {
    L.push(`OBSERVACIONES: ${obsVal}`);
  }

  L.push(`REALIZADO POR: ${s.realizadoPor?.trim() || 'ANGEL LLAMACPONCCA'}`);
  return L.join('\n');
}

function generarTextoEspecial(s) {
  const cfg = GESTIONES_ESPECIALES[s.tipoGestion];
  const vals= s.camposPersonalizados||{}; const L=[];

  // Plantilla personalizada para ACTIVACION PLUME
  if (s.tipoGestion === 'activacion_plume') {
    L.push('MESA MULTISKILL HITSS – ACTIVACION PLUME');
    const ticketVal = (s.nTicket || '').trim();
    if (ticketVal !== '') {
      L.push(`N. TICKET: ${ticketVal}`);
    }
    L.push(`MAC: ${vals.mac || ''}`);
    L.push(`SN: ${vals.sn || ''}`);
    L.push(`CORREO: ${vals.correo || ''}`);
    if ((vals.estado || '').trim()) {
      L.push(`ESTADO: ${vals.estado.trim()}`);
    }
    L.push(`REALIZADO POR: ${s.realizadoPor?.trim() || 'ANGEL LLAMACPONCCA'}`);
    return L.join('\n');
  }

  L.push(cfg.header);
  const ticketVal = (s.nTicket || '').trim();
  if (ticketVal !== '') {
    L.push(`N. TICKET: ${ticketVal}`);
  }

  cfg.campos.forEach(c => {
    if (c.grupo==='mantto_equipo') {
      if (!['CAMBIO DE EQUIPO POR COMPATIBILIDAD','CAMBIO DE EQUIPO DAÑADO'].includes(vals.motivo||'')) return;
    }
    if (c.type==='fixed')  L.push(`${c.label}: ${c.value}`);
    else                   L.push(`${c.label}: ${vals[c.key]||'—'}`);
  });
  L.push(`REALIZADO POR: ${s.realizadoPor||'ANGEL LLAMACPONCCA'}${cfg.realizadoPorSuffix||''}`);
  return L.join('\n');
}

// ════════════════════════════════
//  SIDEBAR
// ════════════════════════════════
// ════════════════════════════════
//  SIDEBAR
// ════════════════════════════════
function renderSidebar() {
  const list = g('sectionsList'); list.innerHTML='';
  secciones.forEach((sec, idx) => {
    const isActive = idx===seccionActiva;
    const tipo = sec.tipoGestion;
    const badgeCls = tipo ? `badge-${tipo}` : 'badge-none';
    const tipoLabel = tipo ? (esEspecial(tipo)?GESTIONES_ESPECIALES[tipo].titulo:GESTIONES[tipo]?.titulo) : 'Sin gestión';
    const ticketLbl = sec.nTicket ? `Ticket: ${sec.nTicket}` : 'Sin ticket';
    const hasPlant  = !!sec.plantillaGenerada;
    const item = document.createElement('div');
    item.className = `section-item${isActive?' active':''}`;
    const sotVal = (sec.numero !== undefined && sec.numero !== null && String(sec.numero).trim() !== '') ? sec.numero : '—';
    item.innerHTML = `
      <div class="section-item-inner" onclick="cambiarSeccion(${idx})">
        <div class="sec-card-top">
          <span class="sec-sot-title">SOT: ${sotVal}</span>
          ${hasPlant?'<span class="plantilla-dot">●</span>':''}
          <button class="btn-delete-item" onclick="confirmarEliminar(${idx},event)" title="Eliminar">✕</button>
        </div>
        <div class="sec-card-mid">
          <span class="si-gestion-badge ${badgeCls}">${tipoLabel}</span>
        </div>
        <div class="sec-card-bot">
          <span class="section-item-ticket">${ticketLbl}</span>
        </div>
      </div>`;
    list.appendChild(item);
  });
}

// ════════════════════════════════
//  ELIMINAR / LIMPIAR
// ════════════════════════════════
function confirmarEliminarSeccion() { confirmarEliminar(seccionActiva,null); }

function confirmarEliminar(idx, event) {
  if (event) event.stopPropagation();
  guardarFormActual();
  if (secciones.length === 1) {
    limpiarSeccionActual();
    return;
  }
  secciones.splice(idx, 1);
  if (seccionActiva >= secciones.length) {
    seccionActiva = secciones.length - 1;
  } else if (idx < seccionActiva) {
    seccionActiva--;
  }
  renderSidebar();
  cargarSeccion(seccionActiva);
}

function limpiarSeccionActual() {
  const num = secciones[seccionActiva].numero;
  secciones[seccionActiva] = crearSeccion();
  secciones[seccionActiva].numero = num;
  sv('tipoGestion',''); sv('nTicket','');
  sv('realizadoPor','ANGEL LLAMACPONCCA'); sv('notasTexto','');
  sv('equipoActivado',''); sv('repetidorActivado',''); sv('modeloRepetidor','');
  sv('estado',''); sv('observaciones','');
  g('equiposAdicionales').innerHTML=''; g('customFormArea').innerHTML='';
  const modSel = g('modeloEquipo');
  if (modSel) modSel.innerHTML='<option value="">— Selecciona tecnología primero —</option>';
  const modMan = g('modeloManual'); if (modMan) { modMan.value=''; modMan.classList.add('hidden'); }
  resetTechBtns();
  aplicarVisibilidad(''); actualizarBadge('');
  show('previewEmpty'); hide('previewContent'); hide('copyFeedback');
  g('btnCopy').disabled=true; renderSidebar();
}

function actualizarNumero(val) {
  if (secciones.length === 0) return;
  secciones[seccionActiva].numero = (val || '').trim();
  renderSidebar();
}

// ════════════════════════════════
//  COPIAR PLANTILLA
// ════════════════════════════════
async function copiarPlantilla() {
  await copiarAlPortapapeles(g('plantillaTexto').textContent);
  flashFeedback('copyFeedback');
}

// ════════════════════════════════
//  CONVERTIDOR MAC
// ════════════════════════════════
function convertirMAC() {
  const inputEl = g('macInput');
  if (!inputEl) return;
  const rawVal = inputEl.value;

  // Aviso si se ingresa un carácter fuera de 0-9 y A-F
  if (/[^0-9A-Fa-f]/.test(rawVal)) {
    mostrarAvisoSerial('⚠️ Carácter inválido. Solo 0-9 y A-F');
  }

  const clean = rawVal.replace(/[^A-Fa-f0-9]/g, '').slice(0, 12).toUpperCase();
  if (inputEl.value !== clean) {
    inputEl.value = clean;
  }

  const len = clean.length;
  const counter = g('macCounter');
  const valEl = g('macValue');
  const btn = g('btnCopyMAC');

  if (counter) {
    counter.textContent = `${len} / 12`;
    counter.className = 'mac-counter' + (len === 12 ? ' ready' : len > 12 ? ' over' : '');
  }

  if (len < 12) {
    if (valEl) {
      valEl.textContent = len === 0 ? '—' : `Faltan ${12 - len} caracteres…`;
      valEl.className = 'mac-value' + (len > 0 ? ' error' : '');
    }
    if (btn) btn.disabled = true;
    return;
  }

  const mac = clean.match(/.{2}/g).join(':');
  if (valEl) {
    valEl.textContent = mac;
    valEl.className = 'mac-value valid';
  }
  if (btn) btn.disabled = false;
}

async function copiarMAC() {
  await copiarAlPortapapeles(g('macValue').textContent);
  flashFeedback('macFeedback');
}

// ════════════════════════════════
//  ACCESOS RÁPIDOS (Quick Links)
// ════════════════════════════════
async function quickCopy(btn, url) {
  await copiarAlPortapapeles(url);
  const fb = g('qlFeedback');
  if (fb) { fb.classList.remove('hidden'); setTimeout(() => fb.classList.add('hidden'), 2200); }
  const origTxt = btn.querySelector('.ql-num')?.textContent;
  btn.classList.add('ql-copied');
  setTimeout(() => btn.classList.remove('ql-copied'), 1600);
}

// ════════════════════════════════
//  MÓDULO DE SEÑAL
// ════════════════════════════════

/* Evaluador SNR (EMTA HFC) */
function evaluarEstabilidad() {
  const texto = gv('valoresSNR');
  const valores = texto.split(',')
    .map(v => parseFloat(v.trim()))
    .filter(v => !isNaN(v));

  const resultado = g('resultadoSNR');
  if (!resultado) return;

  if (valores.length === 0) {
    resultado.innerHTML = '<span style="color:var(--danger); font-weight:700;">Ingresa valores válidos separados por comas</span>';
    return;
  }

  const max = Math.max(...valores);
  const min = Math.min(...valores);
  const diferencia = max - min;
  const estable = diferencia < 4;

  if (estable) {
    resultado.innerHTML = `Diferencia: <strong>${diferencia.toFixed(2)} dB</strong> → Señal <span style="color:#15803d; font-weight:800;">ESTABLE</span>`;
  } else {
    resultado.innerHTML = `Diferencia: <strong>${diferencia.toFixed(2)} dB</strong> → Señal <span style="color:#b91c1c; font-weight:800;">INESTABLE</span>`;
  }
}

function limpiarSNR() {
  sv('valoresSNR', '');
  if (g('resultadoSNR')) g('resultadoSNR').innerHTML = '—';
}

/* Verificación de Nivel FTTH - ONT */
function verificarNivelFTTH() {
  const valStr = gv('rxValue').trim();
  const valor = parseFloat(valStr);
  const resultado = g('resultadoRX');
  const barra = g('barraRX');

  if (!resultado || !barra) return;

  if (isNaN(valor)) {
    resultado.innerHTML = '<span style="color:var(--danger); font-weight:700;">Ingresa un número válido</span>';
    barra.className = 'bar-indicator';
    return;
  }

  barra.className = 'bar-indicator';

  if (valor > -6) {
    resultado.innerHTML = `Nivel <strong>${valor} dBm</strong>: <span style="color:#b91c1c; font-weight:800;">NO ACEPTABLE</span>`;
    barra.classList.add('noaceptable');
  } else if (valor >= -8.9) {
    resultado.innerHTML = `Nivel <strong>${valor} dBm</strong>: <span style="color:#c2410c; font-weight:800;">ACEPTABLE</span>`;
    barra.classList.add('aceptable');
  } else if (valor >= -21.9) {
    resultado.innerHTML = `Nivel <strong>${valor} dBm</strong>: <span style="color:#15803d; font-weight:800;">ÓPTIMO</span>`;
    barra.classList.add('optimo');
  } else if (valor >= -24.9) {
    resultado.innerHTML = `Nivel <strong>${valor} dBm</strong>: <span style="color:#c2410c; font-weight:800;">ACEPTABLE</span>`;
    barra.classList.add('aceptable');
  } else if (valor >= -40) {
    resultado.innerHTML = `Nivel <strong>${valor} dBm</strong>: <span style="color:#b91c1c; font-weight:800;">NO ACEPTABLE</span>`;
    barra.classList.add('noaceptable');
  } else {
    resultado.innerHTML = '<span style="color:var(--text-muted);">Valor fuera de rango</span>';
  }
}

function limpiarRXFTTH() {
  sv('rxValue', '');
  if (g('resultadoRX')) g('resultadoRX').innerHTML = '—';
  if (g('barraRX')) g('barraRX').className = 'bar-indicator';
}

// ════════════════════════════════
//  HELPERS
// ════════════════════════════════
function g(id)     { return document.getElementById(id); }
function gv(id)    { const el=g(id); return el?el.value:''; }
function sv(id,v)  { const el=g(id); if(el) el.value=v||''; }
function show(id)  { g(id)?.classList.remove('hidden'); }
function hide(id)  { g(id)?.classList.add('hidden'); }

async function copiarAlPortapapeles(texto) {
  try { await navigator.clipboard.writeText(texto); }
  catch { const ta=document.createElement('textarea'); ta.value=texto; ta.style.cssText='position:fixed;opacity:0;'; document.body.appendChild(ta); ta.focus(); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
}

document.addEventListener('DOMContentLoaded', inicializar);

// ════════════════════════════════
//  BLOC DE CUENTAS & CONTRASEÑAS (8 SLOTS)
// ════════════════════════════════
function initCuentas() {
  const container = g('cuentasList');
  if (!container) return;
  const saved = JSON.parse(localStorage.getItem('hitss_cuentas') || '[]');
  container.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const data = saved[i] || { title: '', user: '', pass: '' };
    const div = document.createElement('div');
    div.className = 'cuenta-slot';
    div.innerHTML = `
      <div class="cs-num">#${i + 1}</div>
      <input type="text" class="cs-input cs-title" value="${data.title || ''}" placeholder="Título" data-idx="${i}" oninput="guardarCuentas()" />
      <input type="text" class="cs-input cs-user" value="${data.user || ''}" placeholder="Usuario" data-idx="${i}" oninput="guardarCuentas()" />
      <input type="password" class="cs-input cs-pass" value="${data.pass || ''}" placeholder="Contraseña" data-idx="${i}" oninput="guardarCuentas()" />
      <button type="button" class="cs-eye" onclick="togglePassVisibility(this)">👁</button>`;
    container.appendChild(div);
  }
}

function togglePassVisibility(btn) {
  const inp = btn.previousElementSibling;
  if (!inp) return;
  if (inp.type === 'password') {
    inp.type = 'text';
    btn.classList.add('active');
  } else {
    inp.type = 'password';
    btn.classList.remove('active');
  }
}

function guardarCuentas() {
  const slots = [];
  document.querySelectorAll('#cuentasList .cuenta-slot').forEach(slot => {
    const title = slot.querySelector('.cs-title')?.value || '';
    const user  = slot.querySelector('.cs-user')?.value || '';
    const pass  = slot.querySelector('.cs-pass')?.value || '';
    slots.push({ title, user, pass });
  });
  localStorage.setItem('hitss_cuentas', JSON.stringify(slots));
}

function toggleCuentasPanel() {
  const el = g('cuentasDropdown');
  if (el) el.classList.toggle('hidden');
}

// ════════════════════════════════
//  GENERADOR DE CÓDIGOS DE AUTORIZACIÓN (A/B)
// ════════════════════════════════
let generatedCodesList = [];
let codeCounter = 0;

function initCodeGenerator() {
  const savedE = localStorage.getItem('hitss_euser') || '';
  const inputE = g('codeEUser');
  if (inputE && savedE) inputE.value = savedE;
}

function guardarCodeEUser() {
  const val = gv('codeEUser').trim().toUpperCase();
  localStorage.setItem('hitss_euser', val);
}

function dateNowFormatted() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}${month}${year}`;
}

function generarCodigoAB() {
  const euser = gv('codeEUser').trim().toUpperCase();
  if (!euser || euser.length < 3) {
    showCodeFeedback('⚠️ Ingresa una Cuenta E válida (ej. E758975)', true);
    g('codeEUser')?.focus();
    return;
  }
  codeCounter++;
  const suffix = (codeCounter % 2 !== 0) ? 'A' : 'B';
  const newCode = `${codeCounter}${euser}${dateNowFormatted()}${suffix}`;
  generatedCodesList.push(newCode);

  g('codeOutput').value = generatedCodesList.join('\n');
  showCodeFeedback(`⚡ Código #${codeCounter} generado (${suffix})`);

  // Auto-copiar al portapapeles
  navigator.clipboard.writeText(newCode).catch(() => {});

  // Si la gestión activa es Código Autorización o Cambio de Equipo (NO en SOT DE MANTO), rellenar el campo de código
  const s = secciones[seccionActiva];
  if (s && (s.tipoGestion === 'codigo_autorizacion' || s.tipoGestion === 'cambio_equipo')) {
    const codInput = g('cesp_se_autoriza_cod') || g('cesp_cod_aut');
    if (codInput) {
      codInput.value = newCode;
      guardarCamposCustom(s);
    }
  }
}

function eliminarUltimoCodigo() {
  if (generatedCodesList.length === 0) {
    showCodeFeedback('No hay códigos para eliminar', true);
    return;
  }
  generatedCodesList.pop();
  codeCounter = generatedCodesList.length;
  g('codeOutput').value = generatedCodesList.join('\n');
  showCodeFeedback('Código eliminado');
}

function copiarCodigosGenerados() {
  const txt = gv('codeOutput');
  if (!txt) {
    showCodeFeedback('No hay códigos generados', true);
    return;
  }
  navigator.clipboard.writeText(txt).then(() => {
    showCodeFeedback('📋 Códigos copiados');
  }).catch(() => {});
}

function descargarCodigosTXT() {
  if (generatedCodesList.length === 0) {
    showCodeFeedback('No hay códigos para descargar', true);
    return;
  }
  const euser = gv('codeEUser').trim().toUpperCase() || 'EUSER';
  const blob = new Blob([generatedCodesList.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `codigos_${euser}_${dateNowFormatted()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showCodeFeedback('📥 Descargando TXT...');
}

function showCodeFeedback(msg, isErr = false) {
  const fb = g('codeFeedback');
  if (!fb) return;
  fb.textContent = msg;
  fb.style.color = isErr ? 'var(--danger)' : '#22c55e';
  fb.classList.remove('hidden');
  clearTimeout(window.codeFbTimer);
  window.codeFbTimer = setTimeout(() => fb.classList.add('hidden'), 2500);
}

// ════════════════════════════════
//  LIMPIEZA AUTOMÁTICA DE SERIALES & DETECCIÓN DE REPETIDOR
// ════════════════════════════════
function autoLimpiarYDetectarSerial(el, isRepeater = false, targetModelSelectId = null) {
  let val = el.value;
  if (!val) return;

  // 1. Eliminar todos los espacios
  let sinEspacios = val.replace(/\s+/g, '');

  // 2. Reemplazar 'O' / 'o' por '0'
  let corregido = sinEspacios.replace(/[oO]/g, '0');

  // Si hubo cambio, actualizar input y mostrar aviso toast
  if (val !== corregido) {
    el.value = corregido;
    mostrarAvisoSerial('✨ Serie corregida (Sin espacios / O → 0)');
  }

  // 3. Autodetectar modelo de repetidor (ZTE vs HUAWEI)
  if (isRepeater) {
    let sel = targetModelSelectId ? g(targetModelSelectId) : null;
    if (!sel && el.closest) {
      const block = el.closest('.eq-block-adicional');
      if (block && block.dataset.tipo === 'repetidor') {
        sel = block.querySelector('.input-mod');
      }
    }

    if (sel) {
      const lower = corregido.toLowerCase();
      if (lower.startsWith('zte')) {
        sel.value = 'REPETIDOR ZXHN H3601P 180000528400 ZTE';
        if (typeof onModeloRepetidorChange === 'function') onModeloRepetidorChange();
        if (typeof onAdicionalModeloChange === 'function') onAdicionalModeloChange(sel);
      } else if (/^\d+$/.test(corregido) && corregido.length > 0) {
        sel.value = 'ROUTER K562E-10 50087708 HUAWEI';
        if (typeof onModeloRepetidorChange === 'function') onModeloRepetidorChange();
        if (typeof onAdicionalModeloChange === 'function') onAdicionalModeloChange(sel);
      }
    }
  }
}

function mostrarAvisoSerial(msg) {
  let toast = g('serialToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'serialToast';
    toast.style.cssText = `
      position: fixed; bottom: 20px; right: 20px; z-index: 1000;
      background: #7e22ce; color: #ffffff; padding: 0.45rem 0.85rem;
      border-radius: 8px; font-size: 0.75rem; font-weight: 800;
      box-shadow: 0 4px 14px rgba(126, 34, 206, 0.4);
      animation: fadeUp 0.2s ease; transition: opacity 0.3s;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.classList.remove('hidden');
  clearTimeout(window.serialToastTimer);
  window.serialToastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 2000);
}

function isEquipmentInput(el) {
  if (!el || el.tagName !== 'INPUT' || el.type !== 'text') return false;

  const id = el.id || '';
  const cls = el.className || '';

  // Excluir explícitamente nombres de personas, correos, notas y campos que no son equipos
  if (['profNombre', 'profUserE', 'realizadoPor', 'codeEUser', 'seccionNumero', 'search', 'notasTexto', 'observaciones'].includes(id)) {
    return false;
  }
  if (id.includes('tecnico') || id.includes('nombres') || id.includes('direccion') || id.includes('contacto') || id.includes('correo') || id.includes('plano') || id.includes('coord')) {
    return false;
  }

  // Verificar si es un campo de equipo (equipo activado, reenvío de señal, repetidor activado, equipo a retirar, equipo por activar, etc.)
  if (
    id === 'equipoActivado' ||
    id === 'repetidorActivado' ||
    id === 'cesp_equipo_retirar' ||
    id === 'cesp_equipo_activar' ||
    id === 'cesp_serie_ont' ||
    id === 'cesp_mac_cm' ||
    id === 'cesp_mac' ||
    id === 'cesp_sn' ||
    id === 'cesp_serie_repetidor' ||
    cls.includes('input-eq') ||
    cls.includes('mac-input') ||
    (el.closest && (el.closest('#bloqueEquipoPrincipal') || el.closest('#bloqueRepetidor') || el.closest('#equiposAdicionales') || el.closest('.eq-block-adicional')))
  ) {
    return true;
  }

  return false;
}

// Listener global para capturar entrada o pegado ÚNICAMENTE en inputs de equipos/seriales
document.addEventListener('input', function (e) {
  const el = e.target;
  if (!isEquipmentInput(el)) return;

  const isRepeater = (
    el.id === 'repetidorActivado' ||
    el.id === 'cesp_serie_repetidor' ||
    (el.closest && el.closest('.eq-block-adicional')?.dataset.tipo === 'repetidor')
  );

  let modelSelId = null;
  if (el.id === 'repetidorActivado') modelSelId = 'modeloRepetidor';

  autoLimpiarYDetectarSerial(el, isRepeater, modelSelId);
});

// ════════════════════════════════
//  SMART BLOC DE NOTAS (Pegado limpio por líneas y copia sin espacios)
// ════════════════════════════════
function setupNotesSmartPaste() {
  const ta = g('notasTexto');
  if (!ta) return;

  // Pegado Inteligente: Separa por líneas, elimina espacios bordes y salta de línea automáticamente
  ta.addEventListener('paste', function (e) {
    e.preventDefault();
    const rawPasted = (e.clipboardData || window.clipboardData).getData('text');
    if (!rawPasted) return;

    // Procesar líneas: recortar espacios iniciales/finales de cada línea
    const cleanedLines = rawPasted
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (cleanedLines.length === 0) return;

    const formattedText = cleanedLines.join('\n');

    // Insertar en la posición actual del cursor
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const currentVal = ta.value;

    let prefix = currentVal.substring(0, start);
    let suffix = currentVal.substring(end);

    // Si hay texto antes y no termina en salto de línea, agregar salto
    if (prefix.length > 0 && !prefix.endsWith('\n')) {
      prefix += '\n';
    }

    // Unir texto con salto final para el siguiente pegado
    ta.value = prefix + formattedText + '\n' + suffix;

    // Colocar cursor al final del texto pegado
    const newCursorPos = (prefix + formattedText + '\n').length;
    ta.selectionStart = ta.selectionEnd = newCursorPos;

    // Guardar en la sección activa
    if (secciones.length > 0) {
      secciones[seccionActiva].notas = ta.value;
    }

    mostrarAvisoSerial('📋 Pegado en Bloc de Notas (1 por línea, sin espacios)');
  });

  // Copiado Limpio (Ctrl+C): Elimina automáticamente cualquier espacio alrededor del texto seleccionado
  ta.addEventListener('copy', function (e) {
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selectedText = ta.value.substring(start, end);
    if (selectedText) {
      e.preventDefault();
      const cleaned = selectedText.trim();
      if (e.clipboardData || window.clipboardData) {
        (e.clipboardData || window.clipboardData).setData('text/plain', cleaned);
      } else {
        navigator.clipboard.writeText(cleaned).catch(() => {});
      }
      mostrarAvisoSerial('📋 Copiado limpio del Bloc de Notas (Sin espacios)');
    }
  });

  // Doble clic rápido: Selecciona y copia automáticamente el número/texto limpio
  ta.addEventListener('dblclick', function () {
    setTimeout(() => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selectedText = ta.value.substring(start, end).trim();
      if (selectedText) {
        navigator.clipboard.writeText(selectedText).then(() => {
          mostrarAvisoSerial(`📋 Copiado limpio: "${selectedText}"`);
        }).catch(() => {});
      }
    }, 10);
  });
}

