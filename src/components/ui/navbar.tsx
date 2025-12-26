import { cn } from "@/lib/utils";
import { Proportions } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function Navbar(props: any) {
    return (
        <header
            className={cn(
                'border-b px-4 md:px-6 [&_*]:no-underline',
                props.className
            )}
        >
            <div className="flex h-16 items-center justify-between gap-4">
                <ModeToggle></ModeToggle>
            </div>

        </header>
    )
}