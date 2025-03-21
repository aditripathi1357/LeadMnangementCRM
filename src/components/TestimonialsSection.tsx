
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "CallTrack has transformed how we handle customer service. The insights we've gained have improved response times by 35% and boosted customer satisfaction scores.",
    name: "Sarah Johnson",
    title: "Customer Service Director",
    company: "Quantum Retail"
  },
  {
    quote: "The analytics capabilities are unmatched. We can now track every aspect of our call center performance and make data-driven decisions that have increased our conversion rates.",
    name: "Michael Chen",
    title: "Operations Manager",
    company: "TechNova Solutions"
  },
  {
    quote: "Setting up CallTrack was surprisingly easy, and the ROI has been incredible. Our sales team is more efficient, and we're capturing leads that used to fall through the cracks.",
    name: "David Rodriguez",
    title: "Sales Director",
    company: "Elevation Marketing"
  },
  {
    quote: "As a healthcare provider, call management is critical for patient care. CallTrack's secure platform gives us the reliability and compliance features we need while improving our response workflow.",
    name: "Dr. Emily Foster",
    title: "Practice Manager",
    company: "Wellness Medical Group"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el) => {
              el.classList.add('opacity-100');
              el.classList.remove('opacity-0', 'translate-y-10');
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="py-20 px-6 md:px-10 bg-secondary/50" ref={testimonialsRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
            Don't just take our word for it—hear from businesses that have transformed their call management.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="glass-panel rounded-2xl p-8 md:p-10 text-center max-w-4xl mx-auto">
                    <div className="flex justify-center mb-6">
                      <Quote className="h-12 w-12 text-primary opacity-20" />
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium mb-8">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activeIndex === index 
                    ? "bg-primary" 
                    : "bg-primary/20 hover:bg-primary/40"
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Left/Right Controls */}
          <button
            className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full glass-panel flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full glass-panel flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
