import { useNavigate } from "react-router-dom";
import { Zap, TrendingUp, AlertTriangle, XCircle, CheckCircle } from "lucide-react";
import { plants } from "../data/mock";

const statusConfig: Record<string, { label: string; color: string; icon: any; bg: string }> = {
  normal:  { label: "Normal",  color: "text-emerald-600", icon: CheckCircle,    bg: "bg-emerald-50 border-emerald-200" },
  warning: { label: "Alerta",  color: "text-yellow-600",  icon: AlertTriangle,  bg: "bg-yellow-50 border-yellow-200"  },
  fault:   { label: "Falla",   color: "text-red-600",     icon: XCircle,        bg: "bg-red-50 border-red-200"        },
};

export default function Plants() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Plantas</h1>
        <p className="text-silver text-sm mt-0.5">{plants.length} unidades registradas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
        {plants.map(p => {
          const cfg = statusConfig[p.status];
          const Icon = cfg.icon;
          const loadPct = p.kwp > 0 ? Math.round((p.kw / p.kwp) * 100) : 0;

          return (
            <div
              key={p.id}
              onClick={() => navigate(`/plants/${p.id}`)}
              className="bg-white rounded-2xl border border-silver/20 p-5 shadow-sm hover:shadow-md hover:border-orange-brand/30 transition cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-silver-lightest rounded-xl flex items-center justify-center group-hover:bg-orange-brand/10 transition">
                    <Zap size={20} className="text-navy group-hover:text-orange-brand transition" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{p.name}</p>
                    <p className="text-xs text-silver">{p.kwp} kWp instalados</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                  <Icon size={12} />
                  {cfg.label}
                </div>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center bg-silver-lightest rounded-xl py-2 px-1">
                  <p className="text-lg font-bold text-navy">{p.kw}</p>
                  <p className="text-[10px] text-silver uppercase font-semibold">kW actual</p>
                </div>
                <div className="text-center bg-silver-lightest rounded-xl py-2 px-1">
                  <p className="text-lg font-bold text-navy">{p.today}</p>
                  <p className="text-[10px] text-silver uppercase font-semibold">kWh hoy</p>
                </div>
                <div className="text-center bg-silver-lightest rounded-xl py-2 px-1">
                  <p className="text-lg font-bold text-navy">{(p.total / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-silver uppercase font-semibold">kWh total</p>
                </div>
              </div>

              {/* Barra de carga */}
              <div>
                <div className="flex justify-between text-xs text-silver mb-1">
                  <span>Carga actual</span>
                  <span className="font-semibold text-navy">{loadPct}%</span>
                </div>
                <div className="w-full bg-silver-lightest rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      loadPct > 80 ? "bg-emerald-500" : loadPct > 40 ? "bg-orange-brand" : "bg-silver"
                    }`}
                    style={{ width: `${loadPct}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1 text-xs text-silver group-hover:text-orange-brand transition">
                <TrendingUp size={12} />
                <span>Ver detalle completo →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
