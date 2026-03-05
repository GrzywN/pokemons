import { useEffect } from 'react';
import { type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export interface SkeletonProps {
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
  backgroundColor?: `#${string}`;
  minOpacity?: number;
  maxOpacity?: number;
  duration?: number;
  style?: ViewStyle;
}

export function Skeleton({
  width,
  height,
  borderRadius = 6,
  backgroundColor = '#e0e0e0',
  minOpacity = 0.4,
  maxOpacity = 1,
  duration = 700,
  style,
}: SkeletonProps) {
  const opacity = useSharedValue(minOpacity);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(maxOpacity, { duration }),
        withTiming(minOpacity, { duration })
      ),
      -1
    );
  }, [opacity, minOpacity, maxOpacity, duration]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        { width, height, borderRadius, backgroundColor },
        animatedStyle,
        style,
      ]}
    />
  );
}
