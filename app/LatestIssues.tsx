import { Card, Heading, Table, Flex, Avatar } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'
import { IssueStatusBadge } from './components';
import prisma from "@/prisma/client";

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          assignedToUser: true,
        },
      });
      return (
        <Card>
          <Heading size="4" mb="5">
            Latest Issues
          </Heading>
          <Table.Root>
            <Table.Body>
              {issues.map((issue) => (
                <Table.Row key={issue.id}>
                  <Table.Cell>
                    <Flex justify="between">
                      <Flex direction="column" gap="2" align="start">
                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                        <IssueStatusBadge status={issue.status} />
                      </Flex>
                      {issue.assignedToUser && (
                        <Avatar
                          radius="full"
                          src={issue.assignedToUser.image!}
                          fallback="?"
                          size="2"
                        />
                      )}
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      );
}

export default LatestIssues