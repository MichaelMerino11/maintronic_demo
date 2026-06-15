import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { yearlyCurve, monthlyCurve } from "../data/mock";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Reportes</h1>
        <p className="text-silver text-sm">Análisis histórico de producción</p>
      </div>

      {/* Anual */}
      <div className="bg-white rounded-2xl border border-silver/20 p-5 shadow-sm">
        <p className="font-semibold text-navy mb-1">Producción Anual 2025</p>
        <p className="text-xs text-silver mb-4">Real vs Planificado por mes (kWh)</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={yearlyCurve} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF2" />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#8E9BB0" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#8E9BB0" }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#1A2744", border: "none", borderRadius: 12, color: "#fff", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="real" name="Real" fill="#F47920" radius={[4,4,0,0]} />
            <Bar dataKey="plan" name="Planificado" fill="#C8D0DC" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Mensual */}
      <div className="bg-white rounded-2xl border border-silver/20 p-5 shadow-sm">
        <p className="font-semibold text-navy mb-1">Producción Mes Actual</p>
        <p className="text-xs text-silver mb-4">Real vs Planificado por día (kWh)</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthlyCurve} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF2" />
            <XAxis dataKey="dia" tick={{ fontSize: 9, fill: "#8E9BB0" }} tickLine={false} axisLine={false} interval={4} />
            <YAxis tick={{ fontSize: 10, fill: "#8E9BB0" }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#1A2744", border: "none", borderRadius: 12, color: "#fff", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="real" name="Real" fill="#F47920" radius={[3,3,0,0]} />
            <Bar dataKey="plan" name="Planificado" fill="#C8D0DC" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla resumen */}
      <div className="bg-white rounded-2xl border border-silver/20 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-silver/10">
          <p className="font-semibold text-navy">Resumen por Mes</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-silver-lightest text-xs text-silver uppercase font-semibold tracking-wider">
                <th className="px-5 py-3 text-left">Mes</th>
                <th className="px-5 py-3 text-right">Real (kWh)</th>
                <th className="px-5 py-3 text-right">Plan (kWh)</th>
                <th className="px-5 py-3 text-right">Rendimiento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-silver/10">
              {yearlyCurve.map(row => {
                const pct = Math.round((row.real / row.plan) * 100);
                return (
                  <tr key={row.mes} className="hover:bg-silver-lightest transition">
                    <td className="px-5 py-3 font-medium text-navy">{row.mes}</td>
                    <td className="px-5 py-3 text-right font-mono text-navy">{row.real.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right font-mono text-silver">{row.plan.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`font-semibold ${pct >= 100 ? "text-emerald-600" : pct >= 90 ? "text-orange-brand" : "text-red-500"}`}>
                        {pct}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
