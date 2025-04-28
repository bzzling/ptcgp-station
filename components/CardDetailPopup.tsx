import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { type } from 'os'

interface CardDetailPopupProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    card: {
        imageUrl: string
        name: string
        number: string
        set: string
        type?: string
        hp?: number
        attacks?: Array<{
            name: string
            damage?: number
            description?: string
            cost?: string[]
        }>
        evolveFrom?: string
        description?: string
        illustrator?: string
        rarity?: string
        retreat?: number
        weaknesses?: Array<{
            type: string
            value: string
        }>
        abilities?: Array<{
            name: string
            description?: string
        }>
    }
    isLoading?: boolean
}

export default function CardDetailPopup({ isOpen, onOpenChange, card, isLoading }: CardDetailPopupProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="!max-w-3xl" headerTitle={card.name}>
                <div className="flex gap-8">
                    <div className="w-2/5">
                        <div className="relative aspect-[63/88] w-full overflow-hidden rounded-md">
                            <Image
                                src={card.imageUrl}
                                alt={card.name}
                                fill
                                className="object-cover hover:contrast-115 transition-transform duration-200"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                    <div className="w-3/5">
                        <DialogHeader>
                            <DialogTitle className="text-lg">
                                <div className="flex items-center justify-between">
                                    <p>{card.number} · {card.name}</p>
                                    {card.type && (
                                        <div className="w-6 h-6 relative">
                                            <Image
                                                src={`/tcg-types/${card.type}.png`}
                                                alt={card.type}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </DialogTitle>
                            {card.evolveFrom && (
                                <p className="text-sm">Evolves from: {card.evolveFrom}</p>
                            )}
                        </DialogHeader>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-[300px]">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <>
                                {card.attacks && card.attacks.length > 0 && (
                                    <div className="text-xs mt-4">
                                        <h3 className="mb-3">Attacks</h3>
                                        <div className="flex flex-col gap-4 bg-muted/50 p-2 rounded-sm">
                                            {card.attacks.map((attack, index) => (
                                                <div key={index} className="flex flex-col gap-1">
                                                    <div className="relative flex items-center justify-between min-h-[1.5rem]">
                                                        <div className="flex items-center gap-1 z-10">
                                                            {attack.cost?.map((type, i) => (
                                                                <div key={i} className="w-4 h-4 relative">
                                                                    <Image
                                                                        src={`/tcg-types/${type}.png`}
                                                                        alt={type}
                                                                        fill
                                                                        className="object-contain"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <p className="font-semibold absolute left-1/2 -translate-x-1/2 z-0">{attack.name}</p>
                                                        {attack.damage && (
                                                            <p className="font-semibold z-10">{attack.damage}</p>
                                                        )}
                                                    </div>
                                                    {attack.description && (
                                                        <div className="px-6 border-l-2 border-muted-foreground/20 mx-2">
                                                            <p className="text-muted-foreground text-center">{attack.description}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {card.abilities && card.abilities.length > 0 && (
                                    <div className="text-xs mt-4">
                                        <h3 className="mb-3">Abilities</h3>
                                        <div className="flex flex-col gap-4 bg-muted/50 p-2 rounded-sm">
                                            {card.abilities.map((ability, index) => (
                                                <div key={index}>
                                                    <p className="font-semibold text-center">{ability.name}</p>
                                                    <div className="px-6 border-l-2 border-muted-foreground/20 mx-2">
                                                        <p className="text-muted-foreground text-center">{ability.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {card.description && (
                                    <div className="mt-6">
                                        <h3 className="text-xs mb-2">Description</h3>
                                        <p className="text-muted-foreground text-sm">{card.description}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    {card.type && (
                                        <div>
                                            <h4 className="text-xs font-medium text-muted-foreground">Type</h4>
                                            <p className="text-sm">{card.type}</p>
                                        </div>
                                    )}
                                    {card.hp && (
                                        <div>
                                            <h4 className="text-xs font-medium text-muted-foreground">HP</h4>
                                            <p className="text-sm">{card.hp}</p>
                                        </div>
                                    )}
                                    {card.rarity && (
                                        <div>
                                            <h4 className="text-xs font-medium text-muted-foreground">Rarity</h4>
                                            <p className="text-sm">{card.rarity}</p>
                                        </div>
                                    )}
                                    {card.retreat && (
                                        <div>
                                            <h4 className="text-xs font-medium text-muted-foreground">Retreat</h4>
                                            <div className="flex flex-row items-center gap-1">
                                                {Array.from({ length: card.retreat }).map((_, index) => (
                                                    <div key={index} className="w-4 h-4 relative">
                                                        <Image src="/tcg-types/Colorless.png" alt="Colorless" fill className="object-contain" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {card.weaknesses && card.weaknesses.length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-medium text-muted-foreground">Weaknesses</h4>
                                            <div className="flex flex-row items-center gap-1">
                                                <div className="w-4 h-4 relative">
                                                    <Image
                                                        src={`/tcg-types/${card.weaknesses[0].type}.png`}
                                                        alt={card.weaknesses[0].type}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <p className="text-sm">{card.weaknesses[0].value}</p>
                                            </div>
                                        </div>
                                    )}
                                    {card.set && (
                                        <div>
                                            <h4 className="text-xs font-medium text-muted-foreground">Set</h4>
                                            <p className="text-sm">{card.set}</p>
                                        </div>
                                    )}
                                    {card.illustrator && (
                                        <div>
                                            <h4 className="text-xs font-medium text-muted-foreground">Illustrator</h4>
                                            <p className="text-sm">{card.illustrator}</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 