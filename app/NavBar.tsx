"use client";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import {useSession} from 'next-auth/react'
import { Skeleton } from "./components";

const NavBar = () => {


  
  return (
    <nav className="border-b mb-5 p-3 px-5">
      <Container>
      <Flex align='center' justify='between' gap='3'>
        <Flex align='center' gap='3'>
          <Link href="/">
            <AiFillBug />
          </Link>
          <NavLinks/>
        </Flex>
        <AuthStatus/>
        
      </Flex>
      </Container>
      
    
    </nav>
  );
};
const NavLinks = ()=>{
  const currentPage = usePathname();
  const links = [
    { label: "DashBoard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return(
  <ul className="flex space-x-6">
  {links.map((link) => (
    <li key={link.href}>
      <Link
        href={link.href}
        className={classnames({
          "nav-link":true,
        "!text-zinc-900": currentPage === link.href
          })}>
        {link.label}
      </Link></li>
  ))}
</ul>)

}
const AuthStatus = ()=>{
  const {status, data:session} = useSession()
  
  if(status === "loading")
    return <Skeleton width="3rem"/>;

  if(status === "unauthenticated")
  return <Box><Link className="nav-link" href='/api/auth/signin'>Login</Link></Box>
  
  return(
    <Box>
        {status === "authenticated" && 
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar size='2' 
                      src={session!.user!.image!}
                      fallback="?"
                      className="cursor-pointer"
                      radius="full"
                      referrerPolicy='no-referrer'/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size='2'>
                  {session!.user!.email!}
                </Text >
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href='/api/auth/signout'>Logout</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>}
      </Box>
    
  )
}

export default NavBar;
