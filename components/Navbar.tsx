'use client';

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CircleUser } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 bg-background border-b border-border py-2">
            <nav className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <div className="relative h-8 w-48">
                                <Image 
                                    src={"/ptcgpstation-title-dark.png"}
                                    alt="PTCGP Station Logo"
                                    fill
                                    priority
                                    className="object-contain hidden dark:block"
                                />
                                <Image 
                                    src={"/ptcgpstation-title-light.png"}
                                    alt="PTCGP Station Logo"
                                    fill
                                    priority
                                    className="object-contain block dark:hidden"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <Button
                            variant={pathname === "/cards" ? "secondary" : "ghost"}
                            asChild
                        >
                            <Link href="/cards">Cards</Link>
                        </Button>
                        <Button
                            variant={pathname === "/decks" ? "secondary" : "ghost"}
                            asChild
                        >
                            <Link href="/decks">Decks</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                    >
                        <a href="/login">
                            <CircleUser className="size-5" />
                        </a>
                    </Button>
                </div>
            </nav>
        </header>
    );
}