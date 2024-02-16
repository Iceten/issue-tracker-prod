import authOptions from '@/app/auth/authOptions'
import { issueSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest, {params}:{params: {id:string}}){

    //Check session of user
    const session = await getServerSession(authOptions)

  if(!session) 
    return NextResponse.json({},{status:401})

    //Receive Request  - Update Data - Return Response  
    const body = await request.json()

    //Validate Data
    const validation = issueSchema.safeParse(body)
    if(!validation.success)
        return NextResponse.json({error: 'Invalid data'},{status: 400})

    //Find Data to update
    const issue = await prisma.issue.findUnique({
        where:{
            id:parseInt(params.id)
        }
    })
    if(!issue)
        return NextResponse.json({error:'No issue found'}, {status: 404})

    //Update Data
    const updatedIssue = await prisma.issue.update({
        where:{ id: issue.id  },
        data: {
            title: body.title,
            description: body.description
            }
        })

    return NextResponse.json(updatedIssue)

}

export async function DELETE(request: NextRequest, {params} : {params: {id:string}}){
    //Check user session
    const session = await getServerSession(authOptions)

  if(!session) 
    return NextResponse.json({},{status:401})
    //Fetch issue from DB
    const issue = await prisma.issue.findUnique({
        where:{
            id: parseInt(params.id)
        }
    })

    if(!issue)
        return NextResponse.json({error:'Invalid issue'},{status: 400})

    await prisma.issue.delete({
        where:{
            id: issue.id
        }
    })

    return NextResponse.json({})
}