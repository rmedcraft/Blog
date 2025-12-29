import { useParams } from "react-router-dom";

export function BlogPost() {
    const { post } = useParams();

    return (
        <div>
            <h1>{post}</h1>
        </div>
    )
}