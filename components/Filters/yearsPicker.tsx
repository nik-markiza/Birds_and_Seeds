import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const currentYear = new Date().getFullYear();
const fullYears = Array.from({ length: currentYear - 1955 + 1 }, (_, i) => ({
  value: `${1955 + i}`,
}));

type YearsPickerProps = {
  startYear: string;
  endYear: string;
  setStartYear: (value: string) => void;
  setEndYear: (value: string) => void;
};

export function YearsPicker({
  startYear,
  endYear,
  setStartYear,
  setEndYear,
}: YearsPickerProps) {
  const [isFocusStart, setStartFocus] = useState(false);
  const [isFocusEnd, setEndFocus] = useState(false);

  const startYears = useMemo(() => {
    return fullYears.filter((y) => Number(y.value) <= Number(endYear));
  }, [endYear]);

  const endYears = useMemo(() => {
    return fullYears.filter((y) => Number(y.value) >= Number(startYear));
  }, [startYear]);

  const renderFromLabel = () => {
    if (startYear || isFocusStart) {
      return (
        <Text style={[styles.label, isFocusStart && styles.focusedLabel]}>
          From
        </Text>
      );
    }
    return null;
  };

  const renderToLabel = () => {
    if (endYear || isFocusEnd) {
      return (
        <Text style={[styles.label, isFocusEnd && styles.focusedLabel]}>
          To
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerFrom}>
        <View style={styles.transmissionContainer}>
          {renderFromLabel()}
          <Dropdown
            style={[styles.dropdown, isFocusStart && styles.focusedBorder]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={startYears}
            maxHeight={300}
            labelField="value"
            valueField="value"
            value={startYear}
            onFocus={() => setStartFocus(true)}
            onBlur={() => setStartFocus(false)}
            onChange={(item) => {
              setStartYear(item.value);
              setStartFocus(false);
            }}
          />
        </View>
      </View>

      <View style={styles.containerTo}>
        <View style={styles.transmissionContainer}>
          {renderToLabel()}
          <Dropdown
            style={[styles.dropdown, isFocusEnd && styles.focusedBorder]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={endYears}
            maxHeight={300}
            labelField="value"
            valueField="value"
            value={endYear}
            onFocus={() => setEndFocus(true)}
            onBlur={() => setEndFocus(false)}
            onChange={(item) => {
              setEndYear(item.value);
              setEndFocus(false);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
  },
  containerFrom: {
    width: '30%',
    height: 70,
  },
  containerTo: {
    width: '30%',
    height: 70,
    marginLeft: 10,
  },
  transmissionContainer: {
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
  contentContainer: { paddingBottom: 40 },
  focusedBorder: {
    borderColor: 'blue',
    borderWidth: 1,
  },
  focusedLabel: { color: 'blue' },
});
