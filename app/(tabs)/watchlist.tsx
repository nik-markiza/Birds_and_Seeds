import EmptyScreen from '@/screens/EmptyScreen';
import { StyleSheet, View } from 'react-native';

export default function TabWatchlistScreen() {
  return (
    <View style={styles.container}>
      <EmptyScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
