import { StatusBar } from '@/shared/ui/status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Camera({
  appLabel = 'Open up app.tsx to start working on your app!',
}) {
  return (
    <View style={styles.container}>
      <Text>{appLabel}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
