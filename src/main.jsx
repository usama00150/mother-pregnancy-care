import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root')

// Sahi tareeqa detect karne ka ke browser react-snap ka hai ya nahi
const isSnap = navigator.userAgent.includes('ReactSnap');

if (isSnap) {
  // Agar bot hai, toh purani cache wali HTML clear kar do taake Error 418 na aaye
  rootElement.innerHTML = '';
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else if (rootElement.hasChildNodes()) {
  // Real user ke liye smooth hydration
  hydrateRoot(
    rootElement,
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // Fallback
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}