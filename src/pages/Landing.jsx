import { UserCircle, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Briefcase,
  Lightbulb,
  Trophy,
  Monitor,
  Rocket,
  BarChart2,
  FlaskConical,
} from "lucide-react";

const categories = [
  {
    icon: <Zap className="w-6 h-6 text-sand" />,
    name: "Hackathons",
    count: "142 active",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-sand" />,
    name: "Case Competitions",
    count: "89 active",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-sand" />,
    name: "Idea Pitching",
    count: "67 active",
  },
  {
    icon: <Trophy className="w-6 h-6 text-sand" />,
    name: "Hult Prize",
    count: "34 active",
  },
  {
    icon: <Monitor className="w-6 h-6 text-sand" />,
    name: "Programming",
    count: "115 active",
  },
  {
    icon: <Rocket className="w-6 h-6 text-sand" />,
    name: "Innovation",
    count: "78 active",
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-sand" />,
    name: "Business",
    count: "95 active",
  },
  {
    icon: <FlaskConical className="w-6 h-6 text-sand" />,
    name: "Olympiads",
    count: "52 active",
  },
];

const floatingCards = [
  {
    tag: "Innovation",
    title: "National Innovation Challenge 2026",
    org: "NIC Foundation",
    prize: "$12,000",
    days: "12d left",
  },
  {
    tag: "Hackathon",
    title: "Global Hackathon Series – Dhaka",
    org: "Tech Collective BD",
    prize: "$8,500",
    days: "5d left",
  },
  {
    tag: "Business",
    title: "Foodpath: Urban Kitchen Business Plan",
    org: "Foodpath Ventures",
    prize: "$5,000",
    days: "21d left",
  },
  {
    tag: "Programming",
    title: "CodeForge Weekly Sprint #14",
    org: "CodeForge",
    prize: "$1,500",
    days: "3d left",
  },
  {
    tag: "Olympiad",
    title: "Physics Olympiad — Regional Round",
    org: "AUST Science Society",
    prize: "$2,000",
    days: "28d left",
  },
  {
    tag: "Hackathon",
    title: "AUSTPIC Build Weekend",
    org: "AUSTPIC",
    prize: "$3,000",
    days: "15d left",
  },
];

