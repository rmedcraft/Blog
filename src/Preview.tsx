import { FaArrowRight } from "react-icons/fa6";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";

export function Preview(props: any) {
    return (
        <>
            <div className="w-4/5 mx-auto my-10">
                {/* title & date */}
                <div className="flex justify-between gap-3 items-start mb-4">
                    <h1 className="text-3xl text-bold text-foreground align-text-bottom">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </h1>
                    <h1 className="text-muted-foreground pt-1">12/26/2025</h1>
                </div>

                {/* tags here when we have tags */}

                {/* description */}
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                {/* read more */}
                <Button variant={"link"} className="p-0 mt-1">
                    Read More
                    <FaArrowRight />
                </Button>

            </div>
            <Separator />
        </>

    )
}