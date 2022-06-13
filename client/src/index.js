import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { LoggedUserProvider } from 'contexts/loggedUser';
import { CoursesProvider } from 'contexts/courses';  
import { UsersProvider } from 'contexts/users';
import { TabProvider } from 'contexts/tab';

import App from './App';


// This is react 18
const rootElement = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootElement)

root.render(
    <CoursesProvider>
        <UsersProvider>
            <LoggedUserProvider>
                <TabProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </TabProvider>
            </LoggedUserProvider>
        </UsersProvider>
    </CoursesProvider>
);
