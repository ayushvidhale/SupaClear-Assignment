"use client";
import { notFound } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Chip,
  Tabs,
  Tab,
} from "@nextui-org/react";
import data from "@/components/data"; // Assume data is an array of objects in a separate file
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoHeartSharp } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { getListingBySlug } from "@/actions/getListingBySlug";
import { useEffect, useState } from "react";

export default function DetailsPage({ params }) {
  const { slug } = params;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { success, listing } = await getListingBySlug({ slug });
        if (!success) {
          throw new Error("Listing not found");
        }
        setListing(listing);
      } catch (error) {
        console.error("Failed to fetch listing:", error);
        setListing(null); // Set listing to null to render an error message
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-purple-500 to-cyan-600 py-12 rounded-xl"></div>
      <div className="container mx-auto p-4 -mt-10">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="flex gap-4 p-4">
            <Image
              src={
                listing?.imageUrl ||
                "https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg"
              }
              alt={`${listing?.title} logo`}
              className="rounded-full w-full bg-white"
              width={60}
              height={60}
            />
            <div>
              <h3 className="text-2xl font-semibold">{listing?.title}</h3>
              <p className="text-gray-500">{listing?.subtitle}</p>
            </div>
          </CardHeader>

          <CardBody className="p-4">
            <Tabs
              aria-label="Platform Details"
              size="md"
              color="primary"
              variant="bordered"
            >
              <Tab key="description" title={<span>Description</span>}>
                <div className="text-gray-400 text-base mt-2 px-4">
                  {/* Features */}
                  <h3 className="font-semibold text-xl mb-1 text-gray-800 dark:text-gray-200">
                    Features
                  </h3>
                  {listing?.features.map((feature, index) => (
                    <p key={index}>• {feature}</p>
                  ))}

                  {/* Differentiators */}
                  <h3 className="font-semibold text-xl mt-4 mb-1 text-gray-800 dark:text-gray-200">
                    Differentiators
                  </h3>
                  {listing?.differentiators.map((diff, index) => (
                    <p key={index}>• {diff}</p>
                  ))}

                  {/* Clients and Industries */}
                  <h3 className="font-semibold text-xl mt-4 mb-1 text-gray-800 dark:text-gray-200">
                    Clients
                  </h3>
                  <div className="flex flex-wrap w-full gap-4 py-2">
                    {listing?.clients.map((client, index) => (
                      <a
                        href="#"
                        key={index}
                        class="flex listings-center w-fit justify-center p-3 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <FaLink className="mr-2 text-purple-600 text-xl" />
                        <span class="w-full">{client}</span>
                        <MdOutlineArrowOutward className="text-xl" />
                      </a>
                    ))}
                  </div>

                  <h3 className="font-semibold text-xl mt-4 mb-1 text-gray-800 dark:text-gray-200">
                    Industries
                  </h3>
                  <p>{listing?.industries.join(", ")}</p>

                  {/* Pricing */}
                  <h3 className="font-semibold text-xl mt-4 mb-1 text-gray-800 dark:text-gray-200">
                    Pricing
                  </h3>
                  <p>{listing?.pricing}</p>
                </div>
              </Tab>

              <Tab key="reddit-reviews" title={<span>Reddit Reviews</span>}>
                <div className="text-gray-400 text-sm mt-2">
                  {/* Placeholder for Reddit Reviews */}
                  <p>Loading Reddit reviews...</p>
                  {/* Here you could dynamically load and display Reddit reviews based on your data */}
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
