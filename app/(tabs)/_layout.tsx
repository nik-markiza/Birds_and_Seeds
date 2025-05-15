import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import TabsHeader from '@/components/ui/TabsHeader';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        lazy: true,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        header: () => <TabsHeader />,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#ecf0f1',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -1 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            borderTopWidth: 0,
            height: 90,
            paddingTop: 5,
          },
          android: {
            elevation: 4,
            backgroundColor: '#ecf0f1',
            borderTopWidth: 0,
            height: 90,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Auctions',
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 5,
          },
          tabBarActiveTintColor: '#4a69bd',
          tabBarInactiveTintColor: '#a5b1c2',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="camera-timer"
              size={28}
              color={focused ? '#4a69bd' : '#a5b1c2'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: 'Watch List',
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 5,
          },
          tabBarActiveTintColor: '#4a69bd',
          tabBarInactiveTintColor: '#a5b1c2',
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="star"
              size={26}
              color={focused ? '#4a69bd' : '#a5b1c2'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 5,
          },
          tabBarActiveTintColor: '#4a69bd',
          tabBarInactiveTintColor: '#a5b1c2',
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={30}
              name="dollarsign.circle"
              color={focused ? '#4a69bd' : '#a5b1c2'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 5,
          },
          tabBarActiveTintColor: '#4a69bd',
          tabBarInactiveTintColor: '#a5b1c2',
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name="people-group"
              size={24}
              color={focused ? '#4a69bd' : '#a5b1c2'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 5,
          },
          tabBarActiveTintColor: '#4a69bd',
          tabBarInactiveTintColor: '#a5b1c2',
          tabBarIcon: ({ focused }) => (
            <Foundation
              name="magnifying-glass"
              size={28}
              color={focused ? '#4a69bd' : 'grey'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
