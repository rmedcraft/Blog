import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import LogoDark from '@/assets/blog-logo-dark.svg?react'
import LogoLight from '@/assets/blog-logo-light.svg?react'
import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";

export default function Navbar(props: any) {
    const { theme } = useTheme()

    return (
        <header
            className={cn(
                'border-b px-4 md:px-6 [&_*]:no-underline bg-popover',
                props.className
            )}
        >
            <div className="container mx-auto p-2 flex h-16 items-center justify-between gap-4">
                <Link to={window.location.origin} className="h-full">
                    <LogoDark className="absolute h-full w-fit cursor-pointer transition-opacity opacity-0 dark:opacity-100 top-0" />
                    <LogoLight className="absolute h-full w-fit cursor-pointer transition-opacity opacity-100 dark:opacity-0 top-0" />
                </Link>

                <ModeToggle></ModeToggle>
            </div>

        </header>
    )
}

