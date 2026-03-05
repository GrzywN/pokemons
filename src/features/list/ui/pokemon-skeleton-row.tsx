import { StyleSheet, View } from 'react-native';

import { Skeleton } from '@/shared/ui/skeleton';

export interface PokemonSkeletonRowProps {
  spriteSize?: number;
  spriteBorderRadius?: number;
  nameWidth?: `${number}%`;
  nameHeight?: number;
  idWidth?: `${number}%`;
  idHeight?: number;
}

export function PokemonSkeletonRow({
  spriteSize = 60,
  spriteBorderRadius = 8,
  nameWidth = '50%',
  nameHeight = 16,
  idWidth = '25%',
  idHeight = 12,
}: PokemonSkeletonRowProps) {
  return (
    <View style={styles.row}>
      <Skeleton
        width={spriteSize}
        height={spriteSize}
        borderRadius={spriteBorderRadius}
      />
      <View style={styles.info}>
        <Skeleton
          width={nameWidth}
          height={nameHeight}
          style={{ marginBottom: 8 }}
        />
        <Skeleton width={idWidth} height={idHeight} />
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
  info: {
    marginLeft: 16,
    flex: 1,
  },
});
