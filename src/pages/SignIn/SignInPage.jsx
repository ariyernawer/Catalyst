import { GraduationCap, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useAuth } from "../../hooks/useAuth";

export default function SignInPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || password.length < 8) return setError("Enter your email and an 8-character password.");
    const name = user.name !== "Explorer" ? user.name : email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    updateUser({ name, email: email.trim() });
    navigate("/discover");
  };
  return <div className="relative w-full max-w-md overflow-hidden rounded-card border border-border bg-bg p-6 shadow-card sm:p-8"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,157,123,0.16),transparent_58%)]" /><div className="relative"><header className="mb-8 flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface"><GraduationCap className="text-sand" size={28} /></span><div><h1 className="font-display text-3xl font-semibold text-text-primary">Welcome back</h1><p className="mt-1 text-sm text-text-secondary">Sign in to continue discovering opportunities.</p></div></header><form onSubmit={handleSubmit} className="space-y-5" noValidate><Input id="signin-email" label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /><Input id="signin-password" label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" required />{error && <p className="rounded-xl bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>}<Button type="submit" variant="primary"><span className="inline-flex items-center gap-2">Sign in <LogIn size={16} /></span></Button></form><p className="mt-6 text-center text-sm text-text-muted">New to Catalyst? <Link to="/signup" className="font-semibold text-sand hover:text-text-primary">Create an account</Link></p></div></div>;
}
