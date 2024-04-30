import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Heading, Flex, Box } from "@radix-ui/themes";
import IssueBadge from "@/app/components/IssueBadge";
import Markdown from "react-markdown";
interface Props {
  params: { id: string };
}
const IssueDetails = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue) notFound();
  return (
    <Box as="div" className="space-y-4 mt-4">
      <Heading as="h1" weight="medium">
        {issue.title}
      </Heading>
      <Flex className="space-x-4">
        <IssueBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Box className="prose">
        {" "}
        <Markdown>{issue.description}</Markdown>
      </Box>
    </Box>
  );
};

export default IssueDetails;
