import { Stack, useLocalSearchParams } from 'expo-router';

import { PokemonDetail } from '@/features/detail';
import { useFavoritePokemon } from '@/shared/pokemon';

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { setFavorite } = useFavoritePokemon();
  const title = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      <Stack.Screen options={{ title }} />
      <PokemonDetail nameOrId={name} onSetFavorite={() => setFavorite(name)} />
    </>
  );
}
