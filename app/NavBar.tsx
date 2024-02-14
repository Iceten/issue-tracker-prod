"use client";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import {useSession} from 'next-auth/react'

const NavBar = () => {
  const currentPage = usePathname();
  const links = [
    { label: "DashBoard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  const {status, data:session} = useSession()
  
  return (
    <nav className="border-b mb-5 p-3 px-5">
      <Container>
      <Flex align='center' justify='between' gap='3'>
        <Flex align='center' gap='3'>
          <Link href="/">
            <AiFillBug />
          </Link>
          <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={classnames({
                  "text-zinc-900": currentPage === link.href,
                  "text-zinc-500": currentPage !== link.href,
                  "hover:text-zinc-800 transition-colors": true,
                    })}>
                  {link.label}
                </Link></li>
            ))}
          </ul>
        </Flex>
        <Box>
        {status === "authenticated" && 
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar size='2' src={session.user!.image!} fallback="?" className="cursor-pointer" radius="full"/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size='2'>
                  {session.user!.email!}
                </Text >
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href='/api/auth/signin'>Logout</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>}

        {status === "unauthenticated" && (<Link href='/api/auth/signin'>Login</Link>)}
      </Box>
      </Flex>
      </Container>
      
    
    </nav>
  );
};

export default NavBar;
