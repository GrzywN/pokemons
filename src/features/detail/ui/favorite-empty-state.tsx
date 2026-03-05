import FontAwesome from '@expo/vector-icons/FontAwesome';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type FontAwesomeName = ComponentProps<typeof FontAwesome>['name'];

export interface FavoriteEmptyStateProps {
  iconName?: FontAwesomeName;
  iconSize?: number;
  iconColor?: string;
  title?: string;
  message?: string;
}

export function FavoriteEmptyState({
  iconName = 'star-o',
  iconSize = 48,
  iconColor = '#ccc',
  title = 'No favorite Pokémon yet',
  message = 'Tap ★ next to any Pokémon in the list',
}: FavoriteEmptyStateProps) {
  return (
    <View style={styles.centered}>
      <FontAwesome name={iconName} size={iconSize} color={iconColor} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
