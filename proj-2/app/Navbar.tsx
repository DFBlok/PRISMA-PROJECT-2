"use client";
import React from "react";
import Link from "next/link";
import { Bug } from "lucide-react";
import className from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
const Navbar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  console.log(currentPath);
  const links = [
    { id: 1, label: "Dashboard", href: "/dashboard" },
    { id: 2, label: "Issues", href: "/issues/view" },
  ];
  return (
    <header className="mx-4 border-b py-2 flex items-center justify-between">
      <nav className="flex items-center gap-4">
        <Link href="/">
          <Bug />
        </Link>
        <ul className="flex gap-4 items-center">
          {links.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={className({
                  "text-gray-900": currentPath === item.href,
                  "text-gray-500": currentPath !== item.href,
                  "hover:text-purple-800 transition-all:": true,
                })}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Signout</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Signin</Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
