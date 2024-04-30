import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Heading, Flex, Box, Card, Button, Grid } from "@radix-ui/themes";
import IssueBadge from "@/app/components/IssueBadge";
import Markdown from "react-markdown";
import Link from "next/link";
import IssueDetails from "../_components/issueDetails";
import EditIssueButton from "../_components/EditIssueButton";
interface Props {
  params: { id: string };
}
const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue) notFound();
  return (
    <Grid
      columns={{ initial: "1", sm: "2" }}
      gap="5"
      justify="center"
      align="center"
    >
      <Box as="div" className="space-y-4 mt-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
