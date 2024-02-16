import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {

  const session = await getServerSession(authOptions)

  if(!session) 
    return NextResponse.json({},{status:401})
  
  const body = await request.json();

  //Validate EnteredData with zod
  const validation = issueSchema.safeParse(body);

  //Handle Errors and Status
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

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
