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
import { createClient } from '@supabase/supabase-js';
import { Database } from 'database.types';

export const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

// Indexed access types: https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
export type Post = Database['public']['Tables']['posts']['Row']
export type NewPost = Database['public']['Tables']['posts']['Insert']
export type UpdatePost = Database['public']['Tables']['posts']['Update']


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
                    <Route path="/:postLink" element={<BlogPost />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode >
)
