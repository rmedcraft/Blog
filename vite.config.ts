import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from "vite-plugin-svgr"
import sitemap from "vite-plugin-sitemap"
import { createClient } from "@supabase/supabase-js"
import { Database } from "./database.types";


// https://vite.dev/config/

// mode defines whether the build is prod or dev
// mode = "development" when you run "npm run dev"
// mode = "production" when you run "npm run build"
export default defineConfig(async ({ mode }) => {
    // import.meta.env is only set up after defineConfig runs, so we need to call loadEnv to set up supabase in this function
    const env = loadEnv(mode, process.cwd(), "");

    // define supabase so we can get all the routes
    const supabase = createClient<Database>(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

    // fetch dynamic routes to add them to the sitemap
    const { data: posts } = await supabase
        .from('posts')
        .select('link')

    const dynamicRoutes =
        [
            "/",
            ...(posts?.map((post) => `/${post.link}`)) ?? []
        ]


    return {
        plugins: [react(), svgr(),
        sitemap({
            hostname: "https://blog.medcraft.dev",
            dynamicRoutes
        })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },

        // separate larger libraries into separate chunks to improve performance
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        react: ["react", "react-dom"],
                        router: ["react-router-dom"],
                        supabase: ["@supabase/supabase-js"],
                        markdown: [
                            "react-markdown",
                            "remark-math",
                            "rehype-katex",
                            "react-syntax-highlighter"
                        ]
                    }
                }
            }
        }
    }
})

