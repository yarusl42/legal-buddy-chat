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
import { useAppDispatch } from "@/store/hooks";
import { setLoading, setError } from "@/store/slices/chatsSlice";
import { Advisor } from '../types/advisor';
import { chatService } from '@/services/chatService';
import { userService } from '@/services/userService';

const SelectLawyer = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);

  const handleSelectLawyer = async (lawyer: Advisor) => {
    try {
      setSelectedLawyer(lawyer.id);
      dispatch(setLoading(true));
      await chatService.createChat(lawyer);
      userService.setOnboardingDone();
      navigate('/chat');
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to create chat'));
    } finally {
      dispatch(setLoading(false));
    }
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
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Выберите своего юридического эксперта</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите квалифицированного юриста, чтобы помочь вам с вашими юридическими вопросами
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
                      onClick={() => handleSelectLawyer(advisor)}
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