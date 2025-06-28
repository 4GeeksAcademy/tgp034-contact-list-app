import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Contact from './pages/Contact';
import AddContact from './pages/AddContact';

export const router = createBrowserRouter([
  { path: '/', element: <Contact /> },
  { path: '/add-contact', element: <AddContact /> },
  { path: '*', element: <h1>404: Not Found</h1> },
]);