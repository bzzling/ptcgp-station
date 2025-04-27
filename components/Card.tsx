"use client"

import { useState } from "react"
import Image from "next/image"
import CardDetailPopup from "@/components/CardDetailPopup"

interface CardProps {
    card: {
        id: string;
        name: string;
        image: string;
    }
}

interface DetailedCard {
    id: string;
    name: string;
    image: string;
    set?: {
        name: string;
    };
    types?: string[];
    hp?: number;
    abilities?: Array<{
        name: string;
        effect?: string;
    }>;
    attacks?: Array<{
        name: string;
        damage?: number;
        effect?: string;
        cost?: string[];
    }>;
    description?: string;
    illustrator?: string;
    evolveFrom?: string;
    rarity?: string;
    retreat?: number;
    weaknesses?: Array<{
        type: string;
        value: string;
    }>;
    stage?: string;
}

export default function Card({ card }: CardProps) {
    const [isCardPopupOpen, setIsCardPopupOpen] = useState(false)
    const [detailedCard, setDetailedCard] = useState<DetailedCard | null>(null)
    const [isLoadingDetails, setIsLoadingDetails] = useState(false)
    const imageUrl = card.image ? `${card.image}/high.webp` : null;

    const handleCardClick = async () => {
        setIsCardPopupOpen(true)
        
        if (!detailedCard && !isLoadingDetails) {
            try {
                setIsLoadingDetails(true)
                const response = await fetch(`https://api.tcgdex.net/v2/en/cards/${card.id}`)
                const data = await response.json()
                setDetailedCard(data)
            } catch (error) {
                console.error(`Error fetching card ${card.id} details:`, error)
            } finally {
                setIsLoadingDetails(false)
            }
        }
    }

    const cardDetails = detailedCard ? {
        imageUrl: imageUrl || "",
        name: detailedCard.name,
        number: detailedCard.id,
        set: detailedCard.set?.name || "Unknown Set",
        type: detailedCard.types?.[0],
        hp: detailedCard.hp,
        attacks: detailedCard.attacks?.map(attack => ({
            name: attack.name,
            damage: attack.damage,
            description: attack.effect,
            cost: attack.cost
        })),
        abilities: detailedCard.abilities?.map(ability => ({
            name: ability.name,
            description: ability.effect
        })),
        description: detailedCard.description,
        illustrator: detailedCard.illustrator,
        rarity: detailedCard.rarity,
        retreat: detailedCard.retreat,
        weaknesses: detailedCard.weaknesses?.map(weakness => ({
            type: weakness.type,
            value: weakness.value
        })),
        evolveFrom: detailedCard.evolveFrom
    } : {
        imageUrl: imageUrl || "",
        name: card.name,
        number: card.id,
        set: "Unknown Set"
    }

    return (
        <>
            <div 
                className="group cursor-pointer" 
                onClick={handleCardClick}
            >
                <div className="aspect-[63/88] rounded-md overflow-hidden bg-muted hover:shadow-md transition-shadow duration-200">
                    {imageUrl ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={imageUrl}
                                alt={card.name}
                                fill
                                className="object-cover transform hover:contrast-115 transition-transform duration-200"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={false}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                            <span className="text-muted-foreground">No image</span>
                        </div>
                    )}
                </div>
                <div className="mt-2 text-left rounded-xs border border-muted-foreground overflow-hidden text-xs font-mono">
                    <h3 className="text-primary pl-2 bg-muted">{card.name}</h3>
                    <p className="font-light text-muted-foreground pl-2 border-t border-muted-foreground">{"#" + card.id}</p>
                </div>
            </div>

            <CardDetailPopup 
                isOpen={isCardPopupOpen}
                onOpenChange={setIsCardPopupOpen}
                card={cardDetails}
                isLoading={isLoadingDetails}
            />
        </>
    );
} 