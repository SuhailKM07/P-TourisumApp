import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DropdownComponent from '../GlobalComp/DropdownComponent';
import {screenHeight, screenWidth, windowHeight} from '../Dimensions/DimensionsConfig';
import MyTabBar from './BottomNavBarScreen';
import MyTabs from './BottomNavBarScreen';
import BottomNavBarScreen from './BottomNavBarScreen';

const LandingScreen = () => {
  return (
    <SafeAreaView>
      <View style={{paddingHorizontal: screenWidth * 3 , backgroundColor : 'red' }}>
        <View
          style={{
            height: screenHeight * 15,
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{width: screenWidth * 30}}>
              <Text
                style={{
                  fontSize: screenWidth * 4,
                  fontFamily: 'Montserrat-Medium.ttf',
                }}>
                Explore
              </Text>
              <Text
                style={{
                  fontSize: screenWidth * 9,
                  fontFamily: 'Montserrat-Medium.ttf',
                }}>
                Aspen
              </Text>
            </View>

            <View>
              <DropdownComponent />
            </View>
          </View>
        </View>

        <View style={{height : screenHeight * 30}}>
          <BottomNavBarScreen />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default LandingScreen;
