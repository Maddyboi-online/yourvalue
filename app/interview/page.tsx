"use client";

import { useState } from "react";
import Link from "next/link";

export default function InterviewPage() {
  const [jobRole, setJobRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [isPro, setIsPro] = useState(false);

  const questionBanks = {
    "Software Engineer": {
      technical: [
        {
          question: "What is the difference between var, let and const in JavaScript?",
          answer: "var is function-scoped and can be redeclared, let is block-scoped and cannot be redeclared, const is block-scoped and cannot be reassigned."
        },
        {
          question: "Explain REST API principles.",
          answer: "REST uses HTTP methods (GET, POST, PUT, DELETE), is stateless, uses standard HTTP status codes, and follows HATEOAS principles."
        },
        {
          question: "What is time complexity?",
          answer: "Time complexity measures how runtime of an algorithm scales with input size. Common notations: O(1), O(log n), O(n), O(n log n), O(n²)."
        },
        {
          question: "Difference between SQL and NoSQL?",
          answer: "SQL uses structured tables with schemas, NoSQL uses flexible data models like documents, key-value pairs, or graphs. SQL is better for complex queries, NoSQL for scalability."
        },
        {
          question: "What is version control and Git?",
          answer: "Version control tracks changes in code over time. Git is a distributed VCS that allows multiple developers to work together, manages branches, and enables collaboration."
        }
      ],
      behavioral: [
        {
          question: "Tell me about a challenging project.",
          answer: "Focus on STAR method: Situation, Task, Action, Result. Explain the challenge, your specific actions, and measurable outcomes."
        },
        {
          question: "How do you handle tight deadlines?",
          answer: "Prioritize tasks, break down large projects, communicate early about potential delays, focus on critical path, and deliver incrementally."
        },
        {
          question: "Describe your problem solving approach.",
          answer: "Understand requirements, analyze constraints, consider multiple solutions, evaluate trade-offs, implement the best solution, test thoroughly, and document decisions."
        }
      ],
      hr: [
        {
          question: "Why do you want to join our company?",
          answer: "Research the company's products, culture, values, and recent achievements. Align your skills with their needs and show genuine enthusiasm for their mission."
        },
        {
          question: "Where do you see yourself in 5 years?",
          answer: "Show ambition but remain realistic. Focus on growing with the company, taking on leadership roles, and contributing to strategic goals."
        }
      ]
    },
    "Data Analyst": {
      technical: [
        {
          question: "What is the difference between mean, median and mode?",
          answer: "Mean is average, median is middle value, mode is most frequent. Mean is sensitive to outliers, median is robust, mode shows common values."
        },
        {
          question: "Explain what a JOIN is in SQL.",
          answer: "JOIN combines rows from multiple tables. Types: INNER (matching rows), LEFT (all from left), RIGHT (all from right), FULL (all rows)."
        },
        {
          question: "What tools do you use for data visualization?",
          answer: "Tools like Tableau, Power BI, D3.js, matplotlib, seaborn. Key considerations: choosing right chart types, color schemes, and interactivity."
        },
        {
          question: "What is data cleaning?",
          answer: "Process of detecting and correcting errors in data. Includes handling missing values, removing duplicates, correcting formats, and ensuring consistency."
        },
        {
          question: "Explain correlation vs causation.",
          answer: "Correlation shows relationship between variables, causation implies one causes the other. Correlation doesn't imply causation - need controlled experiments."
        }
      ],
      behavioral: [
        {
          question: "Tell me about a data insight you found.",
          answer: "Use STAR method. Focus on the business impact, how you discovered the insight, actions taken based on it, and measurable results."
        },
        {
          question: "How do you present data to non-technical people?",
          answer: "Simplify complex concepts, use visualizations, focus on business implications, tell a story, and provide actionable recommendations."
        },
        {
          question: "How do you handle missing data?",
          answer: "Identify patterns in missingness, consider imputation methods, understand impact on analysis, document assumptions, and choose appropriate handling strategy."
        }
      ],
      hr: [
        {
          question: "Why data analytics?",
          answer: "Data analytics helps businesses make informed decisions, identify opportunities, optimize processes, and gain competitive advantages through data-driven insights."
        },
        {
          question: "Where do you see yourself in 5 years?",
          answer: "Leading analytics projects, mentoring junior analysts, developing expertise in machine learning, and contributing to strategic business decisions."
        }
      ]
    },
    "UI/UX Designer": {
      technical: [
        {
          question: "What is the difference between UX and UI design?",
          answer: "UX focuses on user experience, research, and journey. UI focuses on visual design, interface elements, and aesthetics. They work together but have different focuses."
        },
        {
          question: "Walk me through your design process.",
          answer: "Research → Define → Ideate → Prototype → Test → Iterate. Includes user research, wireframing, mockups, usability testing, and refinement."
        },
        {
          question: "What tools do you use?",
          answer: "Figma, Sketch, Adobe XD, InVision, Principle. For prototyping: Framer, Proto.io. For version control: Abstract, GitHub."
        },
        {
          question: "What is user research?",
          answer: "Understanding user behaviors, needs, and motivations through interviews, surveys, analytics, and observation. Informs design decisions and validates assumptions."
        },
        {
          question: "Explain design thinking.",
          answer: "Human-centered approach to problem-solving. Empathize → Define → Ideate → Prototype → Test. Focus on user needs, not just technical solutions."
        }
      ],
      behavioral: [
        {
          question: "Tell me about a design you are proud of.",
          answer: "Choose a project with clear impact, user benefit, and design challenge. Explain your role, process, and measurable outcomes."
        },
        {
          question: "How do you handle client feedback?",
          answer: "Listen actively, ask clarifying questions, separate feedback from personal opinions, prioritize based on impact, and communicate changes clearly."
        },
        {
          question: "How do you prioritize features?",
          answer: "Consider user impact, business goals, technical feasibility, and development effort. Use frameworks like MoSCoW (Must, Should, Could, Won't)."
        }
      ],
      hr: [
        {
          question: "Why design?",
          answer: "Design solves problems, creates experiences, and drives business value. It's about understanding users and creating solutions that improve their lives."
        },
        {
          question: "Where do you see yourself in 5 years?",
          answer: "Leading design projects, mentoring designers, developing expertise in design systems, and shaping product strategy."
        }
      ]
    }
  };

  const defaultQuestions = {
    technical: [
      {
        question: "Tell me about your technical skills.",
        answer: "Focus on your strongest technical skills and provide examples of how you've used them in real projects."
      },
      {
        question: "What projects have you worked on?",
        answer: "Describe 2-3 significant projects, your role, technologies used, challenges faced, and outcomes achieved."
      },
      {
        question: "How do you stay updated in your field?",
        answer: "Mention blogs, courses, conferences, certifications, side projects, and communities you're part of."
      },
      {
        question: "What tools do you use daily?",
        answer: "List the specific tools, software, and platforms you use regularly in your work."
      },
      {
        question: "Describe your ideal work process.",
        answer: "Explain how you approach tasks, collaborate with teams, and manage your time and priorities."
      }
    ],
    behavioral: [
      {
        question: "Tell me about yourself.",
        answer: "Provide a concise professional summary highlighting your key strengths, experiences, and career goals."
      },
      {
        question: "What is your greatest strength?",
        answer: "Choose a strength relevant to the job and provide a specific example of when you demonstrated it."
      },
      {
        question: "How do you handle pressure?",
        answer: "Show how you stay calm, prioritize tasks, seek help when needed, and maintain quality under pressure."
      }
    ],
    hr: [
      {
        question: "Why do you want this job?",
        answer: "Research the company and role, align your skills with their needs, and show genuine enthusiasm for the opportunity."
      },
      {
        question: "Where do you see yourself in 5 years?",
        answer: "Show career ambition while being realistic about growth and development within the company."
      }
    ]
  };

  const generateQuestions = () => {
    if (jobRole && questionBanks[jobRole as keyof typeof questionBanks]) {
      const selectedBank = questionBanks[jobRole as keyof typeof questionBanks];
      const allQuestions = [
        ...selectedBank.technical.map(q => ({...q, category: 'technical'})),
        ...selectedBank.behavioral.map(q => ({...q, category: 'behavioral'})),
        ...selectedBank.hr.map(q => ({...q, category: 'hr'}))
      ];
      setQuestions(allQuestions);
    } else {
      // Combine all default questions
      const allDefaults = [
        ...defaultQuestions.technical.slice(0, 2).map(q => ({...q, category: 'technical'})),
        ...defaultQuestions.behavioral.slice(0, 1).map(q => ({...q, category: 'behavioral'})),
        ...defaultQuestions.hr.slice(0, 1).map(q => ({...q, category: 'hr'}))
      ];
      setQuestions(allDefaults);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Pro Badge */}
      {!isPro && (
        <div className="bg-[#D6A3FB] text-black px-4 py-2 text-center text-sm font-medium">
          🔒 Pro Feature - Unlock advanced interview preparation
        </div>
      )}

      <div className="container-x py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Interview Preparation
          </h1>
          <p className="text-xl text-white/60">
            Practice makes perfect
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-[#111111] rounded-2xl p-6 border border-white/10 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Customize Your Practice</h2>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Job Role</label>
              <input
                type="text"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="w-full px-4 py-3 bg-[#000000] border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#ABF62D] focus:ring-1 focus:ring-[#ABF62D]/20"
                placeholder="e.g., Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Experience Level</label>
              <div className="flex gap-2">
                {['Fresher', 'Mid Level', 'Senior'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setExperienceLevel(level)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      experienceLevel === level
                        ? 'bg-[#ABF62D] text-black'
                        : 'bg-[#111111] text-white hover:bg-white/20'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Skills (comma separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-4 py-3 bg-[#000000] border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#ABF62D] focus:ring-1 focus:ring-[#ABF62D]/20"
                placeholder="React, Node.js, Python..."
              />
            </div>
          </div>

          <button
            onClick={generateQuestions}
            className="w-full py-4 bg-[#ABF62D] text-black font-bold rounded-lg hover:bg-[#9fdf2a] transition-all"
          >
            Generate Questions
          </button>
        </div>

        {/* Questions Section */}
        {questions.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Interview Questions</h2>
              <button
                onClick={generateQuestions}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                Regenerate
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {questions.map((item, index) => (
                <div key={index} className="bg-[#111111] rounded-2xl p-6 border border-white/10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-bold">{item.question}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.category === 'technical' ? 'bg-blue-500/20 text-blue-400' :
                      item.category === 'behavioral' ? 'bg-green-500/20 text-green-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  
                  <button className="w-full py-2 bg-[#ABF62D] text-black font-medium rounded-lg hover:bg-[#9fdf2a] transition-all mb-3">
                    Show Answer
                  </button>
                  
                  <div className="bg-[#000000] rounded-lg p-4 text-white/90 text-sm leading-relaxed hidden">
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Practice */}
        <div className="text-center mt-8">
          <Link
            href="/pricing"
            className="inline-flex items-center px-6 py-3 bg-[#D6A3FB] text-black font-bold rounded-lg hover:bg-[#C576F4] transition-all"
          >
            Upgrade to Pro for More Features
          </Link>
        </div>
      </div>
    </main>
  );
}
