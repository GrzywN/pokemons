import { FavoriteEmptyState, PokemonDetail } from '@/features/detail';
import { useFavoritePokemon } from '@/shared/pokemon';

export default function FavoriteScreen() {
  const { favorite } = useFavoritePokemon();

  if (!favorite) {
    return <FavoriteEmptyState />;
  }

  return <PokemonDetail nameOrId={favorite} />;
}
