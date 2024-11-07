import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import CardComponent from "@/components/card";
import FilterComponent from "@/components/filter";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { getAllListings } from "@/actions/getAllListings"; // Import server action
import { JSX, Key } from "react";

export default async function Home() {
  const { success, listings } = await getAllListings(); // Fetch listings

  const listingData = success ? JSON.parse(listings!!) : []; // Parse JSON listings data

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-4xl text-center justify-center">
        <span className={title()}>Up-to-date&nbsp;</span>
        <span className={title({ color: "violet" })}>Collection&nbsp;</span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          of Machine Learning and AI Platforms for Enterprise Buyers.
        </div>
      </div>
      <FilterComponent data={listingData} />{" "}
      {/* Pass listing data to FilterComponent */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 gap-x-8">
        {listingData.reverse().map(
          (
            item: JSX.IntrinsicAttributes & {
              title: any;
              subtitle: any;
              features: any;
              differentiators: any;
              clients: any;
              industries: any;
              pricing: any;
              imageUrl: any;
              slug: any;
              createdAt: any;
            },
            index: Key | null | undefined
          ) => (
            <CardComponent key={index} {...item} />
          )
        )}
      </div>
    </section>
  );
}
