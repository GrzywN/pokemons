import { PokemonSchema, type Pokemon } from './types';

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

  const data = await response.json();

  return PokemonSchema.parse(data);
}
