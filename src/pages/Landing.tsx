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
import { Scale, Clock, Shield, Brain, Sparkles, Target, Bot } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileMenu } from "@/components/ProfileMenu";
import { useAppSelector } from "@/store/hooks";

const Landing = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 text-white">
        <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          {isLoggedIn ? <ProfileMenu /> : null}
          <div className="max-w-3xl">
            <span className="inline-block mb-4 px-4 py-2 bg-secondary/20 rounded-full text-secondary font-medium">
              AI-Powered Legal Excellence
            </span>
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Revolutionary Legal Guidance with Advanced AI Technology
            </h1>
            <p className="mb-8 text-xl opacity-90">
              Experience the future of legal consultation with our AI-powered advisors. 
              Faster, smarter, and more accessible than traditional legal services.
            </p>
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-primary font-semibold"
              onClick={() => navigate("/select-lawyer")}
            >
              Start Free Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* AI Advantage Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Superior AI Technology
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our advanced AI model outperforms leading competitors like DeepSeek and ChatGPT 
              in legal analysis and consultation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-2 border-primary/10 transform hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Bot className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Specialized Expertise
                </h3>
                <p className="text-gray-600">
                  Access AI agents specialized in specific legal fields, from corporate law to intellectual property.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/10 transform hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Sparkles className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Superior Performance
                </h3>
                <p className="text-gray-600">
                  Our AI consistently outperforms other models in legal analysis, precedent citation, and practical advice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/10 transform hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Target className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  General Specialist
                </h3>
                <p className="text-gray-600">
                  Access our versatile general specialist for comprehensive guidance across all legal domains.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">
            Why Choose Our AI Legal Advisors?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 border-primary/10 transform hover:-translate-y-1 transition-transform">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <Brain className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                  Cost-Effective
                </h3>
                <p className="text-center text-gray-600">
                  Save up to 80% compared to traditional legal consultation fees
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/10 transform hover:-translate-y-1 transition-transform">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <Clock className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                  24/7 Availability
                </h3>
                <p className="text-center text-gray-600">
                  Get instant legal guidance anytime, anywhere
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/10 transform hover:-translate-y-1 transition-transform">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <Scale className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                  Specialized Expertise
                </h3>
                <p className="text-center text-gray-600">
                  Access experts in every field of law instantly
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/10 transform hover:-translate-y-1 transition-transform">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <Shield className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                  Secure & Confidential
                </h3>
                <p className="text-center text-gray-600">
                  Enterprise-grade security for your legal matters
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advisors Showcase */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">
            Meet Our Specialized AI Legal Advisors
          </h2>
          <div className="mx-auto max-w-4xl">
            <Carousel>
              <CarouselContent>
                {advisors.map((advisor) => (
                  <CarouselItem key={advisor.id} className="md:basis-1/2">
                    <Card className="mx-2 border-2 border-primary/10 hover:border-secondary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center space-x-4">
                          <img
                            src={advisor.avatar}
                            alt={advisor.name}
                            className="h-16 w-16 rounded-full bg-gray-50 p-2"
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
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Experience the Future of Legal Consultation
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Join thousands of satisfied clients who trust our AI legal advisors
          </p>
          <Link to="/select-lawyer">
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