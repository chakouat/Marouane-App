import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreenComponent from './screens/SplashScreen';
import LoginRegister from './screens/LoginRegister';
import VerificationCode from './screens/VerificationCode';
import InformationGleaning from './screens/InformationGleaning';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // Simulate app loading time
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <SplashScreenComponent />;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="LoginRegister"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#FFFAEE' }
          }}
        >
          <Stack.Screen name="LoginRegister" component={LoginRegister} />
          <Stack.Screen name="VerificationCode" component={VerificationCode} />
          <Stack.Screen name="InformationGleaning" component={InformationGleaning} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" backgroundColor="#FFC244" />
    </SafeAreaProvider>
  );
}
