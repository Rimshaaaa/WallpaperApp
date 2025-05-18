import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator ,Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a 10-second loading (splash duration)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeout); // Cleanup
  }, []);

  return (
    <ImageBackground
      source={require('./splash.jpeg')} // Replace with your background image URL or local image
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9999)']} // Gradient from transparent to black
        style={styles.gradient}
      ><View style={styles.contentContainer}>
      <Text style={styles.title}>Memi</Text>
      <Text style={styles.pinchlines}>
                Every Pixel Matters
      </Text>
    </View>
        {loading ? (
          <>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Loading...</Text>
          </>
        ) : (
          <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Onboarding')}>
            <Text style={styles.startButtonText}>Start Explore</Text>
          </TouchableOpacity>
          
        )}
      </LinearGradient>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width:400,
    height:900,
    justifyContent: 'flex-end', // Ensure content is at the bottom
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50, // Adjust to control the distance of the text from the bottom
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#ffffff',
  },
  startButton: {
    marginBottom: 30,
    marginTop:35,
    padding: 15,
    backgroundColor: 'orange',
    paddingHorizontal:80,
    borderCurve:'continuous',
    borderRadius: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing:0.5
  },
  contentContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
    gap:14,
  },
  title:{
    fontSize: 40,
    color:'white',
    fontWeight: 'bold',

  },
  pinchlines:{
    fontSize:15,
    letterSpacing:2,
    marginBottom:0,
    color:'white',
    fontWeight:"400"
  }
});

export default SplashScreen;