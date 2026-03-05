import {
  CameraPage,
  NoCameraDeviceError,
  PermissionsPage,
} from '@/features/camera';
import { useCameraDevice, useCameraPermission } from '@/shared/camera';

export default function CameraScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  if (!hasPermission) {
    return <PermissionsPage onRequestPermission={requestPermission} />;
  }

  if (device == null) {
    return <NoCameraDeviceError />;
  }

  return <CameraPage device={device} />;
}
