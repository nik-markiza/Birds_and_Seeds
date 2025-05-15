import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="bird" size={60} color="grey" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '300%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
