import { atom } from 'jotai';

export interface PokemonCard {
    id: string;
    name: string;
    image: string;
}

export interface DetailedCard {
    name: string;
    id: string;
    image: string;
    set?: {
        name: string;
    };
    types?: string[];
    hp?: string;
    attacks?: Array<{
        name: string;
        damage: string;
        effect: string;
        cost: string[];
    }>;
    abilities?: Array<{
        name: string;
        effect: string;
    }>;
    description?: string;
    illustrator?: string;
    rarity?: string;
    retreat?: number;
    weaknesses?: Array<{
        type: string;
        value: string;
    }>;
    evolveFrom?: string;
}

// Cards page atoms
export const cardsAtom = atom<PokemonCard[]>([]);
export const searchQueryAtom = atom('');
export const sortByAtom = atom('Default');
export const currentPageAtom = atom(1);
export const isLoadingAtom = atom(false);

// Card detail atoms
export const selectedCardAtom = atom<DetailedCard | null>(null);
export const isCardPopupOpenAtom = atom(false);
export const isLoadingDetailsAtom = atom(false); 