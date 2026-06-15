import { alarms } from "../data/mock";

const severityConfig: Record<string, { label: string; dot: string; row: string; badge: string }> = {
  critical: { label: "Crítica",  dot: "bg-red-500",      row: "border-l-red-500 bg-red-50",      badge: "bg-red-100 text-red-700"      },
  major:    { label: "Mayor",    dot: "bg-orange-brand", row: "border-l-orange-brand bg-orange-50", badge: "bg-orange-100 text-orange-700" },
  minor:    { label: "Menor",    dot: "bg-yellow-400",   row: "border-l-yellow-400 bg-yellow-50", badge: "bg-yellow-100 text-yellow-700" },
  warning:  { label: "Aviso",    dot: "bg-blue-400",     row: "border-l-blue-400 bg-blue-50",     badge: "bg-blue-100 text-blue-700"    },
};

const counts = {
  critical: alarms.filter(a => a.severity === "critical").length,
  major:    alarms.filter(a => a.severity === "major").length,
  minor:    alarms.filter(a => a.severity === "minor").length,
  warning:  alarms.filter(a => a.severity === "warning").length,
};

export default function Alarms() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Alarmas</h1>
        <p className="text-silver text-sm">{alarms.length} alarmas activas hoy</p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["critical","major","minor","warning"] as const).map(s => {
          const cfg = severityConfig[s];
          return (
            <div key={s} className="bg-white rounded-2xl border border-silver/20 p-4 shadow-sm flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full flex-shrink-0 ${cfg.dot}`} />
              <div>
                <p className="text-2xl font-bold text-navy">{counts[s]}</p>
                <p className="text-xs text-silver">{cfg.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lista */}
      <div className="bg-white rounded-2xl border border-silver/20 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-silver/10">
          <p className="font-semibold text-navy">Listado de Alarmas</p>
        </div>
        <div className="divide-y divide-silver/10">
          {alarms.map(a => {
            const cfg = severityConfig[a.severity];
            return (
              <div key={a.id} className={`flex items-start gap-4 px-5 py-4 border-l-4 ${cfg.row}`}>
                <span className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${cfg.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy">{a.msg}</p>
                  <p className="text-xs text-silver mt-0.5">{a.plant}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                    {cfg.label.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-silver">{a.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
