interface CardProps {
    card: {
        id: string;
        name: string;
        image?: string;
    };
}

export default function Card({ card }: CardProps) {
    const imageUrl = card.image ? `${card.image}/high.webp` : null;

    return (
        <div className="group">
            <div className="aspect-[63/88] rounded-md overflow-hidden bg-gray-100 hover:shadow-md transition-shadow duration-200">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={card.name}
                        className="w-full h-full object-cover transform hover:contrast-115 transition-transform duration-200"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No image</span>
                    </div>
                )}
            </div>
            <div className="mt-2 text-left rounded-xs border border-muted-foreground overflow-hidden text-xs font-mono">
                <h3 className="text-primary pl-2 bg-muted">{card.name}</h3>
                <p className="font-light text-muted-foreground pl-2 border-t border-muted-foreground">{"#" + card.id}</p>
            </div>
        </div>
    );
} 