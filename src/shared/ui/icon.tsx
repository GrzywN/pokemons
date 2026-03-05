import FontAwesome from '@expo/vector-icons/FontAwesome';
import type { ComponentProps } from 'react';

export type IconName = ComponentProps<typeof FontAwesome>['name'];

export function Icon(props: ComponentProps<typeof FontAwesome>) {
  return <FontAwesome {...props} />;
}
