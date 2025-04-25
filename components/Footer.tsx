export default function Footer() {
    return(
        <footer className="bg-background dark:bg-background-dark border-t border-border dark:border-border-dark mt-auto py-4">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-muted-foreground dark:text-muted-foreground text-sm mb-2">
                    PTCGPSTATION © {new Date().getFullYear()}. All Rights Reserved. Pokémon and All Respective Names are Trademark & © of Nintendo.
                </p>
            </div>
        </footer>
    );
}