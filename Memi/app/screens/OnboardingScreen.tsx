import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const OnboardingScreen = ({navigation}:any) => {
  //const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Home'); // Navigate to HomeScreen
  };

  return (
    <ImageBackground
      source={require('./match.jpg')} // Your background image path
      style={styles.background}
      resizeMode="cover" // Ensures the image covers the entire background
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Discover Wallpapers with animations</Text>
          <Text style={styles.description}>
            Download and set wallpaper with 1000+ new HD designs!
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Let's Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    marginTop:50,
    marginBottom:50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
    borderRadius: 15, // Rounded corners
    margin: 20, // Margin around the overlay
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'orange', // Bright yellow color for the title
    marginBottom: 10,
    textAlign: 'center', // Center align title
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20, // Padding for description
  },
  button: {
    backgroundColor: 'orange', // Bright yellow button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
    elevation: 5, // Add shadow effect
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default OnboardingScreen;