
import React, { useEffect, useRef } from 'react';
import { Phone, BarChart2, UserPlus, Clock, Tag, Settings, Shield, Zap, Headphones } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <div 
    className={`glass-panel glass-panel-hover p-6 rounded-2xl animate-on-scroll opacity-0 translate-y-10 transition-all duration-700`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

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

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Call Logging",
      description: "Automatically record and store call details including duration, caller information, and call status."
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-primary" />,
      title: "Analytics Dashboard",
      description: "Visualize call data with intuitive charts and reports to identify trends and performance metrics."
    },
    {
      icon: <UserPlus className="h-6 w-6 text-primary" />,
      title: "User Management",
      description: "Easily add and manage team members with customizable roles and permissions."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Real-time Monitoring",
      description: "Track ongoing calls and agent activity as it happens to ensure optimal performance."
    },
    {
      icon: <Tag className="h-6 w-6 text-primary" />,
      title: "Custom Tagging",
      description: "Categorize calls with custom tags for effortless filtering and organization."
    },
    {
      icon: <Settings className="h-6 w-6 text-primary" />,
      title: "Integration Ready",
      description: "Seamlessly connect with your existing tools like CRM systems and communication platforms."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Secure Storage",
      description: "Enterprise-grade security for all your call data with encryption and access controls."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Automated Workflows",
      description: "Create custom workflows to automate follow-ups and task assignments based on call outcomes."
    },
    {
      icon: <Headphones className="h-6 w-6 text-primary" />,
      title: "Call Recording",
      description: "Record calls for training purposes and quality assurance with easy playback and sharing."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-10" id="features" ref={featuresRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            Comprehensive Call Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
            Everything you need to track, analyze, and optimize your business communications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={200 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
