import {
  PokemonListRawPageSchema,
  PokemonSchema,
  type Pokemon,
  type PokemonListPage,
} from './types';

function extractId(url: string): number {
  const match = url.match(/\/(\d+)\/$/);
  return match ? parseInt(match[1], 10) : 0;
}

export async function fetchPokemonList(
  offset: number,
  pageSize = 20,
  baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
): Promise<PokemonListPage> {
  const url = new URL(baseUrl);
  url.searchParams.set('limit', String(pageSize));
  url.searchParams.set('offset', String(offset));

  const response = await fetch(url.href);

  if (!response.ok) {
    throw new Error(`fetchPokemonList: Failed with status ${response.status}`);
  }

  const raw = PokemonListRawPageSchema.parse(await response.json());

  return {
    count: raw.count,
    next: raw.next,
    results: raw.results.map((item) => {
      const id = extractId(item.url);
      return {
        id,
        name: item.name,
        spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    }),
  };
}

export async function fetchPokemon(
  nameOrId: string | number,
  baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
): Promise<Pokemon> {
  const url = new URL(nameOrId.toString(), baseUrl).href;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `fetchPokemon: Failed to fetch pokemon "${nameOrId}": ${response.status}`
    );
  }

  return PokemonSchema.parse(await response.json());
}
