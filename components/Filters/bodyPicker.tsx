import { bodyStyleData } from '@/constants/MockData';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type BodyPickerProps = {
  bodyValue: string;
  setBody: (value: string) => void;
};

export function BodyPicker({ bodyValue, setBody }: BodyPickerProps) {
  const [isFocusBody, setBodyFocus] = useState(false);

  const renderLabel = () => {
    if (bodyValue || isFocusBody) {
      return (
        <Text style={[styles.label, isFocusBody && styles.focusedLabel]}>
          Body Style
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocusBody && styles.focusedBorder]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={bodyStyleData}
        maxHeight={300}
        labelField="value"
        valueField="value"
        value={bodyValue}
        onFocus={() => setBodyFocus(true)}
        onBlur={() => setBodyFocus(false)}
        onChange={(item) => {
          setBody(item.value);
          setBodyFocus(false);
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
    height: 50,
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
  focusedBorder: {
    borderColor: 'blue',
    borderWidth: 1,
  },
  focusedLabel: { color: 'blue' },
});
