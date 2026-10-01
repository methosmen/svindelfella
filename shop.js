// Testbutikk for Svindelfella. Ingen data sendes noe sted. Kun felle-hendelser logges lokalt.
const S = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
function trap(id, detail) {
  const log = S.get('traps', []);
  if (!log.some(t => t.id === id)) log.push({ id, detail, at: new Date().toISOString() });
  S.set('traps', log);
  window.__traps = log;
  console.log('[TRAP]', id, detail);
}
function cart() { return S.get('cart', []); }
function addToCart(item) {
  const c = cart(); c.push(item); S.set('cart', c);
  if (item.trap) trap(item.trap, item.name);
  renderCartCount();
}
function renderCartCount() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = cart().length;
}
function kr(n) { return n.toLocaleString('nb-NO') + ' kr'; }
document.addEventListener('DOMContentLoaded', renderCartCount);
window.__traps = S.get('traps', []);
