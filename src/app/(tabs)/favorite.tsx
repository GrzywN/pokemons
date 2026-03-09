import { Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { FavoriteEmptyState, PokemonDetail } from '@/features/detail';
import { useFavoritePokemon } from '@/shared/pokemon';
import { Icon, type IconName } from '@/shared/ui/icon';

export interface FavoriteScreenProps {
  hitSlop?: number;
  iconName?: IconName;
  iconSize?: number;
  iconColor?: `#${string}`;
}

export default function FavoriteScreen({
  hitSlop = 8,
  iconName = 'star',
  iconSize = 22,
  iconColor = '#f5a623',
}: FavoriteScreenProps) {
  const { favorite, clearFavorite } = useFavoritePokemon();

  return (
    <>
      <Tabs.Screen
        options={{
          headerRight: favorite
            ? () => (
                <TouchableOpacity
                  onPress={clearFavorite}
                  hitSlop={hitSlop}
                  style={styles.headerButton}>
                  <Icon name={iconName} size={iconSize} color={iconColor} />
                </TouchableOpacity>
              )
            : undefined,
        }}
      />
      {favorite ? (
        <PokemonDetail nameOrId={favorite} />
      ) : (
        <FavoriteEmptyState />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    paddingRight: 16,
  },
});
