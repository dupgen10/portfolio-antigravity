export const portfolioData = {
  hero: {
    name: "Dupgen Sherpa",
    title: "Software Engineer & UX Architect",
    subtitle: "Bridging the gap between robust backend systems and beautiful, intuitive interfaces.",
  },
  about: {
    bio: "I'm currently in my final year of Software Engineering studies, working on my Bachelor Thesis Project. My expertise lies in building scalable backends with Java and Spring Boot, paired with modern React frontends. When I'm not coding, you'll find me shooting hoops on local outdoor basketball courts or traveling between New Delhi and the Bagdogra region.",
    skills: ["Java", "Spring Boot", "React", "Next.js", "Tailwind CSS", "Microservices"]
  },
  projects: [
    {
      id: "signalforge",
      title: "SignalForge",
      description: "Open-source developer tool for stream processing. Handled 10k+ concurrent events with sub-50ms latency.",
      tags: ["React", "Java", "Spring Boot", "Kafka"],
      githubUrl: "https://github.com/dupgen10/SignalForge",
      liveUrl: "https://signalforge.demo",
    },
    {
      id: "foodfrenzy",
      title: "FoodFrenzy",
      description: "A full-stack food delivery platform. Optimized database queries, reducing order processing time by 35%.",
      tags: ["Next.js", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/dupgen10/FoodFrenzy",
      liveUrl: "https://foodfrenzy.demo",
    },
    {
      id: "moneymanager",
      title: "Money Manager",
      description: "Personal finance tracker. Implemented secure OAuth2 authentication and real-time expense visualization.",
      tags: ["React", "Spring Boot", "PostgreSQL"],
      githubUrl: "https://github.com/dupgen10/MoneyManager",
      liveUrl: "https://moneymanager.demo",
    },
    {
      id: "hcl-hackathon",
      title: "HCL Hackathon",
      description: "Award-winning solution for enterprise resource planning. Built an MVP in 48 hours with robust microservices.",
      tags: ["Java", "React", "Docker"],
      githubUrl: "https://github.com/dupgen10/hcl-hackathon",
      liveUrl: "https://hclhackathon.demo",
    }
  ],
  socials: {
    github: "https://github.com/dupgen10",
    linkedin: "https://www.linkedin.com/in/dupgen"
  }
};
