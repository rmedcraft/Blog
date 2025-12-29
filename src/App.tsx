import { Button } from "@/components/ui/button";
import { Separator } from "./components/ui/separator";
import { FiCoffee, FiGithub } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa6";
import { Preview, PreviewProps } from "./components/Preview";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import { Database } from '../database.types'
import { Spinner } from "./components/ui/spinner";

const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

type Post = Database['public']['Tables']['posts']['Row']
type NewPost = Database['public']['Tables']['posts']['Insert']
type UpdatePost = Database['public']['Tables']['posts']['Update']

export default function App() {
    // https://bobbyhadz.com/blog/react-open-link-in-new-tab    
    const openNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getPosts();
    }, []);

    async function getPosts() {
        const { data, error } = await supabase
            .from('posts')
            .select('*')

        if (error) {
            console.error("Error", error)
            return;
        }

        setPosts(data ?? []);

    }

    return (
        <div>
            <div className="container mx-auto p-8">
                <div className="max-w-xl mx-auto mb-5">
                    <h1 className="text-6xl font-bold mb-5">Rowan's Really Cool Blog</h1>
                    <p className="mb-2 text-muted-foreground">A place for me to talk about nerdy stuff I'm interested in. Proudly not vibe-coded</p>
                    <div className="flex gap-7">
                        <Button variant={"link"} className="p-0" onClick={() => openNewTab("https://github.com/rmedcraft")}>
                            <FiGithub />
                            GitHub
                        </Button>
                        <Button variant={"link"} className="p-0" onClick={() => openNewTab("https://www.linkedin.com/in/rowan-medcraft/")}>
                            <FaLinkedin />
                            LinkedIn
                        </Button>
                        <Button variant={"link"} className="p-0" onClick={() => openNewTab("https://www.medcraft.dev")}>
                            <FiCoffee className="me-0 pe-0" />
                            My Website
                        </Button>
                    </div>
                </div>
                <Separator />

                {/* while loading */}
                {posts.length === 0 &&
                    <Spinner className="mx-auto mt-10 size-10" />
                }

                {/* show posts once done loading */}
                {posts.map((post: any) => {
                    return <Preview key={post.id} title={post.title} description={post.description} date={post.date} link={post.link} />
                })}
            </div>
        </div>
    )
}