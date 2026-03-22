// ...existing code...
import Ajustes from './components/Ajustes.jsx';
import React, { useState, useEffect } from 'react';
import './styles/main.css';
import '../src/index.css';
import VentaCatalogo from './components/VentaCatalogo.jsx';
import Panel from './components/Panel.jsx';
import Tickets from './components/Tickets.jsx';
import Productos from './components/Productos.jsx';
import Clientes from './components/Clientes.jsx';
import Informes from './components/Informes.jsx';
import PaymentModal from './components/PaymentModal.jsx';
import ReceiptPrint from './components/ReceiptPrint.jsx';
import Caja from './components/Caja.jsx';
// Opciones de tipo de pedido y mesas
const DINING_OPTS = [
  { id: 'dine_in', ic: '🍽️', lbl: 'Salón' },
  { id: 'takeout', ic: '🛍️', lbl: 'Llevar' },
  { id: 'delivery', ic: '🛵', lbl: 'Domicilio' },
];
const TABLE_NUMS = ['1','2','3','4','5','6','7','8','Barra','Terraza'];
import CarritoLateral from './components/CarritoLateral.jsx';
import BottomTabs from './components/BottomTabs.jsx';
import Navigation from './components/Navigation.jsx';
import { INIT_PRODS } from './data/products.js';
import { INIT_CATS } from './data/categories.js';
import { INIT_CUSTOMERS } from './data/customers.js';
import { INIT_STORE } from './data/store.js';
import { formatCurrency as importedFormatCurrency } from './hooks/useUtils.js';

const formatCurrency = typeof importedFormatCurrency === 'function'
  ? importedFormatCurrency
  : (value) => `$${Number(value).toLocaleString('es-CO')}`;

