import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Advisor } from "../types/advisor";
import { cn } from "@/lib/utils";

interface AdvisorCardProps {
  advisor: Advisor;
  isSelected: boolean;
  onClick: () => void;
}

export const AdvisorCard = ({ advisor, isSelected, onClick }: AdvisorCardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border p-6 transition-all hover:shadow-md",
        isSelected ? "border-primary bg-primary/5" : "border-border"
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={advisor.avatar}
          alt={advisor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg text-primary">{advisor.name}</h3>
          <p className="text-sm text-muted-foreground">{advisor.specialty}</p>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        {advisor.description}
      </p>

      <Button 
        onClick={onClick}
        className="w-full"
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        Chat Now
      </Button>
    </div>
  );
};