import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchPokemonList } from '@/shared/pokemon';

const QUERY_KEY = 'pokemons' as const;

export interface UsePokemonsProps {
  initialPageParam?: number;
}

export function usePokemons({ initialPageParam = 0 }: UsePokemonsProps = {}) {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY],
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam),
    initialPageParam,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const offset = new URL(lastPage.next).searchParams.get('offset');
      return offset ? parseInt(offset, 10) : undefined;
    },
  });

  const pokemons = query.data?.pages.flatMap((page) => page.results) ?? [];

  return { ...query, pokemons };
}

usePokemons.queryKey = QUERY_KEY;
