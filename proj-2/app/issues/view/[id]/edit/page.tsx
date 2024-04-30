import React from "react";
import IssueForm from "@/app/components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue) notFound();
  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

export default EditIssuePage;
