import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { Icon } from 'react-native-basic-elements';
import { screenHeight } from '../Dimensions/DimensionsConfig';
import HomeScreen from './HomeScreen';
import WishList from './WishList';
import { BottomNavTypeChecking } from '../../navigation/NavigationTypeCheck';


const Tab = createBottomTabNavigator<BottomNavTypeChecking>();


function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {

  const { colors } = useTheme();

  return (
    <View
      style={styles.SupMainCompStyles}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.PlatformPressableMainStyles}
            key={index}>
            <Text
              style={{
                color: isFocused ? colors.primary : colors.text,
                margin: 1,
                textAlign: 'center',
              }}>
              <Icon
                color={isFocused ? colors.primary : colors.text}
                name={
                  route.name === 'Home'
                    ? 'home'
                    : route.name === 'Profile'
                      ? 'user'
                      : route.name === 'Booking'
                        ? 'book'
                        : route.name === 'WishList'
                          ? 'hearto'
                          : 'info-circle'
                }
                type="AntDesign"
                size={23}
              />
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

function BookingScreen() {
  return (
    <View style={styles.screen}>
      <Text> Booking Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const MyTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="WishList"
        component={WishList}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />


    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  PlatformPressableMainStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: isFocused ? 'gray' : 'white',
    height: screenHeight * 9,
  },
  SupMainCompStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: 'white',
    paddingHorizontal: '10%',
    borderRadius: 40,
  }
});

export default MyTabs
