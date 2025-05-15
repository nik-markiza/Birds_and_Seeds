import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TabsHeader() {
  const router = useRouter();

  const navToMenu = () => {
    router.push('/menu');
  };

  const navToNotifications = () => {
    router.push('/notifications');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.titleA}>Birds</Text>
        <Text style={styles.titleB}>&</Text>
        <Text style={styles.titleC}>Seeds</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={navToNotifications}
          style={({ pressed }) => [styles.button, pressed && styles.op5]}
        >
          <Entypo name="bell" size={24} color="" />
        </Pressable>
        <View style={styles.separator}></View>
        <Pressable
          onPress={navToMenu}
          style={({ pressed }) => [styles.button, pressed && styles.op5]}
        >
          <MaterialCommunityIcons name="bird" size={36} color="" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: '#ecf0f1',
    paddingTop: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  titleA: {
    color: '#4a69bd',
    fontSize: 26,
    fontWeight: 'bold',
  },
  titleB: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
  titleC: {
    color: '#079992',
    fontSize: 26,
    fontWeight: 'bold',
  },
  button: {
    height: '100%',
    minWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 25,
    width: 0.7,
    backgroundColor: '#a4b0be',
    alignSelf: 'center',
    borderRadius: 50,
    marginHorizontal: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  op5: { opacity: 0.5 },
});
