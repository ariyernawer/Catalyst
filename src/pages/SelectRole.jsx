import { useNavigate } from "react-router-dom";
import { GraduationCap, Building2 } from "lucide-react";

function SelectRole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center relative overflow-hidden">

    
      <div className="absolute w-[500px] h-[500px] bg-sand opacity-20 rounded-full blur-[120px] -top-32 -left-32" />
      <div className="absolute w-[500px] h-[500px] bg-accent opacity-25 rounded-full blur-[120px] -bottom-32 -right-32" />
      <div className="absolute w-72 h-72 bg-olive opacity-15 rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Glass container */}
      <div
        className="relative z-10 w-full max-w-2xl p-10 rounded-3xl border border-white/20 backdrop-blur-2xl shadow-2xl"
        style={{ background: "rgba(22, 33, 39, 0.3)" }}
      >

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand font-display text-sm font-bold text-bg">
              C
            </span>
          </div>
          <h1 className="font-display font-black text-3xl text-text-primary">
            Join Catalyst
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            Select your role to get started.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/participant")}
            className="border border-white/15 rounded-2xl p-6 text-left hover:border-sand transition-colors"
            style={{ background: "rgba(255, 255, 255, 0.03)" }}
          >
            <GraduationCap className="w-8 h-8 text-sand mb-4" />
            <h2 className="font-display text-xl text-text-primary mb-2">
              Participant
            </h2>
            <p className="text-text-secondary text-sm mb-4">
              Discover, bookmark & track competitions
            </p>
            <ul className="text-text-muted text-xs space-y-1 mb-6">
              <li>♦ Browse 2,400+ competitions</li>
              <li>♦ Deadline reminders</li>
              <li>♦ Calendar planner</li>
            </ul>
            <span className="text-sand text-sm">Register →</span>
          </button>

          <button
            onClick={() => navigate("/organizer/signup")}
            className="border border-white/15 rounded-2xl p-6 text-left hover:border-sand transition-colors"
            style={{ background: "rgba(255, 255, 255, 0.03)" }}
          >
            <Building2 className="w-8 h-8 text-sand mb-4" />
            <h2 className="font-display text-xl text-text-primary mb-2">
              Organizer
            </h2>
            <p className="text-text-secondary text-sm mb-4">
              List & manage your competitions
            </p>
            <ul className="text-text-muted text-xs space-y-1 mb-6">
              <li>♦ Reach 180K+ students</li>
              <li>♦ Dedicated dashboard</li>
              <li>♦ Analytics & insights</li>
            </ul>
            <span className="text-sand text-sm">Register →</span>
          </button>
        </div>

        {/* Sign in */}
        <p className="text-center text-text-muted text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/participant")}
            className="text-text-secondary hover:text-text-primary"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default SelectRole;