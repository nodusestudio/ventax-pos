import React, { useState } from "react";

export default function Caja({ movimientos = [], cajaAbierta = false, datosCaja = {}, onAbrirCaja, onCerrarCaja }) {
  const [tab, setTab] = useState("actual");

  return (
    <div className="fixed inset-0 flex w-full h-screen overflow-hidden bg-[#0F0F13] text-white font-sans">
      <div className="w-[80px] min-w-[80px] h-full bg-[#0F0F13]"></div>
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Membrete igual a las demás pestañas */}
        <div className="pt-6 pb-4 flex justify-between items-center bg-[#0F0F13] px-6">
          <div>
            <h2 className="text-xl font-black tracking-tight text-white uppercase">Caja</h2>
            <p className="text-gray-500 text-[11px] mt-0.5">Control y movimientos de caja</p>
          </div>
        </div>
        {/* Botones de tabs */}
        <div className="flex items-center gap-2 px-6 pb-2">
          <button
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${tab === "actual" ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30" : "bg-[#1c1c24] text-gray-400 border-gray-800 hover:border-gray-600 hover:bg-[#25252e]"}`}
            onClick={() => setTab("actual")}
          >
            Caja Actual
          </button>
          <button
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${tab === "historial" ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30" : "bg-[#1c1c24] text-gray-400 border-gray-800 hover:border-gray-600 hover:bg-[#25252e]"}`}
            onClick={() => setTab("historial")}
          >
            Historial
          </button>
        </div>
        {/* Contenido de la caja */}
        <div className="flex-1 flex flex-col px-6 py-4">
          {tab === "actual" ? (
            cajaAbierta ? (
              <div className="bg-[#181824] rounded-xl border border-gray-800 p-8 shadow-inner flex flex-col gap-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-lg font-bold text-white">Caja #{datosCaja.numero || "-"}</div>
                    <div className="text-xs text-gray-400">Apertura: {datosCaja.horaApertura || "-"}</div>
                  </div>
                  <button className="bg-red-500 text-white px-4 py-2 rounded font-bold" onClick={onCerrarCaja}>Cerrar Caja</button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#23232b] rounded-lg p-4">
                    <div className="text-xs text-gray-400">Total ventas</div>
                    <div className="text-2xl font-black text-green-400">${datosCaja.totalVentas || 0}</div>
                  </div>
                  <div className="bg-[#23232b] rounded-lg p-4">
                    <div className="text-xs text-gray-400">Egresos</div>
                    <div className="text-2xl font-black text-red-400">${datosCaja.egresos || 0}</div>
                  </div>
                  <div className="bg-[#23232b] rounded-lg p-4 col-span-2">
                    <div className="text-xs text-gray-400">Por tipo de pago</div>
                    <div className="flex gap-4 mt-2">
                      {(datosCaja.pagos || []).map((p, i) => (
                        <div key={i} className="bg-[#181824] rounded px-3 py-1 text-sm font-bold text-orange-400">{p.tipo}: ${p.monto}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-[#23232b] rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-2">Movimientos del día</div>
                  <div className="max-h-40 overflow-y-auto custom-scroll divide-y divide-gray-800">
                    {movimientos.length === 0 ? (
                      <div className="text-gray-500 text-sm">Sin movimientos</div>
                    ) : movimientos.map((m, i) => (
                      <div key={i} className="py-2 flex justify-between items-center">
                        <span className="text-white text-sm">{m.descripcion}</span>
                        <span className={`font-bold ${m.tipo === 'egreso' ? 'text-red-400' : 'text-green-400'}`}>{m.tipo === 'egreso' ? '-' : '+'}${m.monto}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#181824] rounded-xl border border-gray-800 p-8 shadow-inner flex flex-col items-center justify-center gap-4">
                <div className="text-lg font-bold text-white mb-2">No hay caja abierta</div>
                <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-black text-lg" onClick={onAbrirCaja}>Abrir Caja</button>
              </div>
            )
          ) : (
            <div className="bg-[#181824] rounded-xl border border-gray-800 p-8 shadow-inner flex flex-col">
              <div className="text-lg font-bold text-white mb-4">Historial de Cajas</div>
              <div className="max-h-80 overflow-y-auto custom-scroll divide-y divide-gray-800">
                {datosCaja.historial && datosCaja.historial.length > 0 ? datosCaja.historial.map((c, i) => (
                  <div key={i} className="py-2 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm font-bold">Caja #{c.numero}</span>
                      <span className="text-xs text-gray-400">{c.horaApertura} - {c.horaCierre}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-400">
                      <span>Total: <span className="text-green-400 font-bold">${c.totalVentas}</span></span>
                      <span>Egresos: <span className="text-red-400 font-bold">${c.egresos}</span></span>
                    </div>
                  </div>
                )) : <div className="text-gray-500 text-sm">Sin historial</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
