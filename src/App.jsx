import { Button } from "@/components/ui/button";
import { Separator } from "./components/ui/separator";
import { FiCoffee, FiGithub } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa6";

export default function App() {
    // https://bobbyhadz.com/blog/react-open-link-in-new-tab    
    const openNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
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
            </div>
        </div>
    )
}