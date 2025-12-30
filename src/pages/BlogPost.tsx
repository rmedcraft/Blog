import { useParams } from "react-router-dom";

import { supabase, Post } from "@/App"
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { dateToStr, timestamptzToDate } from "@/utils/dateUtils";
import { Separator } from "@/components/ui/separator";
import Markdown from "react-markdown"

export function BlogPost() {
    // get the link parameter, i.e everything after the last slash. The variable name has to be the same as in
    const { postLink } = useParams();

    const [post, setPost] = useState<Post>()
    const [mdFile, setMdFile] = useState<string>('')
    const [postMarkdown, setPostMarkdown] = useState<string>('');



    useEffect(() => {
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
                window.location.assign(window.location.origin)
                return
            }

            if (error) {
                console.error("Error fetching post data:", error)
                return
            }
            setPost(data)
        }


        getPost()
    }, [])

    // get the link to md from supabase storage buckets
    useEffect(() => {
        async function getMarkdown() {
            if (!post) return

            const { data } = await supabase
                .storage
                .from("BlogPosts")
                .getPublicUrl(post.file_path)

            if (!data) return

            console.log(data)
            setMdFile(data.publicUrl)
        }

        getMarkdown()
    }, [post])


    // convert md file to a md string
    // https://stackoverflow.com/questions/65395125/how-to-load-an-md-file-on-build-when-using-create-react-app-and-typescript
    useEffect(() => {
        async function getPostMarkdown() {
            if (!mdFile) return

            await fetch(mdFile)
                .then((response) => response.text())
                .then((text) => {
                    setPostMarkdown(text);
                    console.log(text)
                });
        }

        getPostMarkdown()
    }, [mdFile]);

    // while md is loading
    if (!post) {
        return <Spinner className="mx-auto mt-10 size-10" />
    }

    return (
        <div className="container mx-auto mt-4 max-w-3xl p-2">
            <h1 className="text-4xl font-bold mt-4">{post.title}</h1>
            <p className="text-muted-foreground my-3">{dateToStr(timestamptzToDate(post.created_at))}</p>
            <Separator />
            <div className="prose lg:prose-xl prose-gray dark:prose-invert">
                <Markdown >{postMarkdown}</Markdown>
            </div>
        </div>
    )
}
