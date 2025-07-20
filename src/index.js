import React from 'react';
// 1. Import createRoot from react-dom/client
import { createRoot } from 'react-dom/client';
import App from './App.js';

// 2. Get a reference to the root DOM node
const container = document.getElementById('root');

// 3. Create a root
const root = createRoot(container);

// 4. Render the app inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);