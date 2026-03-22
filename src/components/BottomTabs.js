import React, { useState } from 'react';
import './BottomTabs.css';

const tabs = [
  { key: 'orders', label: 'Pedidos' },
  { key: 'tickets', label: 'Tickets' },
  { key: 'products', label: 'Productos' },
  { key: 'customers', label: 'Clientes' },
  { key: 'reports', label: 'Reportes' },
  { key: 'settings', label: 'Configuración' }
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
