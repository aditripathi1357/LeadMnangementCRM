
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type BillingCycle = 'monthly' | 'yearly';

type PlanFeature = {
  text: string;
  included: boolean;
};

type PricingPlan = {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: PlanFeature[];
  popular?: boolean;
};

const pricingPlans: PricingPlan[] = [
  {
    name: 'Essential',
    price: {
      monthly: 29,
      yearly: 23, // 20% off yearly
    },
    description: 'Perfect for individuals and small teams getting started with call tracking.',
    features: [
      { text: 'Unlimited call logging', included: true },
      { text: 'Basic analytics dashboard', included: true },
      { text: 'Email support', included: true },
      { text: 'Up to 3 team members', included: true },
      { text: 'Custom call tagging', included: false },
      { text: 'Advanced reporting', included: false },
    ],
  },
  {
    name: 'Perform',
    price: {
      monthly: 49,
      yearly: 39, // 20% off yearly
    },
    description: 'Ideal for growing businesses that need advanced features and more capacity.',
    features: [
      { text: 'Unlimited call logging', included: true },
      { text: 'Advanced analytics dashboard', included: true },
      { text: 'Priority support', included: true },
      { text: 'Up to 10 team members', included: true },
      { text: 'Custom call tagging', included: true },
      { text: 'Advanced reporting', included: false },
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: {
      monthly: 79,
      yearly: 63, // 20% off yearly
    },
    description: 'Full-featured solution for organizations with complex needs and large teams.',
    features: [
      { text: 'Unlimited call logging', included: true },
      { text: 'Advanced analytics dashboard', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Unlimited team members', included: true },
      { text: 'Custom call tagging', included: true },
      { text: 'Advanced reporting', included: true },
    ],
  },
];

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <section className="py-20 px-6 md:px-10" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
            Choose the plan that works best for your business needs
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center bg-secondary rounded-full p-1.5">
            <button
              onClick={() => setBillingCycle('yearly')}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                billingCycle === 'yearly' ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly -20%
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                billingCycle === 'monthly' ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={cn(
                "relative border h-full animate-on-scroll opacity-0 translate-y-10 transition-all duration-700",
                plan.popular ? "bg-[#111827] text-white border-primary/20" : "bg-card",
                plan.popular ? "" : "border-muted"
              )}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {plan.popular && (
                <Badge 
                  className="absolute top-0 right-6 -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Most Popular
                </Badge>
              )}
              <CardHeader className="pt-8 pb-4">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="flex items-baseline mt-4">
                  <span className="text-4xl font-bold">${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}</span>
                  <span className="ml-1 text-muted-foreground">/mo</span>
                </div>
                <p className={cn(
                  "text-sm mt-3",
                  plan.popular ? "text-gray-400" : "text-muted-foreground"
                )}>
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="pt-4 pb-8">
                <Button 
                  className={cn(
                    "w-full button-shine", 
                    plan.popular ? "bg-primary hover:bg-primary/90" : ""
                  )}
                >
                  Purchase Plan
                </Button>
                <div className="mt-8">
                  <p className={cn(
                    "font-medium mb-4",
                    plan.popular ? "text-gray-300" : ""
                  )}>
                    Includes:
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className={cn(
                          "h-5 w-5 mr-3 shrink-0", 
                          feature.included ? "text-emerald-500" : "text-gray-400"
                        )} />
                        <span className={cn(
                          "text-sm",
                          !feature.included && "text-gray-400 line-through"
                        )}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            Need a custom plan? <a href="#contact" className="text-primary hover:underline">Contact us</a> for a personalized quote.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
