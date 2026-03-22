
import React, { useState } from "react";
import { INIT_PRODS } from '../data/products.js';

const PAYMENT_TYPES = [
  { id: "single", label: "Un pago" },
  { id: "split", label: "Dividir" },
  { id: "partial", label: "Parcial" },
];


export default function PaymentModal({ open, total, onClose, onConfirm, carrito = [], onPartialPay, metodosPago = [] }) {
  const [type, setType] = useState("single");
  const [methodA, setMethodA] = useState(metodosPago[0]?.id || "");
  const [methodB, setMethodB] = useState(metodosPago[1]?.id || "");
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  // inputValue is only for 'single' mode
  const [inputValue, setInputValue] = useState("");
  // partialAmount is only for 'partial' mode
  const [partialAmount, setPartialAmount] = useState("");
  const [error, setError] = useState("");
  // Para productos seleccionados en parcial (solo los del carrito)
  const [selectedProducts, setSelectedProducts] = useState(carrito.map(p => p.id));

  if (!open) return null;

  // Validaciones y cálculo de cambio
  let recibido = 0;
  let cambio = 0;
  if (type === "single") {
    recibido = Number(inputValue) || total;
    cambio = recibido > 0 ? recibido - total : 0;
  } else if (type === "split") {
    // For split, show amountA and amountB as received for each input
    // No global recibido/cambio
  } else if (type === "partial") {
    // Suma de productos seleccionados del carrito
    const selected = carrito.filter(p => selectedProducts.includes(p.id));
    const sum = selected.reduce((acc, p) => acc + (p.price * (p.qty || 1)), 0);
    recibido = sum || Number(partialAmount) || 0;
    cambio = 0;
  }

  const handleConfirm = () => {
    setError("");
    if (type === "single") {
      if (recibido < total) {
        setError("El monto recibido es menor al total.");
        return;
      }
      onConfirm([
        { method: methodA, amount: total, cashIn: recibido || undefined },
      ]);
      onClose();
    } else if (type === "split") {
      const a = Number(amountA);
      const b = Number(amountB);
      if (!a || !b) {
        setError("Ambos montos son requeridos.");
        return;
      }
      if (a + b !== total) {
        setError("La suma debe ser igual al total.");
        return;
      }
      onConfirm([
        { method: methodA, amount: a },
        { method: methodB, amount: b },
      ]);
      onClose();
    } else if (type === "partial") {
      // Pago parcial: pasar productos seleccionados y método de pago
      if (selectedProducts.length === 0) {
        setError("Selecciona al menos un producto.");
        return;
      }
      const selected = carrito.filter(p => selectedProducts.includes(p.id));
      const remaining = carrito.filter(p => !selectedProducts.includes(p.id));
      const amt = selected.reduce((acc, p) => acc + (p.price * (p.qty || 1)), 0);
      if (!amt || amt <= 0 || amt > total) {
        setError("Monto parcial inválido.");
        return;
      }
      // Llama a la función especial para pago parcial
      if (onPartialPay) {
        onPartialPay({
          selected,
          remaining,
          amount: amt,
          method: methodA
        });
      }
      onClose();
    }
  };

  // Teclado numérico para todos los métodos
  const handleKeypad = (val) => {
    if (val === 'del') {
      setInputValue(inputValue.slice(0, -1));
    } else if (val === '000') {
      setInputValue(inputValue + '000');
    } else {
      setInputValue(inputValue + val);
    }
    setError("");
  };
  const handleClear = () => setInputValue("");

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#18181F] rounded-2xl shadow-2xl p-0 w-full max-w-[430px] min-w-[320px] border border-[#23232b] relative animate-fadeIn flex flex-col items-center overflow-hidden max-h-[98vh] custom-scrollbar">
        {/* Barra superior */}
        <div className="w-full flex items-center justify-between px-6 pt-4 pb-2 bg-[#18181F] border-b border-[#23232b] relative">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💳</span>
            <span className="text-lg font-black text-white">Cobrar · María García</span>
          </div>
          <button
            className="text-gray-500 hover:text-orange-500 text-xl font-bold"
            onClick={onClose}
            title="Cerrar"
          >×</button>
        </div>
        {/* Subtítulo productos y total */}
        <div className="w-full px-6 pt-1 pb-2 bg-[#18181F]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-300 text-sm font-medium">{carrito.reduce((acc, p) => acc + (p.qty || 1), 0)} producto{carrito.reduce((acc, p) => acc + (p.qty || 1), 0) !== 1 ? 's' : ''}</div>
              <div className="text-orange-400 text-xs font-bold">incl. domicilio $7.000</div>
            </div>
            <div className="text-3xl font-black text-orange-500">${total.toLocaleString('es-CO')}</div>
          </div>
        </div>
        {/* Tabs de pago */}
        <div className="w-full flex items-center gap-0 px-6 pt-2 pb-0 border-b border-[#23232b]">
          {PAYMENT_TYPES.map(opt => (
            <button
              key={opt.id}
              className={`flex-1 flex items-center justify-center gap-2 py-2 font-bold text-base border-b-2 transition-all ${type === opt.id ? 'border-orange-500 text-orange-400' : 'border-transparent text-gray-400 hover:text-orange-300'}`}
              onClick={() => { setType(opt.id); setError(""); }}
              type="button"
              disabled={opt.id === 'partial' && carrito.length <= 1}
              style={opt.id === 'partial' && carrito.length <= 1 ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
            >
              {opt.id === 'single' && <span className="text-lg">💳</span>}
              {opt.id === 'split' && <span className="text-lg">✂️</span>}
              {opt.id === 'partial' && <span className="text-lg">🧾</span>}
              {opt.label}
            </button>
          ))}
        </div>
        {type === "single" && (
          <div className="mb-4 flex flex-col justify-between overflow-y-auto max-h-[48vh] custom-scrollbar">
            <label className="block text-xs font-bold text-gray-500 mb-1">Método de pago</label>
            <div className="flex flex-wrap gap-2 mb-3 min-h-[48px]">
              {metodosPago.map(opt => (
                <button
                  key={opt.id}
                  className={`flex-1 flex flex-col items-center justify-center px-2 py-2 rounded-lg font-bold text-xs border transition-all shadow-sm
                    ${methodA === opt.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-[#23232b] text-gray-300 border-gray-700 hover:bg-orange-50'}`}
                  onClick={() => { setMethodA(opt.id); setError(""); handleClear(); }}
                  type="button"
                >
                  {opt.nombre}
                </button>
              ))}
            </div>
            <div className="mb-2 flex-1 flex flex-col justify-end">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400 text-xs font-bold">Recibido</span>
                <span className="text-2xl font-black text-white">${(Number(inputValue) || total).toLocaleString('es-CO')}</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2 min-h-[180px] overflow-x-hidden">
                {[1,2,3,4,5,6,7,8,9,'000',0,'del'].map((val, i) => (
                  <button
                    key={i}
                    className={`py-3 rounded-lg font-black text-lg ${val==='del' ? 'bg-red-900 text-red-400' : 'bg-[#18181F] text-white hover:bg-orange-500 hover:text-white'} transition-all`}
                    onClick={() => val==='del' ? handleKeypad('del') : handleKeypad(val.toString())}
                    type="button"
                  >
                    {val==='del' ? <span>&#9003;</span> : val}
                  </button>
                ))}
              </div>
              <button className="w-full py-2 mt-1 rounded-lg bg-gray-700 text-white font-bold text-xs" onClick={handleClear} type="button">Limpiar</button>
            </div>
            {recibido > 0 && recibido >= total && (
              <div className="text-green-500 text-xs font-bold mt-1">Cambio: ${cambio.toLocaleString('es-CO')}</div>
            )}
          </div>
        )}
        {type === "split" && (
          <div className="mb-4 w-full flex flex-col gap-4 overflow-y-auto max-h-[48vh] pr-1 custom-scrollbar">
            <div className="bg-[#18181F] border-2 border-orange-500 rounded-xl p-4 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-400 font-bold text-lg">● Pago A</span>
                <span className="text-orange-400 font-bold text-lg">-</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3 min-h-[48px] overflow-x-hidden">
                {metodosPago.map(opt => (
                  <button
                    key={opt.id}
                    className={`flex-1 min-w-[120px] flex items-center justify-center px-2 py-2 rounded-lg font-bold text-xs border transition-all shadow-sm
                      ${methodA === opt.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-[#23232b] text-gray-300 border-gray-700 hover:bg-orange-50'}`}
                    onClick={() => { setMethodA(opt.id); setError(""); }}
                    type="button"
                  >
                    {opt.nombre}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="flex-1 bg-transparent border-2 border-orange-500 rounded-lg px-4 py-2 text-lg text-white font-bold focus:outline-none focus:bg-[#23232b] focus:border-orange-400 transition-colors"
                  placeholder={`Monto (máx $${total.toLocaleString('es-CO')})`}
                  value={amountA || Math.floor(total/2)}
                  onChange={e => setAmountA(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={9}
                />
                <button
                  className="bg-orange-500 text-white font-bold px-4 py-2 rounded-lg text-lg"
                  type="button"
                  onClick={() => setAmountA(Math.floor(total/2).toString())}
                >50%</button>
              </div>
            </div>
            <div className="bg-[#18181F] border-2 border-green-500 rounded-xl p-4 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-bold text-lg">● Pago B</span>
                <span className="text-green-400 font-bold text-lg">-</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3 min-h-[48px] overflow-x-hidden">
                {metodosPago.map(opt => (
                  <button
                    key={opt.id}
                    className={`flex-1 min-w-[120px] flex items-center justify-center px-2 py-2 rounded-lg font-bold text-xs border transition-all shadow-sm
                      ${methodB === opt.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-[#23232b] text-gray-300 border-gray-700 hover:bg-orange-50'}`}
                    onClick={() => { setMethodB(opt.id); setError(""); }}
                    type="button"
                  >
                    {opt.nombre}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  className="flex-1 bg-transparent border-2 border-green-500 rounded-lg px-4 py-2 text-lg text-white font-bold focus:outline-none focus:bg-[#23232b] focus:border-green-400 transition-colors"
                  placeholder="Monto (o toca Resto)"
                  value={amountB || (total - Number(amountA || 0))}
                  onChange={e => setAmountB(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={9}
                />
                <button
                  className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg text-lg"
                  type="button"
                  onClick={() => setAmountB((total - Number(amountA || 0)).toString())}
                >Resto</button>
              </div>
            </div>
          </div>
        )}
        {type === "partial" && (
          <div className="mb-4 w-full flex flex-col gap-4 overflow-y-auto max-h-[48vh] custom-scrollbar">
            <div className="bg-[#18181F] border-2 border-orange-500 rounded-xl p-4 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-400 font-bold text-lg">Selecciona productos</span>
                <span className="text-orange-400 font-bold text-lg cursor-pointer" onClick={() => setSelectedProducts(selectedProducts.length === carrito.length ? [] : carrito.map(p=>p.id))}>{selectedProducts.length === carrito.length ? 'Ninguno' : 'Todos'}</span>
              </div>
              <div className="flex flex-col gap-2 mb-3 max-h-32 overflow-y-auto">
                {carrito.map(prod => (
                  <label key={prod.id} className={`flex items-center justify-between bg-[#23232b] rounded-lg px-3 py-2 border ${selectedProducts.includes(prod.id) ? 'border-orange-500' : 'border-gray-700'}`}>
                    <span className="flex items-center gap-2 text-white font-bold"><span className="text-xl">{prod.emoji || '🍔'}</span> {prod.name} {prod.qty > 1 ? `x${prod.qty}` : ''}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-orange-400 font-bold text-lg">${(prod.price * (prod.qty || 1)).toLocaleString('es-CO')}</span>
                      <input type="checkbox" checked={selectedProducts.includes(prod.id)} onChange={() => {
                        setSelectedProducts(selectedProducts.includes(prod.id)
                          ? selectedProducts.filter(id => id !== prod.id)
                          : [...selectedProducts, prod.id]);
                      }} className="accent-orange-500 w-5 h-5" />
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-400 text-xs font-bold">A cobrar ahora</span>
                <span className="text-orange-400 font-black text-xl">${carrito.filter(p=>selectedProducts.includes(p.id)).reduce((acc,p)=>acc+(p.price*(p.qty||1)),0).toLocaleString('es-CO')}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-gray-500 text-xs font-bold">Queda pendiente</span>
                <span className="text-gray-400 font-black text-lg">${(total-carrito.filter(p=>selectedProducts.includes(p.id)).reduce((acc,p)=>acc+(p.price*(p.qty||1)),0)).toLocaleString('es-CO')}</span>
              </div>
            </div>
            <button className="w-full py-2 mt-4 rounded-lg bg-orange-500 text-white font-bold text-base" onClick={handleConfirm} type="button">Cobrar productos seleccionados</button>
          </div>
        )}
        {error && <div className="text-red-600 text-xs font-bold mb-2 text-center animate-shake">{error}</div>}
        <div className="flex gap-2 mt-auto w-full px-6 pb-5 pt-2 bg-[#18181F] border-t border-[#23232b] sticky bottom-0 z-10">
          <button className="flex-1 bg-[#23232b] text-gray-300 py-3 rounded-lg font-bold hover:bg-gray-700 transition-all border border-[#23232b]" onClick={onClose} type="button">Cancelar</button>
          <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-black hover:bg-orange-600 transition-all shadow-lg border border-orange-500" onClick={handleConfirm} type="button">
            {type === 'single' && `Cobrar $${total.toLocaleString('es-CO')}`}
            {type === 'split' && 'Cobrar' }
            {type === 'partial' && `Cobrar $${partialAmount ? Number(partialAmount).toLocaleString('es-CO') : total.toLocaleString('es-CO')}`}
          </button>
        </div>
      </div>
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.2s; }
        .animate-shake { animation: shake 0.2s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
        @keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-4px); } 50% { transform: translateX(4px); } 75% { transform: translateX(-4px); } 100% { transform: translateX(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; background: #18181F; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #23232b; border-radius: 8px; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #23232b #18181F; overflow-x: hidden !important; }
      `}</style>
    </div>
  );
}
