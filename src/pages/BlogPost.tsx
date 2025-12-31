import { useParams } from "react-router-dom";

import { supabase, Post } from "@/App"
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { dateToStr, timestamptzToDate } from "@/utils/dateUtils";
import { Separator } from "@/components/ui/separator";
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialLight, materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "@/components/ui/theme-provider";
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export function BlogPost() {
    // get the link parameter, i.e everything after the last slash. The variable name has to be the same as in
    const { postLink } = useParams();

    // light/dark theme to update the md code syntax highlighting
    const { theme } = useTheme()

    const [post, setPost] = useState<Post>() // stores the post data from the database (everything except the actual md file)
    const [mdFile, setMdFile] = useState<string>('') // stores the link to the md file in the database
    const [postMarkdown, setPostMarkdown] = useState<string>(''); // stores the actual text of the md file


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

            document.title = `${data.title} | Rowan's Blog`
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
                });
        }

        getPostMarkdown()
    }, [mdFile]);

    // while md is loading
    if (!postMarkdown || !post) {
        return <Spinner className="mx-auto mt-10 size-10" />
    }
    return (
        <div className="container mx-auto mt-4 max-w-3xl p-2">
            <h1 className="text-5xl font-bold mt-4">{post.title}</h1>
            <p className="text-muted-foreground my-3">{dateToStr(timestamptzToDate(post.created_at))}</p>

            <Separator />

            {/* adding code syntax highlighting https://www.kristianhannula.com/posts/rendering-markdown-files-with-react-typescript-vite-and-tailwind/ */}
            <article className="mt-4 prose prose-gray dark:prose-invert">
                <Markdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        code: ({ className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '')

                            // if theres a language match, return the syntax highlighted text. Otherwise just keep the regular code component
                            return match ? (
                                // style changes dependent on the theme selected, if the theme is system, detect the system theme
                                <SyntaxHighlighter language={match[1]} style={theme == "dark" || (theme == "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? materialDark : materialLight}>
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        },
                    }}>
                    {postMarkdown}
                </Markdown>
            </article>
        </div>
    )
}
