import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

// This is react 18
const rootElement = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootElement)

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
