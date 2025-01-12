import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
}

export const BackButton = ({ to = "/chat" }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute left-4 top-4"
      onClick={() => navigate(to)}
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="sr-only">Back</span>
    </Button>
  );
};
