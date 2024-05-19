import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Table } from "@radix-ui/themes";
import IssueBadge from "@/app/components/IssueBadge";
import delay from "delay";
import ActionButton from "@/app/components/ActionButton";
import { Status } from "@prisma/client";

const IssuePage = async ({
  searchParams,
}: {
  searchParams: { status: Status };
}) => {
  await delay(1000);

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
  });

  return (
    <div className="max-w-2xl">
      <div className="my-4 ">
        {/* <Button asChild size="3">
          <Link href="/issues/new">Add New Issue</Link>
        </Button> */}
        <ActionButton />
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            createdAt
          </Table.ColumnHeaderCell>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  href={`/issues/view/${issue.id}`}
                  className="hover:text-purple-700 hover:underline"
                >
                  {issue.title}
                </Link>
                <div className="block md:hidden">
                  <IssueBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuePage;
