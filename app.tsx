import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// biome-ignore lint/nursery/useExplicitType: Type inherited from default value
function App(appLabel = 'Open up app.tsx to start working on your app!'): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>{appLabel}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles: ReturnType<typeof StyleSheet.create> = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { App };
