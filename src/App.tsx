import { Button } from "@/components/ui/button";
import { Separator } from "./components/ui/separator";
import { FiCoffee, FiGithub } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa6";
import { Preview } from "./components/Preview";
import { useEffect, useState } from "react";

import { Database } from '../database.types'
import { Spinner } from "./components/ui/spinner";

import { supabase, Post } from "./main";

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
                {posts.length > 0 && posts.map((post: Post) => {
                    return <Preview key={post.link} {...post} />
                })}
            </div>
        </div>
    )
}