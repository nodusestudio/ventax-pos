import React, { useState } from 'react';
import './SidebarTabs.css';

const tabs = [
  { key: 'orders', label: 'Pedidos', icon: '🛒' },
  { key: 'tickets', label: 'Tickets', icon: '🎫' },
  { key: 'products', label: 'Productos', icon: '🍔' },
  { key: 'customers', label: 'Clientes', icon: '👤' },
  { key: 'reports', label: 'Reportes', icon: '📊' },
  { key: 'settings', label: 'Configuración', icon: '⚙️' }
];

export default function SidebarTabs({ onTabChange, activeTab }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={collapsed ? 'sidebar-tabs collapsed' : 'sidebar-tabs'}>
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '➡️' : '⬅️'}
      </button>
      <div className="tabs-list">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => onTabChange(tab.key)}
            title={tab.label}
          >
            <span className="icon">{tab.icon}</span>
            {!collapsed && <span className="label">{tab.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
