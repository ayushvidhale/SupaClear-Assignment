"use client";
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Tabs, Tab } from "@nextui-org/react";

export default function CardComponent({
  title,
  subtitle,
  features,
  differentiators,
  clients,
  industries,
  pricing,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button onClick={onOpen}>
        <Card className="py-4 w-full max-w-[270px] hover:scale-105">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="uppercase font-bold opacity-80 text-start text-[10px]">
              {subtitle}
            </p>
            <h4 className="font-bold text-large">{title}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt={`${title} background`}
              className="object-cover rounded-xl"
              src="https://nextui.org/images/hero-card-complete.jpeg"
              width={270}
            />
          </CardBody>
        </Card>
      </button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        size="2xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-x-4">
                {title}{" "}
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 my-auto underline underline-offset-2 hover:text-blue-600 flex gap-x-2 text-sm"
                >
                  Visit <FaExternalLinkAlt className="text-xs my-auto" />
                </a>
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  <Tabs
                    aria-label="Platform Details"
                    size="md"
                    color="primary"
                    variant="bordered"
                  >
                    <Tab key="features" title={<span>Features</span>}>
                      <div className="text-gray-300 text-sm">
                        {features.map((feature, index) => (
                          <p key={index}>• {feature}</p>
                        ))}
                      </div>
                    </Tab>
                    <Tab
                      key="differentiators"
                      title={<span>Differentiators</span>}
                    >
                      <div className="text-gray-300 text-sm">
                        {differentiators.map((diff, index) => (
                          <p key={index}>• {diff}</p>
                        ))}
                      </div>
                    </Tab>
                    <Tab
                      key="clients"
                      title={<span>Clients & Industries</span>}
                    >
                      <div className="text-gray-300 text-sm">
                        <p>
                          <strong>Clients:</strong> {clients.join(", ")}
                        </p>
                        <p>
                          <strong>Industries:</strong> {industries.join(", ")}
                        </p>
                      </div>
                    </Tab>
                    <Tab key="pricing" title={<span>Pricing</span>}>
                      <div className="text-gray-300 text-sm">
                        <p>{pricing}</p>
                      </div>
                    </Tab>
                  </Tabs>
                </div>

                <div>
                  <h3 className="text-gray-400 mb-2">Tags</h3>
                  <div className="flex gap-x-2">
                    {differentiators.map((diff, index) => (
                      <Chip key={index} color="warning" variant="dot">
                        {diff}
                      </Chip>
                    ))}
                  </div>
                </div>
                <br />
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
