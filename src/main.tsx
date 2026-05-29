import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
//@ts-ignore
import './index.css'
import { ThemeProvider } from "./components/ui/theme-provider";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { AdminLogin } from './pages/AdminLogin';
import Navbar from './components/ui/navbar';
import { Toaster } from './components/ui/sonner';
import { Spinner } from './components/ui/spinner';
import Footer from './components/Footer';

// bundle size gets big until we split the bundle with lazy routes
// lazy routes only load the page after the user visits it, rather than including it in the bundle
const Home = lazy(() => import("./App"))
const Post = lazy(() => import("./pages/BlogPost"))
const Admin = lazy(() => import("./pages/AdminLogin"))


createRoot(document.getElementById('root') as any).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <Toaster />
                <div className='min-h-screen flex flex-col'>
                    <div className="sticky top-0 w-full z-40">
                        <Navbar />
                    </div>

                    <div className='flex-1'>
                        <Routes>
                            <Route path="/" element={
                                <Suspense fallback={<Spinner className="mx-auto mt-10 size-10" />}>
                                    <Home />
                                </Suspense>
                            } />
                            <Route path="/admin" element={
                                <Suspense fallback={<Spinner className="mx-auto mt-10 size-10" />}>
                                    <Admin />
                                </Suspense>
                            } />
                            <Route path="/:postLink" element={
                                <Suspense fallback={<Spinner className="mx-auto mt-10 size-10" />}>
                                    <Post />
                                </Suspense>
                            } />
                        </Routes>

                    </div>

                    <div className='z-40 mt-auto'>
                        <Footer />
                    </div>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode >
)
