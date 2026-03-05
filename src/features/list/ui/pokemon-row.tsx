import { StyleSheet, Text, View } from 'react-native';

import { Image } from '@/shared/ui/image';
import { formatPokemonId } from '@/shared/utils/format-pokemon-id';
import type { PokemonListItem } from '@/shared/pokemon';

export interface PokemonRowProps {
  item: PokemonListItem;
  spritePlaceholder?: string;
  spriteTransition?: number;
}

export function PokemonRow({
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

const styles = StyleSheet.create({
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
});
