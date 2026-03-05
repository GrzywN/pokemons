import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, type IconName } from '@/shared/ui/icon';

export interface PermissionsPageProps {
  onRequestPermission?: () => void;
  iconName?: IconName;
  iconSize?: number;
  iconColor?: string;
  title?: string;
  message?: string;
  buttonLabel?: string;
}

export function PermissionsPage({
  onRequestPermission,
  iconName = 'camera',
  iconSize = 48,
  iconColor = '#ccc',
  title = 'Camera permission required',
  message = 'This app needs access to your camera.',
  buttonLabel = 'Grant permission',
}: PermissionsPageProps) {
  return (
    <View style={styles.centered}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onRequestPermission}>
        <Text style={styles.buttonLabel}>{buttonLabel}</Text>
      </TouchableOpacity>
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
  button: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
