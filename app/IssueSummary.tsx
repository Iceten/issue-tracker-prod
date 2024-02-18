import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  close: number;
}
const IssueSummary = ({ open, inProgress, close }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open issues", value: open, status: "OPEN" },
    { label: "In progress issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed issues", value: close, status: "CLOSE" },
  ];
  return (
    <Flex gap="2">
      {containers.map((item) => (
        <Card key={item.label}>
          <Flex direction="column" gap="2">
            <Link href={`/issues/list?status=${item.status}`} className="font-medium text-sm"> {item.label}</Link>
            <Text size="5" className="font-bold"> {item.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
