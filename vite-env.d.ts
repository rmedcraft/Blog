// Source - https://stackoverflow.com/a
// Posted by Menial Orchestra
// Retrieved 2025-12-26, License - CC BY-SA 4.0

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
