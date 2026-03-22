"use client";
import { useState } from "react";
import Link from "next/link";

const faqs = [
  { q: "Can I cancel anytime?", a: "Yes, cancel anytime. No questions asked." },
  { q: "Is my data safe?", a: "Yes, we never share your data with anyone." },
  { q: "What payment methods are accepted?", a: "UPI, Credit/Debit card, Net banking via Razorpay." },
  { q: "Can I switch plans?", a: "Yes, upgrade or downgrade anytime." },
  { q: "Do students get a discount?", a: "Yes! Students get 20% off. Show your college ID." },
  { q: "Is there a free trial?", a: "The free plan is free forever. No trial needed." },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest text-[#ABF62D] uppercase mb-3">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Simple Pricing
          </h1>
          <p className="text-white/60 text-lg">Start free. Upgrade when ready.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-16">
          
          {/* FREE */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 flex flex-col">
            <div className="mb-6">
              <h2 className="text-white font-bold text-xl mb-2">Free</h2>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black text-white">₹0</span>
              </div>
              <p className="text-[#888] text-sm mt-1">Forever free</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {["Resume builder","1 template","PDF download","Basic ATS check"].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-[#ABF62D]">✓</span>{f}
                </li>
              ))}
              {["Multiple templates","Skill Score Card","Cover letter AI","Interview prep"].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#444] line-through">
                  <span>✗</span>{f}
                </li>
              ))}
            </ul>
            <Link href="/builder" className="block text-center py-3 border border-white/30 text-white rounded-full font-bold hover:border-white transition-all">
              Get Started Free
            </Link>
          </div>

          {/* PRO MONTHLY */}
          <div className="bg-[#111111] border-2 border-[#ABF62D] rounded-2xl p-8 flex flex-col relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-[#ABF62D] text-black text-xs font-black px-4 py-1.5 rounded-full">MOST POPULAR</span>
            </div>
            <div className="mb-6">
              <h2 className="text-white font-bold text-xl mb-2">Pro Monthly</h2>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black text-[#ABF62D]">₹20</span>
              </div>
              <p className="text-[#888] text-sm mt-1">per month</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {["Everything in Free","4 resume templates","Full ATS Score Checker","Skill Score Card","Job role suggestions","Share resume link"].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-[#ABF62D]">✓</span>{f}
                </li>
              ))}
              {["Cover letter AI","Interview prep"].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#444] line-through">
                  <span>✗</span>{f}
                </li>
              ))}
            </ul>
            <button className="block w-full text-center py-3 bg-[#ABF62D] text-black rounded-full font-bold hover:bg-[#9fdf2a] hover:shadow-[0_0_20px_rgba(171,246,45,0.4)] transition-all">
              Start for ₹20/mo
            </button>
          </div>

          {/* PRO YEARLY */}
          <div className="bg-[#111111] border-2 border-[#D6A3FB] rounded-2xl p-8 flex flex-col relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-[#D6A3FB] text-black text-xs font-black px-4 py-1.5 rounded-full">BEST VALUE</span>
            </div>
            <div className="mb-6">
              <h2 className="text-white font-bold text-xl mb-2">Pro Yearly</h2>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black text-[#D6A3FB]">₹249</span>
              </div>
              <p className="text-[#888] text-sm mt-1">per year = ₹20.75/month</p>
              <p className="text-[#555] text-xs line-through mt-0.5">₹240 if monthly</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {["Everything in Pro Monthly","Cover letter AI generator","Interview preparation","Priority support","Early access to features","Resume analytics"].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                  <span className="text-[#D6A3FB]">✓</span>{f}
                </li>
              ))}
            </ul>
            <button className="block w-full text-center py-3 bg-[#D6A3FB] text-black rounded-full font-bold hover:shadow-[0_0_20px_rgba(214,163,251,0.4)] transition-all">
              Get Yearly Plan
            </button>
          </div>

        </div>

        <p className="text-center text-[#888] text-sm mb-16">
          Pro Yearly saves you money compared to paying monthly 🎉
        </p>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-8" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-white text-sm">{faq.q}</span>
                  <span className={`text-[#ABF62D] transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-[#888] text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Ready to build your resume?
          </h3>
          <div className="flex gap-4 justify-center">
            <Link href="/builder" className="px-8 py-3 bg-[#ABF62D] text-black font-bold rounded-full hover:scale-105 transition-all">
              Start Building Free
            </Link>
            <Link href="/" className="px-8 py-3 border border-white/30 text-white font-bold rounded-full hover:border-white transition-all">
              Back to Home
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
