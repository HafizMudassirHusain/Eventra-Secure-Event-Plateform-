"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent bg-background/60 backdrop-blur transition-all duration-300 supports-backdrop-filter:bg-background/40",
        scrolled && "border-border bg-background/95 shadow-sm supports-backdrop-filter:bg-background/80"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Eventra
        </Link>

        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <Link href="/events" className="text-muted-foreground hover:text-foreground">
            Events
          </Link>
          <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
            How it works
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/organizers" className="text-muted-foreground hover:text-foreground">
            For organizers
          </Link>
          {(session?.user.role === "ORGANIZER" || session?.user.role === "ADMIN") && (
            <Link href="/organizer" className="text-muted-foreground hover:text-foreground">
              Organizer dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {status === "loading" ? null : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger render={<button className="rounded-full" />}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user.image ?? undefined} />
                  <AvatarFallback>
                    {session.user.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem render={<Link href="/account" />}>
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/my-registrations" />}>
                  My registrations
                </DropdownMenuItem>
                {(session.user.role === "ORGANIZER" || session.user.role === "ADMIN") && (
                  <DropdownMenuItem render={<Link href="/organizer" />}>
                    Organizer dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" nativeButton={false} render={<Link href="/login" />}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
