import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

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
        renderItem={({ item }) => <PokemonRow item={item} />}
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
