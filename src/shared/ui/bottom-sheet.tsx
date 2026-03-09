import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { type ReactNode, useEffect, useRef } from 'react';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const ref = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (visible) {
      ref.current?.present();
    } else {
      ref.current?.dismiss();
    }
  }, [visible]);

  return (
    <BottomSheetModal ref={ref} onDismiss={onClose} snapPoints={['75%']}>
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheetModal>
  );
}
