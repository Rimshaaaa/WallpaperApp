import 'react-native-gesture-handler'; // Important for navigation
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To store onboarding status
import FavoritesScreen from './screens/FavoritesScreen';
import {View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons'

const Stack = createNativeStackNavigator();

const App = () => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    // Check if onboarding was completed before
    const checkOnboarding = async () => {
      const completed = await AsyncStorage.getItem('onboardingComplete');
      setOnboardingComplete(!!completed); // Set to true if onboarding is completed
    };

    checkOnboarding();
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash Screen */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // Hide the header for splash
        />

        {/* Onboarding Screen */}
        {!onboardingComplete && (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }} // Hide the header for onboarding
          />
        )}

        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title:'Memi',headerShown: true, headerLeft: () => <></>
        }} // Hide the header for home screen
        />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{title:'Favorites'}}/>
      </Stack.Navigator>
       
    </NavigationContainer>
  );
};

export default App;