import React from "react";
import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import IssueStatusFilter from "../issues/view/_components/IssueStatusFilter";

const ActionButton = () => {
  return (
    <Flex justify="between" align="center">
      <IssueStatusFilter />
      <Button asChild>
        <Link href="/issues/new">Add New Issue</Link>
      </Button>
    </Flex>
  );
};

export default ActionButton;
