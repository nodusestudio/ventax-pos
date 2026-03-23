import React, { useState } from "react";
import { Search } from "lucide-react";
import { INIT_CATS } from "../data/categories";
import { INIT_PRODS } from "../data/products";


// Estado inicial de categorías
const categoriasIniciales = [...INIT_CATS];

const Productos = () => {


  const [categorias, setCategorias] = useState(categoriasIniciales);
  const [productos, setProductos] = useState(INIT_PRODS);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);
  const [editandoCat, setEditandoCat] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({ name: "", color: "#F97316", emoji: "🍔" });
  const [nuevoProducto, setNuevoProducto] = useState({
    name: "",
    catId: categorias[0]?.id || "",
    price: 0,
    cost: 0,
    stock: 0,
  });

  // Filtrar productos por categoría y búsqueda
  const productosFiltrados = productos.filter((p) => {
    const catObj = categorias.find((c) => c.id === p.catId);
    const matchCategoria =
      categoriaSeleccionada === "Todos" || (catObj && catObj.name === categoriaSeleccionada);
    const matchBusqueda =
      p.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      (catObj && catObj.name.toLowerCase().includes(busqueda.toLowerCase()));
    return matchCategoria && matchBusqueda;
  });

  // Agregar producto
  const handleAgregar = () => {
    if (!nuevoProducto.name.trim()) return;
    setProductos((prev) => [
      ...prev,
      {
        ...nuevoProducto,
        id: Date.now(),
        price: Number(nuevoProducto.price),
        cost: Number(nuevoProducto.cost),
        stock: Number(nuevoProducto.stock),
      },
    ]);
    setNuevoProducto({ name: "", catId: categorias[0]?.id || "", price: 0, cost: 0, stock: 0 });
  };

  // Agregar categoría
  const handleAgregarCategoria = () => {
    if (!nuevaCategoria.name.trim()) return;
    setCategorias((prev) => [
      ...prev,
      {
        ...nuevaCategoria,
        id: Date.now().toString(),
      },
    ]);
    setNuevaCategoria({ name: "", color: "#F97316", emoji: "🍔" });
  };

  // Eliminar categoría
  const handleEliminarCategoria = (id) => {
    setCategorias((prev) => prev.filter((c) => c.id !== id));
    setProductos((prev) => prev.filter((p) => p.catId !== id));
    if (categoriaSeleccionada !== "Todos" && categorias.find((c) => c.id === id)?.name === categoriaSeleccionada) {
      setCategoriaSeleccionada("Todos");
    }
  };

  // Editar categoría
  const handleEditarCategoria = (cat) => {
    setEditandoCat(cat.id);
    setNuevaCategoria({ name: cat.name, color: cat.color || "#F97316", emoji: cat.emoji || "🍔" });
  };

  // Guardar edición categoría
  const handleGuardarCategoria = (id) => {
    setCategorias((prev) => prev.map((c) => (c.id === id ? { ...c, ...nuevaCategoria } : c)));
    setEditandoCat(null);
    setNuevaCategoria({ name: "", color: "#F97316", emoji: "🍔" });
  };

  // Cancelar edición categoría
  const handleCancelarCategoria = () => {
    setEditandoCat(null);
    setNuevaCategoria({ name: "", color: "#F97316", emoji: "🍔" });
  };

  // Eliminar producto
  const handleEliminar = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  // Editar producto
  const handleEditar = (prod) => {
    setEditando(prod.id);
    setNuevoProducto({
      name: prod.name,
      catId: prod.catId,
      price: prod.price,
      cost: prod.cost || 0,
      stock: prod.stock,
    });
  };

  // Guardar edición
  const handleGuardar = (id) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, ...nuevoProducto, price: Number(nuevoProducto.price), cost: Number(nuevoProducto.cost), stock: Number(nuevoProducto.stock) }
          : p
      )
    );
    setEditando(null);
    setNuevoProducto({ name: "", catId: INIT_CATS[0]?.id || "", price: 0, cost: 0, stock: 0 });
  };

  // Cancelar edición
  const handleCancelar = () => {
    setEditando(null);
    setNuevoProducto({ name: "", catId: INIT_CATS[0]?.id || "", price: 0, cost: 0, stock: 0 });
  };

  return (
    <div className="fixed inset-0 flex w-full h-screen overflow-hidden bg-[#0F0F13] text-white font-sans">
      {/* Barra lateral solo escritorio */}
      <div className="w-[80px] min-w-[80px] h-full bg-[#0F0F13] hidden sm:block"></div>
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header Compacto con Margen Superior */}
        <div className="pt-4 px-3 pb-2 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-[#0F0F13] gap-2">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase leading-tight">Gestión de Productos</h2>
            <p className="text-gray-500 text-[10px] sm:text-[11px] mt-0.5">Administra tus productos y categorías</p>
          </div>
          <div className="relative w-full sm:w-72 mt-2 sm:mt-0">
            <Search className="absolute left-3.5 top-2.5 text-gray-600" size={16} />
            <input
              type="text"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              placeholder="Buscar producto o categoría..."
              className="w-full bg-[#16161D] border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Botones de categorías */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto px-2 sm:px-6 py-1.5 sm:py-2 custom-scroll whitespace-nowrap">
          <button
            key="Todos"
            onClick={() => setCategoriaSeleccionada("Todos")}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              categoriaSeleccionada === "Todos"
                ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30"
                : "bg-[#1c1c24] text-gray-400 border-gray-800 hover:border-gray-600 hover:bg-[#25252e]"
            }`}
          >
            Todos
          </button>
          {categorias.map((cat) => (
            <span key={cat.id} className="flex items-center gap-1">
              <button
                onClick={() => setCategoriaSeleccionada(cat.name)}
                className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  categoriaSeleccionada === cat.name
                    ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30"
                    : "bg-[#1c1c24] text-gray-400 border-gray-800 hover:border-gray-600 hover:bg-[#25252e]"
                }`}
              >
                <span>{cat.emoji || "🍔"}</span> {cat.name}
              </button>
              <button className="text-xs text-blue-400 hover:text-blue-600" onClick={() => handleEditarCategoria(cat)}>✏️</button>
              <button className="text-xs text-red-400 hover:text-red-600" onClick={() => handleEliminarCategoria(cat.id)}>🗑️</button>
            </span>
          ))}
          {/* Formulario para agregar categoría */}
          <span className="flex items-center gap-1">
            <input className="bg-[#18181F] rounded px-2 py-1 w-24 text-xs" value={nuevaCategoria.name} onChange={e => setNuevaCategoria({ ...nuevaCategoria, name: e.target.value })} placeholder="Nueva categoría" />
            <input className="bg-[#18181F] rounded px-2 py-1 w-10 text-xs" value={nuevaCategoria.emoji} onChange={e => setNuevaCategoria({ ...nuevaCategoria, emoji: e.target.value })} maxLength={2} placeholder="🍔" />
            <input className="bg-[#18181F] rounded px-2 py-1 w-16 text-xs" value={nuevaCategoria.color} onChange={e => setNuevaCategoria({ ...nuevaCategoria, color: e.target.value })} placeholder="#F97316" />
            <button className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold hover:bg-green-700" onClick={handleAgregarCategoria}>Agregar</button>
          </span>
          {/* Edición de categoría */}
          {editandoCat && (
            <span className="flex items-center gap-1">
              <input className="bg-[#18181F] rounded px-2 py-1 w-24 text-xs" value={nuevaCategoria.name} onChange={e => setNuevaCategoria({ ...nuevaCategoria, name: e.target.value })} placeholder="Nombre" />
              <input className="bg-[#18181F] rounded px-2 py-1 w-10 text-xs" value={nuevaCategoria.emoji} onChange={e => setNuevaCategoria({ ...nuevaCategoria, emoji: e.target.value })} maxLength={2} placeholder="🍔" />
              <input className="bg-[#18181F] rounded px-2 py-1 w-16 text-xs" value={nuevaCategoria.color} onChange={e => setNuevaCategoria({ ...nuevaCategoria, color: e.target.value })} placeholder="#F97316" />
              <button className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold hover:bg-green-700" onClick={() => handleGuardarCategoria(editandoCat)}>Guardar</button>
              <button className="px-2 py-1 rounded bg-gray-600 text-white text-xs font-bold hover:bg-gray-700" onClick={handleCancelarCategoria}>Cancelar</button>
            </span>
          )}
        </div>

        {/* Tabla de productos */}
        <div className="flex-1 overflow-y-auto custom-scroll px-2 sm:px-6 py-2 sm:py-4 bg-[#0F0F13]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm text-left border-separate border-spacing-y-1 sm:border-spacing-y-2">
              <thead>
                    <tr className="text-gray-400 uppercase text-[10px] sm:text-xs">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Categoría</th>
                  <th className="px-4 py-2">Precio</th>
                  <th className="px-4 py-2">Costo</th>
                  <th className="px-4 py-2">Stock</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((p) => {
                  const catObj = INIT_CATS.find((c) => c.id === p.catId);
                  const isEditing = editando === p.id;
                  return (
                    <tr key={p.id} className="bg-[#18181F] hover:bg-[#23232c] rounded-lg sm:rounded-xl shadow border-b border-[#22222C]">
                      <td className="px-4 py-2 font-mono text-xs text-gray-400">{p.id}</td>
                      <td className="px-4 py-2 font-bold text-white">
                        {isEditing ? (
                          <input className="bg-[#23232c] rounded px-2 py-1 w-32" value={nuevoProducto.name} onChange={e => setNuevoProducto({ ...nuevoProducto, name: e.target.value })} />
                        ) : (
                          p.name
                        )}
                      </td>
                      <td className="px-4 py-2 text-orange-400 font-bold">
                        {isEditing ? (
                          <select className="bg-[#23232c] rounded px-2 py-1" value={nuevoProducto.catId} onChange={e => setNuevoProducto({ ...nuevoProducto, catId: e.target.value })}>
                            {INIT_CATS.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                          </select>
                        ) : (
                          catObj ? catObj.name : "-"
                        )}
                      </td>
                      <td className="px-4 py-2 text-green-400 font-bold">
                        {isEditing ? (
                          <input type="number" className="bg-[#23232c] rounded px-2 py-1 w-20" value={nuevoProducto.price} onChange={e => setNuevoProducto({ ...nuevoProducto, price: e.target.value })} />
                        ) : (
                          `$${p.price.toLocaleString('es-CO')}`
                        )}
                      </td>
                      <td className="px-4 py-2 text-blue-400 font-bold">
                        {isEditing ? (
                          <input type="number" className="bg-[#23232c] rounded px-2 py-1 w-20" value={nuevoProducto.cost} onChange={e => setNuevoProducto({ ...nuevoProducto, cost: e.target.value })} />
                        ) : (
                          `$${(p.cost || 0).toLocaleString('es-CO')}`
                        )}
                      </td>
                      <td className="px-4 py-2 text-gray-300">
                        {isEditing ? (
                          <input type="number" className="bg-[#23232c] rounded px-2 py-1 w-16" value={nuevoProducto.stock} onChange={e => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })} />
                        ) : (
                          p.stock
                        )}
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        {isEditing ? (
                          <>
                            <button className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold hover:bg-green-700" onClick={() => handleGuardar(p.id)}>Guardar</button>
                            <button className="px-2 py-1 rounded bg-gray-600 text-white text-xs font-bold hover:bg-gray-700" onClick={handleCancelar}>Cancelar</button>
                          </>
                        ) : (
                          <>
                            <button className="px-2 py-1 rounded bg-blue-600 text-white text-xs font-bold hover:bg-blue-700" onClick={() => handleEditar(p)}>Editar</button>
                            <button className="px-2 py-1 rounded bg-red-600 text-white text-xs font-bold hover:bg-red-700" onClick={() => handleEliminar(p.id)}>Eliminar</button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              {/* Formulario para agregar producto */}
              {productosFiltrados.length === 0 && (
                <tr className="bg-[#23232c] border-b border-[#22222C] text-xs">
                  <td colSpan={7} className="text-center text-gray-500 py-10">No hay productos para mostrar.</td>
                </tr>
              )}
              <tr className="bg-[#23232c] border-b border-[#22222C] text-xs">
                <td className="px-4 py-2 font-mono text-xs text-gray-400">Nuevo</td>
                <td className="px-4 py-2">
                  <input className="bg-[#18181F] rounded px-2 py-1 w-32" value={nuevoProducto.name} onChange={e => setNuevoProducto({ ...nuevoProducto, name: e.target.value })} placeholder="Nombre" />
                </td>
                <td className="px-4 py-2">
                  <select className="bg-[#18181F] rounded px-2 py-1" value={nuevoProducto.catId} onChange={e => setNuevoProducto({ ...nuevoProducto, catId: e.target.value })}>
                    {INIT_CATS.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input type="number" className="bg-[#18181F] rounded px-2 py-1 w-20" value={nuevoProducto.price} onChange={e => setNuevoProducto({ ...nuevoProducto, price: e.target.value })} placeholder="Precio" />
                </td>
                <td className="px-4 py-2">
                  <input type="number" className="bg-[#18181F] rounded px-2 py-1 w-20" value={nuevoProducto.cost} onChange={e => setNuevoProducto({ ...nuevoProducto, cost: e.target.value })} placeholder="Costo" />
                </td>
                <td className="px-4 py-2">
                  <input type="number" className="bg-[#18181F] rounded px-2 py-1 w-16" value={nuevoProducto.stock} onChange={e => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })} placeholder="Stock" />
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold hover:bg-green-700" onClick={handleAgregar}>Agregar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Productos;
