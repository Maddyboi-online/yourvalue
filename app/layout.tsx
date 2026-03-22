import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import MotionWrapper from "@/components/MotionWrapper";
import BackToTop from "@/components/BackToTop";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "YourValue.in — Resume Builder",
  description: "Build a professional resume in minutes and discover your true value.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} bg-gradient-to-br from-purple-950 via-indigo-950 to-black`}>
Add Phase 3 monetization features to YourValue:

FEATURE 1 - Pricing Page:
Create app/pricing/page.tsx

Full black background.
Title: "Simple Pricing" in white bold
Subtitle: "Start free. Upgrade when ready."
in white/60

3 pricing cards side by side:

Card 1 - FREE:
- Background: #111111
- Border: white/10
- Title: "Free" in white
- Price: "₹0" huge white text
- Subtext: "Forever free"
- Features list with green checkmarks:
  ✓ Resume builder
  ✓ 1 template
  ✓ PDF download
  ✓ Basic ATS check
  ✗ Multiple templates (grey)
  ✗ Skill Score Card (grey)
  ✗ Cover letter (grey)
  ✗ Interview prep (grey)
- Button: "Get Started Free"
  White border, white text

Card 2 - MONTHLY (Most Popular):
- Background: #111111
- Border: #ABF62D lime green 2px
- Badge top: "Most Popular" 
  in #ABF62D background black text
- Title: "Pro Monthly" in white
- Price: "₹20" huge lime green text
- Subtext: "per month"
- Features list:
  ✓ Everything in Free
  ✓ 4 resume templates
  ✓ Full ATS Score Checker
  ✓ Skill Score Card
  ✓ Job role suggestions
  ✓ Share resume link
  ✓ Dark/Light mode
  ✗ Cover letter AI (grey)
  ✗ Interview prep (grey)
- Button: "Start for ₹20/mo"
  #ABF62D background black text
  Lime glow on hover

Card 3 - YEARLY (Best Value):
- Background: #111111
- Border: #D6A3FB purple 2px
- Badge top: "Best Value - Save 17%"
  in #D6A3FB background black text
- Title: "Pro Yearly" in white
- Price: "₹249" huge purple text
- Subtext: "per year = ₹20.75/month"
- Strike through: "₹240/year"
- Features list:
  ✓ Everything in Pro Monthly
  ✓ Cover letter AI generator
  ✓ Interview preparation
  ✓ Priority support
  ✓ Early access to new features
  ✓ Resume analytics
- Button: "Get Yearly Plan"
  #D6A3FB background black text
  Purple glow on hover

Below cards:
FAQ section with these questions:
Q: Can I cancel anytime?
A: Yes, cancel anytime. No questions asked.
Q: Is my data safe?
A: Yes, we never share your data with anyone.
Q: What payment methods are accepted?
A: UPI, Credit/Debit card, Net banking via Razorpay.
Q: Can I switch plans?
A: Yes, upgrade or downgrade anytime.

Style FAQ as accordion - click to expand.
Dark background, lime green arrow icon.

FEATURE 2 - Cover Letter Generator Page:
Create app/cover-letter/page.tsx

Full black background.
Show "Pro Feature" badge in #D6A3FB purple
at top if not subscribed.

Title: "AI Cover Letter Generator"
Subtitle: "Tailored cover letters in seconds"

Layout two columns:

Left - Input form:
- Your Name (input)
- Job Title applying for (input)  
- Company Name (input)
- Large textarea: "Paste job description"
- Large textarea: "Paste your resume 
  or key skills"
- Tone selector: 
  Professional / Friendly / Confident
  Style as 3 clickable pills
  Selected = #ABF62D background black text
  Unselected = #111111 white text
- Big button: "Generate Cover Letter"
  #ABF62D background black text

Right - Output:
- Show generated cover letter in a 
  nice formatted box
- Dark #111111 background
- White text
- Copy button top right
- Download as PDF button
- Regenerate button

Cover letter generation logic
(do in JavaScript without AI for now):
Use a template and fill in the details:

