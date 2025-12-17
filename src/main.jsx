import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(reg => console.log("SW registered:", reg))
    .catch(err => console.error("SW failed:", err));
}

createRoot(document.getElementById('root')).render(
<QueryClientProvider client={queryClient}>
    <App />
     </QueryClientProvider>,
)
