import {
  StatusBar as ExpoStatusBar,
  type StatusBarProps,
} from 'expo-status-bar';

export function StatusBar(props: StatusBarProps) {
  return <ExpoStatusBar {...props} />;
}
