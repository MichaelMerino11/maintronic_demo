import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap } from "lucide-react";

export default function Login() {
  const [show, setShow]       = useState(false);
  const [user, setUser]       = useState("");
  const [pass, setPass]       = useState("");
  const [error, setError]     = useState("");
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (user === "demo" && pass === "maintronic") {
      setLeaving(true);
      // Espera que la animación termine (400ms) y luego navega
      setTimeout(() => navigate("/dashboard"), 420);
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  }

  return (
    <>
      {/* Estilos de la animación slide-out */}
      <style>{`
        @keyframes slideOutLeft {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(-100%); opacity: 0; }
        }
        .slide-out {
          animation: slideOutLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div className={`min-h-screen flex ${leaving ? "slide-out" : ""}`}>

        {/* Panel izquierdo — branding navy */}
        <div className="hidden lg:flex lg:w-1/2 bg-navy flex-col justify-between p-12 relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-brand/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-orange-brand/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize: "36px 36px"
          }} />

          {/* Logo top */}
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-brand rounded-xl flex items-center justify-center shadow-lg shadow-orange-brand/30">
              <Zap size={20} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-widest">MAINTRONIC</span>
          </div>

          {/* Tagline centro */}
          <div className="relative">
            <p className="text-silver/40 text-xs uppercase tracking-widest font-semibold mb-3">
              Sistema de Monitoreo Industrial
            </p>
            <h2 className="text-white text-4xl font-bold leading-tight">
              Datos que <br />
              <span className="text-orange-brand">impulsan</span> <br />
              decisiones.
            </h2>
            <p className="text-silver mt-4 text-sm leading-relaxed max-w-xs">
              Monitoreo en tiempo real, análisis de rendimiento y gestión de alarmas para cualquier proceso industrial.
            </p>
          </div>

          {/* Footer */}
          <p className="relative text-silver/30 text-xs">
            © 2025 Maintronic · Demo
          </p>
        </div>

        {/* Panel derecho — formulario blanco */}
        <div className="flex-1 bg-white flex items-center justify-center p-8">
          <div className="w-full max-w-sm">

            {/* Logo mobile (solo visible en pantallas pequeñas) */}
            <div className="flex lg:hidden items-center gap-3 mb-10">
              <div className="w-9 h-9 bg-orange-brand rounded-xl flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-navy font-bold tracking-widest">MAINTRONIC</span>
            </div>

            {/* Logo grande desktop */}
            <div className="hidden lg:block mb-10">
              {/* Placeholder para logo_maintronic.png — reemplaza el bloque de abajo */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-orange-brand rounded-2xl flex items-center justify-center shadow shadow-orange-brand/20">
                  <Zap size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-navy font-bold text-xl tracking-widest leading-none">MAINTRONIC</p>
                  <p className="text-silver text-xs mt-0.5">Nova Energía S.A.</p>
                </div>
              </div>
              {/*
                Para usar tu logo real, reemplaza el bloque anterior por:
                <img src="/logo_maintronic.png" alt="Maintronic" className="h-14 object-contain" />
              */}
            </div>

            <h1 className="text-2xl font-bold text-navy mb-1">Bienvenido</h1>
            <p className="text-silver text-sm mb-8">Ingresa tus credenciales para continuar</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-navy text-xs font-semibold uppercase tracking-wider mb-2">
                  Usuario
                </label>
                <input
                  type="text"
                  value={user}
                  onChange={e => { setUser(e.target.value); setError(""); }}
                  placeholder="demo"
                  className="w-full bg-silver-lightest border border-silver/30 text-navy placeholder-silver/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-brand focus:ring-2 focus:ring-orange-brand/10 transition"
                />
              </div>

              <div>
                <label className="block text-navy text-xs font-semibold uppercase tracking-wider mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={pass}
                    onChange={e => { setPass(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    className="w-full bg-silver-lightest border border-silver/30 text-navy placeholder-silver/50 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-orange-brand focus:ring-2 focus:ring-orange-brand/10 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-silver hover:text-navy transition"
                  >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-xs font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={leaving}
                className="w-full bg-orange-brand hover:bg-orange-dark active:scale-95 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-orange-brand/20 mt-2 disabled:opacity-60"
              >
                {leaving ? "Ingresando..." : "Ingresar"}
              </button>
            </form>

            <p className="text-center text-silver/60 text-xs mt-8 border-t border-silver/10 pt-6">
              Demo: <span className="text-navy font-medium">demo</span> / <span className="text-navy font-medium">maintronic</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
