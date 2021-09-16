import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppSettings } from './zapp/AppSettings';
import { Main } from './zapp/Main';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen  name="Settings" component={AppSettings} />
          <Stack.Screen  name="Spotlight" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>

  );
}

// https://filesamples.com/samples/video/mp4/sample_960x400_ocean_with_audio.mp4

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
