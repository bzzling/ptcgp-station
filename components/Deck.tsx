interface DeckProps {
    deck: {
        id: string;
        name: string;
        faceCard: string;
        cards: string[];
    };
}

export default function Deck({ deck }: DeckProps) {
    const imageUrl = deck.faceCard ? `${deck.faceCard}/high.webp` : null;
    
    return (
        <div className="group relative">
            <div className="aspect-[6/3] rounded-lg overflow-hidden bg-gray-100 hover:shadow-md transition-shadow duration-200">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={deck.name}
                        className="w-full h-full object-cover object-[center_15%] brightness-50 scale-[1.25] transform hover:contrast-115 transition-transform duration-200"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No image</span>
                    </div>
                )}
            </div>
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl font-medium">{deck.name}</h1>
        </div>
    );
}