
import React, { useState } from "react";
import { Search } from "lucide-react";

// Ahora recibe clientes y setClientes por props (controlado por App.js)
const Clientes = ({ clientes, setClientes }) => {
  const [busqueda, setBusqueda] = useState("");
  const [nuevoCliente, setNuevoCliente] = useState({ name: "", phone: "", email: "", address: "" });
  const [editando, setEditando] = useState(null);
  const [progreso, setProgreso] = useState(0);
  const [cargando, setCargando] = useState(false);

  // Filtrar clientes por búsqueda
  const clientesFiltrados = clientes.filter((c) =>
    c.name.toLowerCase().includes(busqueda.toLowerCase()) ||
    (c.email && c.email.toLowerCase().includes(busqueda.toLowerCase())) ||
    (c.phone && c.phone.includes(busqueda))
  );

  // Exportar clientes (JSON)
  const handleExportar = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(clientes, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "clientes.json");
    dlAnchor.click();
  };

  // Agregar cliente
  const handleAgregar = () => {
    if (!nuevoCliente.name.trim()) return;
    setClientes((prev) => [
      ...prev,
      { ...nuevoCliente, id: Date.now().toString(), points: 0, visits: 0, spent: 0, color: "#3b82f6", notes: "" },
    ]);
    setNuevoCliente({ name: "", phone: "", email: "", address: "" });
  };

  // Eliminar cliente
  const handleEliminar = (id) => {
    setClientes((prev) => prev.filter((c) => c.id !== id));
  };

  // Editar cliente
  const handleEditar = (cli) => {
    setEditando(cli.id);
    setNuevoCliente({ name: cli.name, phone: cli.phone, email: cli.email, address: cli.address });
  };

  // Guardar edición
  const handleGuardar = (id) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...nuevoCliente } : c))
    );
    setEditando(null);
    setNuevoCliente({ name: "", phone: "", email: "", address: "" });
  };

  // Cancelar edición
  const handleCancelar = () => {
    setEditando(null);
    setNuevoCliente({ name: "", phone: "", email: "", address: "" });
  };

  // Importar clientes (JSON o CSV con barra de progreso y key única)
  const handleImportar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCargando(true);
    setProgreso(0);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      if (file.name.endsWith('.json')) {
        try {
          const imported = JSON.parse(text);
          if (Array.isArray(imported)) {
            setClientes(imported.map((cli, i) => ({
              ...cli,
              id: cli.id || `json${i+1}`
            })));
          }
        } catch {}
        setCargando(false);
        setProgreso(100);
      } else if (file.name.endsWith('.csv')) {
        const lines = text.split(/\r?\n/).filter(Boolean);
        if (lines.length < 2) { setCargando(false); setProgreso(100); return; }
        const header = lines[0].split(',').map(h => h.trim().toLowerCase());
        const nameIdx = header.findIndex(h => h.includes('nombre') || h === 'name');
        const phoneIdx = header.findIndex(h => h.includes('tel') || h === 'phone');
        const addressIdx = header.findIndex(h => h.includes('direc') || h === 'address');
        if (nameIdx === -1) { setCargando(false); setProgreso(100); return; }
        const seen = new Set();
        const clientesCsv = [];
        lines.slice(1).forEach((line, i) => {
          const cols = line.split(',');
          const name = cols[nameIdx]?.trim() || '';
          const phone = phoneIdx !== -1 ? cols[phoneIdx]?.trim() : '';
          const address = addressIdx !== -1 ? cols[addressIdx]?.trim() : '';
          if (!name && !phone) return;
          const key = (name + '|' + phone).toLowerCase();
          if (seen.has(key)) return;
          seen.add(key);
          clientesCsv.push({
            id: `csv${clientesCsv.length+1}_${name.replace(/\s/g, '').toLowerCase()}_${phone}`,
            name,
            phone,
            email: '',
            address,
            points: 0,
            visits: 0,
            spent: 0,
            color: '#3b82f6',
            notes: ''
          });
        });
        setClientes(clientesCsv);
        // Simular barra de progreso
        let prog = 0;
        const interval = setInterval(() => {
          prog += 10;
          setProgreso(Math.min(100, prog));
          if (prog >= 100) {
            clearInterval(interval);
            setCargando(false);
          }
        }, 30);
      }
    };
    reader.readAsText(file);
  };

  // ...el resto del código del componente (agregar, eliminar, editar, exportar, render)...

  return (
    <div className="fixed inset-0 flex w-full h-screen overflow-hidden bg-[#0F0F13] text-white font-sans">
      {/* Barra lateral solo escritorio */}
      <div className="w-[80px] min-w-[80px] h-full bg-[#0F0F13] hidden sm:block"></div>
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header Compacto con Margen Superior */}
        <div className="pt-4 px-3 pb-2 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-[#0F0F13] gap-2">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase leading-tight">Gestión de Clientes</h2>
            <p className="text-gray-500 text-[10px] sm:text-[11px] mt-0.5">Administra tus clientes y contactos</p>
          </div>
          <div className="relative w-full sm:w-72 mt-2 sm:mt-0">
            <Search className="absolute left-3.5 top-2.5 text-gray-600" size={16} />
            <input
              type="text"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              placeholder="Buscar cliente, email o teléfono..."
              className="w-full bg-[#16161D] border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-6 py-1.5 sm:py-2">
          <button className="px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold uppercase tracking-wider transition-all bg-green-600 text-white shadow-lg hover:bg-green-700" onClick={handleAgregar}>
            Agregar Cliente
          </button>
          <button className="px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold uppercase tracking-wider transition-all bg-blue-600 text-white shadow-lg hover:bg-blue-700" onClick={handleExportar}>
            Exportar
          </button>
          <label className="px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold uppercase tracking-wider transition-all bg-orange-500 text-white shadow-lg hover:bg-orange-600 cursor-pointer">
            Importar
            <input type="file" accept=".json,.csv" className="hidden" onChange={handleImportar} />
          </label>
        </div>

        {/* Tabla de clientes */}
        <div className="flex-1 overflow-y-auto custom-scroll px-2 sm:px-6 py-2 sm:py-4 bg-[#0F0F13]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm text-left border-separate border-spacing-y-1 sm:border-spacing-y-2">
              <thead>
                <tr className="text-gray-400 uppercase text-[10px] sm:text-xs">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Teléfono</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Dirección</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.map((c) => {
                  const isEditing = editando === c.id;
                  return (
                    <tr key={c.id} className="bg-[#18181F] hover:bg-[#23232c] rounded-lg sm:rounded-xl shadow border-b border-[#22222C]">
                      <td className="px-4 py-2 font-mono text-xs text-gray-400">{c.id}</td>
                      <td className="px-4 py-2 font-bold text-white">
                        {isEditing ? (
                          <input className="bg-[#23232c] rounded px-2 py-1 w-32" value={nuevoCliente.name} onChange={e => setNuevoCliente({ ...nuevoCliente, name: e.target.value })} />
                        ) : (
                          c.name
                        )}
                      </td>
                      <td className="px-4 py-2 text-gray-300">
                        {isEditing ? (
                          <input className="bg-[#23232c] rounded px-2 py-1 w-24" value={nuevoCliente.phone} onChange={e => setNuevoCliente({ ...nuevoCliente, phone: e.target.value })} />
                        ) : (
                          c.phone
                        )}
                      </td>
                      <td className="px-4 py-2 text-gray-300">
                        {isEditing ? (
                          <input className="bg-[#23232c] rounded px-2 py-1 w-32" value={nuevoCliente.email} onChange={e => setNuevoCliente({ ...nuevoCliente, email: e.target.value })} />
                        ) : (
                          c.email
                        )}
                      </td>
                      <td className="px-4 py-2 text-gray-300">
                        {isEditing ? (
                          <input className="bg-[#23232c] rounded px-2 py-1 w-40" value={nuevoCliente.address} onChange={e => setNuevoCliente({ ...nuevoCliente, address: e.target.value })} />
                        ) : (
                          c.address
                        )}
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        {isEditing ? (
                          <>
                            <button className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold hover:bg-green-700" onClick={() => handleGuardar(c.id)}>Guardar</button>
                            <button className="px-2 py-1 rounded bg-gray-600 text-white text-xs font-bold hover:bg-gray-700" onClick={handleCancelar}>Cancelar</button>
                          </>
                        ) : (
                          <>
                            <button className="px-2 py-1 rounded bg-blue-600 text-white text-xs font-bold hover:bg-blue-700" onClick={() => handleEditar(c)}>Editar</button>
                            <button className="px-2 py-1 rounded bg-red-600 text-white text-xs font-bold hover:bg-red-700" onClick={() => handleEliminar(c.id)}>Eliminar</button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {/* Formulario para agregar cliente */}
                <tr className="bg-[#23232c] border-b border-[#22222C] text-xs">
                  <td className="px-4 py-2 font-mono text-xs text-gray-400">Nuevo</td>
                  <td className="px-4 py-2">
                    <input className="bg-[#18181F] rounded px-2 py-1 w-32" value={nuevoCliente.name} onChange={e => setNuevoCliente({ ...nuevoCliente, name: e.target.value })} placeholder="Nombre" />
                  </td>
                  <td className="px-4 py-2">
                    <input className="bg-[#18181F] rounded px-2 py-1 w-24" value={nuevoCliente.phone} onChange={e => setNuevoCliente({ ...nuevoCliente, phone: e.target.value })} placeholder="Teléfono" />
                  </td>
                  <td className="px-4 py-2">
                    <input className="bg-[#18181F] rounded px-2 py-1 w-32" value={nuevoCliente.email} onChange={e => setNuevoCliente({ ...nuevoCliente, email: e.target.value })} placeholder="Email" />
                  </td>
                  <td className="px-4 py-2">
                    <input className="bg-[#18181F] rounded px-2 py-1 w-40" value={nuevoCliente.address} onChange={e => setNuevoCliente({ ...nuevoCliente, address: e.target.value })} placeholder="Dirección" />
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold hover:bg-green-700" onClick={handleAgregar}>Agregar</button>
                  </td>
                </tr>
                {clientesFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-10">No hay clientes para mostrar.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
