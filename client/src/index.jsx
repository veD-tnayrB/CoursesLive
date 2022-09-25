import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/common/navbar';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import 'src/global/global.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar />
    <main>
      <App />
    </main>
  </BrowserRouter>
);
