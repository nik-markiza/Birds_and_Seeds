import { auctionsData, communityData } from '@/constants/MockData';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const filteredAuctions = auctionsData.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredCommunity = communityData.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  const handleCancel = () => setQuery('');

  const renderSection = (title: string, data: string[]) => {
    if (data.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {data.map((item) => (
          <Text key={item} style={styles.resultItem}>
            {item}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            placeholder="Search..."
            value={query}
            onChangeText={setQuery}
            style={styles.input}
          />
        </View>
        <Pressable onPress={handleCancel} style={styles.cancelButton}>
          <Text
            style={[styles.cancelText, !query.length && styles.cancelDisabled]}
          >
            Cancel
          </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.resultsContainer}>
        {!query.length ? (
          <Text style={styles.hint}>
            Type something to search Auctions and Community...
          </Text>
        ) : (
          <>
            {filteredAuctions.length > 0 &&
              renderSection('Auctions', filteredAuctions)}
            {filteredCommunity.length > 0 &&
              renderSection('Community', filteredCommunity)}

            {filteredAuctions.length === 0 &&
              filteredCommunity.length === 0 && (
                <Text style={styles.noResults}>No results found</Text>
              )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 14,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  section: { marginVertical: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontSize: 16,
  },
  noResults: {
    marginTop: 6,
    textAlign: 'center',
    color: '#aaa',
    fontStyle: 'italic',
  },
  hint: {
    color: '#888',
    fontStyle: 'italic',
    marginTop: 6,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  icon: { marginRight: 8 },
  input: {
    flex: 1,
    fontSize: 16,
  },
  cancelButton: { marginLeft: 12 },
  cancelText: { fontSize: 18 },
  cancelDisabled: { color: 'grey' },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
});
