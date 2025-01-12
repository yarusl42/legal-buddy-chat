import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/BackButton";

interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  imageUrl: string;
}

const LAWYERS_PER_PAGE = 6;

const mockLawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialization: 'Corporate Law',
    rating: 4.8,
    imageUrl: '/lawyers/lawyer1.jpg',
  },
  // Add more mock lawyers here
];

const SelectLawyer = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);

  const totalPages = Math.ceil(mockLawyers.length / LAWYERS_PER_PAGE);
  const startIndex = currentPage * LAWYERS_PER_PAGE;
  const displayedLawyers = mockLawyers.slice(startIndex, startIndex + LAWYERS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleSelectLawyer = (lawyerId: string) => {
    setSelectedLawyer(lawyerId);
    const lawyer = mockLawyers.find((l) => l.id === lawyerId);
    if (lawyer) {
      // Handle lawyer selection, e.g., navigate to chat
      navigate('/chat', { state: { lawyer } });
    }
  };

  return (
    <div className="relative">
      <BackButton to="/" />
      <div className="container mx-auto max-w-4xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Choose Your Legal Expert</h1>
          <p className="text-lg text-muted-foreground">
            Select a qualified lawyer to assist you with your legal matters
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-3 gap-4 mt-6">
            {displayedLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className={cn(
                  'p-4 border rounded-lg cursor-pointer transition-all',
                  'hover:border-primary hover:shadow-md',
                  selectedLawyer === lawyer.id && 'border-primary bg-primary/5'
                )}
                onClick={() => handleSelectLawyer(lawyer.id)}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-3">
                  <img
                    src={lawyer.imageUrl}
                    alt={lawyer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">{lawyer.name}</h3>
                <p className="text-sm text-muted-foreground">{lawyer.specialization}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm font-medium">★ {lawyer.rating}</span>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectLawyer;
