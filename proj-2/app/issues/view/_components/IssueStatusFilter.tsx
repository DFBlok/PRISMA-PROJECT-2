"use client";
import React from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In-progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("status")!}
      onValueChange={(status) => {
        const params = new URLSearchParams();

        if (status === "ALL") {
          params.append("status", "");
        } else {
          params.append("status", status);
        }
        if (searchParams.get("orderBy")) {
          params.append("orderBy", searchParams.get("orderBy")!);
        }
        const query = status === "ALL" ? "" : `?status=${status}`;
        router.push(`/issues/view${query}`);
      }}
    >
      <Select.Trigger placeholder="filter with status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value ?? "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
