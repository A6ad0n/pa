import { createRoot } from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react'

let root;

export default function renderApp() {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root element not found');
  }
  if (!root) {
    root = createRoot(container);
  }
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
