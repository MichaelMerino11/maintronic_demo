import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { TrendingUp, TrendingDown, Sun, Wind, Droplets, Thermometer } from "lucide-react";
import { kpis, dailyCurve, monthlyCurve, yearlyCurve, plants, alarms } from "../data/mock";

type Range = "day" | "month" | "year";

const statusColors: Record<string, string> = {
  normal:  "bg-emerald-500",
  warning: "bg-yellow-400",
  fault:   "bg-red-500",
};
const statusLabels: Record<string, string> = {
  normal:  "Normal",
  warning: "Alerta",
  fault:   "Falla",
};
const alarmColors: Record<string, string> = {
  critical: "border-l-red-500 bg-red-50",
  major:    "border-l-orange-brand bg-orange-50",
  minor:    "border-l-yellow-400 bg-yellow-50",
  warning:  "border-l-blue-400 bg-blue-50",
};
const alarmDot: Record<string, string> = {
  critical: "bg-red-500",
  major:    "bg-orange-brand",
  minor:    "bg-yellow-400",
  warning:  "bg-blue-400",
};

const chartData: Record<Range, any[]> = {
  day:   dailyCurve.map(d => ({ label: d.hora, real: d.real, plan: d.plan })),
  month: monthlyCurve.map(d => ({ label: `D${d.dia}`, real: d.real, plan: d.plan })),
  year:  yearlyCurve.map(d => ({ label: d.mes, real: d.real, plan: d.plan })),
};
const chartUnit: Record<Range, string> = { day: "W", month: "kWh", year: "kWh" };

export default function Dashboard() {
  const [range, setRange] = useState<Range>("day");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy">Dashboard General</h1>
        <p className="text-silver text-sm mt-0.5">Nova Energía S.A. · Vista consolidada</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl border border-silver/20 p-4 shadow-sm">
            <p className="text-xs text-silver uppercase font-semibold tracking-wider truncate">{k.label}</p>
            <p className="text-xl font-bold text-navy mt-1">{k.value}
              <span className="text-xs font-normal text-silver ml-1">{k.unit}</span>
            </p>
            <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${k.up ? "text-emerald-500" : "text-red-400"}`}>
              {k.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {k.delta} vs ayer
            </p>
          </div>
        ))}
      </div>

      {/* Clima + Plantas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Clima */}
        <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-5 text-white border border-silver/10">
          <p className="text-xs text-silver uppercase font-semibold tracking-wider mb-4">Clima en Sitio</p>
          <div className="flex items-center gap-4 mb-4">
            <Sun size={40} className="text-orange-brand" />
            <div>
              <p className="text-4xl font-bold">24°C</p>
              <p className="text-silver text-sm">Parcialmente nublado</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-silver">
            <div className="flex items-center gap-1"><Wind size={12}/> 12 km/h</div>
            <div className="flex items-center gap-1"><Droplets size={12}/> 65%</div>
            <div className="flex items-center gap-1"><Thermometer size={12}/> 780 W/m²</div>
          </div>
        </div>

        {/* Plantas */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-silver/20 p-5 shadow-sm">
          <p className="text-xs text-silver uppercase font-semibold tracking-wider mb-4">Estado de Plantas</p>
          <div className="space-y-3">
            {plants.map(p => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-silver/10 last:border-0">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${statusColors[p.status]}`} />
                  <span className="text-sm font-medium text-navy truncate max-w-[180px]">{p.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-silver">
                  <span className="font-mono">{p.kw} kW</span>
                  <span className="font-mono">{p.today} kWh hoy</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${statusColors[p.status]}`}>
                    {statusLabels[p.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gráfica de producción */}
      <div className="bg-white rounded-2xl border border-silver/20 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-semibold text-navy">Producción vs Planificación</p>
            <p className="text-xs text-silver">Energía generada ({chartUnit[range]})</p>
          </div>
          <div className="flex gap-1 bg-silver-lightest rounded-xl p-1">
            {(["day","month","year"] as Range[]).map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  range === r ? "bg-navy text-white shadow" : "text-silver hover:text-navy"
                }`}
              >
                {r === "day" ? "Día" : r === "month" ? "Mes" : "Año"}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData[range]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradReal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F47920" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F47920" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradPlan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1A2744" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#1A2744" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF2" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#8E9BB0" }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
            <YAxis tick={{ fontSize: 10, fill: "#8E9BB0" }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "#1A2744", border: "none", borderRadius: 12, color: "#fff", fontSize: 12 }}
              cursor={{ stroke: "#F47920", strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: "#8E9BB0" }} />
            <Area type="monotone" dataKey="real" name="Real" stroke="#F47920" strokeWidth={2} fill="url(#gradReal)" dot={false} />
            <Area type="monotone" dataKey="plan" name="Planificado" stroke="#1A2744" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#gradPlan)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Alarmas recientes */}
      <div className="bg-white rounded-2xl border border-silver/20 p-5 shadow-sm">
        <p className="font-semibold text-navy mb-4">Alarmas Recientes</p>
        <div className="space-y-2">
          {alarms.map(a => (
            <div key={a.id} className={`flex items-start gap-3 border-l-4 rounded-r-xl px-4 py-3 ${alarmColors[a.severity]}`}>
              <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${alarmDot[a.severity]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy">{a.msg}</p>
                <p className="text-xs text-silver mt-0.5">{a.plant}</p>
              </div>
              <span className="text-xs font-mono text-silver flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
