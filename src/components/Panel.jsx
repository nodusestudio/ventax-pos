// Panel.jsx - Panel principal para métricas, accesos rápidos y resumen POS
import React, { useState, useEffect } from "react";

function getMinutesElapsed(fecha) {
  if (!fecha) return 0;
  const created = new Date(fecha);
  const now = new Date();
  return Math.floor((now - created) / 60000);
}

export default function Panel({ setActiveTab, setTableNum, tickets = [], setEditingTicket, panelSection = 'TODOS', setPanelSection, onDeleteTicket }) {
  const [activePanel, setActivePanel] = useState(panelSection);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const handleDeleteClick = (ticket) => {
    setTicketToDelete(ticket);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    if (ticketToDelete && onDeleteTicket) onDeleteTicket(ticketToDelete.id);
    setShowDeleteModal(false);
    setTicketToDelete(null);
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTicketToDelete(null);
  };
  // Sincroniza el panel activo con el prop externo
  useEffect(() => {
    if (panelSection !== activePanel) setActivePanel(panelSection);
  }, [panelSection]);
  useEffect(() => {
    if (activePanel !== panelSection && setPanelSection) setPanelSection(activePanel);
  }, [activePanel]);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  const mesasOcupadas = tickets.filter(t => t.tipo === 'MESAS' && t.estado === 'abierto');
  const mesasOcupadasMap = Object.fromEntries(mesasOcupadas.map(t => [t.mesa, t]));
  const handleIniciarPedido = (num) => {
    if (setTableNum) setTableNum(num.toString());
    if (setActiveTab) setActiveTab('venta');
  };
  const handleEditarMesa = (ticket) => {
    if (setEditingTicket) setEditingTicket(ticket);
    if (setTableNum) setTableNum(ticket.mesa);
    if (setActiveTab) setActiveTab('venta');
  };
  return (
    <div className="fixed inset-0 flex w-full h-screen overflow-hidden bg-[#0F0F13] text-white font-sans">
      {/* Barra lateral solo escritorio */}
      <div className="w-[80px] min-w-[80px] h-full bg-[#0F0F13] hidden sm:block"></div>
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header Compacto con Margen Superior */}
        <div className="pt-4 px-3 pb-2 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-[#0F0F13] gap-2">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase leading-tight">Panel Principal</h2>
            <p className="text-gray-500 text-[10px] sm:text-[11px] mt-0.5">Resumen y accesos rápidos del POS</p>
          </div>
          <div className="relative w-full sm:w-72 mt-2 sm:mt-0">
            <svg className="absolute left-3.5 top-2.5 text-gray-600" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="7" r="6"/><line x1="11" y1="11" x2="15" y2="15"/></svg>
            <input
              type="text"
              placeholder="Buscar en el panel..."
              className="w-full bg-[#16161D] border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all shadow-inner"
            />
          </div>
        </div>
        {/* Botones de acceso rápido igual a Tickets */}
        <div className="flex items-center gap-2 overflow-x-auto px-3 sm:px-6 py-2 custom-scroll whitespace-nowrap">
          <button onClick={() => setActivePanel('TODOS')} className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${activePanel === 'TODOS' ? 'bg-orange-500 text-white shadow-orange-500/30' : 'bg-[#23232b] text-gray-300 hover:bg-orange-500/20'}`}>TODOS</button>
          <button onClick={() => setActivePanel('MESAS')} className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${activePanel === 'MESAS' ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-[#23232b] text-gray-300 hover:bg-green-500/20'}`}>MESAS</button>
          <button onClick={() => setActivePanel('LLEVAR')} className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${activePanel === 'LLEVAR' ? 'bg-blue-500 text-white shadow-blue-500/30' : 'bg-[#23232b] text-gray-300 hover:bg-blue-500/20'}`}>LLEVAR</button>
          <button onClick={() => setActivePanel('DOMICILIOS')} className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${activePanel === 'DOMICILIOS' ? 'bg-purple-500 text-white shadow-purple-500/30' : 'bg-[#23232b] text-gray-300 hover:bg-purple-500/20'}`}>DOMICILIOS</button>
        </div>
        {/* Panel dinámico */}
        {activePanel === 'MESAS' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 px-2 sm:px-6 mt-4 sm:mt-6">
            {[1,2,3,4,5,6,7].map(num => {
              const ticket = mesasOcupadasMap[num.toString()];
              const ocupada = !!ticket;
              return (
                <div
                  key={num}
                  className={`min-w-0 w-full bg-[#23232b] rounded-xl p-6 flex flex-col items-center border shadow-lg transition-all ${ocupada ? 'border-orange-500 shadow-orange-500/30 cursor-pointer hover:bg-[#2a2a2f]' : 'border-gray-800'}`}
                  onClick={() => ocupada && handleEditarMesa(ticket)}
                  title={ocupada ? 'Editar pedido de mesa' : ''}
                >
                  <span className={`text-2xl font-black mb-2 ${ocupada ? 'text-orange-400' : 'text-green-400'}`}>MESA {num}</span>
                  {ocupada && (
                    <>
                      <div className="text-lg font-bold text-orange-400 mb-1 w-full text-center">Total: ${ticket.total?.toLocaleString('es-CO')}</div>
                      <div className="text-xs text-gray-400 mb-1 w-full text-center">{ticket.productos?.length || 0} productos</div>
                      <div className="w-full bg-[#181824] rounded-lg p-2 mb-2 border border-gray-800">
                        <ul className="text-xs text-gray-200 divide-y divide-gray-800">
                          {ticket.productos?.map((prod, idx) => (
                            <li key={prod.id+idx} className="flex justify-between items-center py-1">
                              <span className="font-bold text-orange-300 mr-2">{prod.qty}x</span>
                              <span className="flex-1 text-gray-100 truncate">{prod.name}</span>
                              <span className="text-gray-400 ml-2">${prod.price?.toLocaleString('es-CO')}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                  <button
                    className={`mt-4 px-4 py-2 rounded-lg font-bold shadow transition w-full ${ocupada ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                    onClick={e => { e.stopPropagation(); if (!ocupada) handleIniciarPedido(num); }}
                    disabled={ocupada}
                  >
                    {ocupada ? 'OCUPADA' : 'Iniciar Pedido'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : activePanel === 'LLEVAR' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 px-2 sm:px-6 mt-4 sm:mt-6">
            {/* Tarjeta para iniciar nuevo pedido */}
            <div className="min-w-0 w-full bg-[#23232b] rounded-xl p-6 flex flex-col items-center border border-blue-500 shadow-lg">
              <span className="font-black text-blue-400 text-xl mb-2">Nuevo pedido para llevar</span>
              <button
                className="px-4 py-2 rounded-lg font-bold shadow transition bg-blue-500 text-white hover:bg-blue-600 w-full"
                onClick={() => {
                  if (window.setDiningOption) window.setDiningOption('takeout');
                  if (setActiveTab) setActiveTab('venta');
                }}
              >
                Iniciar pedido para llevar
              </button>
            </div>
            {/* Tarjetas de pedidos activos */}
            {tickets.filter(t => t.tipo === 'LLEVAR' && t.estado === 'abierto').map(ticket => (
              <div key={ticket.id} className="min-w-0 w-full bg-[#23232b] rounded-xl p-6 flex flex-col items-center border border-blue-500 shadow-lg cursor-pointer hover:bg-[#2a2a2f] transition-all relative">
                <div className="absolute top-2 right-2 flex gap-1 z-10">
                  <button title="Editar" onClick={e => {e.stopPropagation(); setEditingTicket(ticket); if (setActiveTab) setActiveTab('venta');}} className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-600 text-white text-xs shadow focus:outline-none"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.3 2.7l-1-1a1 1 0 0 0-1.4 0l-7 7V12h3.3l7-7a1 1 0 0 0 0-1.4z"/></svg></button>
                  <button title="Eliminar" onClick={e => {e.stopPropagation(); handleDeleteClick(ticket);}} className="w-7 h-7 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-600 text-white text-xs shadow focus:outline-none"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/></svg></button>
                </div>
                <div className="font-black text-blue-400 text-xl mb-1">Pedido #{ticket.id.slice(-4)}</div>
                <div className="text-lg font-bold text-blue-400 mb-1">Total: ${ticket.total?.toLocaleString('es-CO')}</div>
                <div className="text-xs text-gray-400 mb-1">{ticket.productos?.length || 0} productos</div>
                {/* Datos de cliente si existen */}
                {ticket.cliente && (
                  <div className="w-full bg-[#181824] rounded-lg p-2 mb-2 border border-blue-800 text-left text-xs text-gray-200">
                    <div className="font-bold text-blue-300">{ticket.cliente.name}</div>
                    {ticket.cliente.address && <div>📍 {ticket.cliente.address}</div>}
                    {ticket.cliente.phone && <div>📱 {ticket.cliente.phone}</div>}
                  </div>
                )}
                <div className="w-full bg-[#181824] rounded-lg p-2 mb-2 border border-gray-800">
                  <ul className="text-xs text-gray-200 divide-y divide-gray-800">
                    {ticket.productos?.map((prod, idx) => (
                      <li key={prod.id+idx} className="flex justify-between items-center py-1">
                        <span className="font-bold text-blue-300 mr-2">{prod.qty}x</span>
                        <span className="flex-1 text-gray-100 truncate">{prod.name}</span>
                        <span className="text-gray-400 ml-2">${prod.price?.toLocaleString('es-CO')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : activePanel === 'DOMICILIOS' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 px-2 sm:px-6 mt-4 sm:mt-6">
            {/* Tarjeta para iniciar nuevo pedido */}
            <div className="min-w-0 w-full bg-[#23232b] rounded-xl p-6 flex flex-col items-center border border-purple-500 shadow-lg">
              <span className="font-black text-purple-400 text-xl mb-2">Nuevo pedido a domicilio</span>
              <button
                className="px-4 py-2 rounded-lg font-bold shadow transition bg-purple-500 text-white hover:bg-purple-600 w-full"
                onClick={() => {
                  if (window.setDiningOption) window.setDiningOption('delivery');
                  if (setActiveTab) setActiveTab('venta');
                }}
              >
                Iniciar pedido para domicilio
              </button>
            </div>
            {/* Tarjetas de pedidos activos */}
            {tickets.filter(t => t.tipo === 'DOMICILIOS' && t.estado === 'abierto').map(ticket => (
              <div key={ticket.id} className="min-w-0 w-full bg-[#23232b] rounded-xl p-6 flex flex-col items-center border border-purple-500 shadow-lg cursor-pointer hover:bg-[#2a2a2f] transition-all relative">
                <div className="absolute top-2 right-2 flex gap-1 z-10">
                  <button title="Editar" onClick={e => {e.stopPropagation(); setEditingTicket(ticket); if (setActiveTab) setActiveTab('venta');}} className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-700 hover:bg-purple-600 text-white text-xs shadow focus:outline-none"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.3 2.7l-1-1a1 1 0 0 0-1.4 0l-7 7V12h3.3l7-7a1 1 0 0 0 0-1.4z"/></svg></button>
                  <button title="Eliminar" onClick={e => {e.stopPropagation(); handleDeleteClick(ticket);}} className="w-7 h-7 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-600 text-white text-xs shadow focus:outline-none"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/></svg></button>
                </div>
                <div className="font-black text-purple-400 text-xl mb-1">Pedido #{ticket.id.slice(-4)}</div>
                <div className="text-lg font-bold text-purple-400 mb-1">Total: ${ticket.total?.toLocaleString('es-CO')}</div>
                <div className="text-xs text-gray-400 mb-1">{ticket.productos?.length || 0} productos</div>
                {/* Datos de cliente si existen */}
                {ticket.cliente && (
                  <div className="w-full bg-[#181824] rounded-lg p-2 mb-2 border border-purple-800 text-left text-xs text-gray-200">
                    <div className="font-bold text-purple-300">{ticket.cliente.name}</div>
                    {ticket.cliente.address && <div>📍 {ticket.cliente.address}</div>}
                    {ticket.cliente.phone && <div>📱 {ticket.cliente.phone}</div>}
                  </div>
                )}
                <div className="w-full bg-[#181824] rounded-lg p-2 mb-2 border border-gray-800">
                  <ul className="text-xs text-gray-200 divide-y divide-gray-800">
                    {ticket.productos?.map((prod, idx) => (
                      <li key={prod.id+idx} className="flex justify-between items-center py-1">
                        <span className="font-bold text-purple-300 mr-2">{prod.qty}x</span>
                        <span className="flex-1 text-gray-100 truncate">{prod.name}</span>
                        <span className="text-gray-400 ml-2">${prod.price?.toLocaleString('es-CO')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-8 px-2 sm:px-6 mt-4 sm:mt-6 overflow-y-auto custom-scroll" style={{maxHeight:'calc(100vh - 170px)'}}>
            {/* MESAS */}
            <div>
              <h3 className="text-lg font-bold text-green-400 mb-2 text-center">MESAS</h3>
              {tickets.filter(t => t.tipo === 'MESAS' && t.estado === 'abierto').length === 0 && (
                <div className="text-gray-500 text-center">Sin pedidos activos</div>
              )}
              {tickets.filter(t => t.tipo === 'MESAS' && t.estado === 'abierto').map(ticket => (
                <div key={ticket.id} className="min-w-0 w-full bg-[#23232b] rounded-xl p-6 flex flex-col items-center border border-green-500 shadow-lg cursor-pointer hover:bg-[#2a2a2f] transition-all relative" onClick={() => handleEditarMesa(ticket)}>
                  {/* Botones minimalistas */}
                  <div className="absolute top-2 right-2 flex gap-1 z-10">
                    <button title="Editar" onClick={e => {e.stopPropagation(); handleEditarMesa(ticket);}} className="w-7 h-7 flex items-center justify-center rounded-full bg-green-700 hover:bg-green-600 text-white text-xs shadow focus:outline-none"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.3 2.7l-1-1a1 1 0 0 0-1.4 0l-7 7V12h3.3l7-7a1 1 0 0 0 0-1.4z"/></svg></button>
                    <button title="Eliminar" onClick={e => {e.stopPropagation(); handleDeleteClick(ticket);}} className="w-7 h-7 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-600 text-white text-xs shadow focus:outline-none"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/></svg></button>
                  </div>
                  <div className="font-black text-orange-400 text-xl mb-1">Mesa {ticket.mesa}</div>
                  <div className="text-lg font-bold text-orange-400 mb-1">Total: ${ticket.total?.toLocaleString('es-CO')}</div>
                  <div className="text-xs text-gray-400 mb-1">{ticket.productos?.length || 0} productos</div>
                  <div className="w-full bg-[#181824] rounded-lg p-2 mb-2 border border-gray-800">
                    <ul className="text-xs text-gray-200 divide-y divide-gray-800">
                      {ticket.productos?.map((prod, idx) => (
                        <li key={prod.id+idx} className="flex justify-between items-center py-1">
                          <span className="font-bold text-purple-300 mr-2">{prod.qty}x</span>
                          <span className="flex-1 text-gray-100 truncate">{prod.name}</span>
                          <span className="text-gray-400 ml-2">${prod.price?.toLocaleString('es-CO')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            {/* LLEVAR */}
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-2 text-center">LLEVAR</h3>
              {tickets.filter(t => t.tipo === 'LLEVAR' && t.estado === 'abierto').length === 0 && (
                <div className="text-gray-500 text-center">Sin pedidos activos</div>
              )}
              {tickets.filter(t => t.tipo === 'LLEVAR' && t.estado === 'abierto').map(ticket => (
                <div key={ticket.id} className="min-w-0 w-full bg-[#23232b] rounded-xl p-6 flex flex-col items-center border border-blue-500 shadow-lg transition-all relative">
                  <div className="absolute top-2 right-2 flex gap-1 z-10">
                    <button title="Editar" onClick={e => {e.stopPropagation(); setEditingTicket(ticket); if (setActiveTab) setActiveTab('venta');}} className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-600 text-white text-xs shadow focus:outline-none"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.3 2.7l-1-1a1 1 0 0 0-1.4 0l-7 7V12h3.3l7-7a1 1 0 0 0 0-1.4z"/></svg></button>
                    <button title="Eliminar" onClick={e => {e.stopPropagation(); handleDeleteClick(ticket);}} className="w-7 h-7 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-600 text-white text-xs shadow focus:outline-none"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/></svg></button>
                  </div>
                  <div className="font-black text-blue-400 text-xl mb-1">Pedido #{ticket.id.slice(-4)}</div>
                  <div className="text-lg font-bold text-blue-400 mb-1">Total: ${ticket.total?.toLocaleString('es-CO')}</div>
                  <div className="text-xs text-gray-400 mb-1">{ticket.productos?.length || 0} productos</div>
                  {ticket.cliente && (
                    <div className="w-full bg-[#181824] rounded-lg p-2 mb-2 border border-blue-800 text-left text-xs text-gray-200">
                      <div className="font-bold text-blue-300">{ticket.cliente.name}</div>
                      {ticket.cliente.address && <div>📍 {ticket.cliente.address}</div>}
                      {ticket.cliente.phone && <div>📱 {ticket.cliente.phone}</div>}
                    </div>
                  )}
                  <div className="w-full bg-[#181824] rounded-lg p-2 mb-2 border border-gray-800">
                    <ul className="text-xs text-gray-200 divide-y divide-gray-800">
                      {ticket.productos?.map((prod, idx) => (
                        <li key={prod.id+idx} className="flex justify-between items-center py-1">
                          <span className="font-bold text-blue-300 mr-2">{prod.qty}x</span>
                          <span className="flex-1 text-gray-100 truncate">{prod.name}</span>
                          <span className="text-gray-400 ml-2">${prod.price?.toLocaleString('es-CO')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            {/* DOMICILIOS */}
            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-2 text-center">DOMICILIOS</h3>
              {tickets.filter(t => t.tipo === 'DOMICILIOS' && t.estado === 'abierto').length === 0 && (
                <div className="text-gray-500 text-center">Sin pedidos activos</div>
              )}
              {tickets.filter(t => t.tipo === 'DOMICILIOS' && t.estado === 'abierto').map(ticket => (
                <div key={ticket.id} className="min-w-0 w-full bg-[#23232b] rounded-xl p-6 flex flex-col items-center border border-purple-500 shadow-lg transition-all relative">
                  <div className="absolute top-2 right-2 flex gap-1 z-10">
                    <button title="Editar" onClick={e => {e.stopPropagation(); setEditingTicket(ticket); if (setActiveTab) setActiveTab('venta');}} className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-700 hover:bg-purple-600 text-white text-xs shadow focus:outline-none"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.3 2.7l-1-1a1 1 0 0 0-1.4 0l-7 7V12h3.3l7-7a1 1 0 0 0 0-1.4z"/></svg></button>
                    <button title="Eliminar" onClick={e => {e.stopPropagation(); handleDeleteClick(ticket);}} className="w-7 h-7 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-600 text-white text-xs shadow focus:outline-none"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/></svg></button>
                  </div>
                        {/* Modal de confirmación de eliminación */}
                        {showDeleteModal && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                            <div className="bg-[#23232b] rounded-xl p-8 shadow-xl border border-red-700 min-w-[300px] flex flex-col items-center">
                              <div className="text-lg font-bold text-red-500 mb-4">¿Eliminar pedido?</div>
                              <div className="text-gray-300 mb-6 text-center">Esta acción no se puede deshacer.<br/>¿Seguro que deseas eliminar el pedido <span className='font-bold'>{ticketToDelete?.id?.slice(-4)}</span>?</div>
                              <div className="flex gap-4">
                                <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold shadow">Sí, eliminar</button>
                                <button onClick={cancelDelete} className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold shadow">Cancelar</button>
                              </div>
                            </div>
                          </div>
                        )}
                  <div className="font-black text-purple-400 text-xl mb-1">Pedido #{ticket.id.slice(-4)}</div>
                  <div className="text-lg font-bold text-purple-400 mb-1">Total: ${ticket.total?.toLocaleString('es-CO')}</div>
                  <div className="text-xs text-gray-400 mb-1">{ticket.productos?.length || 0} productos</div>
                  {ticket.cliente && (
                    <div className="w-full bg-[#181824] rounded-lg p-2 mb-2 border border-purple-800 text-left text-xs text-gray-200">
                      <div className="font-bold text-purple-300">{ticket.cliente.name}</div>
                      {ticket.cliente.address && <div>📍 {ticket.cliente.address}</div>}
                      {ticket.cliente.phone && <div>📱 {ticket.cliente.phone}</div>}
                    </div>
                  )}
                  <div className="w-full bg-[#181824] rounded-lg p-2 mb-2 border border-gray-800">
                    <ul className="text-xs text-gray-200 divide-y divide-gray-800">
                      {ticket.productos?.map((prod, idx) => (
                        <li key={prod.id+idx} className="flex justify-between items-center py-1">
                          <span className="font-bold text-purple-300 mr-2">{prod.qty}x</span>
                          <span className="flex-1 text-gray-100 truncate">{prod.name}</span>
                          <span className="text-gray-400 ml-2">${prod.price?.toLocaleString('es-CO')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
