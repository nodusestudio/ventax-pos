import React from 'react';
import { INIT_CATS } from '../config/initialData';

function CategoryList() {
  return (
    <div>
      <h2>Categorías</h2>
      <ul>
        {INIT_CATS.map(cat => (
          <li key={cat.id} style={{ color: cat.color }}>
            <span>{cat.emoji} {cat.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
