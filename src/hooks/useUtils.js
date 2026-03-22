// Utilidades minimalistas para VentaX-POS

export function formatCurrency(value) {
  return `$${Number(value).toLocaleString('es-CO')}`;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
