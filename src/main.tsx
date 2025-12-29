import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "./components/ui/theme-provider";
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLogin } from './pages/AdminLogin';
import Navbar from './components/ui/navbar';
import { Toaster } from './components/ui/sonner';
import { BlogPost } from './pages/BlogPost';

createRoot(document.getElementById('root') as any).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <Toaster />

                <div className="sticky top-0 w-full">
                    <Navbar />
                </div>

                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/:post" element={<BlogPost />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
)
