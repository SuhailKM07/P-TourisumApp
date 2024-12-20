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
      style={{ backgroundColor: 'white', width: '100%' }}
    >
      <View
        style={styles.SupMainCompStyles}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          console.log(options)

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,

            });
            console.log(event)
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
              <View
                style={{
                  margin: 1,
                  alignItems: 'center',
                  justifyContent: 'space-evenly'
                }}>
                <Icon
                  color={isFocused && route.name == 'Home' ? '#FFD700' :
                    isFocused && route.name == 'Profile' ? '#176ff2' :
                      isFocused && route.name == 'Booking' ? '#43a55f' :
                        isFocused && route.name == 'WishList' ? '#ef17d6' : ''
                  }
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
                <Text style={{
                  color: isFocused && route.name == 'Home' ? '#FFD700' :
                    isFocused && route.name == 'Profile' ? '#176ff2' :
                      isFocused && route.name == 'Booking' ? '#43a55f' :
                        isFocused && route.name == 'WishList' ? '#ef17d6' : ''
                  ,
                  fontFamily: 'Montserrat-SemiBold'
                }}>
                  {route.name}
                </Text>
              </View>
            </PlatformPressable>
          );
        })}
      </View>
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
    paddingHorizontal: '5%',
    borderRadius: 40,
    backgroundColor: 'white',
    elevation: 2
  }
});

export default MyTabs
