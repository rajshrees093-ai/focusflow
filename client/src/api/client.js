// client/src/api/client.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export function checkHealth() {
  return apiFetch('/api/health');
}
export function parseTasks(text) {
  return apiFetch('/api/parse-tasks', { method: 'POST', body: JSON.stringify({ text }) });
}
export function createTask(task) {
  return apiFetch('/api/tasks', { method: 'POST', body: JSON.stringify(task) });
}
export function fetchTasks(completed) {
  const query = completed !== undefined ? `?completed=${completed}` : '';
  return apiFetch(`/api/tasks${query}`);
}
export function updateTask(id, updates) {
  return apiFetch(`/api/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(updates) });
}
export function deleteTask(id) {
  return apiFetch(`/api/tasks/${id}`, { method: 'DELETE' });
}
export function generatePlan() {
  return apiFetch('/api/generate-plan', { method: 'POST', body: JSON.stringify({}) });
}
export function getStreak() {
  return apiFetch('/api/streak');
}

export default apiFetch;