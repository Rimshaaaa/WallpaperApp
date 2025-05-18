import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface WallpaperItemProps {
  imageSrc: string;
  onPress: () => void;
}

export const WallpaperItem: React.FC<WallpaperItemProps> = ({ imageSrc, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <Image source={{ uri: imageSrc }} style={styles.wallpaperImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginBottom: 10,
  },
  wallpaperImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default WallpaperItem;