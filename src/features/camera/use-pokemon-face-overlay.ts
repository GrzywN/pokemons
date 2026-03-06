import { useWindowDimensions } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { runAsync, useFrameProcessor } from 'react-native-vision-camera';
import {
  useFaceDetector,
  type FrameFaceDetectionOptions,
} from 'react-native-vision-camera-face-detector';
import { Worklets } from 'react-native-worklets-core';
import { useCallback, useEffect, useMemo } from 'react';

import { usePokemon } from '@/features/detail';
import { useFavoritePokemon } from '@/shared/pokemon';

export interface UsePokemonFaceOverlayProps {
  offScreenX?: number;
  offScreenY?: number;
  defaultWidth?: number;
  defaultHeight?: number;
  detectorOptions?: Pick<
    FrameFaceDetectionOptions,
    'performanceMode' | 'landmarkMode' | 'contourMode'
  >;
}

export function usePokemonFaceOverlay({
  offScreenX = -1000,
  offScreenY = -1000,
  defaultWidth = 0,
  defaultHeight = 0,
  detectorOptions = {
    performanceMode: 'fast',
    landmarkMode: 'none',
    contourMode: 'none',
  },
}: UsePokemonFaceOverlayProps = {}) {
  const { favorite } = useFavoritePokemon();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const { data: pokemon } = usePokemon(favorite ?? undefined);
  const spriteUrl = pokemon?.sprites.front_default ?? null;

  const faceX = useSharedValue(offScreenX);
  const faceY = useSharedValue(offScreenY);
  const faceW = useSharedValue(defaultWidth);
  const faceH = useSharedValue(defaultHeight);

  const handleFaceDetected = useCallback(
    (x: number, y: number, width: number, height: number) => {
      faceX.value = x;
      faceY.value = y;
      faceW.value = width;
      faceH.value = height;
    },
    [faceX, faceY, faceW, faceH]
  );

  const handleFaceLost = useCallback(() => {
    faceX.value = offScreenX;
    faceY.value = offScreenY;
  }, [faceX, faceY, offScreenX, offScreenY]);

  const handleFaceDetectedJS = useMemo(
    () => Worklets.createRunOnJS(handleFaceDetected),
    [handleFaceDetected]
  );

  const handleFaceLostJS = useMemo(
    () => Worklets.createRunOnJS(handleFaceLost),
    [handleFaceLost]
  );

  const { detectFaces, stopListeners } = useFaceDetector({
    ...detectorOptions,
    autoMode: true,
    windowWidth,
    windowHeight,
  });

  useEffect(() => {
    return () => {
      stopListeners();
    };
  }, [stopListeners]);

  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet';

      runAsync(frame, () => {
        'worklet';

        const faces = detectFaces(frame);
        const recognizedFaces = faces.length > 0;

        if (!recognizedFaces) {
          handleFaceLostJS();
          return;
        }

        const { x, y, width, height } = faces[0]!.bounds;
        handleFaceDetectedJS(x, y, width, height);
      });
    },
    [detectFaces, handleFaceDetectedJS, handleFaceLostJS]
  );

  const overlayStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: faceX.value,
    top: faceY.value,
    width: faceW.value,
    height: faceH.value,
  }));

  const debugFaceStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: faceX.value,
    top: faceY.value,
    width: faceW.value,
    height: faceH.value,
    borderWidth: 4,
    borderColor: 'lime',
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  }));

  return { frameProcessor, overlayStyle, debugFaceStyle, spriteUrl };
}
