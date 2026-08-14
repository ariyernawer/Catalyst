import { GraduationCap } from 'lucide-react';
import SignUpForm from "../../components/forms/SignUpForm/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="relative w-full max-w-[900px] overflow-hidden rounded-card border border-border bg-bg p-6 shadow-card sm:p-8">

      {/* Fixed glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,157,123,0.12),transparent_60%)]" />

      {/* Accent line */}
      <span className="pointer-events-none absolute right-0 top-4 bottom-4 w-1 rounded bg-accent" />

      <div className="relative z-10">
        <header className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface">
            <GraduationCap className="w-7 h-7 text-sand" strokeWidth={1.75} />
          </div>

          <div>
            <h1 className="font-display text-[1.9rem] font-semibold text-text-primary">
              Create Participant Account
            </h1>

            <p className="text-[0.95rem] text-text-secondary">
              Discover competitions that match your ambition.
            </p>
          </div>
        </header>

        <SignUpForm />
      </div>
    </div>
  );
}