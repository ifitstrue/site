export type ResumeItem = {
  role: string;
  company: string;
  period: string;
  tech: string[];
  points: string[];
};

export const RESUME: ResumeItem[] = [
  {
    role: "Head of Engineering",
    company: "Prometheus",
    period: "2025 - now",
    tech: [
      "Next.js",
      "React",
      "Fastify",
      "Node.js",
      "TypeScript",
      "Stakeholder Management",
      "Mentorship",
    ],
    points: [
      "Own and prioritize the engineering roadmap in partnership with leadership, turning organizational goals into a concrete, executable plan",
      "Lead weekly standups and milestone reviews for non-profit partners, identifying blockers and keeping clients and developers on the same page",
      "Direct recurring capstone programs in partnership with coding bootcamps, managing 4-6 cross-functional teams of junior developers through full delivery cycles",
      "Architect and maintain the core platform using Next.js and Fastify, recently implementing SSO authentication and an automated email scheduling system",
    ],
  },
  {
    role: "Full-Stack Web3 Engineer",
    company: "Self-Employed",
    period: "2021 - 2025",
    tech: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "Solidity",
      "Tailwind",
      "git",
    ],
    points: [
      "Partnered with digital artists to design and build React/Next.js applications and Solidity smart contracts, supporting $3M+ in transaction volume with zero security incidents",
      "Built custom Node.js automation for metadata refreshes and analytics tracking, eliminating what had been a significant source of manual, recurring work",
      "Implemented unit and integration testing strategies to mitigate risk in immutable blockchain deployments",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "EdSights",
    period: "2020 - '21",
    tech: ["Vue", "Python", "Django", "AWS", "git"],
    points: [
      "As the first internal engineering hire, established development best practices and led the transition from an outsourced codebase to an in-house team",
      "Refactored the Vue.js portal and Django backend to reduce technical debt and keep the platform stable as the user base grew",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "Medumo",
    period: "2019 - '20",
    tech: ["C#", "SQL", "Terraform", "Azure", "git"],
    points: [
      "Optimized C# services and SQL queries through restructuring and indexing, preparing the platform for a 5× increase in users ahead of a major hospital partnership",
      "Deployed Infrastructure as Code using Terraform, enabling rapid environment replication and improving system stability",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "Spectra Media Group",
    period: "2017 - '19",
    tech: [
      "Ember",
      "Feathers",
      "Express",
      "PHP",
      "C#",
      "VB.NET",
      "SQL",
      "MySQL",
      "Bootstrap",
      "git",
    ],
    points: [
      "Modernized legacy Telnet/Mainframe workflows and internal dashboards, delivering full-stack rewrites in C# and Node.js",
    ],
  },
  {
    role: "Software Engineer",
    company: "eMoney Advisor",
    period: "2014 - '17",
    tech: ["C#", "SQL", "Web Scraping", "git"],
    points: [
      "Promoted from Co-op to Full-Time Engineer; mentored junior developers as the team scaled from 4 to 15+, while maintaining complex C# financial data pipelines",
    ],
  },
];
