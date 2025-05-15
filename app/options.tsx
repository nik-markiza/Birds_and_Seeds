import { BodyPicker } from '@/components/Filters/bodyPicker';
import { EventPicker } from '@/components/Filters/eventPicker';
import { TransTypePicker } from '@/components/Filters/transTypePicker';
import { YearsPicker } from '@/components/Filters/yearsPicker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, PaperProvider } from 'react-native-paper';

import { optionsStore } from '../store/optionsStore';

const currentYear = new Date().getFullYear();
const fullYears = Array.from({ length: currentYear - 1955 + 1 }, (_, i) => ({
  value: `${1955 + i}`,
}));

export default function FiltersScreen() {
  const [bodyValue, setBody] = useState('All');
  const [eventValue, setEvents] = useState('Ending soon');
  const [transValue, setTrans] = useState('All');
  const [startYear, setStartYear] = useState(`${fullYears[0].value}`);
  const [endYear, setEndYear] = useState(`${fullYears.at(-1)?.value}`);

  const navigation = useNavigation();
  const { setOptions, options } = optionsStore();

  useEffect(() => {
    setBody(options.type);
    setEvents(options.auction);
    setTrans(options.transmission);
    setStartYear(options.startDate);
    setEndYear(options.endDate);
  }, []);

  const handleApply = () => {
    setOptions({
      startDate: `${startYear}`,
      endDate: `${endYear}`,
      transmission: transValue,
      type: bodyValue,
      auction: eventValue,
    });
    navigation.goBack();
  };

  const onGoBack = () => {
    navigation.goBack();
  };

  const renderBottomButtons = () => {
    return (
      <View style={styles.buttons}>
        <Button mode="outlined" onPress={onGoBack} style={styles.cancelButton}>
          <Text style={styles.btnTxt}>Cancel</Text>
        </Button>
        <Button
          mode="contained"
          onPress={handleApply}
          style={styles.applyButton}
        >
          <Text style={styles.btnTxt}>Apply</Text>
        </Button>
      </View>
    );
  };

  return (
    <PaperProvider>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <YearsPicker
          startYear={startYear}
          endYear={endYear}
          setStartYear={setStartYear}
          setEndYear={setEndYear}
        />
        <TransTypePicker transValue={transValue} setTrans={setTrans} />
        <BodyPicker bodyValue={bodyValue} setBody={setBody} />
        <EventPicker eventValue={eventValue} setEvents={setEvents} />
        {renderBottomButtons()}
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
  },
  buttons: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 12,
  },
  applyButton: {
    flex: 1,
    borderRadius: 12,
  },
  contentContainer: { paddingBottom: 40 },
  btnTxt: { fontSize: 18, fontWeight: '600' },
});
