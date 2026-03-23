import React from "react";
import { Search } from "lucide-react";

// Recibe tickets y función para editar
const Tickets = ({ tickets = [], onEditTicket }) => {
  return (
    <div className="fixed inset-0 flex w-full h-screen overflow-hidden bg-[#0F0F13] text-white font-sans">
      {/* Barra lateral solo escritorio */}
      <div className="w-[80px] min-w-[80px] h-full bg-[#0F0F13] hidden sm:block"></div>
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header Compacto con Margen Superior */}
        <div className="pt-4 px-3 pb-2 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-[#0F0F13] gap-2">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase leading-tight">Tickets Guardados</h2>
            <p className="text-gray-500 text-[10px] sm:text-[11px] mt-0.5">Gestión de Tickets POS</p>
          </div>
          <div className="relative w-full sm:w-72 mt-2 sm:mt-0">
            <Search className="absolute left-3.5 top-2.5 text-gray-600" size={16} />
            <input
              type="text"
              placeholder="Buscar por cliente, ticket o producto..."
              className="w-full bg-[#16161D] border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Botones de filtro de tickets */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto px-2 sm:px-6 py-1.5 sm:py-2 custom-scroll whitespace-nowrap">
          <button className="px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold uppercase tracking-wider transition-all bg-orange-500 text-white shadow-lg shadow-orange-500/30">
            TODOS LOS TICKETS
          </button>
          <button className="px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold uppercase tracking-wider transition-all bg-[#1c1c24] text-gray-400 border border-gray-800 hover:bg-[#25252e]">
            MESA
          </button>
          <button className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all bg-[#1c1c24] text-gray-400 border border-gray-800 hover:bg-[#25252e]">
            LLEVAR
          </button>
          <button className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all bg-[#1c1c24] text-gray-400 border border-gray-800 hover:bg-[#25252e]">
            DOMICILIOS
          </button>
        </div>

        {/* Lista de tickets de ejemplo */}
        <div className="flex-1 overflow-y-auto custom-scroll px-2 sm:px-6 py-2 sm:py-4 bg-[#0F0F13]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-[#1c1c24] rounded-lg sm:rounded-xl p-2 sm:p-5 border border-gray-800 shadow flex flex-col gap-1 sm:gap-2 group relative text-xs sm:text-sm">
                      {/* Botón flotante de ticket solo móvil */}
                      <button className="sm:hidden fixed bottom-20 right-4 z-40 bg-orange-500 text-white font-black rounded-full px-6 py-3 shadow-lg flex items-center gap-2 text-lg active:scale-95 transition-all">
                        Ticket
                      </button>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-orange-500">#{ticket.id}</span>
                  <span className="text-xs text-gray-400">{ticket.fecha}</span>
                </div>
                <div className="text-xs text-gray-400 mb-1">{ticket.tipo ? ticket.tipo : ''} · Cliente: <span className="text-gray-200 font-bold">{ticket.cliente?.name || ticket.cliente || 'Sin cliente'}</span></div>
                <div className="mb-1">
                  <span className="font-bold text-gray-400">Productos:</span>
                  <ul className="ml-4 list-disc text-gray-200 text-sm">
                    {ticket.productos.map((p, idx) => (
                      <li key={idx}>{p.name} x{p.qty} - <span className="text-orange-400 font-bold">${p.price.toLocaleString('es-CO')}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="font-black text-orange-500 text-lg mt-2">Total: ${ticket.total.toLocaleString('es-CO')}</div>
                <button
                  className="absolute top-2 right-2 bg-orange-500 text-white rounded-lg px-2 py-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onEditTicket(ticket)}
                  title="Editar Ticket"
                >Editar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
