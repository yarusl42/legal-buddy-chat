import { Advisor } from "../types/advisor";
import { cn } from "@/lib/utils";

interface AdvisorCardProps {
  advisor: Advisor;
  isSelected: boolean;
  onClick: () => void;
}

export const AdvisorCard = ({ advisor, isSelected, onClick }: AdvisorCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-lg mb-2 text-left transition-all",
        "hover:bg-primary/10",
        isSelected ? "bg-primary/15" : "bg-transparent"
      )}
    >
      <div className="flex items-center space-x-3">
        <img
          src={advisor.avatar}
          alt={advisor.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-primary">{advisor.name}</h3>
          <p className="text-sm text-gray-600">{advisor.specialty}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">{advisor.description}</p>
    </button>
  );
};