
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Phone, BarChart2, UserPlus, Shield } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative pt-28 md:pt-32 pb-20 md:pb-32 px-6 md:px-10 overflow-hidden" ref={heroRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/50 -z-10"></div>

      {/* Background circle decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 space-y-8 mb-12 lg:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <span className="mr-2">New</span>
              <span className="text-xs">Real-time call analytics</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
              Track every call. <br />
              <span className="text-primary">Boost performance.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
              Comprehensive call tracking and analytics for businesses of all sizes. Gain valuable insights, improve customer service, and drive growth.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto button-shine">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Book a Demo
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-400">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Enterprise security</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <BarChart2 className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Advanced analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <UserPlus className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Team collaboration</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-500">
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl blur-lg opacity-75 -z-10"></div>
              <div className="glass-panel rounded-2xl p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Call Activity</h3>
                      <p className="text-xs text-muted-foreground">Today, Aug 15</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    Live
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { time: '09:45 AM', number: '+1 (415) 555-2671', duration: '4:32', status: 'Completed' },
                    { time: '10:12 AM', number: '+1 (628) 555-1298', duration: '2:15', status: 'Completed' },
                    { time: '11:30 AM', number: '+1 (510) 555-9814', duration: '5:48', status: 'Completed' },
                    { time: '01:05 PM', number: '+1 (408) 555-3627', duration: '3:22', status: 'In Progress' },
                  ].map((call, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{call.time}</span>
                          <span className="text-xs text-muted-foreground">{call.number}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <span className="text-sm">{call.duration}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            call.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {call.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border flex justify-center">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Calls
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
