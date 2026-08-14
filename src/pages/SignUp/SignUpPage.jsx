import { useRef } from 'react';
import SignUpForm from '../../components/forms/SignUpForm/SignUpForm';

export default function SignUpPage() {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  // Tracks the cursor position over the card and paints the spotlight
  // glow directly (via ref, not state) so this never triggers a re-render.
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.background = `radial-gradient(620px circle at ${x}% ${y}%, rgba(219, 185, 140, 0.16), transparent 72%)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative w-full max-w-[900px] bg-bg border border-border rounded-card p-6 sm:p-8 shadow-card overflow-hidden"
    >
      {/* cursor-following spotlight */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* right-edge accent rule */}
      <span className="pointer-events-none absolute right-0 top-4 bottom-4 w-1 rounded bg-accent z-10" />

      <div className="relative z-10">
        <header className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 shrink-0 flex items-center justify-center text-2xl bg-surface border border-border rounded-xl transition-all duration-150 hover:border-sand hover:shadow-[0_0_0_3px_rgba(219,185,140,0.22),0_0_16px_rgba(219,185,140,0.15)]">
            🎓
          </div>
          <div>
            <h1 className="m-0 mb-1 font-display text-[1.9rem] font-semibold text-text-primary">
              Create Participant Account
            </h1>
            <p className="m-0 text-[0.95rem] text-text-secondary">
              Discover competitions that match your ambition.
            </p>
          </div>
        </header>

        <SignUpForm />
      </div>
    </div>
  );
}
