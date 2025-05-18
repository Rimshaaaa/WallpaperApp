import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, ActivityIndicator, View } from 'react-native';

interface WallpaperItemProps {
  imageSrc: string;
  onPress: () => void;
}

export const WallpaperItem: React.FC<WallpaperItemProps> = ({ imageSrc, onPress }) => {
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(false); // Track loading errors

  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      {loading && !error && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
      <Image
        source={{ uri: imageSrc }}
        style={styles.wallpaperImage}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        resizeMode="cover"
      />
      {error && (
        <View style={styles.errorContainer}>
          <h1>Failed to load image</h1>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden', // Ensure the image or loading spinner stays within bounds
    position: 'relative', // Positioning for loading spinner
  },
  wallpaperImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)', // Slightly transparent background while loading
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,0,0,0.3)', // Red tint to indicate error
  },
  errorText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WallpaperItem;