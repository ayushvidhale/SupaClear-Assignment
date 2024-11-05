"use client";
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
import Link from "next/link";

export default function CardComponent({
  title,
  subtitle,
  features,
  differentiators,
  clients,
  industries,
  pricing,
  imageUrl,
  slug, // Pass a unique slug for each card to route to the dynamic page
}) {
  return (
    <Link href={`/details/${slug}`} className="w-full">
      <Card className="max-w-2xl hover:scale-105 cursor-pointer">
        <CardHeader className="flex p-4">
          <Image
            src={
              imageUrl ||
              "https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg"
            }
            alt={`${title} logo`}
            className="rounded-full bg-white"
            width={50}
            height={50}
          />
          <div className="ml-4 text-left">
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-sm text-gray-400">{subtitle}</p>
          </div>
        </CardHeader>

        <CardBody className="px-4 pt-2 pb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {features?.slice(0, 4).map((feature, index) => (
              <Chip key={index} color="secondary" size="sm" variant="faded">
                {feature}
              </Chip>
            ))}
          </div>

          <div className="px-4">
            <div className="flex justify-between text-sm mb-2">
              <p className="flex items-center">
                <span className="mr-1 text-green-400">●</span> 21 Jobs Open
              </p>
              <p className="flex items-center">
                <span className="mr-1">📅</span> 10 Applications
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <p className="flex items-center">
                <span className="mr-1">⏰</span> 5 days left
              </p>
              <p className="text-green-400 font-semibold">{pricing}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
