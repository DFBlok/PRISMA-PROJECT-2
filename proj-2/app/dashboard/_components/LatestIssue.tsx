import React from "react";
import prisma from "@/prisma/client";
import { Table, Flex, Avatar, Card, Heading } from "@radix-ui/themes";
import Link from "next/link";
import IssueBadge from "@/app/components/IssueBadge";

const LatestIssue = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: { assignedToUser: true },
  });
  return (
    <Card mt="4">
      <Heading my="2">Latest Issue</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" gap="2">
                    <Link href={`/issues/view/${issue.id}`}>{issue.title}</Link>
                    <IssueBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUserId && (
                    <Avatar
                      src={issue.assignedToUser?.image!}
                      fallback="av"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;
