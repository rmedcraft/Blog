import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function App() {
    return (
        <div >
            <h1 className="text-3xlxl underline text-white w-screen text-center">
                Hello world!
            </h1>
            <div className="container mx-auto p-8">
                <Card className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Vite + shadcn/ui</h1>
                    <Button>Get started</Button>
                </Card>
            </div>
        </div>
    )
}