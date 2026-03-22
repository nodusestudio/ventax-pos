import React, { useState, useEffect } from "react";
import { Clock, Layers, FileText, Printer, Monitor, Utensils, Mail, ShoppingBag, Barcode } from "lucide-react";

const categorias = [
  "FUNCIONES",
  "Métodos de pago",
  "Lealtad",
  "Impuestos",
  "Recibo",
  "Tickets abiertos",
  "Impresoras de cocina",
  "Tipo de pedido"
];

export default function Ajustes({ funcionesConfig, setFuncionesConfig, metodosPago, setMetodosPago, configRecibo, setConfigRecibo }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categorias[0]);
  // Estado switches local para edición antes de guardar
  const [funciones, setFunciones] = useState(funcionesConfig);
  const [guardado, setGuardado] = useState(false);

  // Sincronizar switches locales con globales al cambiar de tab o abrir ajustes
  useEffect(() => {
    setFunciones(funcionesConfig);
  }, [funcionesConfig]);

  const listaFunciones = [
    {
      key: 'cierres',
      icon: <Layers className="text-gray-500" size={24} />, 
      titulo: 'Cierres de caja por turnos',
      desc: 'Controla el dinero que entra y sale del cajón de efectivo.',
      info: true
    },
    {
      key: 'tickets',
      icon: <FileText className="text-gray-500" size={24} />,
      titulo: 'Tickets abiertos',
      desc: 'Permite guardar y editar pedidos antes de completar un pago.',
      info: true
    },
    {
      key: 'impresoras',
      icon: <Printer className="text-gray-500" size={24} />,
      titulo: 'Impresoras de cocina',
      desc: 'Envía comandas a la cocina a través de una impresora o una pantalla.',
      info: true
    },
    {
      key: 'pantalla',
      icon: <Monitor className="text-gray-500" size={24} />,
      titulo: 'Pantalla para clientes',
      desc: 'Muestre a sus clientes información y precios en el momento de la venta.',
      info: true
    },
    {
      key: 'tipoPedido',
      icon: <Utensils className="text-gray-500" size={24} />,
      titulo: 'Tipo de pedido',
      desc: 'Toma pedidos para cenar dentro, para llevar o a domicilio.',
      info: true
    },
    {
      key: 'notificaciones',
      icon: <Mail className="text-gray-500" size={24} />,
      titulo: 'Notificaciones de stock bajo',
      desc: 'Recibe un email diario sobre los artículos bajos o fuera de stock.',
      info: true
    },
    {
      key: 'alertas',
      icon: <ShoppingBag className="text-gray-500" size={24} />,
      titulo: 'Alertas de stock negativo',
      desc: 'Avisa al cajero cuando intenta vender más productos que el disponible en stock.',
      info: true
    },
    {
      key: 'pesoVariable',
      icon: <Barcode className="text-gray-500" size={24} />,
      titulo: 'Código de barras de peso variable',
      desc: 'Permitir el escaneo de códigos de barras de peso variable.',
      info: false
    },
  ];

  const handleSwitch = (key) => {
    setFunciones(f => ({ ...f, [key]: !f[key] }));
    setGuardado(false);
  };
  const handleGuardar = () => {
    setFuncionesConfig(funciones);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 1500);
  };

  return (
    <div className="fixed inset-0 flex w-full h-screen overflow-hidden bg-[#0F0F13] text-white font-sans">
      {/* 1. ESPACIO BLOQUEADO detras de la barra lateral (Ancho exacto de la barra) */}
      <div className="w-[80px] min-w-[80px] h-full bg-[#0F0F13]"></div>

      {/* 2. LADO DERECHO: Ajustes principal (Flex-1 para ocupar el resto) */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header Compacto con Margen Superior */}
        <div className="pt-6 pb-4 flex justify-between items-center bg-[#0F0F13] px-6">
          <div>
            <h2 className="text-xl font-black tracking-tight text-white uppercase">Ajustes</h2>
            <p className="text-gray-500 text-[11px] mt-0.5">Configuración general del sistema</p>
          </div>
          <div className="relative w-72">
            <svg className="absolute left-3.5 top-2.5 text-gray-600" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="7" r="6"/><line x1="11" y1="11" x2="15" y2="15"/></svg>
            <input
              type="text"
              placeholder="Buscar en ajustes..."
              className="w-full bg-[#16161D] border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all shadow-inner"
            />
          </div>
        </div>
        {/* Barra de categorías horizontal */}
        <div className="flex items-center gap-2 overflow-x-auto px-6 py-2 custom-scroll whitespace-nowrap">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSeleccionada(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                categoriaSeleccionada === cat
                  ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30"
                  : "bg-[#1c1c24] text-gray-400 border-gray-800 hover:border-gray-600 hover:bg-[#25252e]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Contenido de la categoría seleccionada */}
        <div className="flex-1 flex flex-col px-6 py-4">
          {categoriaSeleccionada === "FUNCIONES" ? (
            <div className="bg-[#181824] rounded-xl border border-gray-800 p-0 shadow-inner flex flex-col">
              <div className="px-8 pt-8 pb-2">
                <h3 className="text-2xl font-bold text-white mb-2">Funciones</h3>
              </div>
              <div className="divide-y divide-gray-800">
                {listaFunciones.map(f => (
                  <div key={f.key} className="flex items-center px-8 py-4">
                    <div className="w-8 flex-shrink-0 flex items-center justify-center mr-4">{f.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-base text-white flex items-center">
                        {f.titulo}
                        {f.info && <a href="#" className="ml-2 text-green-500 text-xs font-semibold hover:underline">Más información</a>}
                      </div>
                      <div className="text-gray-400 text-sm">{f.desc}</div>
                    </div>
                    <div className="ml-4">
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" checked={!!funciones[f.key]} onChange={() => handleSwitch(f.key)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-md transition-all peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4 px-8 py-4 bg-[#181824] rounded-b-xl">
                <button className="text-gray-400 font-bold px-4 py-2 rounded hover:bg-gray-800 transition-all">CANCELAR</button>
                <button onClick={handleGuardar} className="text-green-500 font-bold px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-all border border-green-500">GUARDAR</button>
                {guardado && <span className="ml-4 text-green-400 font-bold">¡Guardado!</span>}
              </div>
            </div>
          ) : categoriaSeleccionada === "Métodos de pago" ? (
            <div className="bg-[#181824] rounded-xl border border-gray-800 p-0 shadow-inner flex flex-col">
              <div className="px-8 pt-8 pb-2">
                <h3 className="text-2xl font-bold text-white mb-2">Métodos de Pago</h3>
              </div>
              <div className="divide-y divide-gray-800">
                {metodosPago.map((m, idx) => (
                  <div key={m.id} className="flex items-center px-8 py-4 gap-4">
                    <input
                      className="flex-1 bg-transparent border-b border-gray-700 text-white font-bold text-base focus:outline-none focus:border-orange-500"
                      value={m.nombre}
                      onChange={e => {
                        const nuevo = metodosPago.map((item, i) => i === idx ? { ...item, nombre: e.target.value } : item);
                        setMetodosPago(nuevo);
                      }}
                    />
                    <button className="text-red-500 font-bold px-2 py-1 rounded hover:bg-red-500/20" onClick={() => setMetodosPago(metodosPago.filter((_, i) => i !== idx))}>Eliminar</button>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 px-8 py-4 bg-[#181824] rounded-b-xl">
                <button className="text-green-500 font-bold px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-all border border-green-500" onClick={() => setMetodosPago([...metodosPago, { id: 'mp' + Date.now(), nombre: '' }])}>Agregar método</button>
              </div>
            </div>
          ) : categoriaSeleccionada === "Recibo" ? (
            <div className="bg-[#181824] rounded-xl border border-gray-800 p-0 shadow-inner flex flex-col">
              <div className="px-8 pt-8 pb-2">
                <h3 className="text-2xl font-bold text-white mb-2">Configuración de los recibos</h3>
                <div className="text-gray-400 text-sm mb-4">Personaliza cómo se verán tus recibos impresos y enviados por WhatsApp.</div>
                <div className="flex gap-8 mb-6">
                  <div>
                    <div className="font-bold text-white mb-1">Logo WhatsApp</div>
                    <label className="block w-28 h-28 bg-[#232334] rounded-lg border border-gray-700 flex items-center justify-center cursor-pointer overflow-hidden">
                      {configRecibo.logoWhatsapp ? (
                        <img src={configRecibo.logoWhatsapp} alt="Logo WhatsApp" className="object-contain w-full h-full" />
                      ) : (
                        <span className="text-gray-500">Subir logo</span>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = ev => setConfigRecibo(r => ({ ...r, logoWhatsapp: ev.target.result }));
                          reader.readAsDataURL(file);
                        }
                      }} />
                    </label>
                  </div>
                  <div>
                    <div className="font-bold text-white mb-1">Recibo impreso</div>
                    <label className="block w-28 h-28 bg-[#232334] rounded-lg border border-gray-700 flex items-center justify-center cursor-pointer overflow-hidden">
                      {configRecibo.logoImpreso ? (
                        <img src={configRecibo.logoImpreso} alt="Logo Impreso" className="object-contain w-full h-full" />
                      ) : (
                        <span className="text-gray-500">Subir logo</span>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = ev => setConfigRecibo(r => ({ ...r, logoImpreso: ev.target.result }));
                          reader.readAsDataURL(file);
                        }
                      }} />
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="font-bold text-white mb-1">Cabecera</div>
                  <textarea
                    className="w-full bg-[#232334] border border-gray-700 rounded-lg p-3 text-white font-mono text-sm focus:outline-none focus:border-orange-500 resize-none"
                    rows={4}
                    maxLength={500}
                    value={configRecibo.header || ''}
                    onChange={e => setConfigRecibo(r => ({ ...r, header: e.target.value }))}
                  />
                  <div className="text-right text-xs text-gray-500">{(configRecibo.header || '').length} / 500</div>
                </div>
                <div className="mb-4">
                  <div className="font-bold text-white mb-1">Pie de página</div>
                  <textarea
                    className="w-full bg-[#232334] border border-gray-700 rounded-lg p-3 text-white font-mono text-sm focus:outline-none focus:border-orange-500 resize-none"
                    rows={2}
                    maxLength={500}
                    value={configRecibo.footerMsg || ''}
                    onChange={e => setConfigRecibo(r => ({ ...r, footerMsg: e.target.value }))}
                  />
                  <div className="text-right text-xs text-gray-500">{(configRecibo.footerMsg || '').length} / 500</div>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!configRecibo.mostrarCliente} onChange={e => setConfigRecibo(r => ({ ...r, mostrarCliente: e.target.checked }))} className="accent-green-500 w-5 h-5" />
                      <span className="text-white font-bold">Mostrar información del cliente</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!configRecibo.mostrarComentarios} onChange={e => setConfigRecibo(r => ({ ...r, mostrarComentarios: e.target.checked }))} className="accent-green-500 w-5 h-5" />
                      <span className="text-white font-bold">Mostrar comentarios</span>
                    </label>
                  </div>
                  <div className="flex gap-8 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!configRecibo.habilitarWhatsapp} onChange={e => setConfigRecibo(r => ({ ...r, habilitarWhatsapp: e.target.checked }))} className="accent-green-500 w-5 h-5" />
                      <span className="text-white font-bold">Permitir enviar ticket por WhatsApp</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!configRecibo.habilitarPDF} onChange={e => setConfigRecibo(r => ({ ...r, habilitarPDF: e.target.checked }))} className="accent-green-500 w-5 h-5" />
                      <span className="text-white font-bold">Permitir descargar ticket en PDF</span>
                    </label>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="font-bold text-white mb-1">Idioma de recibo</div>
                  <select
                    className="w-48 bg-[#232334] border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none focus:border-orange-500"
                    value={configRecibo.idioma}
                    onChange={e => setConfigRecibo(r => ({ ...r, idioma: e.target.value }))}
                  >
                    <option value="Español">Español</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4 pb-6">
                  <button className="text-gray-400 font-bold px-4 py-2 rounded hover:bg-gray-800 transition-all">CANCELAR</button>
                  <button onClick={() => setGuardado(true)} className="text-green-500 font-bold px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-all border border-green-500">GUARDAR</button>
                  {guardado && <span className="ml-4 text-green-400 font-bold">¡Guardado!</span>}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#181824] rounded-xl border border-gray-800 p-8 text-center text-gray-400 text-lg font-bold shadow-inner">
              {categoriaSeleccionada}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}