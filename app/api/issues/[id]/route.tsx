import { issueSchema } from '@/app/validationSchemas'
import {NextRequest, NextResponse} from 'next/server'
import prisma from '@/prisma/client'

export async function PATCH(request: NextRequest, {params}:{params: {id:string}}){
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