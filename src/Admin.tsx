import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";

export function Admin(props: any) {
    const { supabase, session, setSession } = props

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    return (
        <div className="container mx-auto">
            <div className="mt-5 flex mx-auto">
                <h1 className="text-4xl mb-4">Hi Rowan!</h1>
                <Button className="ms-auto me-4" onClick={() => window.location.assign(window.location.origin)}>
                    Return to Blog
                </Button>
                <Button onClick={handleLogout} variant={"destructive"}>
                    Sign Out
                </Button>
            </div>
            <Separator />
        </div>
    )
}