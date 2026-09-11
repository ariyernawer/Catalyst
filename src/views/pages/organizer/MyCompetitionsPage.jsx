import { Link } from "react-router-dom";
import { useOrganizer } from "../../../models/contexts/OrganizerContext";
import { Plus } from "lucide-react";
import { CompetitionsTable, CreateCompetitionLink } from "../../components/organizer/CompetitionsTable";

export default function MyCompetitionsPage() {
  const { competitions, publishedCount } = useOrganizer();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-sand">COMPETITIONS</p>
          <h1 className="font-display text-3xl sm:text-4xl text-text-primary font-normal tracking-tight mt-1">My Competitions</h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">{competitions.length} total · {publishedCount} published</p>
        </div>
        <Link
          to="/organizer/competitions/new"
          className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-primary px-5 py-3 rounded-xl text-sm font-medium transition-all shadow-md active:scale-[0.98] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Competition</span>
        </Link>
      </div>

      <CompetitionsTable
        competitions={competitions}
        showCategoryFilter
        showSort
        emptyTitle="No competitions match your criteria"
        emptyText="Try clearing search filters or create a new competition."
        emptyAction={<CreateCompetitionLink />}
      />
    </div>
  );
}