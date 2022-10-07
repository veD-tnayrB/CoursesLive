import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/common/navbar';
import Footer from 'src/components/common/footer';
import UserContextProvider from 'src/contexts/user/user.context';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import 'src/global/global.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <Navbar />
      <main>
        <App />
      </main>
      <Footer />
    </UserContextProvider>
  </BrowserRouter>
);
