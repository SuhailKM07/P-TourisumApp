import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import BottomNavBarScreen from './BottomNavBarScreen';

const LandingScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: '100%' }}>
        <BottomNavBarScreen />
      </View>
    </SafeAreaView>
  );
};


export default LandingScreen;
