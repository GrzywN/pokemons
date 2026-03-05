import { useQuery } from '@tanstack/react-query';
import { fetchPokemon } from './api';
import type { Pokemon } from './types';

const FAVORITE_POKEMON = 'lycanroc-dusk' as const;

export function usePokemon(nameOrId: string | number = FAVORITE_POKEMON) {
  return useQuery<Pokemon>({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemon(nameOrId),
  });
}
