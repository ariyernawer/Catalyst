import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import API from "../../api/axios";

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/participant/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/discover");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-card border border-border bg-bg p-6 shadow-card sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-radial-[at_top_right] from-sand/16 to-transparent to-58%" />

      <div className="relative">
        <header className="mb-8 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface">
            <GraduationCap className="text-sand" size={28} />
          </span>
          <div>
            <h1 className="font-display text-3xl font-semibold text-text-primary">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Sign in to continue discovering opportunities.
            </p>
          </div>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            id="signin-email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="signin-password"
            label="Password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          New to Catalyst?{" "}
          <Link to="/signup" className="font-semibold text-sand hover:text-text-primary">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}