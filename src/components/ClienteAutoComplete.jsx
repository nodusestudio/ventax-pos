import React, { useState, useRef, useEffect } from "react";

/**
 * Buscador inteligente de clientes con autocompletado.
 * Props:
 * - clientes: array de clientes {id, name, phone, ...}
 * - value: id del cliente seleccionado
 * - onChange: function(id) => void
 */
export default function ClienteAutoComplete({ clientes, value, onChange, placeholder = "Buscar cliente por nombre o teléfono..." }) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    if (input.trim() === "") {
      setFiltered(clientes);
    } else {
      const q = input.toLowerCase();
      setFiltered(
        clientes.filter(c =>
          c.name.toLowerCase().includes(q) ||
          (c.phone && c.phone.includes(q))
        )
      );
    }
  }, [input, clientes]);

  useEffect(() => {
    if (value) {
      const cli = clientes.find(c => c.id === value);
      if (cli) setInput(`${cli.name}${cli.phone ? ` (${cli.phone})` : ""}`);
    }
  }, [value, clientes]);

  const handleSelect = (id) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        className="w-full bg-[#16161D] border border-gray-700 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-orange-500"
        placeholder={placeholder}
        value={input}
        onChange={e => { setInput(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        autoComplete="off"
      />
      {open && (
        <div className="absolute z-20 w-full bg-[#23232b] border border-gray-700 rounded-lg mt-1 max-h-56 overflow-y-auto shadow-lg">
          {filtered.length === 0 && (
            <div className="p-3 text-gray-400 text-sm">Sin coincidencias</div>
          )}
          {filtered.map(c => (
            <div
              key={c.id}
              className={`px-3 py-2 cursor-pointer hover:bg-orange-500/30 text-white ${value === c.id ? "bg-orange-500/60" : ""}`}
              onClick={() => handleSelect(c.id)}
            >
              {c.name} {c.phone ? <span className="text-orange-400">({c.phone})</span> : null} {c.address ? <span className="text-gray-400">- {c.address}</span> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
