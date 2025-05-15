import Birds from '@/constants/Birds';
import { AuctionTabType } from '@/types/enums';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import EmptyState from '@/components/ui/EmptyState';
import { optionsStore } from '../../store/optionsStore';

export default function HomeScreen() {
  const [selectedType, setSelected] = useState<AuctionTabType>(
    AuctionTabType.LIVE,
  );

  const router = useRouter();
  const { options } = optionsStore();

  const handleSelect = (type: AuctionTabType) => {
    setSelected(type);
  };

  const onHandleFilters = () => {
    router.push('/options');
  };

  const filteredBirds = useMemo(() => {
    return Birds.filter((bird) => {
      const matchesAuction = bird.auction === selectedType;

      const matchesYear =
        bird.year >= Number(options.startDate) &&
        bird.year <= Number(options.endDate);

      const matchesTransmission =
        options.transmission === 'All' ||
        bird.transmission === options.transmission;

      const matchesType = options.type === 'All' || bird.type === options.type;

      return (
        matchesAuction && matchesYear && matchesTransmission && matchesType
      );
    });
  }, [selectedType, options]);

  const ListHeader = () => {
    return (
      <>
        <View style={styles.tabContainer}>
          {Object.values(AuctionTabType).map((tab) => (
            <Pressable
              key={tab}
              style={[
                styles.auctionButton,
                selectedType === tab && styles.activeButton,
              ]}
              onPress={() => handleSelect(tab)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedType === tab && styles.activeText,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          onPress={onHandleFilters}
          style={({ pressed }) => [
            styles.filterContainer,
            pressed && styles.op5,
          ]}
        >
          <View style={styles.filterIcon}>
            <AntDesign name="filter" size={26} color="black" />
          </View>
          <View style={styles.filtersBar}>
            <View style={styles.filterBlock}>
              <Text style={styles.filterTitle}>
                {`${options.startDate} - ${options.endDate}`}
              </Text>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.filterBlock}>
              <Text
                style={styles.filterTitle}
              >{`${options.transmission === 'All' ? 'Transmission' : options.transmission}`}</Text>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.filterBlock}>
              <Text
                style={styles.filterTitle}
              >{`${options.type === 'All' ? 'Body Style' : options.type}`}</Text>
            </View>
          </View>
        </Pressable>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          ListHeaderComponent={ListHeader}
          data={filteredBirds}
          ListEmptyComponent={EmptyState}
          style={styles.flatlistStyle}
          contentContainerStyle={styles.contentStyle}
          keyExtractor={(item) => `${item.id} ${item.year}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text
                style={styles.text}
              >{`${item.year} | ${item.transmission} | ${item.type}`}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 5,
  },
  auctionButton: {
    flex: 1,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 10,
    backgroundColor: '#fcfdff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(128,128,128,0.2)',
  },
  activeButton: {
    backgroundColor: '#a29bfe',
  },
  buttonText: {
    fontSize: 16,
    color: '#2f3542',
    fontWeight: '700',
  },
  activeText: {
    color: 'white',
    fontWeight: '800',
  },
  separator: {
    height: 15,
    width: 0.7,
    backgroundColor: 'grey',
    alignSelf: 'center',
    borderRadius: 50,
    marginHorizontal: 5,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#353b48',
  },
  filterBlock: {
    minWidth: 40,
    height: 40,
    backgroundColor: '',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  filterContainer: {
    width: '100%',
    height: 35,
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  filterIcon: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  card: {
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  contentStyle: {
    paddingTop: 4,
    paddingBottom: 80,
    paddingHorizontal: 8,
  },
  filtersBar: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    marginRight: 10,
  },
  flatlistStyle: { width: '100%' },
  op5: { opacity: 0.5 },
});
