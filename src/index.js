import App from './App.tsx';

console.log('Hello, Webpack!');

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
)