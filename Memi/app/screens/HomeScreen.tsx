import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { fetchWallpapers } from './UsePexels';
import { WallpaperItem } from './WallpaperItem';
import { ResizeMode, Video } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the favorite icon
import AsyncStorage from '@react-native-async-storage/async-storage'; // For saving favorites locally

type Wallpaper = {
  id: string;
  src: {
    portrait: string;
    video?: string;
  };
};

const categories = [
  'Art',
  'Animals',
  'Greenery',
  'Animations',
  'Waterfall',
  'Cityscapes',
  'Abstract',
  'Technology',
  'Mountains',
  'Space',
  'Underwater',
  'Minimal',
  'Cars',
];

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Art');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]); // Store favorite wallpapers

  useEffect(() => {
    loadWallpapers(selectedCategory);
    loadFavorites(); // Load favorites from AsyncStorage
  }, [selectedCategory]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('FavoritesScreen')}
          style={styles.headerIconContainer}
        >
          <Icon name="heart" size={30} color="red" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const loadWallpapers = async (category: string) => {
    setLoading(true);
    try {
      const data = await fetchWallpapers(category);
      setWallpapers(data);
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
      Alert.alert('Error', 'Failed to load wallpapers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  const handleSearch = async () => {
    if (searchTerm.length > 0) {
      setLoading(true);
      try {
        const data = await fetchWallpapers(searchTerm);
        setWallpapers(data);
      } catch (error) {
        console.error('Error searching wallpapers:', error);
        Alert.alert('Error', 'Failed to search wallpapers. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleFavorite = async (imageUri: string) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(imageUri)) {
      updatedFavorites = updatedFavorites.filter((uri) => uri !== imageUri);
    } else {
      updatedFavorites.push(imageUri);
    }

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const downloadWallpaper = async (imageUri: string) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please allow access to set wallpapers.');
        return;
      }

      const fileUri = FileSystem.cacheDirectory + 'wallpaper.jpg';
      const { uri } = await FileSystem.downloadAsync(imageUri, fileUri);
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Wallpapers', asset, false);
      Alert.alert('Success', 'Wallpaper set successfully!');
    } catch (error) {
      console.error('Error setting wallpaper:', error);
      Alert.alert('Error', 'Failed to set wallpaper');
    }
  };

  const openModal = (imageUri: string) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderWallpaperItem = ({ item }: { item: Wallpaper }) => {
    if (selectedCategory === 'Animations' && item.src.video) {
      return (
        <Video
          source={{ uri: item.src.video }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
        />
      );
    } else {
      return (
        <WallpaperItem
          imageSrc={item.src.portrait}
          onPress={() => openModal(item.src.portrait)}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Wallpapers..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
      />

      <ScrollView
        horizontal
        contentContainerStyle={styles.categoryContainer}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={wallpapers}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={renderWallpaperItem}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            )}
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => {
                if (selectedImage) {
                  downloadWallpaper(selectedImage);
                }
                closeModal();
              }}
            >
              <Text style={styles.downloadButtonText}>Set Wallpaper</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoriteIconContainer}
              onPress={() => {
                if (selectedImage) {
                  toggleFavorite(selectedImage);
                }
              }}
            >
              <Icon
                name={favorites.includes(selectedImage || '') ? 'heart' : 'heart-outline'}
                size={30}
                color={favorites.includes(selectedImage || '') ? 'red' : 'gray'}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    marginBottom: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    marginBottom: 10,
  },
  categoryButton: {
    width: 90,
    height: 40,
    backgroundColor: '#ffeb3b',//#ffeb3b
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  selectedCategory: {
    backgroundColor: '#fdd835',
  },
  categoryText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flex: 1,
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  downloadButton: {
    backgroundColor: '#ffeb3b',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  downloadButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButton: {
    backgroundColor: '#ff5252',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerIconContainer: {
    paddingLeft: 10,
  },
  video: {
    width: '50%',
    height: 300, // Adjust the height as necessary
    marginBottom: 10,
    borderRadius:10,
  },
});

export default HomeScreen;