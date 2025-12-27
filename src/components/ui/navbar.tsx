import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

export default function Navbar(props: any) {
    return (
        <header
            className={cn(
                'border-b px-4 md:px-6 [&_*]:no-underline bg-popover',
                props.className
            )}
        >
            <div className="flex h-16 items-center justify-between gap-4">
                <div className="container mx-auto">
                    <ModeToggle></ModeToggle>
                </div>
            </div>

        </header>
    )
}