'use client';

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";

export default function Navbar() {
    const { theme } = useTheme();
    
    return (
        <header className="bg-background dark:bg-background-dark border-b border-border dark:border-border-dark">
            <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
                <div className="flex-shrink-0">
                    <a href="/">
                        <img 
                            src={theme === 'dark' ? "/ptcgpstation-title-dark.png" : "/ptcgpstation-title.png"}
                            alt="PTCGP Station Logo" 
                            className="h-8 w-auto"
                        />
                    </a>
                </div>
                <div className="flex items-center gap-8">
                    <a 
                        href="/cards" 
                        className="text-foreground dark:text-foreground-dark hover:text-secondary font-medium transition-colors duration-200"
                    >
                        Cards
                    </a>
                    <a 
                        href="/decks" 
                        className="text-foreground dark:text-foreground-dark hover:text-secondary font-medium transition-colors duration-200"
                    >
                        Decks
                    </a>
                    <ThemeToggle />
                    <Button
                        variant="secondary"
                        size="sm"
                        asChild
                    >
                        <a href="/login">Login</a>
                    </Button>
                </div>
            </nav>
        </header>
    );
}