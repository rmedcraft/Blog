import { Button } from "@/components/ui/button";
import Navbar from "./components/ui/navbar";
import { Separator } from "./components/ui/separator";

export default function App() {
    return (
        <div>
            <div className="container mx-auto p-8">
                <div className="max-w-xl mx-auto mb-5">
                    <h1 className="text-6xl font-bold mb-5">Rowan's Really Cool Blog</h1>
                    <p className="mb-4 text-muted-foreground">A place for me to talk about nerdy stuff I'm interested in. Proudly not vibe-coded</p>
                    
                </div>
                <Separator />
            </div>
        </div>
    )
}