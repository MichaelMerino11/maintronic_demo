import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Thermometer, Activity, Sun } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";
import { plants, dailyCurve, plantDetail } from "../data/mock";

export default function PlantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plant = plants.find(p => p.id === id) || plants[0];
  const { realtime, weather } = plantDetail;

  const metrics = [
    { label: "Potencia Activa",  value: `${(realtime.activePower / 1000).toFixed(2)} kW`, icon: Zap,         color: "text-orange-brand" },
    { label: "Tensión DC",       value: `${realtime.dcVoltage} V`,                         icon: Activity,    color: "text-blue-500"     },
    { label: "Tensión AC",       value: `${realtime.acVoltage} V`,                         icon: Activity,    color: "text-emerald-500"  },
    { label: "Temperatura",      value: `${realtime.temperature}°C`,                       icon: Thermometer, color: "text-red-400"      },
    { label: "Irradiancia",      value: `${weather.irradiance} W/m²`,                      icon: Sun,         color: "text-yellow-500"   },
    { label: "Eficiencia",       value: `${realtime.efficiency}%`,                         icon: Activity,    color: "text-purple-500"   },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/plants")}
          className="w-9 h-9 rounded-xl bg-white border border-silver/20 flex items-center justify-center text-silver hover:text-navy hover:border-navy transition"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-navy">{plant.name}</h1>
          <p className="text-silver text-sm">{plant.kwp} kWp · Actualizado hace 2 min</p>
        </div>
      </div>

      {/* Métricas en tiempo real */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {metrics.map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-white rounded-2xl border border-silver/20 p-4 shadow-sm text-center">
              <Icon size={20} className={`mx-auto mb-2 ${m.color}`} />
              <p className="text-lg font-bold text-navy">{m.value}</p>
              <p className="text-[10px] text-silver uppercase font-semibold mt-0.5">{m.label}</p>
            </div>
          );
        })}
      </div>

      {/* Gráfica diaria */}
      <div className="bg-white rounded-2xl border border-silver/20 p-5 shadow-sm">
        <p className="font-semibold text-navy mb-1">Curva de Producción — Hoy</p>
        <p className="text-xs text-silver mb-4">Potencia generada vs planificada (W)</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={dailyCurve} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#F47920" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F47920" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF2" />
            <XAxis dataKey="hora" tick={{ fontSize: 10, fill: "#8E9BB0" }} tickLine={false} axisLine={false} interval={3} />
            <YAxis tick={{ fontSize: 10, fill: "#8E9BB0" }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#1A2744", border: "none", borderRadius: 12, color: "#fff", fontSize: 12 }} cursor={{ stroke: "#F47920", strokeDasharray: "4 4" }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="real" name="Real (W)" stroke="#F47920" strokeWidth={2} fill="url(#g1)" dot={false} />
            <Area type="monotone" dataKey="plan" name="Plan (W)" stroke="#1A2744" strokeWidth={1.5} strokeDasharray="4 4" fill="none" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Datos técnicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-silver/20 p-5 shadow-sm">
          <p className="font-semibold text-navy mb-4">Ficha Técnica</p>
          <div className="space-y-3 text-sm">
            {[
              ["Capacidad instalada", `${plant.kwp} kWp`],
              ["Producción hoy",      `${plant.today} kWh`],
              ["Producción total",    `${(plant.total/1000).toFixed(1)} MWh`],
              ["Frecuencia red",      `${realtime.frequency} Hz`],
              ["Eficiencia actual",   `${realtime.efficiency}%`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-silver/10 pb-2 last:border-0">
                <span className="text-silver">{k}</span>
                <span className="font-semibold text-navy">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-5 text-white">
          <p className="text-xs text-silver uppercase font-semibold tracking-wider mb-4">Impacto Ambiental</p>
          <div className="space-y-4">
            {[
              { label: "CO₂ Evitado",        value: "148.6 ton",  emoji: "🌿" },
              { label: "Carbón Ahorrado",     value: "52.3 ton",   emoji: "⚫" },
              { label: "Árboles Equivalentes",value: "1,240",      emoji: "🌳" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between border-b border-silver/10 pb-3 last:border-0">
                <div className="flex items-center gap-2">
                  <span>{item.emoji}</span>
                  <span className="text-sm text-silver-light">{item.label}</span>
                </div>
                <span className="font-bold text-orange-brand">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
