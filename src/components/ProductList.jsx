import React from 'react';
import { INIT_PRODS } from '../config/initialData';

function ProductList() {
  return (
    <div>
      <h2>Productos</h2>
      <ul>
        {INIT_PRODS.map(prod => (
          <li key={prod.id}>
            <span>{prod.emoji} {prod.name}</span> - <span>${prod.price.toLocaleString('es-CO')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
