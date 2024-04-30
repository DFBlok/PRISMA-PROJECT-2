import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Heading, Flex, Box, Card, Button, Grid } from "@radix-ui/themes";
import IssueBadge from "@/app/components/IssueBadge";
import Markdown from "react-markdown";
import Link from "next/link";
interface Props {
  params: { id: string };
}
const IssueDetails = async ({ params }: { params: { id: string } }) => {
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
        <Heading as="h1" weight="medium">
          {issue.title}
        </Heading>
        <Flex className="space-x-4">
          <IssueBadge status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className="prose">
          {" "}
          <Markdown>{issue.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Link href={`/issues/view/${issue.id}/edit`}>Update Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetails;
