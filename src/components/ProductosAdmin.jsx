import React, { useState } from 'react';
import VentaCatalogo from './VentaCatalogo';

const ProductosAdmin = ({ productos, categorias, extras, config, onEdit, onDelete, onAdd, onCategoryEdit, onExtraEdit, onConfigSave }) => {
  const [subTab, setSubTab] = useState('productos');

  const tabList = [
    { key: 'categorias', label: 'CATEGORÍAS' },
    { key: 'productos', label: 'PRODUCTOS' },
    { key: 'adicionales', label: 'ADICIONALES' },
    { key: 'configuracion', label: 'CONFIGURACIÓN' }
  ];

  // Estado visual de categorías para la subpestaña productos
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const categoriasNombres = ['Todos', ...categorias.map(cat => cat.name)];
  const productosFiltrados = categoriaSeleccionada === 'Todos'
    ? productos
    : productos.filter(p => {
        const catObj = categorias.find(c => c.name === categoriaSeleccionada);
        return catObj ? p.catId === catObj.id : false;
      });

  return (
    <div className="flex flex-col h-full bg-[#0F0F13] p-6">
      {/* Sub-navegación */}
      <div className="flex gap-8 border-b border-gray-800 mb-6">
        {tabList.map(tab => (
          <button
            key={tab.key}
            onClick={() => setSubTab(tab.key)}
            className={`pb-2 text-sm font-semibold transition-all relative ${subTab === tab.key ? 'text-white' : 'text-gray-400'} group`}
            style={{ outline: 'none', background: 'none', border: 'none' }}
          >
            {tab.label}
            <span className={`absolute left-0 right-0 -bottom-[2px] h-1 rounded bg-orange-500 transition-all ${subTab === tab.key ? 'opacity-100' : 'opacity-0'}`}></span>
          </button>
        ))}
      </div>

      {/* Contenido de cada sub-pestaña */}
      <div className="flex-1 overflow-y-auto">
        {subTab === 'categorias' && (
          <div className="bg-[#16161D] rounded-xl p-6 text-gray-200 shadow border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Gestión de Categorías</h2>
            {/* Aquí va el componente o formulario de categorías */}
            <div className="text-gray-400">Aquí puedes crear, editar o eliminar categorías.</div>
          </div>
        )}
        {subTab === 'productos' && (
          <div className="bg-[#16161D] rounded-xl p-6 text-gray-200 shadow border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Inventario de Productos</h2>
            {/* Aquí va la tabla o grid de productos, NO el catálogo de ventas */}
            <div className="text-gray-400">Aquí irá la tabla de productos con imagen, nombre, categoría, precio, stock y acciones.</div>
          </div>
        )}
        {subTab === 'adicionales' && (
          <div className="bg-[#16161D] rounded-xl p-6 text-gray-200 shadow border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Gestión de Adicionales</h2>
            <div className="text-gray-400">Aquí puedes crear, editar o eliminar adicionales (extras).</div>
          </div>
        )}
        {subTab === 'configuracion' && (
          <div className="bg-[#16161D] rounded-xl p-6 text-gray-200 shadow border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Configuración General</h2>
            <div className="text-gray-400">Aquí puedes ajustar el nombre del local, moneda, impuestos, etc.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductosAdmin;
