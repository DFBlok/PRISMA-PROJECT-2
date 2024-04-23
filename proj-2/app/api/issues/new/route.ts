import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

//api/issues/new
export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body) {
    return NextResponse.json({ error: "No data found" }, { status: 400 });
  }
  const issue = prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(issue, { status: 201 });
}