Template:
"Dear Hiring Manager at [Company],

I am writing to express my strong interest 
in the [Job Title] position at [Company]. 
With my background in [skills from resume], 
I am confident I can contribute significantly 
to your team.

Throughout my experience, I have developed 
strong skills in [top 3 skills]. I am 
particularly drawn to [Company] because of 
its reputation for innovation and excellence.

I am eager to bring my [tone adjective] 
approach and dedication to [Company]. 
I look forward to discussing how my 
background aligns with your needs.

Best regards,
[Name]"

Fill template with user inputs.
Show result on right side.

FEATURE 3 - Interview Prep Page:
Create app/interview/page.tsx

Full black background.
Show "Pro Feature" badge in #D6A3FB.

Title: "Interview Preparation"
Subtitle: "Practice makes perfect"

Input section:
- Job Role input field
- Experience level: 
  Fresher / Mid Level / Senior
  Clickable pills, lime selected
- Skills input (comma separated)
- Button: "Generate Questions"
  #ABF62D background

Questions section (after generate):
Show 10 interview questions based on role.

Question categories:
1. Technical Questions (5 questions)
2. Behavioral Questions (3 questions)  
3. HR Questions (2 questions)

Each question card:
- Dark #111111 background
- Question in white bold
- "Show Answer" button in lime
- Answer revealed on click
- Category badge (Technical/Behavioral/HR)

Question bank by role:

For Software Engineer:
Technical:
1. What is the difference between 
   var, let and const in JavaScript?
2. Explain REST API principles.
3. What is time complexity?
4. Difference between SQL and NoSQL?
5. What is version control and Git?
Behavioral:
1. Tell me about a challenging project.
2. How do you handle tight deadlines?
3. Describe your problem solving approach.
HR:
1. Why do you want to join our company?
2. Where do you see yourself in 5 years?

For Data Analyst:
Technical:
1. What is the difference between 
   mean, median and mode?
2. Explain what a JOIN is in SQL.
3. What tools do you use for data viz?
4. What is data cleaning?
5. Explain correlation vs causation.
Behavioral:
1. Tell me about a data insight you found.
2. How do you present data to non-technical people?
3. How do you handle missing data?
HR:
1. Why data analytics?
2. Where do you see yourself in 5 years?

For UI/UX Designer:
Technical:
1. What is the difference between 
   UX and UI design?
2. Walk me through your design process.
3. What tools do you use?
4. What is user research?
5. Explain design thinking.
Behavioral:
1. Tell me about a design you are proud of.
2. How do you handle client feedback?
3. How do you prioritize features?
HR:
1. Why design?
2. Where do you see yourself in 5 years?

Default questions for any other role:
Technical:
1. Tell me about your technical skills.
2. What projects have you worked on?
3. How do you stay updated in your field?
4. What tools do you use daily?
5. Describe your ideal work process.
Behavioral:
1. Tell me about yourself.
2. What is your greatest strength?
3. How do you handle pressure?
HR:
1. Why do you want this job?
2. Where do you see yourself in 5 years?

NAVIGATION UPDATES:
In components/SiteHeader.tsx add:
- "Pricing" link → /pricing
- "Cover Letter" link → /cover-letter
- "Interview Prep" link → /interview

In app/page.tsx add pricing section 
before footer:
Title: "Start free. Grow with us."
Show 3 plan names with prices
and a "View All Plans" button → /pricing

Save ALL files when complete.
No TypeScript errors.
All pages mobile responsive.
All pages full black background.
All text white with lime accents.        <div className="min-h-dvh">
          <ScrollProgress />
          <SiteHeader />
          <CustomCursor />
          <MotionWrapper>
            {children}
          </MotionWrapper>
          <SiteFooter />
          <BackToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#111111',
                color: '#ffffff',
                border: '1px solid #333333',
              },
              success: {
                iconTheme: {
                  primary: '#ABF62D',
                  secondary: '#000000',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#000000',
                },
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}

