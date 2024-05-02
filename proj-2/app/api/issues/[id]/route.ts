import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueFromSchema } from "../../../ValidationSchema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = IssueFromSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) {
    return NextResponse.json({ error: "No issue found" }, { status: 400 });
  }
  const Updatedissue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(Updatedissue, { status: 201 });
}
