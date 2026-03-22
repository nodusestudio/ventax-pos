import React, { useState } from "react";
import { Search } from "lucide-react";

// Datos simulados
const botones = [
  { key: "resumen", label: "Resumen de ventas" },
  { key: "productos", label: "Ventas por productos" },
  { key: "categorias", label: "Ventas por categoría" },
  { key: "pagos", label: "Ventas por tipo de pago" },
  { key: "metricas", label: "Métricas" },
];
const datosResumen = {
  ventasBrutas: 7219000,
  reembolsos: 0,
  descuentos: 464800,
  ventasNetas: 6754200,
  beneficioBruto: 3046262,
  dias: [
    { fecha: "10-mar", valor: 740400 },
    { fecha: "11-mar", valor: 0 },
    { fecha: "12-mar", valor: 676300 },
    { fecha: "13-mar", valor: 1000000 },
    { fecha: "14-mar", valor: 950000 },
    { fecha: "15-mar", valor: 1200000 },
    { fecha: "16-mar", valor: 540000 },
    { fecha: "17-mar", valor: 880000 },
    { fecha: "18-mar", valor: 0 },
    { fecha: "19-mar", valor: 740000 },
    { fecha: "20-mar", valor: 740400 },
  ],
};
const datosProductos = [
  { nombre: "Hamburguesa Clásica", cantidad: 120, ventas: 1800000 },
  { nombre: "Perro Caliente", cantidad: 95, ventas: 950000 },
  { nombre: "Pizza Personal", cantidad: 80, ventas: 1120000 },
  { nombre: "Gaseosa 400ml", cantidad: 200, ventas: 600000 },
  { nombre: "Salchipapa", cantidad: 60, ventas: 720000 },
];
const datosCategorias = [
  { nombre: "Hamburguesas", cantidad: 180, ventas: 2520000 },
  { nombre: "Perros", cantidad: 95, ventas: 950000 },
  { nombre: "Pizzas", cantidad: 80, ventas: 1120000 },
  { nombre: "Bebidas", cantidad: 220, ventas: 660000 },
  { nombre: "Salchipapas", cantidad: 60, ventas: 720000 },
];
const datosPagos = [
  { metodo: "Efectivo", cantidad: 210, ventas: 3200000 },
  { metodo: "Tarjeta débito", cantidad: 80, ventas: 1200000 },
  { metodo: "Tarjeta crédito", cantidad: 60, ventas: 1100000 },
  { metodo: "Nequi", cantidad: 40, ventas: 600000 },
  { metodo: "Daviplata", cantidad: 25, ventas: 350000 },
];
const topProductos = [
  { nombre: "Hamburguesa Clásica", ventas: 1800000, cantidad: 120 },
  { nombre: "Pizza Personal", ventas: 1120000, cantidad: 80 },
  { nombre: "Perro Caliente", ventas: 950000, cantidad: 95 },
];
const productoMasVendido = topProductos[0];
const diasVentas = [
  { dia: "Lunes", ventas: 900000 },
  { dia: "Martes", ventas: 800000 },
  { dia: "Miércoles", ventas: 1200000 },
  { dia: "Jueves", ventas: 950000 },
  { dia: "Viernes", ventas: 1500000 },
  { dia: "Sábado", ventas: 1800000 },
  { dia: "Domingo", ventas: 1100000 },
];
const mejorDia = diasVentas.reduce((a, b) => (a.ventas > b.ventas ? a : b));
const mesesVentas = [
  { mes: "Enero", ventas: 2000000 },
  { mes: "Febrero", ventas: 2500000 },
  { mes: "Marzo", ventas: 3200000 },
  { mes: "Abril", ventas: 1800000 },
];
const mejorMes = mesesVentas.reduce((a, b) => (a.ventas > b.ventas ? a : b));
const productosPorCategoria = [
  { categoria: "Hamburguesas", producto: "Hamburguesa Clásica", cantidad: 120 },
  { categoria: "Pizzas", producto: "Pizza Personal", cantidad: 80 },
  { categoria: "Perros", producto: "Perro Caliente", cantidad: 95 },
  { categoria: "Bebidas", producto: "Gaseosa 400ml", cantidad: 200 },
];

