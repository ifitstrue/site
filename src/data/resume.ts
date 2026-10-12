export type ResumeItem = {
  role: string;
  company: string;
  period: string;
  points: string[];
};

export const RESUME_CONTACT = {
  title: "Technical Lead | Full-Stack Engineer",
  location: "Philadelphia, PA",
  site: "https://www.andrewhachten.com/",
  github: "https://github.com/ifitstrue",
  linkedin: "https://www.linkedin.com/in/andrewhachten/",
};

export const SKILLS = [
  {
    label: "Technical",
    value:
      "JavaScript, TypeScript, React, Next.js, Vue, Node.js, Fastify, Express, Django, C#, VB.NET, Prisma, MySQL, MongoDB, Tailwind",
  },
  {
    label: "Infrastructure",
    value: "Firebase, Vercel, DigitalOcean, CI/CD",
  },
  {
    label: "Leadership",
    value:
      "Technical leadership, mentoring, code review, architecture, stakeholder collaboration, agile, scrum, kanban",
  },
];

export const EDUCATION = {
  degree: "BS in Computer Engineering",
  school: "Drexel University",
  period: "Sep 2011 – Jun 2016",
};

export const RESUME: ResumeItem[] = [
  {
    role: "Head of Engineering",
    company: "Prometheus",
    period: "Feb 2025 – Present",
    points: [
      "Sole engineer for a Next.js/TypeScript frontend and Fastify/Node.js backend using Prisma and MySQL; manage architecture and deployments with GitHub Actions, Vercel, and DigitalOcean",
      "Use Gemini daily for TDD, implementation, debugging, refactors, and testing; applied those workflows while overhauling the platform UI/UX and building an NLP-powered chatbot",
      "Own the engineering roadmap, turning organizational priorities into scoped projects and technical decisions",
      "Mentored 70+ bootcamp graduates across 3 capstone programs; scoped work, ran weekly standups, reviewed code, and coached teams through production delivery",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "Self-Employed",
    period: "Mar 2021 – Jan 2025",
    points: [
      "Sole engineer across 13 projects for 3 digital-artist clients, turning concepts and Figma mockups into React/Next.js applications styled with Tailwind; scoped the work, chose the tools, and managed delivery",
      "Built Solidity smart contracts and Node.js/Express tooling for metadata updates and analytics; supported $3M+ in transaction volume across client projects",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "EdSights",
    period: "Jun 2020 – Mar 2021",
    points: [
      "First internal engineering hire, leading product and engineering in-house from an external contractor; partnered with founders, sales, and contractor leads to transition code, workflows, and technical ownership",
      "Stabilized a Vue/Django platform through targeted refactoring, better error handling, logging, and testability; chose incremental modernization over a full rewrite to reduce delivery risk",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "Medumo",
    period: "Mar 2019 – Jan 2020",
    points: [
      "Optimized C# services and LINQ queries against Microsoft SQL Server, reducing unnecessary data fetching and load ahead of a hospital partnership expected to increase usage 5×",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "Spectra Media Group",
    period: "Jun 2017 – Feb 2019",
    points: [
      "Led modernization of legacy tooling, replacing Microsoft Access and VB.NET apps with Ember/Feathers and MongoDB applications",
      "Built centralized monitoring and remote service tooling, reducing reliance on VPN and Remote Desktop",
    ],
  },
  {
    role: "Software Engineer",
    company: "eMoney Advisor",
    period: "Sep 2014 – May 2017",
    points: [
      "Promoted from co-op to full-time engineer on a C# team retrieving financial data using customer credentials and PII",
      "Mentored co-ops as the team grew from 4 to 15+ engineers through pairing, code reviews, and technical guidance",
    ],
  },
];
