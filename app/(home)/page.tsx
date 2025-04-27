import Deck from "@/components/Deck";
import Card from "@/components/Card";

// Sample deck data - this could be moved to a separate file or fetched from an API
const SAMPLE_DECKS = [
    {
        id: "1",
        name: "Gyratina ex",
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
        name: "Meowscarada",
        faceCard: "https://assets.tcgdex.net/en/tcgp/A2b/007",
        cards: ["7", "8", "9"],
    },
    {
        id: "4",
        name: "Charizard ex",
        faceCard: "https://assets.tcgdex.net/en/tcgp/A2a/071",
        cards: ["10", "11", "12"],
    },
    {
        id: "5",
        name: "Gallade ex",
        faceCard: "https://assets.tcgdex.net/en/tcgp/A2b/007",
        cards: ["13", "14", "15"],
    },
    {
        id: "6",
        name: "Arceus ex",
        faceCard: "https://assets.tcgdex.net/en/tcgp/A2a/071",
        cards: ["16", "17", "18"],
    },
    {
        id: "7",
        name: "Darkrai ex",
        faceCard: "https://assets.tcgdex.net/en/tcgp/A2b/035",
        cards: ["19", "20", "21"],
    },
    {
        id: "8",
        name: "Dialga ex",
        faceCard: "https://assets.tcgdex.net/en/tcgp/A1a/018",
        cards: ["22", "23", "24"],
    },
];

async function getRandomCard() {
  try {
    // Fetch a list of all cards first
    const response = await fetch('https://api.tcgdex.net/v2/en/sets/A2b');
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      console.log('No cards returned from API');
      // Return a fallback card if the API fails
      return {
        id: "sv4-195",
        name: "Charizard ex",
        image: "https://assets.tcgdex.net/en/tcgp/A2a/071"
      };
    }

    // Get a random card from the list
    const randomCard = data[Math.floor(Math.random() * data.length)];
    console.log('Selected random card:', randomCard);

    // The API returns cards in a brief format with id, localId, name, and image
    const card = {
      id: randomCard.id,
      name: randomCard.name,
      image: randomCard.image,
    }

    return card;
  } catch (error) {
    console.error('Error fetching random card:', error);
    // Return a fallback card if the API fails
    return {
      id: "sv4-195",
      name: "Charizard ex",
      image: "https://assets.tcgdex.net/en/tcgp/A2a/071"
    };
  }
}

// TODO: Implement face card fetching based on deck name
async function getFaceCardUrl(deckName: string): Promise<string | null> {

    // This function would eventually use an API to search for the card
    // and return its image URL
    return null;
}

export default async function Home() {
    const featuredCard = await getRandomCard();
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold mb-8 text-center">Popular Decks</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SAMPLE_DECKS.map((deck) => (
                            <Deck key={deck.id} deck={deck} />
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <h1 className="text-3xl font-bold mb-8 text-center">Featured Card</h1>
                    <div className="max-w-sm mx-auto">
                        <Card card={featuredCard} />
                    </div>
                </div>
            </div>
        </div>
    );
}