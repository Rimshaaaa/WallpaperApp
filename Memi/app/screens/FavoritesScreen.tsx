import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };

  const renderFavoriteItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.favoriteImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item}
        renderItem={renderFavoriteItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flex: 1,
    gap: 10,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    margin: 5,
  },
  favoriteImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default FavoritesScreen;