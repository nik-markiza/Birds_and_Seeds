import { transTypeData } from '@/constants/MockData';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type TransTypePickerProps = {
  transValue: string;
  setTrans: (value: string) => void;
};

export function TransTypePicker({
  transValue,
  setTrans,
}: TransTypePickerProps) {
  const [isFocusTrans, setTransFocus] = useState(false);

  const renderLabel = () => {
    if (transValue || isFocusTrans) {
      return (
        <Text style={[styles.label, isFocusTrans && styles.focusedLabel]}>
          Transmissions
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocusTrans && styles.focusedBorder]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={transTypeData}
        maxHeight={300}
        labelField="value"
        valueField="value"
        value={transValue}
        onFocus={() => setTransFocus(true)}
        onBlur={() => setTransFocus(false)}
        onChange={(item) => {
          setTrans(item.value);
          setTransFocus(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  dropdown: {
    height: 55,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 4,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 5,
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  contentContainer: { paddingBottom: 40 },
  focusedBorder: {
    borderColor: 'blue',
    borderWidth: 1,
  },
  focusedLabel: { color: 'blue' },
});
