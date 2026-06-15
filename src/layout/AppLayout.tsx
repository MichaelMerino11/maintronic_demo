import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Factory, Bell, BarChart2,
  Settings, LogOut, Zap, Menu, X
} from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/dashboard",       icon: LayoutDashboard, label: "Dashboard"  },
  { to: "/plants",          icon: Factory,         label: "Plantas"    },
  { to: "/alarms",          icon: Bell,            label: "Alarmas"    },
  { to: "/reports",         icon: BarChart2,       label: "Reportes"   },
  { to: "/settings",        icon: Settings,        label: "Ajustes"    },
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-silver-lightest overflow-hidden">
      {/* Sidebar desktop */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-60 bg-navy flex flex-col
        transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-silver/10">
          <div className="w-9 h-9 bg-orange-brand rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm tracking-widest">MAINTRONIC</p>
            <p className="text-silver/50 text-[10px]">Demo · Nova Energía</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-orange-brand text-white shadow shadow-orange-brand/30"
                    : "text-silver hover:text-white hover:bg-navy-light"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-silver/10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-silver hover:text-white hover:bg-navy-light transition w-full"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-silver/20 shadow-sm flex-shrink-0">
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-navy"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="hidden lg:block">
            <p className="text-navy font-semibold text-sm">Sistema de Monitoreo</p>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs text-silver bg-silver-lightest px-3 py-1 rounded-full font-mono">
              DEMO
            </span>
            <div className="w-8 h-8 bg-orange-brand rounded-full flex items-center justify-center text-white text-xs font-bold">
              M
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 animate-slidein">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
