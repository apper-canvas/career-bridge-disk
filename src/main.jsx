import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store/store';
import App from './App';
import './index.css';

/**
 * Main application renderer
 * Sets up Redux store, Router, and Helmet for SEO
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // Do not use StrictMode as it can cause issues with some components
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);