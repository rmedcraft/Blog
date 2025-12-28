import { FaArrowRight } from "react-icons/fa6";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";

export interface PreviewProps {
    title: string,
    date: string,
    description: string,
    // tags: string[]
}

export function Preview(props: PreviewProps) {
    return (
        <>
            <div className="w-4/5 mx-auto my-10">
                {/* title & date */}
                <div className="flex justify-between gap-3 items-start mb-4">
                    <h1 className="text-3xl text-bold text-foreground align-text-bottom">
                        {props.title}
                    </h1>
                    <h1 className="text-muted-foreground pt-1">{props.date}</h1>
                </div>

                {/* tags here when we have tags */}

                {/* description */}
                <p>{props.description}</p>
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