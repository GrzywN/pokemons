import { ImageResizeMode, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Camera, type CameraProps, type CameraDevice } from '@/shared/camera';
import { usePokemonFaceOverlay } from '../use-pokemon-face-overlay';

export interface CameraPageProps {
  device: CameraDevice;
  cameraIsActive?: boolean;
  cameraPixelFormat?: CameraProps['pixelFormat'];
  imageResizeMode?: ImageResizeMode;
}

export function CameraPage({
  device,
  cameraIsActive = true,
  cameraPixelFormat = 'yuv',
  imageResizeMode = 'contain',
}: CameraPageProps) {
  const { frameProcessor, overlayStyle, debugFaceStyle, spriteUrl } =
    usePokemonFaceOverlay();

  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={cameraIsActive}
        frameProcessor={frameProcessor}
        pixelFormat={cameraPixelFormat}
      />
      {spriteUrl != null && (
        <Animated.Image
          source={{ uri: spriteUrl }}
          style={[overlayStyle, __DEV__ && styles.spriteBorder]}
          resizeMode={imageResizeMode}
        />
      )}
      {__DEV__ && <Animated.View style={debugFaceStyle} />}
    </View>
  );
}

const styles = StyleSheet.create({
  spriteBorder: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
