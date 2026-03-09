import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useFavoritePokemon } from '@/shared/pokemon';
import { FlatList } from '@/shared/ui/flat-list';
import { StatusBar } from '@/shared/ui/status-bar';

import { usePokemons } from '../use-pokemons';
import { PokemonRow } from './pokemon-row';
import { PokemonSkeletonRow } from './pokemon-skeleton-row';

export interface PokemonListProps {
  skeletonCount?: number;
  endReachedThreshold?: number;
}

export function PokemonList({
  skeletonCount = 15,
  endReachedThreshold = 0.5,
}: PokemonListProps) {
  const router = useRouter();
  const { favorite, setFavorite, clearFavorite } = useFavoritePokemon();
  const {
    pokemons,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = usePokemons();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const renderItem = useCallback(
    ({ item }: { item: (typeof pokemons)[number] }) => (
      <PokemonRow
        item={item}
        isFavorite={favorite === item.name}
        onPress={() => router.push(`/list/${item.name}`)}
        onStarPress={() =>
          favorite === item.name ? clearFavorite() : setFavorite(item.name)
        }
      />
    ),
    [favorite, setFavorite, clearFavorite]
  );

  async function handleRefresh() {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Something went wrong.
          {__DEV__ && `\n${error.message}`}
        </Text>
      </View>
    );
  }

  if (isLoading) {
    const skeletonData = Array.from({ length: skeletonCount }, (_, i) => i);
    return (
      <FlatList
        data={skeletonData}
        keyExtractor={(item) => String(item)}
        renderItem={() => <PokemonSkeletonRow />}
      />
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <FlatList
        data={pokemons}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        extraData={favorite}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={endReachedThreshold}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.footer} />
          ) : null
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  footer: {
    paddingVertical: 16,
  },
});
