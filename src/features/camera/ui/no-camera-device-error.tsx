import { StyleSheet, Text, View } from 'react-native';
import { Icon, type IconName } from '@/shared/ui/icon';

export interface NoCameraDeviceErrorProps {
  iconName?: IconName;
  iconSize?: number;
  iconColor?: string;
  title?: string;
  message?: string;
}

export function NoCameraDeviceError({
  iconName = 'exclamation-circle',
  iconSize = 48,
  iconColor = '#ccc',
  title = 'No camera found',
  message = 'Your device does not have a usable camera.',
}: NoCameraDeviceErrorProps) {
  return (
    <View style={styles.centered}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
