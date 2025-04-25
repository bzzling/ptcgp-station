interface CardProps {
    card: {
        id: string;
        name: string;
        image?: string;
    };
}

export default function Card({ card }: CardProps) {
    // The API provides the base URL, just append quality and format
    const imageUrl = card.image ? `${card.image}/high.webp` : null;

    return (
        <div className="relative group">
            <div className="aspect-[63/88] rounded-lg overflow-hidden bg-gray-100 hover:shadow-md transition-shadow duration-200">
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
        </div>
    );
} 