"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="pb-6 bg-black">
      {/* Hero */}
      <section className="container-x pt-10 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 md:grid-cols-2 md:items-center"
        >
          <div className="space-y-5">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-[#ABF62D] bg-[#ABF62D]/10 px-4 py-2 text-sm font-extrabold tracking-wide text-[#ABF62D]"
              style={{ textShadow: "0 0 10px rgba(171, 246, 45, 0.45)" }}
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-[#ABF62D]" />
              Discover Who You Really Are
            </div>

            <h1 className="text-5xl font-black leading-[1.05] text-white md:text-6xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Discover Your{" "}
              <span className="text-[#ABF62D]">True Value</span>
            </h1>

            <p className="text-base leading-relaxed text-white/60 md:text-lg">
              Build your professional resume in 5 minutes <br /> and discover skills you never knew you had
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/builder" className="btn text-base font-black px-7 py-4 bg-[#ABF62D] text-black hover:bg-[#9fdf2a]">
                Build My Resume Free
              </Link>
              <p className="text-xs font-semibold text-white/40 sm:ml-1">
                No signup. No downloads required until preview.
              </p>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white flex items-center gap-1">
                <span className="text-[#ABF62D]">✓</span>
                100% Free
              </div>
              <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white flex items-center gap-1">
                <span className="text-[#ABF62D]">✓</span>
                No Signup Required
              </div>
              <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white flex items-center gap-1">
                <span className="text-[#ABF62D]">✓</span>
                Instant PDF Download
              </div>
            </div>
            
            <div className="mt-3 text-sm text-white/60">
              🔥 2,847 resumes built this week
            </div>
          </div>

          <Link
            href="/builder"
            className="group relative block cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#ABF62D] hover:shadow-[0_20px_60px_rgba(171,246,45,0.15)]"
          >
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-lime/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-purple/10 blur-2xl" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold uppercase tracking-wider text-white/50">Instant Preview</p>
                <span className="rounded-full bg-[#ABF62D] px-3 py-1 text-xs font-bold text-black">1 Click</span>
              </div>
              <div className="space-y-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="h-2 w-3/4 rounded-full bg-white/10" />
                <div className="h-2 w-1/2 rounded-full bg-white/10" />
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="h-10 rounded-xl bg-white/5" />
                  <div className="h-10 rounded-xl bg-white/5" />
                </div>
                <div className="h-32 rounded-xl bg-white/5" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="grid gap-3 sm:grid-cols-3"
              >
                {[
                  { k: "Clean layout", v: "Single-page template" },
                  { k: "Mobile-first", v: "Fast form experience" },
                  { k: "PDF-ready", v: "Download in seconds" },
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <p className="text-sm font-extrabold text-white">{x.k}</p>
                    <p className="text-xs font-semibold text-white/50">{x.v}</p>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
              <span className="rounded-full bg-[#ABF62D] px-5 py-2 text-sm font-extrabold text-black">
                Start Building →
              </span>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Company Logos */}
      <section className="bg-[#0a0a0a] py-8">
        <div className="container-x">
          <div className="text-center mb-6">
            <p className="text-xs font-extrabold uppercase tracking-wider text-white/50">Students from top companies trust us</p>
          </div>
          <div className="marquee-container overflow-hidden">
            <div className="animate-marquee flex gap-8 text-white/40 text-sm whitespace-nowrap">
              {/* First set of companies */}
              <span>TCS</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Infosys</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Wipro</span>
              <span className="text-[#ABF62D]">•</span>
              <span>HCL</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Google</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Microsoft</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Amazon</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Flipkart</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Zomato</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Swiggy</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Razorpay</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Freshworks</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Zoho</span>
              <span className="text-[#ABF62D]">•</span>
              <span>IBM</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Accenture</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Deloitte</span>
              <span className="text-[#ABF62D]">•</span>
              <span>HDFC Bank</span>
              <span className="text-[#ABF62D]">•</span>
              <span>ICICI Bank</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Cognizant</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Tech Mahindra</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Byju's</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Unacademy</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Meesho</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Ola</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Uber</span>
              <span className="text-[#ABF62D]">•</span>
              <span>PhonePe</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Paytm</span>
              <span className="text-[#ABF62D]">•</span>
              <span>CRED</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Zerodha</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Groww</span>
              {/* Duplicate set for seamless loop */}
              <span>TCS</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Infosys</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Wipro</span>
              <span className="text-[#ABF62D]">•</span>
              <span>HCL</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Google</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Microsoft</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Amazon</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Flipkart</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Zomato</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Swiggy</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Razorpay</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Freshworks</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Zoho</span>
              <span className="text-[#ABF62D]">•</span>
              <span>IBM</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Accenture</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Deloitte</span>
              <span className="text-[#ABF62D]">•</span>
              <span>HDFC Bank</span>
              <span className="text-[#ABF62D]">•</span>
              <span>ICICI Bank</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Cognizant</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Tech Mahindra</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Byju's</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Unacademy</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Meesho</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Ola</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Uber</span>
              <span className="text-[#ABF62D]">•</span>
              <span>PhonePe</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Paytm</span>
              <span className="text-[#ABF62D]">•</span>
              <span>CRED</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Zerodha</span>
              <span className="text-[#ABF62D]">•</span>
              <span>Groww</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-x pt-16 md:pt-20">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#ABF62D]">How it works</p>
            <h2 className="text-3xl font-black text-white md:text-4xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Build in 3 simple steps
            </h2>
          </div>
          <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-lime/10 ring-1 ring-lime/30 md:flex">
            <span className="text-lg font-black text-lime">YV</span>
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Fill your details",
              desc: "Add education, skills, work experience, certifications, and achievements.",
            },
            {
              title: "Preview instantly",
              desc: "See a professional, clean resume template with neat formatting.",
            },
            {
              title: "Download as PDF",
              desc: "Save your resume in a clean PDF format, ready to share anywhere.",
            },
          ].map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              className="group rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 hover:ring-lime/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#ABF62D] text-lg font-bold text-black">
                  {idx + 1}
                </div>
                <p className="text-base font-black text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{step.title}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{step.desc}</p>
              <div className="mt-5 h-px w-14 bg-gradient-to-r from-lime to-purple opacity-60" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resume for College Students */}
      <section className="container-x pt-16 md:pt-20">
        <div className="space-y-2">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#ABF62D]">Resume for College Students</p>
          <h2 className="text-3xl font-black text-white md:text-4xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Built for every stage of your journey
          </h2>
        </div>
        
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              number: "01",
              title: "Freshers",
              description: "Perfect resume with just your education and skills. No experience needed."
            },
            {
              number: "02", 
              title: "Internship Seekers",
              description: "Highlight projects and certifications to land your first internship."
            },
            {
              number: "03",
              title: "Campus Placements", 
              description: "Stand out in college drives with a professional ATS-friendly resume."
            },
            {
              number: "04",
              title: "Postgraduate Students",
              description: "Showcase research, publications and advanced skills for higher studies."
            }
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              className="group rounded-3xl bg-[#111111] p-6 ring-1 ring-white/10 hover:ring-[#ABF62D]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#ABF62D] text-lg font-bold text-black">
                  {card.number}
                </div>
              </div>
              <h3 className="text-base font-black text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {card.description}
              </p>
              <div className="mt-5 h-px w-full bg-gradient-to-r from-[#ABF62D] to-[#D6A3FB] opacity-60" />
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/builder" className="btn text-base font-black px-8 py-4 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-all duration-300 hover:scale-105">
            Build Your College Resume Free
          </Link>
        </div>
      </section>

      {/* New Features Section */}
      <section className="py-20">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              More than a resume builder
            </h2>
            <p className="text-lg text-white/60">
              Discover your true value and unlock your career potential
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "ATS Score Checker",
                description: "See if robots approve your resume",
                button: "Check ATS Score",
                link: "/ats",
                icon: "🤖"
              },
              {
                title: "Skill Score Card",
                description: "Discover your hidden strengths",
                button: "Get My Score",
                link: "/scorecard",
                icon: "🎯"
              },
              {
                title: "Job Matches",
                description: "Find roles you qualify for",
                button: "See My Matches",
                link: "/scorecard",
                icon: "💼"
              }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group rounded-3xl bg-[#111111] p-8 ring-1 ring-[#333333] hover:ring-[#ABF62D]/50 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-white/60 mb-6">
                  {feature.description}
                </p>
                <Link 
                  href={feature.link}
                  className="inline-flex items-center px-6 py-3 bg-[#ABF62D] text-black font-bold rounded-lg hover:bg-[#9fdf2a] transition-all duration-300 group-hover:scale-105"
                >
                  {feature.button}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}