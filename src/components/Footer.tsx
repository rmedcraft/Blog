import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="w-full py-4 mt-auto px-4 md:px-6">
            <div className="container mx-auto text-sm text-muted-foreground text-right">
                <span>© {new Date().getFullYear()} Rowan's Blog</span>
                {/* A wrong privacy policy is worse than no privacy policy.  */}
                {/* <span>
                    <span className="font-bold">Legal:</span> <Link to="/tos">Terms of Service</Link> | <Link to="/privacy">Privacy Policy</Link>
                </span> */}
            </div>
        </footer>
    )
}