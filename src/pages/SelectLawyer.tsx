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

const SelectLawyer = () => {
  const navigate = useNavigate();
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);

  const handleSelectLawyer = (lawyerId: string) => {
    setSelectedLawyer(lawyerId);
    navigate('/chat', { state: { lawyerId } });
  };

  // Group advisors into chunks of 6 for the carousel
  const advisorChunks = advisors.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/6);
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as typeof advisors[]);

  return (
    <div className="relative min-h-screen bg-background">
      <BackButton to="/" />
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Choose Your Legal Expert</h1>
          <p className="text-lg text-muted-foreground">
            Select a qualified lawyer to assist you with your legal matters
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent>
            {advisorChunks.map((chunk, slideIndex) => (
              <CarouselItem key={slideIndex}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default SelectLawyer;