const liveCards = [
  {
    tag: "INNOVATION",
    hot: true,
    title: "National Innovation Challenge 2026",
    org: "NIC Foundation · University",
    prize: "$12,000",
    days: "12d left",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop",
  },
  {
    tag: "HACKATHON",
    hot: true,
    title: "Global Hackathon Series – Dhaka",
    org: "Tech Collective BD · Open",
    prize: "$8,500",
    days: "5d left",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
  },
  {
    tag: "BUSINESS",
    hot: false,
    title: "Foodpath: Urban Kitchen Business Plan",
    org: "Foodpath Ventures · Open",
    prize: "$5,000",
    days: "21d left",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
  },
];

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 bg-surface border-b border-border sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand font-display text-sm font-bold text-bg">
            C
          </span>
          <span className="font-display font-black text-lg font-bold text-text-primary">
            Catalyst
          </span>
        </div>
        <div className="relative group">
          <UserCircle
            className="w-8 h-8 text-text-secondary cursor-pointer hover:text-text-primary transition-colors"
            onClick={() => navigate("/select-role")}
          />
          <div className="absolute right-0 top-10 bg-surface border border-border text-text-primary text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Get Started
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex items-center justify-between px-10 py-20 gap-10">
        {/* Left */}
        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1 text-text-secondary text-sm mb-8">
            <span className="w-2 h-2 bg-sand rounded-full"></span>
            2,400+ competitions. One platform.
          </div>
          <h1 className="font-display text-6xl text-text-primary leading-tight mb-6">
            Never Miss a <span className="text-sand italic">Winning</span>{" "}
            Opportunity Again
          </h1>
          <p className="text-text-secondary text-lg mb-10">
            Catalyst centralizes hackathons, case competitions, Hult Prize,
            programming contests, and innovation challenges — all filtered to
            what matters to you.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/select-role")}
              className="bg-sand text-bg px-8 py-3 rounded-full font-medium hover:bg-accent-hover transition-colors"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/select-role")}
              className="border border-border text-text-secondary px-8 py-3 rounded-full hover:text-text-primary transition-colors"
            >
              List a Competition
            </button>
          </div>
        </div>

        {/* Right — Floating Cards */}
        <div className="w-72 h-[500px] overflow-hidden flex-shrink-0">
          <div className="animate-scroll flex flex-col gap-4">
            {[...floatingCards, ...floatingCards].map((card, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-2xl p-4 w-full"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs bg-surface-raised text-text-secondary px-2 py-1 rounded-full">
                    {card.tag}
                  </span>
                  <span className="text-xs text-sand">● {card.days}</span>
                </div>
                <h3 className="text-text-primary font-medium text-sm mb-1">
                  {card.title}
                </h3>
                <p className="text-text-muted text-xs mb-3">{card.org}</p>
                <p className="text-sand font-display text-xl">{card.prize}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="px-10 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-display font-extrabold text-3xl text-text-primary">
            Browse by Category
          </h2>
          <button
            onClick={() => navigate("/select-role")}
            className="text-sand text-sm hover:underline"
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 lg:grid-cols-8">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => navigate("/select-role")}
              className="bg-surface border border-border rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-sand transition-colors"
            >
              {cat.icon}
              <span className="text-text-primary text-sm font-medium text-center">
                {cat.name}
              </span>
              <span className="text-text-muted text-xs">{cat.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Live Competitions */}
      <section className="px-10 py-16">
        <div className="mb-2">
          <span className="text-sand text-xs tracking-widest uppercase">
            Featured
          </span>
        </div>
        <h2 className="font-display font-extrabold text-3xl text-text-primary mb-8">
          Live Competitions
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {liveCards.map((card, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-2xl overflow-hidden"
            >
              {/* Image with overlays */}
              <div className="relative h-52">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />

                {/* Top left — tag + hot */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-sand text-bg font-body text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {card.tag}
                  </span>
                </div>

                {/* Top right — heart */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>

                {/* Bottom right — prize */}
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-text-primary text-sm px-3 py-1 rounded-full font-medium">
                  {card.prize}
                </div>
              </div>

              {/* Content below image */}
              <div className="p-5">
                <p className="text-text-muted font-body text-xs mb-1">
                  {card.org}
                </p>
                <h3 className="text-text-primary font-display font-bold text-lg mb-4">
                  {card.title}
                </h3>

                {/* Countdown 
                <div className="flex gap-6">
                  {[["12","D"],["17","H"],["53","M"],["36","S"]].map(([val, label]) => (
                    <div key={label} className="text-center">
                      <p className="text-sand font-display font-bold text-2xl">{val}</p>
                      <p className="text-text-muted font-body text-xs">{label}</p>
                    </div>
                  ))}
                </div>
                */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-10 py-16">
        <div className="flex justify-between gap-10">
          {/* Left */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand font-display text-sm font-bold text-bg">
                C
              </span>
              <span className="font-display text-lg font-bold text-text-primary">
                Catalyst
              </span>
            </div>
            <p className="text-text-secondary text-sm mb-6">
              The unified platform for competition discovery and event
              management. Built for students, by students.
            </p>
            <div className="flex gap-3">
              {["X", "in", "fb"].map((s) => (
                <button
                  key={s}
                  className="border border-border text-text-muted text-xs px-3 py-2 rounded-lg hover:text-text-primary hover:border-sand transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p className="text-text-muted text-xs tracking-widest uppercase mb-4">
                Discover
              </p>
              {[
                "Browse All",
                "Hackathons",
                "Case Competitions",
                "Programming",
                "Innovation",
                "Olympiads",
              ].map((l) => (
                <p
                  key={l}
                  className="text-text-secondary text-sm mb-3 hover:text-text-primary cursor-pointer"
                >
                  {l}
                </p>
              ))}
            </div>
            <div>
              <p className="text-text-muted text-xs tracking-widest uppercase mb-4">
                Platform
              </p>
              {[
                "How It Works",
                "For Organizers",
                "Calendar View",
                "Bookmark Manager",
                "Notifications",
              ].map((l) => (
                <p
                  key={l}
                  className="text-text-secondary text-sm mb-3 hover:text-text-primary cursor-pointer"
                >
                  {l}
                </p>
              ))}
            </div>
            <div>
              <p className="text-text-muted text-xs tracking-widest uppercase mb-4">
                Company
              </p>
              {[
                "About Catalyst",
                "Blog",
                "Press Kit",
                "Careers",
                "Contact",
              ].map((l) => (
                <p
                  key={l}
                  className="text-text-secondary text-sm mb-3 hover:text-text-primary cursor-pointer"
                >
                  {l}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
          <p className="text-text-muted text-xs">
            © 2026 Catalyst. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (l) => (
                <p
                  key={l}
                  className="text-text-muted text-xs hover:text-text-primary cursor-pointer"
                >
                  {l}
                </p>
              ),
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
