import { useQuery } from '@tanstack/react-query';

import { fetchPokemon } from '@/shared/pokemon';

const QUERY_KEY = 'pokemon' as const;

export function usePokemon(nameOrId?: string | number) {
  return useQuery({
    queryKey: [QUERY_KEY, nameOrId],
    queryFn: () => fetchPokemon(nameOrId!),
    enabled: nameOrId != null,
  });
}

usePokemon.queryKey = QUERY_KEY;
