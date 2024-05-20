"use client";
import { Flex, Text, Button } from "@radix-ui/themes";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}
const Paginition = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  return (
    <Flex align="center" gap="2">
      <Text>
        Page {currentPage} of {pageCount}{" "}
      </Text>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <MdKeyboardDoubleArrowLeft />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <MdOutlineKeyboardArrowLeft />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <MdOutlineKeyboardArrowRight />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <MdKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  );
};

export default Paginition;
