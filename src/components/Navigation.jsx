import { LayoutGrid, ShoppingCart, Clock, Receipt, Box, Users, BarChart3, Settings } from 'lucide-react';

const menu = [
  { id: 'venta', label: 'VENTAS' },
  { id: 'tickets', label: 'TICKETS' },
  { id: 'caja', label: 'CAJA' },
  { id: 'productos', label: 'PRODUCTOS' },
  { id: 'clientes', label: 'CLIENTES' },
  { id: 'informes', label: 'INFORMES' }
];

const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="w-20 bg-[#16161D] border-r border-gray-800 flex flex-col items-center py-4 h-screen sticky top-0">
      <div className="mb-8 text-orange-500 border-2 border-orange-500 rounded-lg p-1">
        <LayoutGrid size={32} />
      </div>
      {/* Botón Panel igual a los demás */}
      <button
        onClick={() => setActiveTab('panel')}
        className={`w-full flex flex-col items-center justify-center py-4 transition-all ${activeTab === 'panel' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}
      >
        <BarChart3 size={24} />
        <span className="text-[10px] mt-1 font-medium">PANEL</span>
      </button>
      <div className="flex-1 w-full space-y-2">
        {menu.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex flex-col items-center justify-center py-4 transition-all ${activeTab === item.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}
          >
            {item.id === 'venta' && <ShoppingCart size={24} />}
            {item.id === 'tickets' && <Receipt size={24} />}
            {item.id === 'caja' && <LayoutGrid size={24} />}
            {item.id === 'productos' && <Box size={24} />}
            {item.id === 'clientes' && <Users size={24} />}
            {item.id === 'informes' && <BarChart3 size={24} />}
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => setActiveTab('ajustes')}
        className={`w-full flex flex-col items-center justify-center py-4 transition-all ${activeTab === 'ajustes' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}
      >
        <Settings size={24} />
        <span className="text-[10px] mt-1 font-medium">AJUSTES</span>
      </button>
    </nav>
  );
};

export default Navigation;
