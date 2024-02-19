import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from '@/prisma/client'
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({where: {status:"OPEN"}})
  const inProgress = await prisma.issue.count({where: {status:"IN_PROGRESS"}})
  const close = await prisma.issue.count({where: {status:"CLOSE"}})
  

  return(
    <Grid columns={{initial:"1", md:"2"}} gap="5">
      <Flex direction="column" gap="5">
      <IssueSummary open={open} inProgress={inProgress} close={close} />
      <IssueChart open={open} inProgress={inProgress} close={close} />
      </Flex>
    <LatestIssues />
    </Grid>
  ) ;
}

export const metadata: Metadata = {
  title:'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
};