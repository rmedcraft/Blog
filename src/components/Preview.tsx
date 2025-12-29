import { FaArrowRight } from "react-icons/fa6";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Post } from "@/App";
import { dateToStr, timestamptzToDate } from "@/utils/dateUtils";

export function Preview(props: Post) {
    const date = timestamptzToDate(props.created_at)

    return (
        <>
            <div className="w-5/6 mx-auto my-10">
                {/* title & date */}
                <div className="flex justify-between gap-3 items-start mb-4">
                    <h1 className="text-3xl text-bold text-foreground align-text-bottom">
                        {props.title}
                    </h1>
                    <h1 className="text-muted-foreground pt-1">{dateToStr(date)}</h1>
                </div>

                {/* tags here when we have tags */}

                {/* description */}
                <p>{props.description}</p>

                {/* read more */}
                <Button variant={"link"} className="p-0 mt-1" onClick={() => window.location.assign(`${window.location.origin}/${props.link ?? encodeURI(props.title)}`)}>
                    Read More
                    <FaArrowRight />
                </Button>
            </div>
            <Separator />
        </>

    )
}