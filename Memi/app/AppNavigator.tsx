import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  SplashScreen from '../components/SplashScreen';
//import  { OnboardingScreen } from '../components/OnboardingScreen';
//import WallpapersScreen from '../components/WallpapersScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Wallpapers: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }} // Hide header for splash screen (optional)
      />
      {/* <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ title: 'Onboarding' }} // You can customize this
      />
      <Stack.Screen
        name="Wallpapers"
        component={WallpapersScreen}
        options={{ title: 'Wallpapers' }} // You can customize this
      /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;