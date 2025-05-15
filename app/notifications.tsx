import { notificationsData } from '@/constants/MockData';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Notificationscreen() {
  const [allIsRead, setAllRead] = useState(false);

  const onMarkAll = () => {
    if (!allIsRead) {
      setAllRead(true);
    }
  };

  const NotificationItem = ({
    message,
    allIsRead,
  }: {
    message: string;
    allIsRead: boolean;
  }) => (
    <View style={styles.titleContainer}>
      <AntDesign
        name={'exclamationcircleo'}
        size={20}
        color={allIsRead ? 'grey' : 'black'}
      />
      <Text style={[styles.title, allIsRead && { color: 'grey' }]}>
        {message}
      </Text>
    </View>
  );

  return (
    <View style={styles.body}>
      <View style={styles.optionsBar}>
        <Pressable disabled={allIsRead} onPress={onMarkAll}>
          <Text style={[styles.pressableTitle, allIsRead && { color: 'grey' }]}>
            Mark all as read
          </Text>
        </Pressable>
      </View>
      {notificationsData.map((notification, index) => (
        <NotificationItem
          key={index}
          message={notification.message}
          allIsRead={allIsRead}
        />
      ))}
      <View style={styles.container} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  optionsBar: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    backgroundColor: 'white',
  },
  pressableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  titleContainer: {
    height: 30,
    marginBottom: 10,
    alignItems: 'center',
    paddingLeft: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 17,
    marginLeft: 10,
  },
});
