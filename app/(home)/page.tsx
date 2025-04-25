import Image from "next/image";
import TCGdex from '@tcgdex/sdk'

const tcgdex = new TCGdex('en');

export default async function Home() {
  const pokemon = await tcgdex.fetch('cards', 'swsh3-136');

  return (
    <div>
      <pre>
        {JSON.stringify(pokemon, null, 2)}
      </pre>
    </div>
  );
}
