import React from "react";
import { Search, Plus, Utensils, Trash2 } from "lucide-react";
import ClienteAutoComplete from "./ClienteAutoComplete";

const VentaCatalogo = ({
  productos = [],
  categorias = [],
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  onAdd,
  formatCurrency,
  carrito = [],
  onAddCart,
  onRemoveCart,
  onClearCart,
  subtotal,
  impuestos,
  total,
  diningOption,
  setDiningOption,
  tableNum,
  setTableNum,
  DINING_OPTS = [],
  TABLE_NUMS = [],
  deliveryValue,
  setDeliveryValue,
  clientes = [],
  clienteSeleccionado,
  setClienteSeleccionado,
  onAgregarCliente,
  onCobrar,
}) => {
  const [showForm, setShowForm] = React.useState(false);
  const [nuevoCliente, setNuevoCliente] = React.useState({ name: '', phone: '', address: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoCliente.name.trim()) return;
    onAgregarCliente(nuevoCliente);
    setNuevoCliente({ name: '', phone: '', address: '' });
    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 flex w-full h-screen overflow-hidden bg-[#0F0F13] text-white font-sans">
      
      {/* 1. ESPACIO BLOQUEADO detras de la barra lateral (Ancho exacto de la barra) */}
      <div className="w-[80px] min-w-[80px] h-full bg-[#0F0F13]"></div>

      {/* 2. LADO IZQUIERDO: Catálogo Principal (Flex-1 para ocupar el resto) */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Header Compacto con Margen Superior */}
        <div className="pt-6 px-6 pb-4 flex justify-between items-center bg-[#0F0F13]">
          <div>
            <h2 className="text-xl font-black tracking-tight text-white uppercase">Venta de Catálogo</h2>
            <p className="text-gray-500 text-[11px] mt-0.5">Nodus Estudio POS</p>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3.5 top-2.5 text-gray-600" size={16} />
            <input
              type="text"
              placeholder="Buscar por nombre o categoría..."
              className="w-full bg-[#16161D] border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Categorías Compactas */}
        <div className="flex items-center gap-2 overflow-x-auto px-6 py-2 custom-scroll whitespace-nowrap">
          <button
            onClick={() => setCategoriaSeleccionada("Todos")}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              categoriaSeleccionada === "Todos" 
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" 
              : "bg-[#1c1c24] text-gray-400 border border-gray-800 hover:bg-[#25252e]"
            }`}
          >
            TODOS
          </button>
          {categorias
            .filter((cat, idx) => cat !== "Todos" && categorias.indexOf(cat) === idx)
            .map((cat) => (
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

        {/* Grid de Productos - COMPACTO y OPTIMIZADO */}
        <div className="flex-1 overflow-y-auto custom-scroll px-6 py-4 bg-[#0F0F13]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {productos.map((p) => (
              <div
                key={p.id}
                className="bg-[#1c1c24] rounded-2xl p-3 flex flex-col h-full border border-gray-800/50 hover:border-orange-500/40 transition-all group shadow-sm hover:shadow-orange-500/5"
              >
                {/* Imagen Cuadrada Compacta */}
                <div className="aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#25252e] flex items-center justify-center border border-gray-800/30">
                  {p.img ? (
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <Utensils size={28} className="text-gray-700 group-hover:text-orange-500/50 transition-colors" />
                  )}
                </div>
                
                {/* Info del Producto Compacta */}
                <div className="flex flex-col flex-1 justify-between">
                  <h3 className="text-gray-100 font-bold text-xs leading-snug line-clamp-2 min-h-[2rem]">{p.name}</h3>
                  <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-800/50">
                    <span className="text-orange-500 font-black text-base">
                      {typeof formatCurrency === "function" ? formatCurrency(p.price) : `$${p.price}`}
                    </span>
                    <button
                      onClick={() => onAdd(p)}
                      className="bg-orange-500 p-1.5 rounded-lg text-white hover:bg-orange-600 active:scale-90 transition-all shadow-md shadow-orange-500/10"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LADO DERECHO: Carrito con Bordes Suaves */}
      <div className="w-[340px] min-w-[340px] bg-[#16161D] border-l border-gray-800/50 h-full flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.3)]">
        {/* Selector de Cliente */}
        <div className="p-4 border-b border-gray-800 bg-[#1c1c24]/70">
          <div className="mb-2">
            <label className="block text-xs font-bold text-gray-400 mb-1">Cliente</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <ClienteAutoComplete
                  clientes={clientes}
                  value={clienteSeleccionado}
                  onChange={setClienteSeleccionado}
                  placeholder="Buscar cliente por nombre o teléfono..."
                />
              </div>
              <button
                type="button"
                className="ml-2 px-3 py-2 rounded-lg bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-all"
                onClick={() => setShowForm(f => !f)}
                title="Agregar nuevo cliente"
              >
                + Nuevo
              </button>
            </div>
            {showForm && (
              <form className="mt-3 p-3 rounded-lg bg-[#23232b] border border-gray-700 space-y-2" onSubmit={handleSubmit}>
                <input
                  className="w-full bg-[#16161D] border border-gray-700 rounded-lg py-2 px-3 text-sm text-white mb-1"
                  placeholder="Nombre*"
                  value={nuevoCliente.name}
                  onChange={e => setNuevoCliente(nc => ({ ...nc, name: e.target.value }))}
                  required
                />
                <input
                  className="w-full bg-[#16161D] border border-gray-700 rounded-lg py-2 px-3 text-sm text-white mb-1"
                  placeholder="Teléfono"
                  value={nuevoCliente.phone}
                  onChange={e => setNuevoCliente(nc => ({ ...nc, phone: e.target.value }))}
                />
                <input
                  className="w-full bg-[#16161D] border border-gray-700 rounded-lg py-2 px-3 text-sm text-white mb-1"
                  placeholder="Dirección"
                  value={nuevoCliente.address}
                  onChange={e => setNuevoCliente(nc => ({ ...nc, address: e.target.value }))}
                />
                <div className="flex gap-2 mt-2">
                  <button type="submit" className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition-all">Guardar</button>
                  <button type="button" className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-bold hover:bg-gray-600 transition-all" onClick={() => setShowForm(false)}>Cancelar</button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="p-5 border-b border-gray-800 bg-[#1c1c24]/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase">Orden #0412</h2>
              <h3 className="text-lg font-bold text-white uppercase">Carrito Actual
                {diningOption === 'dine_in' && tableNum && (
                  <span className="ml-2 text-orange-400 text-base font-black">MESA {tableNum}</span>
                )}
              </h3>
            </div>
            <button onClick={onClearCart} className="text-gray-600 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-lg">
              <Trash2 size={20} />
            </button>
          </div>
          {/* Botón Guardar Pedido para cualquier tipo */}
          {carrito.length > 0 && (
            ((diningOption === 'dine_in' && tableNum) || diningOption === 'takeout' || diningOption === 'delivery') && (
              <button
                className="mt-4 w-full py-2 rounded-lg bg-green-500 text-white font-bold shadow hover:bg-green-600 transition-all"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    if (diningOption === 'dine_in' && window.onGuardarPedidoMesa) {
                      window.onGuardarPedidoMesa();
                    } else if (diningOption === 'takeout' && window.onGuardarPedidoLlevar) {
                      window.onGuardarPedidoLlevar();
                    } else if (diningOption === 'delivery' && window.onGuardarPedidoDomicilio) {
                      window.onGuardarPedidoDomicilio();
                    }
                  }
                }}
              >
                {diningOption === 'dine_in' && tableNum && `GUARDAR PEDIDO EN MESA ${tableNum}`}
                {diningOption === 'takeout' && 'GUARDAR PEDIDO PARA LLEVAR'}
                {diningOption === 'delivery' && 'GUARDAR PEDIDO A DOMICILIO'}
              </button>
            )
          )}
          {/* Selector de tipo de pedido */}
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            {DINING_OPTS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setDiningOption(opt.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border transition-all ${diningOption === opt.id ? 'bg-orange-500 text-white border-orange-500 shadow' : 'bg-[#16161D] text-gray-400 border-gray-700 hover:bg-[#25252e]'}`}
              >
                <span>{opt.ic}</span> {opt.lbl}
              </button>
            ))}
            {diningOption === 'dine_in' && (
              (!tableNum || !TABLE_NUMS.includes(tableNum)) ? (
                <select
                  value={tableNum}
                  onChange={e => setTableNum(e.target.value)}
                  className="ml-2 px-2 py-1 rounded-lg bg-[#16161D] border border-gray-700 text-xs text-white"
                >
                  <option value="">Selecciona mesa</option>
                  {TABLE_NUMS.map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              ) : (
                <button
                  className="ml-2 px-2 py-1 rounded-lg bg-[#25252e] border border-gray-700 text-xs text-white"
                  onClick={() => setTableNum("")}
                  title="Cambiar mesa"
                >
                  Mesa: {tableNum} ✎
                </button>
              )
            )}
            {diningOption === 'delivery' && (
              (!deliveryValue || !Number(deliveryValue)) ? (
                <div className="flex items-center gap-2 ml-2">
                  {[5000, 6000, 7000].map(val => (
                    <button
                      key={val}
                      onClick={() => setDeliveryValue(val)}
                      className={`px-2 py-1 rounded-lg text-xs font-bold border transition-all ${Number(deliveryValue) === val ? 'bg-orange-500 text-white border-orange-500' : 'bg-[#16161D] text-gray-400 border-gray-700 hover:bg-[#25252e]'}`}
                    >
                      {formatCurrency(val)}
                    </button>
                  ))}
                  <input
                    type="number"
                    min="0"
                    placeholder="Otro"
                    value={![5000,6000,7000].includes(Number(deliveryValue)) ? deliveryValue : ''}
                    onChange={e => setDeliveryValue(e.target.value)}
                    className="w-16 px-2 py-1 rounded-lg bg-[#16161D] border border-gray-700 text-xs text-white text-center"
                  />
                </div>
              ) : (
                <button
                  className="ml-2 px-2 py-1 rounded-lg bg-[#25252e] border border-gray-700 text-xs text-white"
                  onClick={() => setDeliveryValue("")}
                  title="Cambiar valor domicilio"
                >
                  Domicilio: {formatCurrency(deliveryValue)} ✎
                </button>
              )
            )}
          </div>
        </div>

        {/* Lista de Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll">
          {carrito.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-700 opacity-50">
              <Utensils size={40} className="mb-4" />
              <p className="italic text-xs">Esperando pedido...</p>
            </div>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="bg-[#1c1c24] p-3 rounded-xl border border-gray-800/50 transition-all hover:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-bold text-gray-200 w-2/3 leading-tight line-clamp-2">{item.name}</p>
                  <p className="font-black text-xs text-orange-500">{formatCurrency(item.price * item.qty)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-[#0F0F13] rounded-lg px-2.5 py-1.5 border border-gray-800">
                    <button onClick={() => onRemoveCart(item)} className="text-gray-400 hover:text-white font-bold text-xs">-</button>
                    <span className="text-xs font-black text-white w-4 text-center">{item.qty}</span>
                    <button onClick={() => onAddCart(item)} className="text-gray-400 hover:text-white font-bold text-xs">+</button>
                  </div>
                  <span className="text-[10px] font-bold text-gray-600">{formatCurrency(item.price)} c/u</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totales y Botón de Pago */}
        <div className="p-6 bg-[#1c1c24] border-t border-gray-800 space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-gray-500 text-[11px] font-bold uppercase tracking-widest">
              <span>Subtotal</span>
              <span className="text-gray-300">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-[11px] font-bold uppercase tracking-widest">
              <span>Impuestos</span>
              <span className="text-gray-300">{formatCurrency(impuestos)}</span>
            </div>
            {diningOption === 'delivery' && (
              <div className="flex justify-between text-gray-500 text-[11px] font-bold uppercase tracking-widest pb-2 border-b border-gray-800/50">
                <span>Valor Domicilio</span>
                <span className="text-gray-300">{formatCurrency(deliveryValue)}</span>
              </div>
            )}
            {diningOption !== 'delivery' && (
              <div className="pb-2 border-b border-gray-800/50"></div>
            )}
          </div>
          <div className="flex justify-between items-end pt-1">
            <span className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">Total a Pagar</span>
            <span className="text-orange-500 text-3xl font-black leading-none">{formatCurrency(total)}</span>
          </div>
          <button
            className="w-full bg-orange-500 py-4 rounded-[16px] font-black text-base mt-3 hover:bg-orange-600 active:scale-95 transition-all shadow-[0_8px_20px_rgba(249,115,22,0.15)] uppercase tracking-widest"
            disabled={carrito.length === 0}
            style={carrito.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            onClick={() => carrito.length > 0 && typeof onCobrar === 'function' && onCobrar()}
          >
            COBRAR AHORA
          </button>
        </div>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #25252e; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #f97316; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default VentaCatalogo;