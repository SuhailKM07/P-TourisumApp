// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import WelcomeScreen from './src/ui/welcomeScreenUI/WelcomeScreen';
// import LandingScreen from './src/ui/LandingScreen/LandingScreen';
// import SearchSection from './src/ui/LandingScreen/SearchSection';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// function App(): React.JSX.Element {
//   const Stack = createNativeStackNavigator()
//   return (
//     // <WelcomeScreen />
//     // <LandingScreen/>
//     // <SearchSection />

//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="WelcomeScreen">
//         <Stack.Screen
//           name="WelcomeScreen"
//           component={WelcomeScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="LandingScreen"
//           component={LandingScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="SearchSection"
//           component={SearchSection}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// export default App;


import React from 'react';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/ui/welcomeScreenUI/WelcomeScreen';
import LandingScreen from './src/ui/LandingScreen/LandingScreen';
import SearchSection from './src/ui/LandingScreen/SearchSection';
import BottomNavBarScreen from './src/ui/LandingScreen/BottomNavBarScreen';
import MyTabs from './src/ui/LandingScreen/BottomNavBarScreen';
import DetailsScreen from './src/ui/LandingScreen/DetailsScreen';
import { RootStackParamList } from './src/navigation/NavigationTypeCheck';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"MyTabs"}
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"SearchSection"}
          component={SearchSection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"DetailsScreen"}
          component={DetailsScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
    // <ShimmerTest/>
  );
}
