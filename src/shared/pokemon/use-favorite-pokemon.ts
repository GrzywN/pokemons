import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const STORAGE_KEY = '@favorite_pokemon';
const QUERY_KEY = 'favorite-pokemon' as const;

export function useFavoritePokemon() {
  const queryClient = useQueryClient();

  const { data: favorite = null } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => AsyncStorage.getItem(STORAGE_KEY),
  });

  async function setFavorite(name: string) {
    await AsyncStorage.setItem(STORAGE_KEY, name);
    queryClient.setQueryData([QUERY_KEY], name);
  }

  async function clearFavorite() {
    await AsyncStorage.removeItem(STORAGE_KEY);
    queryClient.setQueryData([QUERY_KEY], null);
  }

  return { favorite, setFavorite, clearFavorite };
}

useFavoritePokemon.storageKey = STORAGE_KEY;
useFavoritePokemon.queryKey = QUERY_KEY;
