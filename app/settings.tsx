import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function NotificationSettingsScreen() {
  const [switchValues, setSwitchValues] = useState({
    sound: true,
    notification: false,
    comments: true,
    communities: false,
    new: true,
  });

  type SwitchKey = keyof typeof switchValues;

  const handleSwitchChange = (name: SwitchKey) => {
    setSwitchValues((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <View style={styles.switchContainer}>
          <SettingSwitch
            label="Play sound when the birds arrive"
            value={switchValues.sound}
            onValueChange={() => handleSwitchChange('sound')}
          />
          <View style={styles.separator} />
          <SettingSwitch
            label="Show notification count on app icon"
            value={switchValues.notification}
            onValueChange={() => handleSwitchChange('notification')}
          />
          <View style={styles.separator} />
          <SettingSwitch
            label="When I'm mentioned in comments"
            value={switchValues.comments}
            onValueChange={() => handleSwitchChange('comments')}
          />
          <View style={styles.separator} />
          <SettingSwitch
            label="When I'm mentioned in communities"
            value={switchValues.communities}
            onValueChange={() => handleSwitchChange('communities')}
          />
          <View style={styles.separator} />
          <SettingSwitch
            label="When there are new birds"
            value={switchValues.new}
            onValueChange={() => handleSwitchChange('new')}
          />
        </View>
      </View>
    </View>
  );
}

const SettingSwitch = ({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: () => void;
}) => (
  <View style={styles.switchRow}>
    <Text style={styles.switchLabel}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  switchContainer: {
    width: '100%',
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: 'black',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff3366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    marginBottom: 7,
    borderRadius: 20,
  },
});
