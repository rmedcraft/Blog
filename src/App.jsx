import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "./components/ui/navbar";

export default function App() {
    return (
        <div >
            <div className="sticky top-0 w-full">
                <Navbar />
            </div>
            <div className="container mx-auto p-8 h-[2000px]">
                <Card className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Vite + shadcn/ui</h1>
                    <Button>Get started</Button>
                </Card>
            </div>
        </div>
    )
}