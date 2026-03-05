import { StyleSheet } from 'react-native';
import { Camera, type CameraDevice } from '@/shared/camera';

export function CameraPage({ device }: { device: CameraDevice }) {
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}
