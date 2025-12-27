import "./index.css";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { createClient, EmailOtpType, MobileOtpType, Session } from "@supabase/supabase-js";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Admin } from "./Admin";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { FaChevronLeft } from "react-icons/fa6";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

export function AdminLogin() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [session, setSession]: any = useState(null);

    // Check URL params on initial render
    const params = new URLSearchParams(window.location.search);
    const hasTokenHash = params.get("token_hash");

    const [verifying, setVerifying] = useState(!!hasTokenHash);
    const [authError, setAuthError] = useState(null);
    const [authSuccess, setAuthSuccess] = useState(false);

    useEffect(() => {
        // Check if we have token_hash in URL (magic link callback)
        const params = new URLSearchParams(window.location.search);
        const token_hash = params.get("token_hash");
        const type: MobileOtpType | EmailOtpType | null = params.get("type") as MobileOtpType | EmailOtpType;

        if (token_hash) {
            // Verify the OTP token
            supabase.auth.verifyOtp({
                token_hash,
                type: (type || "email") as any,
            }).then(({ error }) => {
                if (error) {
                    setAuthError(error.message as any);
                } else {
                    setAuthSuccess(true);
                    // Clear URL params
                    window.history.replaceState({}, document.title, "/");
                }
                setVerifying(false);
            });
        }

        // Check for existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        const { error }: any = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: window.location.origin + "/admin",
            }
        });
        if (error) {
            toast.error("Error:", { description: error.error_description || error.message })
        } else {
            toast.success("Success!", {
                description: "Check your email for the login link!"
            })
        }
        setLoading(false);
    };

    // Show verification state
    if (verifying) {
        return (
            <div>
                <h1>Authentication</h1>
                <p>Confirming your magic link...</p>
                <p>Loading...</p>
            </div>
        );
    }

    // Show auth error
    if (authError) {
        return (
            <div>
                <h1>Authentication</h1>
                <p>✗ Authentication failed</p>
                <p>{authError}</p>
                <button
                    onClick={() => {
                        setAuthError(null);
                        window.history.replaceState({}, document.title, "/");
                    }}
                >
                    Return to login
                </button>
            </div>
        );
    }

    // Show auth success (briefly before session loads)
    if (authSuccess && !session) {
        return (
            <div>
                <h1>Authentication</h1>
                <p>✓ Authentication successful!</p>
                <p>Loading your account...</p>
            </div>
        );
    }

    // If user is logged in, show welcome screen
    if (session) {
        return (
            <Admin supabase={supabase} session={session} setSession={setSession} />
        );
    }

    // Show login form
    return (
        <div className="container mx-auto">
            <div className="mt-5 w-2/5 mx-auto my-auto ">

                <h1 className="text-6xl mb-4">Admin Login</h1>
                <p>Sign in via magic link with your email below</p>
                <form onSubmit={handleLogin} className="flex align-middle my-4 justify-start gap-3">
                    <Input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                        className=" w-2/5"
                    />
                    <Button disabled={loading} className="w-1/5">
                        {loading ? <span>Loading</span> : <span>Send magic link</span>}
                    </Button>
                </form>
                <Button variant={"outline"} className="p-2" onClick={() => { window.location.assign(window.location.origin) }}>
                    Back
                </Button>
            </div>
        </div>
    );
}