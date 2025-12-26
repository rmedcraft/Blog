import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "./components/ui/theme-provider";
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Admin } from './Admin';
import Navbar from './components/ui/navbar';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <div className="sticky top-0 w-full">
                    <Navbar />
                </div>

                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
)
