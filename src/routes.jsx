import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Contacts from './pages/Contacts';
import AddContact from './pages/AddContact';

export const router = createBrowserRouter([
  { path: '/', element: <Contacts /> },
  { path: '/add-contact', element: <AddContact /> },
  { path: '*', element: <h1>404: Not Found</h1> },
]);