const Informes = () => {
  const [tab, setTab] = useState("resumen");
  const [busqueda, setBusqueda] = useState("");

  return (
    <div className="fixed inset-0 flex w-full h-screen overflow-hidden bg-[#0F0F13] text-white font-sans">
      <div className="w-[80px] min-w-[80px] h-full bg-[#0F0F13]" />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header y tabs sticky */}
        <div className="sticky top-0 z-20 bg-[#0F0F13]">
          <div className="pt-6 px-6 pb-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black tracking-tight text-white uppercase">Informes y Reportes</h2>
              <p className="text-gray-500 text-[11px] mt-0.5">Visualiza y exporta tus datos de ventas</p>
            </div>
            <div className="relative w-72">
              <Search className="absolute left-3.5 top-2.5 text-gray-600" size={16} />
              <input
                type="text"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                placeholder="Buscar en informes..."
                className="w-full bg-[#16161D] border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all shadow-inner"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 px-6 py-2 border-b border-[#18181F] bg-[#0F0F13]">
            {botones.map((b) => (
              <button
                key={b.key}
                onClick={() => setTab(b.key)}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  tab === b.key
                    ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30"
                    : "bg-[#1c1c24] text-gray-400 border-gray-800 hover:border-gray-600 hover:bg-[#25252e]"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
        {/* Contenido dinámico debajo del header y tabs */}
        <div className="flex-1 overflow-y-auto custom-scroll px-6 py-4 bg-[#0F0F13]">
          {tab === "resumen" && (
            <div>
              {/* Tarjetas resumen */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#18181F] rounded-xl p-4 flex flex-col items-start border border-[#22222C]">
                  <span className="text-xs text-gray-400">Ventas brutas</span>
                  <span className="text-2xl font-black text-green-400">${datosResumen.ventasBrutas.toLocaleString('es-CO')}</span>
                </div>
                <div className="bg-[#18181F] rounded-xl p-4 flex flex-col items-start border border-[#22222C]">
                  <span className="text-xs text-gray-400">Reembolsos</span>
                  <span className="text-2xl font-black text-red-400">${datosResumen.reembolsos.toLocaleString('es-CO')}</span>
                </div>
                <div className="bg-[#18181F] rounded-xl p-4 flex flex-col items-start border border-[#22222C]">
                  <span className="text-xs text-gray-400">Descuentos</span>
                  <span className="text-2xl font-black text-orange-400">${datosResumen.descuentos.toLocaleString('es-CO')}</span>
                </div>
                <div className="bg-[#18181F] rounded-xl p-4 flex flex-col items-start border border-[#22222C]">
                  <span className="text-xs text-gray-400">Ventas netas</span>
                  <span className="text-2xl font-black text-blue-400">${datosResumen.ventasNetas.toLocaleString('es-CO')}</span>
                </div>
                <div className="bg-[#18181F] rounded-xl p-4 flex flex-col items-start border border-[#22222C] col-span-2 md:col-span-4">
                  <span className="text-xs text-gray-400">Beneficio bruto</span>
                  <span className="text-2xl font-black text-pink-400">${datosResumen.beneficioBruto.toLocaleString('es-CO')}</span>
                </div>
              </div>
              {/* Gráfico de líneas (simulado) */}
              <div className="bg-[#18181F] rounded-xl p-6 mb-6 border border-[#22222C]">
                <span className="text-xs text-gray-400">Ventas brutas</span>
                <div className="w-full h-48 flex items-end gap-2 mt-4">
                  {datosResumen.dias.map((d, i) => (
                    <div key={d.fecha} className="flex flex-col items-center flex-1">
                      <div
                        className="w-6 rounded-t bg-green-400"
                        style={{ height: `${Math.max(10, d.valor / 15000)}px`, minHeight: '10px' }}
                        title={`$${d.valor.toLocaleString('es-CO')}`}
                      ></div>
                      <span className="text-[10px] text-gray-500 mt-1">{d.fecha}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Tabla de exportar */}
              <div className="bg-[#18181F] rounded-xl p-4 border border-[#22222C]">
                <span className="text-xs text-gray-400">Exportar</span>
                <table className="min-w-full text-sm text-left mt-2">
                  <thead>
                    <tr className="text-gray-400 uppercase text-xs">
                      <th className="px-4 py-2">Fecha</th>
                      <th className="px-4 py-2">Ventas netas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosResumen.dias.map((d) => (
                      <tr key={d.fecha} className="border-b border-[#22222C]">
                        <td className="px-4 py-2">{d.fecha}</td>
                        <td className="px-4 py-2 text-blue-400 font-bold">${d.valor.toLocaleString('es-CO')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === "productos" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Ventas por productos</h3>
              <div className="bg-[#18181F] rounded-xl p-4 border border-[#22222C]">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="text-gray-400 uppercase text-xs">
                      <th className="px-4 py-2">Producto</th>
                      <th className="px-4 py-2">Cantidad</th>
                      <th className="px-4 py-2">Ventas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosProductos.map((prod) => (
                      <tr key={prod.nombre} className="border-b border-[#22222C]">
                        <td className="px-4 py-2">{prod.nombre}</td>
                        <td className="px-4 py-2 text-orange-400 font-bold">{prod.cantidad}</td>
                        <td className="px-4 py-2 text-green-400 font-bold">${prod.ventas.toLocaleString('es-CO')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === "categorias" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Ventas por categoría</h3>
              <div className="bg-[#18181F] rounded-xl p-4 border border-[#22222C]">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="text-gray-400 uppercase text-xs">
                      <th className="px-4 py-2">Categoría</th>
                      <th className="px-4 py-2">Cantidad</th>
                      <th className="px-4 py-2">Ventas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosCategorias.map((cat) => (
                      <tr key={cat.nombre} className="border-b border-[#22222C]">
                        <td className="px-4 py-2">{cat.nombre}</td>
                        <td className="px-4 py-2 text-orange-400 font-bold">{cat.cantidad}</td>
                        <td className="px-4 py-2 text-green-400 font-bold">${cat.ventas.toLocaleString('es-CO')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === "pagos" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Ventas por tipo de pago</h3>
              <div className="bg-[#18181F] rounded-xl p-4 border border-[#22222C]">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="text-gray-400 uppercase text-xs">
                      <th className="px-4 py-2">Método de pago</th>
                      <th className="px-4 py-2">Cantidad</th>
                      <th className="px-4 py-2">Ventas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosPagos.map((pago) => (
                      <tr key={pago.metodo} className="border-b border-[#22222C]">
                        <td className="px-4 py-2">{pago.metodo}</td>
                        <td className="px-4 py-2 text-orange-400 font-bold">{pago.cantidad}</td>
                        <td className="px-4 py-2 text-green-400 font-bold">${pago.ventas.toLocaleString('es-CO')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === "metricas" && (
            <div>
              <h3 className="text-xl font-black mb-6 text-white uppercase tracking-tight">Métricas clave</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#18181F] rounded-xl p-5 flex flex-col items-start border border-[#22222C]">
                  <span className="text-xs text-gray-400 mb-1">Producto más vendido</span>
                  <span className="text-lg font-black text-orange-400 mb-1">{productoMasVendido.nombre}</span>
                  <span className="text-xs text-gray-400">Cantidad: <span className="text-white font-bold">{productoMasVendido.cantidad}</span></span>
                  <span className="text-xs text-gray-400">Ventas: <span className="text-green-400 font-bold">${productoMasVendido.ventas.toLocaleString('es-CO')}</span></span>
                </div>
                <div className="bg-[#18181F] rounded-xl p-5 flex flex-col items-start border border-[#22222C]">
                  <span className="text-xs text-gray-400 mb-1">Día con más ventas</span>
                  <span className="text-lg font-black text-blue-400 mb-1">{mejorDia.dia}</span>
                  <span className="text-xs text-gray-400">Ventas: <span className="text-green-400 font-bold">${mejorDia.ventas.toLocaleString('es-CO')}</span></span>
                </div>
                <div className="bg-[#18181F] rounded-xl p-5 flex flex-col items-start border border-[#22222C]">
                  <span className="text-xs text-gray-400 mb-1">Mes con más ventas</span>
                  <span className="text-lg font-black text-pink-400 mb-1">{mejorMes.mes}</span>
                  <span className="text-xs text-gray-400">Ventas: <span className="text-green-400 font-bold">${mejorMes.ventas.toLocaleString('es-CO')}</span></span>
                </div>
                <div className="bg-[#18181F] rounded-xl p-5 flex flex-col items-start border border-[#22222C]">
                  <span className="text-xs text-gray-400 mb-1">Top 3 productos</span>
                  <ol className="list-decimal ml-4 mt-1">
                    {topProductos.map((prod, i) => (
                      <li key={prod.nombre} className="text-white text-sm font-bold">
                        {prod.nombre} <span className="text-xs text-gray-400">({prod.cantidad} unds)</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bg-[#18181F] rounded-xl p-5 border border-[#22222C]">
                <span className="text-xs text-gray-400 font-bold uppercase">Producto más vendido por categoría</span>
                <table className="min-w-full text-sm text-left mt-3">
                  <thead>
                    <tr className="text-gray-400 uppercase text-xs">
                      <th className="px-4 py-2">Categoría</th>
                      <th className="px-4 py-2">Producto</th>
                      <th className="px-4 py-2">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosPorCategoria.map((row) => (
                      <tr key={row.categoria} className="border-b border-[#22222C]">
                        <td className="px-4 py-2">{row.categoria}</td>
                        <td className="px-4 py-2">{row.producto}</td>
                        <td className="px-4 py-2 text-orange-400 font-bold">{row.cantidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Informes;
