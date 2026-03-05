import { FlashList, type FlashListProps } from '@shopify/flash-list';

export function FlatList<T>(props: FlashListProps<T>) {
  return <FlashList {...props} />;
}
