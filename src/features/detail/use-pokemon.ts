import { useQuery } from '@tanstack/react-query';

import { fetchPokemon } from '@/shared/pokemon';

const QUERY_KEY = 'pokemon' as const;

export function usePokemon(nameOrId: string | number = 'lycanroc-dusk') {
  return useQuery({
    queryKey: [QUERY_KEY, nameOrId],
    queryFn: () => fetchPokemon(nameOrId),
  });
}

usePokemon.queryKey = QUERY_KEY;
