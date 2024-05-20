import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Table } from "@radix-ui/themes";
import IssueBadge from "@/app/components/IssueBadge";
import delay from "delay";
import ActionButton from "@/app/components/ActionButton";
import { Status, Issue } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUp } from "lucide-react";
import Paginition from "./_components/Paginition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List of Issues",
  description:
    "List of issues, you can visit each issue for update, delete or assigned to user",
};
const IssuePage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}) => {
  await delay(1000);

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const defaultOrderBy: keyof Issue = "createdAt";
  const validateOrderBys: Array<keyof Issue> = ["title", "status", "createdAt"];

  const orderBy = validateOrderBys.includes(searchParams.orderBy)
    ? searchParams.orderBy
    : defaultOrderBy;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "CreatedAt",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy: {
      [orderBy]: "asc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <div className="max-w-2xl">
      <div className="my-4 ">
        {/* <Button asChild size="3">
          <Link href="/issues/new">Add New Issue</Link>
        </Button> */}
        <ActionButton />
      </div>
      <Table.Root variant="surface">
        {columns.map((column) => (
          <Table.ColumnHeaderCell
            key={column.value}
            className={column.className}
          >
            <NextLink
              href={{ query: { ...searchParams, orderBy: column.value } }}
            >
              {column.label}
            </NextLink>
            {column.value === searchParams.orderBy && (
              <ArrowUp className="inline" />
            )}
          </Table.ColumnHeaderCell>
        ))}
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
      <Paginition
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export default IssuePage;
