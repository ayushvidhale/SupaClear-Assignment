import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import CardComponent from "@/components/card";
import FilterComponent from "@/components/filter";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

const llmData = [
  {
    title: "ChatGPT",
    subtitle: "AI-powered Conversational Assistant",
    features: ["Conversational AI", "Custom Instructions", "Code Interpreter"],
    differentiators: [
      "GPT-4 model",
      "Wide-ranging API support",
      "Multi-turn dialogue",
    ],
    clients: ["OpenAI API Users", "Businesses", "Educational Institutions"],
    industries: ["Education", "Customer Service", "Technology"],
    pricing: "Free with Pro options starting at $20/month",
    imageUrl: "https://chat.openai.com/favicon.ico",
    link: "https://chat.openai.com/",
  },
  {
    title: "Google Gemini",
    subtitle: "Generative AI for Google Workspace & Search",
    features: ["Text Generation", "Translation", "Search Assistance"],
    differentiators: [
      "Integrated into Google products",
      "Bard assistant capabilities",
      "Multimodal inputs",
    ],
    clients: ["Google Workspace Users", "Healthcare", "Finance"],
    industries: ["Productivity", "Search", "Healthcare"],
    pricing: "Usage-based API pricing",
    imageUrl: "https://bard.google.com/favicon.ico",
    link: "https://bard.google.com/",
  },
  {
    title: "GitHub Copilot",
    subtitle: "AI-powered Code Completion Tool",
    features: ["Code Suggestions", "Autocompletion", "Bug Fixing"],
    differentiators: [
      "GitHub integration",
      "Multi-language support",
      "Trained on code repositories",
    ],
    clients: ["Developers", "Software Teams", "Enterprises"],
    industries: ["Software Development", "Education", "Technology"],
    pricing: "Starting at $10/month",
    imageUrl: "https://github.com/favicon.ico",
    link: "https://github.com/features/copilot",
  },
  {
    title: "Claude",
    subtitle: "Conversational AI Assistant by Anthropic",
    features: [
      "Dialogue Interaction",
      "Multi-turn Conversations",
      "Context Retention",
    ],
    differentiators: [
      "Focus on safety",
      "Context length up to 100K tokens",
      "Ethical AI principles",
    ],
    clients: ["Businesses", "Educational Institutions", "Non-profits"],
    industries: ["Customer Support", "Education", "Healthcare"],
    pricing: "Contact for pricing",
    imageUrl: "https://www.anthropic.com/favicon.ico",
    link: "https://www.anthropic.com/claude",
  },
  {
    title: "Jasper AI",
    subtitle: "AI Content and Copywriting Assistant",
    features: ["Content Generation", "SEO Optimization", "Custom Brand Voice"],
    differentiators: [
      "Focus on marketing",
      "Tone and style customization",
      "Integrated SEO tools",
    ],
    clients: ["Marketing Teams", "Content Creators", "E-commerce"],
    industries: ["Marketing", "E-commerce", "Publishing"],
    pricing: "Starting at $39/month",
    imageUrl: "https://www.jasper.ai/favicon.ico",
    link: "https://www.jasper.ai/",
  },
  {
    title: "Cohere",
    subtitle: "LLM APIs for Text Generation and Search",
    features: ["Text Generation", "Search", "Semantic Understanding"],
    differentiators: [
      "Multilingual support",
      "Optimized for enterprises",
      "Specialized APIs for search",
    ],
    clients: ["Enterprises", "Developers", "Startups"],
    industries: ["Customer Support", "Healthcare", "Retail"],
    pricing: "Contact for enterprise pricing",
    imageUrl: "https://cohere.ai/favicon.ico",
    link: "https://cohere.ai/",
  },
  {
    title: "LLaMA",
    subtitle: "Meta’s Large Language Model",
    features: ["Natural Language Processing", "Open-source", "Customizable"],
    differentiators: [
      "Open-source and community-driven",
      "Research-oriented",
      "High efficiency",
    ],
    clients: ["Researchers", "Developers", "Academia"],
    industries: ["Research", "Technology", "Education"],
    pricing: "Open-source (Free)",
    imageUrl: "https://ai.meta.com/favicon.ico",
    link: "https://ai.meta.com/llama/",
  },
  {
    title: "Mistral",
    subtitle: "Open-weight LLM by Mistral AI",
    features: [
      "Open-weight model",
      "Research-ready",
      "Efficient NLP capabilities",
    ],
    differentiators: [
      "Highly efficient",
      "100% open-weight",
      "Compatible with existing NLP tasks",
    ],
    clients: ["Developers", "Academic Researchers", "Startups"],
    industries: ["Research", "Education", "Software Development"],
    pricing: "Open-source (Free)",
    imageUrl: "https://mistral.ai/favicon.ico",
    link: "https://mistral.ai/",
  },
  {
    title: "Writer AI",
    subtitle: "AI Writing and Content Platform",
    features: [
      "Content Generation",
      "Grammar & Style Checks",
      "SEO Optimization",
    ],
    differentiators: [
      "Tailored for brand voice",
      "Specialized for marketing",
      "SEO integrations",
    ],
    clients: ["Marketing Agencies", "Content Teams", "E-commerce"],
    industries: ["Marketing", "Publishing", "Technology"],
    pricing: "Starting at $18/month",
    imageUrl: "https://writer.com/favicon.ico",
    link: "https://writer.com/",
  },
  {
    title: "ALEPH Alpha",
    subtitle: "German AI Company’s Multimodal AI",
    features: ["Multimodal Input", "Translation", "Text Analysis"],
    differentiators: [
      "Focused on European data",
      "GDPR compliant",
      "Multilingual capabilities",
    ],
    clients: ["European Enterprises", "Government", "Healthcare"],
    industries: ["Government", "Healthcare", "Education"],
    pricing: "Contact for pricing",
    imageUrl: "https://www.aleph-alpha.com/favicon.ico",
    link: "https://www.aleph-alpha.com/",
  },
];

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-4xl text-center justify-center">
        <span className={title()}>Up-to-date&nbsp;</span>
        <span className={title({ color: "violet" })}>Collection&nbsp;</span>
        <br />
        {/* <span className={title()}>of </span> */}
        <div className={subtitle({ class: "mt-4" })}>
          of Machine Learning and AI Platforms for Enterprise Buyers.
        </div>
      </div>

      {/* <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div> */}

      {/* <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div> */}

      <FilterComponent data={llmData} />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {llmData.map((item, index) => (
          <CardComponent key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
