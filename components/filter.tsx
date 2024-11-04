"use client";

import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FiSearch, FiChevronDown, FiPlus } from "react-icons/fi";

export default function FilterComponent({ data }: any) {
  return (
    <div className="flex flex-col gap-4 w-full mt-8">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          placeholder="Search by name..."
          size="sm"
          startContent={<FiSearch className="text-default-300" />}
          variant="bordered"
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<FiChevronDown className="text-small" />}
                size="sm"
                variant="flat"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectionMode="multiple"
            >
              <DropdownItem className="capitalize">Option 1</DropdownItem>
              <DropdownItem className="capitalize">Option 2</DropdownItem>
              <DropdownItem className="capitalize">Option 3</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<FiChevronDown className="text-small" />}
                size="sm"
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectionMode="multiple"
            >
              <DropdownItem className="capitalize">Column 1</DropdownItem>
              <DropdownItem className="capitalize">Column 2</DropdownItem>
              <DropdownItem className="capitalize">Column 3</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button
            className="bg-foreground text-background"
            endContent={<FiPlus />}
            size="sm"
          >
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Found {data.length} websites
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select className="bg-transparent outline-none text-default-400 text-small">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
}
