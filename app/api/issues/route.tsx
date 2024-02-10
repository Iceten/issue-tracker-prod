import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

//Creating a schema for the Issue model
const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  //Validate EnteredData with zod
  const validation = createIssueSchema.safeParse(body);

  //Handle Errors and Status
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  //Register Validated Data in DB with Prisma
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  //Return Response with Status
  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest){
 
  const issues = await prisma.issue.findMany()

  if(!issues) return NextResponse.json({error:'No issue available'}, {status: 400})

  return NextResponse.json(issues, {status:200})
}
