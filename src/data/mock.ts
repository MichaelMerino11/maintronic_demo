// ============================================================
//  MAINTRONIC DEMO — datos 100% simulados
//  Cambiar estos valores para personalizar la demo
// ============================================================

export const DEMO_PROCESS = {
  name: "Nova Energía S.A.",
  industry: "Generación Solar",
  unit: "kWh",
  unitLabel: "Energía",
};

// KPIs principales del dashboard
export const kpis = [
  { label: "Producción Hoy",   value: "1,284",  unit: "kWh",  delta: "+8.2%",  up: true  },
  { label: "Ingreso del Día",  value: "$115.56", unit: "USD",  delta: "+5.1%",  up: true  },
  { label: "Rendimiento Mes",  value: "28,410",  unit: "kWh",  delta: "-2.3%",  up: false },
  { label: "Rendimiento Año",  value: "312,780", unit: "kWh",  delta: "+11.4%", up: true  },
  { label: "CO₂ Evitado",      value: "148.6",   unit: "ton",  delta: "+11.4%", up: true  },
  { label: "Disponibilidad",   value: "98.3",    unit: "%",    delta: "+0.4%",  up: true  },
];

// Curva de producción diaria (24h)
export const dailyCurve = Array.from({ length: 24 }, (_, i) => ({
  hora: `${String(i).padStart(2, "0")}:00`,
  real: Number((Math.max(0, Math.sin(((i - 6) / 14) * Math.PI)) * 420 + (i > 6 && i < 20 ? Math.random() * 30 : 0)).toFixed(1)),
  plan: Number((Math.max(0, Math.sin(((i - 6) / 14) * Math.PI)) * 400).toFixed(1)),
}));

// Producción mensual (31 días)
export const monthlyCurve = Array.from({ length: 30 }, (_, i) => ({
  dia: `${i + 1}`,
  real: Number((800 + Math.random() * 600).toFixed(0)),
  plan: 950,
}));

// Producción anual (12 meses)
export const yearlyCurve = [
  { mes: "Ene", real: 22400, plan: 21000 },
  { mes: "Feb", real: 24100, plan: 22500 },
  { mes: "Mar", real: 27800, plan: 26000 },
  { mes: "Abr", real: 29200, plan: 28000 },
  { mes: "May", real: 31500, plan: 30000 },
  { mes: "Jun", real: 28900, plan: 30000 },
  { mes: "Jul", real: 26400, plan: 28000 },
  { mes: "Ago", real: 27100, plan: 27000 },
  { mes: "Sep", real: 28600, plan: 28000 },
  { mes: "Oct", real: 30200, plan: 29000 },
  { mes: "Nov", real: 29800, plan: 29500 },
  { mes: "Dic", real: 28410, plan: 30000 },
];

// Plantas / procesos
export const plants = [
  { id: "1", name: "BA – Ag. La Alborada",   status: "normal",  kwp: 350, kw: 3.2,  today: 124.3, total: 182000 },
  { id: "2", name: "BA – Ag. El Vergel",     status: "warning", kwp: 280, kw: 2.9,  today: 98.7,  total: 150000 },
  { id: "3", name: "BA – Ag. Gran Colombia", status: "fault",   kwp: 310, kw: 0,    today: 0,     total: 132000 },
  { id: "4", name: "BA – Ag. La Kennedy",    status: "normal",  kwp: 220, kw: 1.8,  today: 76.4,  total: 98000  },
];

// Alarmas recientes
export const alarms = [
  { id: 1, severity: "critical", plant: "BA – Ag. Gran Colombia", msg: "Inversor principal sin comunicación",        time: "08:14" },
  { id: 2, severity: "major",    plant: "BA – Ag. El Vergel",     msg: "Rendimiento por debajo del 80% planificado", time: "09:32" },
  { id: 3, severity: "minor",    plant: "BA – Ag. La Alborada",   msg: "Temperatura de inversor elevada (78°C)",     time: "10:05" },
  { id: 4, severity: "warning",  plant: "BA – Ag. La Kennedy",    msg: "Irradiancia baja por nubosidad parcial",     time: "11:20" },
];

// Detalle de planta individual (para PlantDetail)
export const plantDetail = {
  realtime: {
    activePower: 3200,
    dcVoltage: 620,
    acVoltage: 220,
    frequency: 60.0,
    temperature: 72,
    efficiency: 96.4,
  },
  weather: {
    temp: 24,
    humidity: 65,
    wind: 12,
    irradiance: 780,
    label: "Parcialmente nublado",
  },
};
