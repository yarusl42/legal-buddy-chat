import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { AdvisorCard } from "@/components/AdvisorCard";
import { advisors } from "@/data/advisors";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const SelectLawyer = () => {
  const navigate = useNavigate();
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleSelectLawyer = (lawyerId: string) => {
    setSelectedLawyer(lawyerId);
    navigate('/chat', { state: { lawyerId } });
  };

  // Determine chunk size based on screen size
  const getChunkSize = () => {
    if (isMobile) return 1;
    if (window.innerWidth < 1024) return 2; // tablet
    return 6; // desktop
  };

  // Group advisors into chunks based on screen size
  const advisorChunks = advisors.reduce((resultArray, item, index) => { 
    const chunkSize = getChunkSize();
    const chunkIndex = Math.floor(index/chunkSize);
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as typeof advisors[]);

  return (
    <div className="relative min-h-screen bg-background">
      <BackButton to="/" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Choose Your Legal Expert</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a qualified lawyer to assist you with your legal matters
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent>
            {advisorChunks.map((chunk, slideIndex) => (
              <CarouselItem key={slideIndex}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {chunk.map((advisor) => (
                    <AdvisorCard
                      key={advisor.id}
                      advisor={advisor}
                      isSelected={selectedLawyer === advisor.id}
                      onClick={() => handleSelectLawyer(advisor.id)}
                    />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-12" />
            <CarouselNext className="hidden sm:flex -right-4 lg:-right-12" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default SelectLawyer;