'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import Card from '@/components/Card';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PokemonCard {
    id: string;
    name: string;
    image: string;
}

const CARDS_PER_PAGE = 100;

export default function Cards() {
    const [cards, setCards] = useState<PokemonCard[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Default');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCards();
    }, [searchQuery, sortBy, currentPage]);

    const fetchCards = async () => {
        try {
            setIsLoading(true);
            const setsResponse = await fetch('https://api.tcgdex.net/v2/en/series/tcgp');
            const seriesData = await setsResponse.json();
            
            const allCards: PokemonCard[] = [];
            for (const set of seriesData.sets) {
                const setResponse = await fetch(`https://api.tcgdex.net/v2/en/sets/${set.id}`);
                const setData = await setResponse.json();
                if (setData.cards) {
                    const filteredCards = setData.cards.filter((card: PokemonCard) => 
                        !searchQuery || card.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    allCards.push(...filteredCards);
                }
            }

            if (sortBy !== 'Default') {
                allCards.sort((a, b) => {
                    if (sortBy === 'name') {
                        return a.name.localeCompare(b.name);
                    } else if (sortBy === 'id') {
                        return a.id.localeCompare(b.id);
                    }
                    return 0;
                });
            }

            setCards(allCards);
        } catch (error) {
            console.error('Error fetching cards:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(cards.length / CARDS_PER_PAGE);
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const displayedCards = cards.slice(startIndex, startIndex + CARDS_PER_PAGE);

    return (
        <div className="container mx-auto px-1 py-4">
            <div className="flex justify-between items-center mb-4">
                <SearchBar 
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Search by Name, ID, Set, Type"
                />
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary">Sort By:</span>
                    <select
                        value={sortBy}
                        onChange={handleSortChange}
                        className="text-sm border border-input rounded-sm px-2 py-1.5 bg-background text-foreground focus:outline-none focus:ring-ring/50 focus:border-ring transition-colors"
                    >
                        <option value="Default">Default</option>
                        <option value="name">Name</option>
                        <option value="id">ID</option>
                        <option value="set">Set</option>
                    </select>
                </div>
            </div>
            
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {displayedCards.map((card) => (
                            <Card key={card.id} card={card} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm font-light">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}