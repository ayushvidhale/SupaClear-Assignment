import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import CardComponent from "@/components/card";
import FilterComponent from "@/components/filter";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import llmData from "@/components/data"; // Assume data is an array of objects in a separate file

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

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 gap-x-8">
        {llmData.map((item, index) => (
          <CardComponent key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
