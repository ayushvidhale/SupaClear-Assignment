"use client";
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { TbMoneybag } from "react-icons/tb";
import { MdWork, MdOutlineStar, MdOutlineBusinessCenter } from "react-icons/md";

export default function CardComponent({
  title,
  subtitle,
  features,
  differentiators,
  clients,
  industries,
  pricing,
  imageUrl,
  createdAt,
  slug, // Pass a unique slug for each card to route to the dynamic page
}) {
  const date = new Date(createdAt);
  const daysAgo = formatDistanceToNow(date, { addSuffix: true });

  return (
    <Link href={`/details/${slug}`} className="w-full h-full">
      <Card className="max-w-2xl hover:scale-105 cursor-pointer h-full">
        <CardHeader className="flex p-4">
          <Image
            src={
              imageUrl ||
              "https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg"
            }
            alt={`${title} logo`}
            className="rounded-full w-full whitespace-nowrap bg-white"
            width={50}
            height={50}
          />
          <div className="ml-4 text-left">
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-sm text-gray-400">{subtitle}</p>
          </div>
        </CardHeader>

        <CardBody className="px-4 pt-2 pb-4">
          <div className="flex justify-between text-sm">
            <div className="flex flex-wrap gap-2 mb-3">
              {industries?.slice(0, 2).map((industry, index) => (
                <Chip key={index} color="secondary" size="sm" variant="dot">
                  {industry}
                </Chip>
              ))}
            </div>
          </div>
          <div className="px-4 mt-auto">
            <div className="flex justify-between text-sm mb-2">
              {/* Number of Features */}
              <p className="flex items-center">
                <MdWork className="mr-1 text-green-400" />
                {features.length > 0 ? `${features.length} Features` : "N/A"}
              </p>
              {/* Number of Differentiators */}
              <p className="flex items-center">
                <MdOutlineStar className="mr-1 text-yellow-400" />
                {differentiators.length > 0
                  ? `${differentiators.length} Differentiators`
                  : "N/A"}
              </p>
            </div>

            <div className="flex justify-between text-sm mb-2">
              {/* Number of Industries */}
              <p className="flex items-center">
                <MdOutlineBusinessCenter className="mr-1 text-blue-400" />
                {industries?.length > 0
                  ? `${industries.length} Industries`
                  : "N/A"}
              </p>
              {/* Days Ago */}
              <p className="flex items-center whitespace-nowrap text-gray-600 dark:text-gray-300">
                {daysAgo ? `${daysAgo}` : "N/A"}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
