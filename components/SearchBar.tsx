import { ChangeEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
    return (
        <div className="relative flex-1 max-w-2xl group">
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="block w-full pr-10 pl-3 py-2 border border-input rounded-md leading-5 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-ring/50 focus:border-ring transition-colors sm:text-sm group-focus-within:border-primary"
                placeholder={placeholder}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
        </div>
    );
}