"use client";

import { useState } from "react";
import Link from "next/link";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
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
      background: "#0f0f0f",
      border: "#222222"
    },
    {
      name: "Pro Monthly",
      price: "₹20",
      period: "per month",
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
      buttonText: "Start for ₹20/mo",
      buttonHref: "/auth",
      popular: true,
      background: "linear-gradient(135deg, #ABF62D 0%, #9fdf2a 100%)",
      border: "#ABF62D"
    },
    {
      name: "Pro Yearly",
      price: "₹249",
      period: "per year",
      smallText: "Just ₹20.75/month",
      strikethrough: "₹240/year",
      description: "Best value for committed professionals",
      features: [
        "Everything in Pro Monthly",
        "Cover letter AI generator",
        "Interview preparation",
        "Priority support",
        "Early access to new features",
        "Resume analytics"
      ],
      buttonText: "Get Yearly Plan",
      buttonHref: "/auth",
      popular: false,
      background: "linear-gradient(135deg, #D6A3FB 0%, #C576F4 100%)",
      border: "#D6A3FB"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="container-x py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-[#F5F5F5] mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Simple Pricing
          </h1>
          <p className="text-lg text-[#888888] mb-8">
            Start free. Upgrade when ready.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl bg-[#0f0f0f] p-1 border border-[#222222]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#ABF62D] text-black'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-[#ABF62D] text-black'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              Yearly (Save 17%)
            </button>
          </div>
        </div>

        <div className="text-center py-16">
          <h2 className="text-4xl font-black text-[#F5F5F5] mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Start free. Grow with us.
          </h2>
          <p className="text-lg text-[#888888] mb-8">
            Choose the perfect plan for your career journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-6 border-2 transition-all ${
              plan.name === "Pro Monthly" ? 'border-[#ABF62D]' : 
              plan.name === "Pro Yearly" ? 'border-[#D6A3FB]' : 
              'border-[#222222]'
            }`} style={{ background: plan.background }}>
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#ABF62D] text-black text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-black text-[#F5F5F5]">{plan.name}</h3>
                <div className="text-3xl font-black mb-2">
                  <span className="text-[#ABF62D]">{plan.price}</span>
                  <span className="text-[#888888] text-sm">
                    {plan.smallText && (
                      <>
                        <span className="line-through mr-2">{plan.strikethrough}</span>
                      {" "}
                      {plan.period}
                    </>
                    )}
                    {!plan.smallText && plan.period}
                  </span>
                </div>
                <p className="text-[#888888]">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-2 text-[#888888]">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[#ABF62D]">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={plan.buttonHref}
                className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                  plan.name === "Pro Monthly" || plan.name === "Pro Yearly" 
                    ? 'bg-[#ABF62D] text-black hover:bg-gray-900 shadow-lg' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center px-8 py-3 bg-transparent text-[#ABF62D] font-bold rounded-xl border border-[#ABF62D] hover:bg-[#ABF62D] hover:text-black transition-all"
          >
            Compare Plans
          </Link>
        </div>

        <div className="text-center py-8">
          <p className="text-[#888888] text-lg">
            Pro Yearly saves you ₹(240-249) 
            compared to paying monthly
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-[#F5F5F5] text-center mb-12" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Frequently Asked Questions
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              question: "Can I cancel anytime?",
              answer: "Yes, cancel anytime. No questions asked."
            },
            {
              question: "Is my data safe?",
              answer: "Yes, we never share your data with anyone."
            },
            {
              question: "What payment methods are accepted?",
              answer: "UPI, Credit/Debit card, Net banking via Razorpay."
            },
            {
              question: "Can I switch plans?",
              answer: "Yes, upgrade or downgrade anytime."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-[#0f0f0f] rounded-2xl p-6 border border-[#222222]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#F5F5F5]">{faq.question}</h3>
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="text-[#ABF62D] hover:text-[#9fdf2a] transition-colors"
                >
                  {expandedIndex === index ? '−' : '+'}
                </button>
          
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                question: "Can I cancel anytime?",
                answer: "Yes, cancel anytime. No questions asked."
              },
              {
                question: "Is my data safe?",
                answer: "Yes, we never share your data with anyone."
              },
              {
                question: "What payment methods are accepted?",
                answer: "UPI, Credit/Debit card, Net banking via Razorpay."
              },
              {
                question: "Can I switch plans?",
                answer: "Yes, upgrade or downgrade anytime."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-[#0f0f0f] rounded-2xl p-6 border border-[#222222]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[#F5F5F5]">{faq.question}</h3>
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="text-[#ABF62D] hover:text-[#9fdf2a] transition-colors"
                  >
                    {expandedIndex === index ? '−' : '+'}
                  </button>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${expandedIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="text-[#888888] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
