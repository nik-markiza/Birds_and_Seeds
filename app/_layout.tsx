import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet } from 'react-native';
import 'react-native-reanimated';

import Feather from '@expo/vector-icons/Feather';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="menu"
          options={{
            title: 'Menu',
            headerStyle: {
              backgroundColor: '#ecf0f1',
            },
            headerBackTitle: 'Back',
            headerBackTitleStyle: {
              fontSize: 20,
            },
            headerTintColor: '#2f3542',
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="notifications"
          options={() => ({
            title: 'Notifications',
            headerStyle: {
              backgroundColor: '#ecf0f1',
            },
            headerBackTitle: 'Back',
            headerBackTitleStyle: {
              fontSize: 20,
            },
            headerRight: () => (
              <Pressable
                hitSlop={10}
                onPress={() => router.push('/settings')}
                style={styles.settingsButton}
              >
                <Feather name="settings" size={28} color="black" />
              </Pressable>
            ),
            headerTintColor: '#2f3542',
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerStyle: {
              backgroundColor: '#ecf0f1',
            },
            headerBackTitle: 'Back',
            headerBackTitleStyle: {
              fontSize: 20,
            },
            headerTintColor: '#2f3542',
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="options"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
            headerBackVisible: false,
            title: 'Birds Options',
            headerStyle: {
              backgroundColor: '#ecf0f1',
            },
            headerLeft: () => null,
            headerTintColor: '#2f3542',
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
