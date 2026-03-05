import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { usePokemons, type PokemonListItem } from '@/features/pokemon';
import { FlatList } from '@/shared/ui/flat-list';
import { Image } from '@/shared/ui/image';
import { Skeleton } from '@/shared/ui/skeleton';
import { StatusBar } from '@/shared/ui/status-bar';
import { formatPokemonId } from '@/shared/utils/format-pokemon-id';

export interface PokemonRowProps {
  item: PokemonListItem;
  spritePlaceholder?: string;
  spriteTransition?: number;
};

function PokemonRow({
  item,
  spritePlaceholder = 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH',
  spriteTransition = 200,
}: PokemonRowProps) {
  const formattedId = formatPokemonId(item.id);

  return (
    <View style={styles.row}>
      <Image
        source={item.spriteUrl}
        style={styles.sprite}
        placeholder={spritePlaceholder}
        contentFit="contain"
        transition={spriteTransition}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.id}>{formattedId}</Text>
      </View>
    </View>
  );
}

export interface SkeletonRowProps {
  spriteSize?: number;
  spriteBorderRadius?: number;
  nameWidth?: `${number}%`;
  nameHeight?: number;
  idWidth?: `${number}%`;
  idHeight?: number;
};

function SkeletonRow({
  spriteSize = 60,
  spriteBorderRadius = 8,
  nameWidth = '50%',
  nameHeight = 16,
  idWidth = '25%',
  idHeight = 12,
}: SkeletonRowProps) {
  return (
    <View style={styles.row}>
      <Skeleton width={spriteSize} height={spriteSize} borderRadius={spriteBorderRadius} />
      <View style={styles.info}>
        <Skeleton width={nameWidth} height={nameHeight} style={{ marginBottom: 8 }} />
        <Skeleton width={idWidth} height={idHeight} />
      </View>
    </View>
  );
}

export interface ListProps {
  skeletonCount?: number;
  endReachedThreshold?: number;
};

export default function List({ skeletonCount = 15, endReachedThreshold = 0.5 }: ListProps) {
  const { pokemons, isLoading, isError, error, fetchNextPage, isFetchingNextPage, refetch } =
    usePokemons();
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
        keyExtractor={item => String(item)}
        renderItem={() => <SkeletonRow />}
      />
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <FlatList
        data={pokemons}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <PokemonRow item={item} />}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={endReachedThreshold}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator style={styles.footer} /> : null
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  sprite: {
    width: 60,
    height: 60,
  },
  info: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  id: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  footer: {
    paddingVertical: 16,
  },
});
