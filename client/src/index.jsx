import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/common/navbar';
import Footer from 'src/components/common/footer';
import AuthContextProvider from 'src/contexts/auth/auth.context';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'src/global/global.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<AuthContextProvider>
			<Navbar />
			<main>
				<App />
			</main>
			<Footer />
		</AuthContextProvider>
	</BrowserRouter>
);
