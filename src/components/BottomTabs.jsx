import React, { useState } from 'react';
import './BottomTabs.css';

const tabs = [
  { key: 'venta', label: 'Ventas' },
  { key: 'tickets', label: 'Tickets' },
  { key: 'productos', label: 'Productos' },
  { key: 'clientes', label: 'Clientes' },
  { key: 'informes', label: 'Informes' }
];

export default function BottomTabs({ onTabChange, activeTab }) {
  return (
    <div className="bottom-tabs">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={activeTab === tab.key ? 'active' : ''}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
