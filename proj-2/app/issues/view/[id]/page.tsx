import React from "react";
import prisma from "@/prisma/client";
import { notFound, redirect } from "next/navigation";
import { Heading, Flex, Box, Card, Button, Grid } from "@radix-ui/themes";
import IssueBadge from "@/app/components/IssueBadge";
import Markdown from "react-markdown";
import Link from "next/link";
import IssueDetails from "../_components/IssueDetails";
import DeleteIssueButton from "../_components/DeleteIssueButton";
import EditIssueButton from "../_components/EditIssueButton";
import { auth } from "@/auth";
import AssignSelect from "../_components/AssignSelect";
interface Props {
  params: { id: string };
}
const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  let issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue) notFound();
  return (
    <Grid
      columns={{ initial: "1", sm: "5" }}
      gap="5"
      justify="center"
      align="center"
    >
      <Box as="div" className="space-y-4 mt-4 md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <AssignSelect />
          {session?.user && (
            <>
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </>
          )}
          {!session?.user &&
            redirect("/api/auth/signin?callbackUrl=/issues/new")}
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
