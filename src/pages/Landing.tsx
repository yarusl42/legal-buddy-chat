import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { advisors } from "@/data/advisors";
import { Scale, Clock, Shield, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Expert Legal Guidance at Your Fingertips
            </h1>
            <p className="mb-8 text-xl">
              Connect with AI-powered legal advisors for instant, accurate, and
              personalized legal consultation available 24/7.
            </p>
            <Link to="/chat">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-primary font-semibold"
              >
                Start Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">
            Why Choose Our AI Legal Advisors?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 border-primary/10">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <Brain className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                  AI-Powered Expertise
                </h3>
                <p className="text-center text-gray-600">
                  Advanced AI technology providing accurate legal insights and
                  guidance
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/10">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <Clock className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                  24/7 Availability
                </h3>
                <p className="text-center text-gray-600">
                  Get legal assistance anytime, anywhere, without appointments
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/10">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <Scale className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                  Diverse Expertise
                </h3>
                <p className="text-center text-gray-600">
                  Specialized advisors covering various areas of law
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/10">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <Shield className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                  Secure & Confidential
                </h3>
                <p className="text-center text-gray-600">
                  Your information is protected with enterprise-grade security
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advisors Showcase */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">
            Meet Our Legal Advisors
          </h2>
          <div className="mx-auto max-w-4xl">
            <Carousel>
              <CarouselContent>
                {advisors.map((advisor) => (
                  <CarouselItem key={advisor.id} className="md:basis-1/2">
                    <Card className="mx-2 border-2 border-primary/10">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center space-x-4">
                          <img
                            src={advisor.avatar}
                            alt={advisor.name}
                            className="h-16 w-16 rounded-full"
                          />
                          <div>
                            <h3 className="text-xl font-semibold text-primary">
                              {advisor.name}
                            </h3>
                            <p className="text-secondary">{advisor.specialty}</p>
                          </div>
                        </div>
                        <p className="text-gray-600">{advisor.description}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Ready to Get Expert Legal Advice?
          </h2>
          <p className="mb-8 text-xl">
            Start your free consultation with our AI legal advisors today
          </p>
          <Link to="/chat">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-primary font-semibold"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;