function App() {
      // ...existing code...
      // Estado para tipo de pedido y mesa (declaración única, no duplicar)
      // ...otros estados...
      const [tickets, setTickets] = useState([]);
      // Eliminar ticket por id (debe estar aquí para acceder a setTickets)
      const handleDeleteTicket = (ticketId) => {
        setTickets(prev => prev.filter(t => t.id !== ticketId));
      };
    // ...existing code...
    // Estado para tipo de pedido y mesa
    const [diningOption, setDiningOption] = useState('dine_in');
    const [tableNum, setTableNum] = useState(TABLE_NUMS[0]);
    const [deliveryValue, setDeliveryValue] = useState(5000);

    // Exponer setDiningOption globalmente para Panel.jsx
    useEffect(() => {
      window.setDiningOption = setDiningOption;
      return () => { window.setDiningOption = null; };
    }, [setDiningOption]);
  // Estado global para configuración de recibos (cabecera, pie, logos, switches, idioma)
  const [configRecibo, setConfigRecibo] = useState(() => ({
    ...INIT_STORE,
    logoWhatsapp: '', // base64 o url
    logoImpreso: '', // base64 o url
    mostrarCliente: true,
    mostrarComentarios: true,
    idioma: 'Español',
    habilitarWhatsapp: true,
    habilitarPDF: true,
  }));
  // Métodos de pago globales (siempre inicializados)
  const defaultMetodosPago = [
    { id: 'efectivo', nombre: 'Efectivo' },
    { id: 'tarjeta', nombre: 'Tarjeta' },
    { id: 'transferencia', nombre: 'Transferencia' },
  ];
  const [metodosPago, setMetodosPago] = useState(() => defaultMetodosPago);
  // Estado global de funciones del sistema (ajustes)
  const [funcionesConfig, setFuncionesConfig] = useState({
    cierres: true,
    tickets: true,
    impresoras: true,
    pantalla: true,
    tipoPedido: true,
    notificaciones: false,
    alertas: false,
    pesoVariable: false,
  });
      // Marcar mesa como servida
  // Trigger para forzar re-render visual tras cambio de estado
  const [mesaTrigger, setMesaTrigger] = useState(0);
  useEffect(() => {
    window.setMesaServida = (ticketId) => {
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, estado: 'servida' } : t));
      setMesaTrigger(x => x + 1); // Forzar re-render
    };
    return () => { window.setMesaServida = null; };
  }, []);
    // Manejar edición de pedido de mesa desde Panel
    function handleMesaEdit(ticket) {
      setEditingTicket(ticket);
      setCarrito(ticket.productos.map(p => ({ ...p })));
      setTableNum(ticket.mesa);
    }
  // Estado para clientes
  // Persistencia de clientes en localStorage
  const [clientes, setClientes] = React.useState(() => {
    const saved = localStorage.getItem("clientes");
    if (saved) {
      try {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) return arr;
      } catch {}
    }
    return INIT_CUSTOMERS;
  });

  React.useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [activeTab, setActiveTab] = useState('panel');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [carrito, setCarrito] = useState([]);
  // Estado para edición de ticket
  const [editingTicket, setEditingTicket] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Estado de caja
  const [cajaAbierta, setCajaAbierta] = useState(false);
  const [movimientosCaja, setMovimientosCaja] = useState([]);
  const [datosCaja, setDatosCaja] = useState({
    numero: 1,
    horaApertura: null,
    horaCierre: null,
    totalVentas: 0,
    egresos: 0,
    pagos: [],
    historial: []
  });

  // Abrir caja
  const handleAbrirCaja = () => {
    setCajaAbierta(true);
    setDatosCaja(prev => ({ ...prev, horaApertura: new Date().toLocaleTimeString(), horaCierre: null, totalVentas: 0, egresos: 0, pagos: [], movimientos: [] }));
    setMovimientosCaja([]);
  };
  // Cerrar caja
  const handleCerrarCaja = () => {
    setCajaAbierta(false);
    setDatosCaja(prev => ({
      ...prev,
      horaCierre: new Date().toLocaleTimeString(),
      historial: [
        { ...prev, horaCierre: new Date().toLocaleTimeString() },
        ...(prev.historial || [])
      ]
    }));
    setMovimientosCaja([]);
  };

  // Estado para tipo de pedido y mesa

  // Filtrado de productos
  const productosFiltrados = categoriaSeleccionada === 'Todos'
    ? INIT_PRODS
    : INIT_PRODS.filter(p => {
        const catObj = INIT_CATS.find(c => c.name === categoriaSeleccionada);
        return catObj ? p.catId === catObj.id : false;
      });

  // Manejo de categorías
  const categorias = ['Todos', ...INIT_CATS.map(c => c.name)];

  // Lógica de agregar al carrito o ticket en edición
  const handleAdd = (prod, isEditing = false) => {
    if (isEditing && editingTicket) {
      setEditingTicket(prev => {
        const idx = prev.productos.findIndex(item => item.id === prod.id);
        if (idx !== -1) {
          const updated = { ...prev };
          updated.productos = [...prev.productos];
          updated.productos[idx] = { ...updated.productos[idx], qty: updated.productos[idx].qty + 1 };
          return updated;
        } else {
          return { ...prev, productos: [...prev.productos, { ...prod, qty: 1 }] };
        }
      });
    } else {
      setCarrito(prev => {
        const idx = prev.findIndex(item => item.id === prod.id);
        if (idx !== -1) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], qty: updated[idx].qty + 1 };
          return updated;
        } else {
          return [...prev, { ...prod, qty: 1 }];
        }
      });
    }
  };

  // Lógica de remover del carrito o ticket en edición
  const handleRemove = (prodId, isEditing = false) => {
    if (isEditing && editingTicket) {
      setEditingTicket(prev => {
        const idx = prev.productos.findIndex(item => item.id === prodId);
        if (idx !== -1) {
          const updated = { ...prev };
          updated.productos = [...prev.productos];
          if (updated.productos[idx].qty > 1) {
            updated.productos[idx] = { ...updated.productos[idx], qty: updated.productos[idx].qty - 1 };
          } else {
            updated.productos = updated.productos.filter(item => item.id !== prodId);
          }
          return updated;
        }
        return prev;
      });
    } else {
      setCarrito(prev => {
        const idx = prev.findIndex(item => item.id === prodId);
        if (idx !== -1) {
          const updated = [...prev];
          if (updated[idx].qty > 1) {
            updated[idx] = { ...updated[idx], qty: updated[idx].qty - 1 };
            return updated;
          } else {
            return updated.filter(item => item.id !== prodId);
          }
        }
        return prev;
      });
    }
  };

  // Total del carrito
  const total = carrito.reduce((acc, item) => acc + item.price * item.qty, 0) + (diningOption === 'delivery' ? Number(deliveryValue) : 0);
  // Total del ticket en edición
  const editTotal = editingTicket ? editingTicket.productos.reduce((acc, item) => acc + item.price * item.qty, 0) : 0;
  // Abrir modal de edición de ticket
  const handleEditTicket = (ticket) => {
    setEditingTicket({ ...ticket });
    setShowEditModal(true);
  };

  // Guardar cambios en ticket editado
  const handleSaveEditedTicket = () => {
    if (!editingTicket) return;
    setTickets(prev => prev.map(t => t.id === editingTicket.id ? { ...editingTicket, total: editTotal } : t));
    setEditingTicket(null);
    setShowEditModal(false);
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditingTicket(null);
    setShowEditModal(false);
  };

  // Modal de pago y recibo
  const [showPayment, setShowPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  // Botón Cobrar
  const handleCobrar = () => {
    setShowPayment(true);
  };

  const handleConfirmPayment = (payments) => {
    // Si es edición de mesa, al cobrar se cierra la mesa (estado: 'cerrado')
    if (editingTicket && editingTicket.mesa) {
      alert('Cobro: Mesa cerrada correctamente');
      const ticket = {
        ...editingTicket,
        productos: carrito.map(item => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
        total,
        payments,
        estado: 'cerrado',
        fecha: new Date().toLocaleString(),
      };
      setTickets(prev => prev.map(t => t.id === ticket.id ? ticket : t));
      setPaymentResult(ticket);
      setCarrito([]);
      setEditingTicket(null);
      setShowPayment(false);
      setActiveTab('panel');
      return;
    }
    // Guardar ticket normal
    const ticket = {
      id: 'tk' + Date.now(),
      productos: carrito.map(item => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
      total,
      payments,
      cliente: clientes.find(c => c.id === clienteSeleccionado) || null,
      fecha: new Date().toLocaleString(),
    };
    setTickets(prev => [...prev, ticket]);
    setPaymentResult(ticket); // Mostrará el recibo
    setCarrito([]);
    setShowPayment(false);
    // Puedes mostrar un recibo o notificación
    console.log('Pago realizado:', payments);
  };

  // Lógica para agregar un nuevo cliente
  const handleAgregarCliente = (nuevoCliente) => {
    // Generar un id único simple
    const id = 'cu' + Date.now();
    setClientes(prev => [...prev, { ...nuevoCliente, id }]);
    setClienteSeleccionado(id);
  };

  // Guardar pedido en mesa y regresar al panel
  // Estado para controlar la sección activa del Panel
  const [panelSection, setPanelSection] = useState('TODOS');

  React.useEffect(() => {
    window.onGuardarPedidoMesa = () => {
      if (!carrito.length || !tableNum) return;
      const ticket = {
        id: 'mesa' + tableNum + '-' + Date.now(),
        mesa: tableNum,
        productos: carrito.map(item => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
        total: carrito.reduce((acc, item) => acc + item.price * item.qty, 0),
        tipo: 'MESAS',
        fecha: new Date().toLocaleString(),
        cliente: clientes.find(c => c.id === clienteSeleccionado) || null,
        estado: 'abierto',
      };
      setTickets(prev => [...prev, ticket]);
      setCarrito([]);
      setActiveTab('panel');
      setPanelSection('MESAS');
    };
    window.onGuardarPedidoLlevar = () => {
      if (!carrito.length) return;
      const ticket = {
        id: 'llevar-' + Date.now(),
        productos: carrito.map(item => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
        total: carrito.reduce((acc, item) => acc + item.price * item.qty, 0),
        tipo: 'LLEVAR',
        fecha: new Date().toLocaleString(),
        cliente: clientes.find(c => c.id === clienteSeleccionado) || null,
        estado: 'abierto',
      };
      setTickets(prev => [...prev, ticket]);
      setCarrito([]);
      setActiveTab('panel');
      setPanelSection('LLEVAR');
    };
    window.onGuardarPedidoDomicilio = () => {
      if (!carrito.length) return;
      const ticket = {
        id: 'domicilio-' + Date.now(),
        productos: carrito.map(item => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
        total: carrito.reduce((acc, item) => acc + item.price * item.qty, 0),
        tipo: 'DOMICILIOS',
        fecha: new Date().toLocaleString(),
        cliente: clientes.find(c => c.id === clienteSeleccionado) || null,
        estado: 'abierto',
      };
      setTickets(prev => [...prev, ticket]);
      setCarrito([]);
      setActiveTab('panel');
      setPanelSection('DOMICILIOS');
    };
    return () => {
      window.onGuardarPedidoMesa = null;
      window.onGuardarPedidoLlevar = null;
      window.onGuardarPedidoDomicilio = null;
    };
  }, [carrito, tableNum, clientes, clienteSeleccionado]);

  return (
    <div className="app flex">
      {/* Barra lateral solo en PC */}
      <div className="sidebar-wrapper">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="flex-1">
        {activeTab === 'panel' && <Panel setActiveTab={setActiveTab} setTableNum={setTableNum} tickets={tickets} setEditingTicket={handleMesaEdit} panelSection={panelSection} setPanelSection={setPanelSection} onDeleteTicket={handleDeleteTicket} />}
        {activeTab === 'venta' && (
          <>
            <VentaCatalogo
              productos={productosFiltrados}
              categorias={categorias}
              categoriaSeleccionada={categoriaSeleccionada}
              setCategoriaSeleccionada={setCategoriaSeleccionada}
              onAdd={handleAdd}
              formatCurrency={formatCurrency}
              carrito={carrito}
              onAddCart={handleAdd}
              onRemoveCart={(item) => handleRemove(item.id)}
              onClearCart={() => setCarrito([])}
              subtotal={carrito.reduce((acc, item) => acc + item.price * item.qty, 0)}
              impuestos={0}
              total={total}
              diningOption={diningOption}
              setDiningOption={setDiningOption}
              tableNum={tableNum}
              setTableNum={setTableNum}
              DINING_OPTS={DINING_OPTS}
              TABLE_NUMS={TABLE_NUMS}
              deliveryValue={deliveryValue}
              setDeliveryValue={setDeliveryValue}
              clienteSeleccionado={clienteSeleccionado}
              setClienteSeleccionado={setClienteSeleccionado}
              clientes={clientes}
              onAgregarCliente={handleAgregarCliente}
              onCobrar={handleCobrar}
            />
            <PaymentModal
              open={showPayment}
              total={total}
              carrito={carrito}
              metodosPago={metodosPago}
              onClose={() => setShowPayment(false)}
              onConfirm={(payments) => {
                // Si el carrito corresponde a un ticket parcial pendiente (marca: 'Parcial' y sin pagos), actualizar ese ticket
                const partialIdx = tickets.findIndex(t => t.marca === 'Parcial' && t.payments.length === 0 && t.productos.length === carrito.length && t.productos.every((p, i) => p.id === carrito[i].id && p.qty === carrito[i].qty));
                if (partialIdx !== -1) {
                  // Actualizar el ticket parcial con los datos de pago y mostrar recibo
                  const updatedTicket = {
                    ...tickets[partialIdx],
                    payments,
                    total,
                  };
                  setTickets(prev => prev.map((t, i) => i === partialIdx ? updatedTicket : t));
                  setPaymentResult(updatedTicket);
                  setCarrito([]);
                  setShowPayment(false);
                } else {
                  handleConfirmPayment(payments);
                }
              }}
              onPartialPay={({ selected, remaining, amount }) => {
                // Detectar si el pago parcial viene de un ticket guardado (edición) o del carrito
                if (editingTicket) {
                  // Actualizar el ticket original quitando los productos pagados
                  const updatedTicket = {
                    ...editingTicket,
                    productos: editingTicket.productos.filter(p => !selected.some(sel => sel.id === p.id)),
                    total: editingTicket.productos.filter(p => !selected.some(sel => sel.id === p.id)).reduce((acc, item) => acc + item.price * item.qty, 0)
                  };
                  setTickets(prev => [
                    ...prev.filter(t => t.id !== editingTicket.id),
                    updatedTicket,
                    {
                      id: 'tk' + Date.now() + '-parcial',
                      productos: selected,
                      total: amount,
                      payments: [],
                      cliente: editingTicket.cliente,
                      fecha: new Date().toLocaleString(),
                      marca: 'Parcial',
                    }
                  ]);
                  setEditingTicket(null);
                  setShowEditModal(false);
                } else {
                  // Pago parcial desde carrito
                  const partialTicket = {
                    id: 'tk' + Date.now() + '-parcial',
                    productos: selected,
                    total: amount,
                    payments: [],
                    cliente: clientes.find(c => c.id === clienteSeleccionado) || null,
                    fecha: new Date().toLocaleString(),
                    marca: 'Parcial',
                  };
                  setTickets(prev => [
                    ...prev,
                    partialTicket
                  ]);
                  setCarrito(remaining);
                }
                setShowPayment(false);
                setTimeout(() => {
                  setCarrito(selected);
                  setShowPayment(true);
                }, 300);
              }}
            />
          {/* Modal de recibo digital tras cobro (siempre visible si paymentResult tiene valor) */}
          {paymentResult && (
            <ReceiptPrint
              ticket={paymentResult}
              configRecibo={configRecibo}
              onClose={() => setPaymentResult(null)}
            />
          )}
          </>
        )}
        {activeTab === 'tickets' && (
          <Tickets tickets={tickets} onEditTicket={handleEditTicket} />
        )}
              {/* Modal de edición de ticket */}
              {showEditModal && editingTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <div className="bg-[#181824] rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-800 relative">
                    <h2 className="text-xl font-black text-white mb-4">Editar Ticket #{editingTicket.id}</h2>
                    <div className="space-y-3 mb-4">
                      {editingTicket.productos.map((item, idx) => (
                        <div key={item.id} className="flex items-center justify-between bg-[#232334] rounded-lg px-4 py-2">
                          <span className="text-white font-bold">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <button className="bg-gray-700 text-white rounded px-2" onClick={() => handleRemove(item.id, true)}>-</button>
                            <span className="text-orange-400 font-black w-6 text-center">{item.qty}</span>
                            <button className="bg-orange-500 text-white rounded px-2" onClick={() => handleAdd(item, true)}>+</button>
                          </div>
                          <span className="text-gray-400 font-bold">{formatCurrency(item.price * item.qty)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400 font-bold">Total:</span>
                      <span className="text-orange-500 text-2xl font-black">{formatCurrency(editTotal)}</span>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button className="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold" onClick={handleCancelEdit}>Cancelar</button>
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold" onClick={handleSaveEditedTicket}>Guardar Cambios</button>
                    </div>
                    <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={handleCancelEdit} title="Cerrar">✕</button>
                  </div>
                </div>
              )}
        {activeTab === 'productos' && <Productos />}
        {activeTab === 'clientes' && <Clientes clientes={clientes} setClientes={setClientes} />}
        {activeTab === 'informes' && <Informes />}
        {activeTab === 'caja' && funcionesConfig.cierres && (
          <Caja
            movimientos={movimientosCaja}
            cajaAbierta={cajaAbierta}
            datosCaja={datosCaja}
            onAbrirCaja={handleAbrirCaja}
            onCerrarCaja={handleCerrarCaja}
          />
        )}
        {activeTab === 'ajustes' && (
          <Ajustes
            funcionesConfig={funcionesConfig}
            setFuncionesConfig={setFuncionesConfig}
            metodosPago={metodosPago}
            setMetodosPago={setMetodosPago}
            configRecibo={configRecibo}
            setConfigRecibo={setConfigRecibo}
          />
        )}
      </div>
      {/* Barra inferior solo en móvil */}
      <div className="bottom-tabs-wrapper">
        <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
