import {
  Image as ExpoImage,
  type ImageProps as ExpoImageProps,
} from 'expo-image';
import {
  Image as RNImage,
  type ImageProps as RNImageProps,
} from 'react-native';

export type ImageProps =
  | (ExpoImageProps & { driver?: 'expo' })
  | (RNImageProps & { driver: 'react-native' });

export function Image({ driver = 'expo', ...props }: ImageProps) {
  if (driver === 'react-native') {
    return <RNImage {...(props as RNImageProps)} />;
  }

  return <ExpoImage {...(props as ExpoImageProps)} />;
}
