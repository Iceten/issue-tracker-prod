import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from '@/prisma/client'

export default async function Home() {
  const open = await prisma.issue.count({where: {status:"OPEN"}})
  const inProgress = await prisma.issue.count({where: {status:"IN_PROGRESS"}})
  const close = await prisma.issue.count({where: {status:"CLOSE"}})
  return <IssueSummary open={open} inProgress={inProgress} close={close} />;
}
