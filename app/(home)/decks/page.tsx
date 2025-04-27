import Deck from "@/components/Deck";

// Sample deck data - this could be moved to a separate file or fetched from an API
const SAMPLE_DECKS = [
    {
        id: "1",
        name: "Giratina ex",
        faceCard: "https://assets.tcgdex.net/en/tcgp/A2b/035",
        cards: ["1", "2", "3"],
    },
    {
        id: "2",
        name: "Gyrados ex",
        faceCard: "https://assets.tcgdex.net/en/tcgp/A1a/018",
        cards: ["4", "5", "6"],
    },
    {
        id: "3",
        name: "Arceus ex",
        faceCard: "https://assets.tcgdex.net/en/tcgp/A2a/071",
        cards: ["7", "8", "9"],
    },
    {
        id: "4",
        name: "Meowscarada",
        faceCard: "https://assets.tcgdex.net/en/tcgp/A2b/007",
        cards: ["10", "11", "12"],
    },
];

// TODO: Implement face card fetching based on deck name
async function getFaceCardUrl(deckName: string): Promise<string | null> {

    // This function would eventually use an API to search for the card
    // and return its image URL
    return null;
}

export default function Decks() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Popular Decks</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SAMPLE_DECKS.map((deck) => (
                    <Deck key={deck.id} deck={deck} />
                ))}
            </div>
        </div>
    );
}