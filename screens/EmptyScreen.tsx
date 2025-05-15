import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

export default function EmptyScreen() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="bird" size={60} color="grey" />
      <Text style={styles.title}>Sign In to view more</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
  },
  title: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold',
  },
});
