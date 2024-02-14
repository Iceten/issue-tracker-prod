"use client";
import { Box } from "@radix-ui/themes";
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
    <nav className="flex space-x-6 border-b mb-5 h-14 items-center px-5">
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
      <Box>
        {status === "authenticated" && (<Link href='/api/auth/signout'>Logout</Link>)}
        {status === "unauthenticated" && (<Link href='/api/auth/signin'>Login</Link>)}
      </Box>
    </nav>
  );
};

export default NavBar;
