import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1900 + 1 },
  (_, i) => 1900 + i,
);

const stylesList = [
  'All',
  'Coupe',
  'Convertible',
  'Hatchback',
  'Sedan',
  'Crossover',
  'Truck',
  'Minivan',
  'Wagon',
];

const transmissions = ['All', 'Automatic', 'Manual'];

const auctionTypes = [
  'Ending soon',
  'Newly listed',
  'No reserve',
  'Lowest mileage',
  'Closest to me',
];

type PickerType =
  | 'yearFrom'
  | 'yearTo'
  | 'transmission'
  | 'style'
  | 'auctionType'
  | null;

export default function FiltersModal({ visible, onClose }: FilterModalProps) {
  const [yearFrom, setYearFrom] = useState(1990);
  const [yearTo, setYearTo] = useState(currentYear);
  const [transmission, setTransmission] = useState('All');
  const [style, setStyle] = useState('All');
  const [auctionType, setAuctionType] = useState('Ending soon');

  const [pickerVisible, setPickerVisible] = useState<PickerType>(null);

  const handleApply = () => {
    console.log({ yearFrom, yearTo, transmission, style, auctionType });
    onClose();
  };

  const getOptions = (type: PickerType) => {
    switch (type) {
      case 'yearFrom':
        return years;
      case 'yearTo':
        return years.filter((y) => y >= yearFrom);
      case 'transmission':
        return transmissions;
      case 'style':
        return stylesList;
      case 'auctionType':
        return auctionTypes;
      default:
        return [];
    }
  };

  const getCurrentValue = (type: PickerType) => {
    switch (type) {
      case 'yearFrom':
        return yearFrom;
      case 'yearTo':
        return yearTo;
      case 'transmission':
        return transmission;
      case 'style':
        return style;
      case 'auctionType':
        return auctionType;
    }
  };

  const setCurrentValue = (type: PickerType, value: any) => {
    switch (type) {
      case 'yearFrom':
        setYearFrom(value);
        break;
      case 'yearTo':
        setYearTo(value);
        break;
      case 'transmission':
        setTransmission(value);
        break;
      case 'style':
        setStyle(value);
        break;
      case 'auctionType':
        setAuctionType(value);
        break;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Filter Options</Text>

          {/* Buttons for each filter */}
          {(
            [
              ['Year From', 'yearFrom'],
              ['Year To', 'yearTo'],
              ['Transmission', 'transmission'],
              ['Style', 'style'],
              ['Auction Type', 'auctionType'],
            ] as [string, PickerType][]
          ).map(([label, key]) => (
            <Pressable
              key={key}
              style={styles.filterButton}
              onPress={() => setPickerVisible(key)}
            >
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{getCurrentValue(key)}</Text>
            </Pressable>
          ))}

          {/* Bottom buttons */}
          <View style={styles.buttons}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.btnText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.btnText}>Apply</Text>
            </Pressable>
          </View>
        </View>

        {/* Inner Picker modal */}
        <Modal
          visible={pickerVisible !== null}
          transparent
          animationType="slide"
          onRequestClose={() => setPickerVisible(null)}
        >
          <Pressable
            style={styles.pickerOverlay}
            onPress={() => setPickerVisible(null)}
          >
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={getCurrentValue(pickerVisible)}
                onValueChange={(val) => setCurrentValue(pickerVisible, val)}
              >
                {getOptions(pickerVisible).map((item) => (
                  <Picker.Item
                    label={String(item)}
                    value={item}
                    key={String(item)}
                  />
                ))}
              </Picker>
            </View>
          </Pressable>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-end', // оставляем прижим снизу
  },
  modal: {
    height: '100%', // почти весь экран
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterButton: {
    backgroundColor: '#f1f2f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#636e72',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#dfe6e9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#6c5ce7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: '#00000044',
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'ios' ? 40 : 0,
  },
});
