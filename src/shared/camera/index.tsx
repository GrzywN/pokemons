import {
  Camera as VisionCamera,
  type CameraProps,
} from 'react-native-vision-camera';

export {
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export type {
  CameraProps,
  CameraDevice,
  CameraPosition,
} from 'react-native-vision-camera';

export function Camera(props: CameraProps) {
  return <VisionCamera {...props} />;
}
