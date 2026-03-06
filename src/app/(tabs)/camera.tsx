import {
  CameraPage,
  NoCameraDeviceError,
  PermissionsPage,
} from '@/features/camera';
import {
  useCameraDevice,
  useCameraPermission,
  type CameraPosition,
} from '@/shared/camera';

export interface CameraScreenProps {
  camera: CameraPosition;
}

export default function CameraScreen({ camera = 'front' }: CameraScreenProps) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice(camera);

  if (!hasPermission) {
    return <PermissionsPage onRequestPermission={requestPermission} />;
  }

  if (device == null) {
    return <NoCameraDeviceError />;
  }

  return <CameraPage device={device} />;
}
