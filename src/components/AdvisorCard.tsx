import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Advisor } from "../types/advisor";
import { cn } from "@/lib/utils";

interface AdvisorCardProps {
  advisor: Advisor;
  isSelected: boolean;
  onClick: () => void;
  isSmall?: boolean; // New prop to determine card size
}

export const AdvisorCard = ({ advisor, isSelected, onClick, isSmall }: AdvisorCardProps) => {
  return (
    <div
      onClick={isSmall ? onClick : undefined}
      className={cn(
        "rounded-lg border p-4 sm:p-6 transition-all hover:shadow-md " + (isSmall ? "" : "h-full") + " flex flex-col",
        isSelected ? "border-primary bg-primary/5" : "border-border"
      )}

      style={{ cursor: isSmall ? "pointer" : "default" }}
    >
      <div className={isSmall ? "flex items-center" : "mb-4"}>
        <img
            src={advisor.avatar}
            alt={advisor.name}
            className="w-16 h-16 rounded-full object-cover"
        />
        <div className={"text-center sm:text-left" + (isSmall ? " ml-2 " : "")}>
          <h3 className="font-semibold text-base sm:text-lg text-primary">{advisor.name}</h3>
          <p className="text-sm text-muted-foreground">{advisor.specialty}</p>
        </div>
      </div>
      
      {!isSmall && (
        <>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">
            {advisor.description}
          </p>
          <Button 
            onClick={onClick}
            className="w-full mt-auto"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat Now
          </Button>
        </>
      )}
    </div>
  );
};