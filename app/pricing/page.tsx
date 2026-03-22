"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "Forever free",
      features: [
        "Basic resume template",
        "PDF download",
        "1 resume per month",
        "No ATS score",
        "Basic support",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro Monthly",
      price: "₹20",
      period: "per month",
      features: [
        "Premium templates",
        "Unlimited resumes",
        "ATS score checker",
        "Priority support",
        "Resume analytics",
        "Export to multiple formats",
        "Cover letter templates",
        "LinkedIn optimization",
      ],
      buttonText: "Start for ₹20/mo",
      popular: true,
    },
    {
      name: "Pro Yearly",
      price: "₹249",
      period: "per year",
      smallText: "Just ₹20.75/month",
      strikethrough: "₹240/year",
      features: [
        "Everything in Pro Monthly",
        "Save ₹31 per year",
        "Advanced ATS insights",
        "Personal branding kit",
        "Interview preparation",
        "Career coaching credits",
        "Resume video reviews",
        "Job matching alerts",
      ],
      buttonText: "Get Yearly Plan",
      popular: false,
      bestValue: true,
    },
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "What is ATS score?",
      answer: "ATS (Applicant Tracking System) score shows how well your resume will perform when scanned by recruitment software used by companies.",
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund.",
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription anytime. You'll continue to have access until the end of your billing period.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, and net banking for Indian customers.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container-x py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-black text-white md:text-5xl mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-[#888888] max-w-2xl mx-auto">
            Choose the perfect plan for your career needs. Start free, upgrade when you're ready.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center rounded-full bg-[#1a1a1a] p-1">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-[#ABF62D] text-black"
                  : "text-[#888888] hover:text-white"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === "yearly"
                  ? "bg-[#ABF62D] text-black"
                  : "text-[#888888] hover:text-white"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly (Save 17%)
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative rounded-2xl border ${
                plan.popular
                  ? "border-[#ABF62D] bg-[#ABF62D]/5"
                  : plan.bestValue
                  ? "border-purple-500 bg-purple-500/5"
                  : "border-[#222222] bg-[#0f0f0f]"
              } p-8 hover:transform hover:scale-105 transition-all duration-300`}
            >
              {/* Popular/Badges */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-[#ABF62D] px-4 py-1 text-xs font-bold text-black">
                    MOST POPULAR
                  </span>
                </div>
              )}
              {plan.bestValue && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-purple-500 px-4 py-1 text-xs font-bold text-white">
                    BEST VALUE
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-black text-white">{plan.name}</h3>
                <div className="text-3xl font-black mb-2">
                  <span className={plan.bestValue ? "text-purple-500" : "text-[#ABF62D]"}>
                    {plan.price}
                  </span>
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
                <p className="text-[#888888]">{plan.period}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#ABF62D] mt-1">✓</span>
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={plan.name === "Free" ? "/builder" : "#"}
                className={`block w-full text-center rounded-full py-3 font-bold transition-colors ${
                  plan.popular
                    ? "bg-[#ABF62D] text-black hover:bg-[#9fdf2a]"
                    : plan.bestValue
                    ? "bg-purple-500 text-white hover:bg-purple-600"
                    : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"
                }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-black text-center text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="rounded-2xl border border-[#222222] bg-[#0f0f0f] p-6"
              >
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-[#888888] leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to build your perfect resume?
          </h2>
          <p className="text-[#888888] mb-8">
            Join thousands of professionals who've landed their dream jobs with YourValue.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center rounded-full bg-[#ABF62D] px-8 py-4 text-sm font-bold text-black hover:bg-[#9fdf2a] transition-colors"
          >
            Start Building Free →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
