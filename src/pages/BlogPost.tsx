import { useParams } from "react-router-dom";

import { supabase, Post } from "@/main"
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export function BlogPost() {
    // get the link parameter, i.e everything after the last slash. The variable name has to be the same as in
    const { postLink } = useParams();

    const [post, setPost] = useState<Post>()

    useEffect(() => {
        getPost()
    }, [postLink])

    async function getPost() {
        if (!postLink) return

        // query the database for primary key
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("link", postLink)
            .maybeSingle();

        if (!data) {
            // redirect to 404 page
            return
        }

        if (error) {
            console.error("Error fetching post data:", error)
            return
        }
        setPost(data)
    }

    return (
        <div>

            {/* while loading */}
            {!post &&
                <Spinner className="mx-auto mt-10 size-10" />
            }

            {post &&
                <h1>{post.description}</h1>
            }
        </div>
    )
}