import {
  Camera as VisionCamera,
  type CameraProps,
} from 'react-native-vision-camera';

export {
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
export type { CameraDevice } from 'react-native-vision-camera';

export function Camera(props: CameraProps) {
  return <VisionCamera {...props} />;
}
