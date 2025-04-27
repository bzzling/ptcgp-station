import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

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
            energyType?: string
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
                                {card.number} · {card.name}
                            </DialogTitle>
                            {card.evolveFrom && (
                                <p className="text-sm text-muted-foreground">Evolves from: {card.evolveFrom}</p>
                            )}
                        </DialogHeader>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-[300px]">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <>
                                {card.attacks && card.attacks.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="text-sm font-semibold mb-3">Attacks</h3>
                                        <div className="flex flex-col gap-2 bg-muted p-2 rounded-sm">
                                            {card.attacks.map((attack, index) => (
                                                <div key={index} className="flex-row justify-between">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <p className="font-medium">{attack.name}</p>
                                                    </div>
                                                    {attack.damage && (
                                                        <p className="text-muted-foreground">{attack.damage}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {card.description && (
                                    <div className="mt-6">
                                        <h3 className="text-xl font-semibold mb-2">Description</h3>
                                        <p className="text-muted-foreground">{card.description}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    {card.type && (
                                        <div>
                                            <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                                            <p>{card.type}</p>
                                        </div>
                                    )}
                                    {card.hp && (
                                        <div>
                                            <h4 className="text-sm font-medium text-muted-foreground">HP</h4>
                                            <p>{card.hp}</p>
                                        </div>
                                    )}
                                    {card.rarity && (
                                        <div>
                                            <h4 className="text-sm font-medium text-muted-foreground">Rarity</h4>
                                            <p>{card.rarity}</p>
                                        </div>
                                    )}
                                    {card.illustrator && (
                                        <div>
                                            <h4 className="text-sm font-medium text-muted-foreground">Illustrator</h4>
                                            <p>{card.illustrator}</p>
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