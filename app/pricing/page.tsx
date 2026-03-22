"use client";

import { useState } from "react";
import Link from "next/link";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "Forever free",
      description: "Perfect for getting started",
      features: [
        "Build unlimited resumes",
        "Download as PDF",
        "Basic templates",
        "ATS score checker",
        "Skill score card",
        "Local storage only"
      ],
      buttonText: "Get Started",
      buttonHref: "/builder",
      popular: false,
      background: "#111111",
      border: "white/10"
    },
    {
      name: "Pro",
      price: billingCycle === "monthly" ? "₹199" : "₹1,999",
      period: billingCycle === "monthly" ? "per month" : "per year",
      description: "For serious job seekers",
      features: [
        "Everything in Free",
        "Cloud storage",
        "Premium templates",
        "Resume analytics",
        "Multiple resume versions",
        "Priority support",
        "Export to Word/Docs",
        "Custom domains"
      ],
      buttonText: "Start Free Trial",
      buttonHref: "/auth",
      popular: true,
      background: "linear-gradient(135deg, #ABF62D 0%, #9fdf2a 100%)",
      border: "#ABF62D"
    },
    {
      name: "Team",
      price: billingCycle === "monthly" ? "₹499" : "₹4,999",
      period: billingCycle === "monthly" ? "per month" : "per year",
      description: "For teams and agencies",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Bulk resume creation",
        "White-label options",
        "API access",
        "Dedicated support",
        "Custom integrations",
        "Advanced analytics"
      ],
      buttonText: "Contact Sales",
      buttonHref: "mailto:sales@yourvalue.in",
      popular: false,
      background: "#1a1a1a",
      border: "#333333"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="container-x py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Simple Pricing
          </h1>
          <p className="text-xl text-white/60">
            Start free. Upgrade when ready.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#111111] rounded-full p-1 border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#ABF62D] text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-[#ABF62D] text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Yearly (Save 17%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 p-8 transition-all hover:scale-105 ${
                plan.popular
                  ? 'border-[#ABF62D] shadow-[0_0_30px_rgba(171,246,45,0.3)]'
                  : 'border-white/10 hover:border-white/20'
              }`}
              style={{ background: plan.background }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#ABF62D] text-black text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-white/60 ml-2">{plan.period}</span>
                </div>
                <p className="text-white/60">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#ABF62D]/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-[#ABF62D]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-8-8a1 1 0 011.414-1.414l8 8a1 1 0 001.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href={plan.buttonHref}
                className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                  plan.popular
                    ? 'bg-black text-white hover:bg-gray-900 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-12" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                question: "Can I switch plans anytime?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "What's included in the free trial?",
                answer: "The free trial gives you full access to all Pro features for 7 days. No credit card required."
              },
              {
                question: "Do you offer student discounts?",
                answer: "Yes! We offer 50% off for students with valid .edu email addresses."
              },
              {
                question: "Can I cancel my subscription?",
                answer: "Absolutely. You can cancel anytime and continue using the service until the end of your billing period."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, UPI, and net banking."
              },
              {
                question: "Is my data secure?",
                answer: "Yes! We use industry-standard encryption and never share your data with third parties."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-[#111111] rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16">
          <h2 className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Ready to build your resume?
          </h2>
          <p className="text-white/60 mb-8">
            Join thousands of professionals who've transformed their careers
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/builder"
              className="px-8 py-4 bg-[#ABF62D] text-black font-bold rounded-xl hover:bg-[#9fdf2a] transition-all"
            >
              Start Building Free
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 border border-white/20 transition-all"
            >
              Compare Plans
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
