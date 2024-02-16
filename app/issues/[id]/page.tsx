import prisma from '@/prisma/client'
import { Box, Grid,Flex } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import authOptions from '@/app/auth/authOptions'
import { getServerSession } from 'next-auth'


const IssueDetailPage = async ({params} :{params: {id:string}}) => {

  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where:{
        id: parseInt(params.id)
    }
  })

  if(!issue) 
    notFound();

    return (
    <Grid columns={{initial:"1",sm:"5"}} gap="5">
        <Box className="md:col-span-4" >
           <IssueDetails issue={issue}/>
        </Box>

        {session && <Box>
          <Flex direction='column' gap='4'>
          <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id}/>
          </Flex>
        </Box>}
        
    </Grid>
  )
}

export default IssueDetailPage