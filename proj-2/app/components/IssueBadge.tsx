import React from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

interface Props {
  status: string;
}

const statusMap: Record<
  string,
  { label: string; color: "red" | "green" | "orange" }
> = {
  OPEN: { label: "Open", color: "green" },
  IN_PROGRESS: { label: "In-progress", color: "orange" },
  CLOSED: { label: "Closed", color: "red" },
};

const IssueBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueBadge;
