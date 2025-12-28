import { Button } from "@/components/ui/button";
import { Separator } from "./components/ui/separator";
import { FiCoffee, FiGithub } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa6";
import { Preview, PreviewProps } from "./Preview";

export default function App() {
    // https://bobbyhadz.com/blog/react-open-link-in-new-tab    
    const openNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const postList: PreviewProps[] = [
        {
            title: "lorem ipsum",
            description: "stuff I'm writing idk",
            date: "12/12/12"
        },
        {
            title: "lorem ipsum 2",
            description: "stuff I'm writing idk but again",
            date: "12/12/14"
        }
    ]

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
                {postList.map((post) => {
                    return <Preview title={post.title} description={post.description} date={post.date} />
                })}
            </div>
        </div>
    )
}