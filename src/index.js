import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { StateContext } from './Context/UpcomingContext';

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
       <StateContext>
          <App />
       </StateContext>
      </BrowserRouter>
    </QueryClientProvider> 
  </React.StrictMode>
  
);

