import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Icon, StatusBar } from 'react-native-basic-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import PopularSectionScreen from './PopularSectionScreen';

//-----------------------------
import DropdownComponent from '../../GlobalComp/DropdownComponent';
import {
  screenHeight,
  screenWidth,
} from '../Dimensions/DimensionsConfig';
import RecommendedSectionScreen from './RecommendedSectionScreen';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomNavTypeChecking } from '../../navigation/NavigationTypeCheck';



interface renderItemUi {
  item: {
    id: String,
    title: String
  }
  onPress: () => void

  backgroundColor: ViewStyle
  textColor: TextStyle
}
interface DataItem {
  id: string,
  title: string
}

// interface BuyUsedCars {
//   navigation: StackNavigationProp<RootStackParamList, 'BuySellCars'>;
//   route: any;
// }
// FC<BuyUsedCars> = ({navigation, route})



// Define the props for WelcomeScreen
interface HomeScreenProps {
  navigation: NativeStackNavigationProp<BottomNavTypeChecking, 'Home'>
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Location',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Hotels',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Food',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      title: 'Adventure',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d776',
      title: 'Tourism',
    },
  ];

  const [selectedId, setSelectedId] = useState<String | null>('bd7acbea-c1b1-46c2-aed5-3ad53abb28ba');

  const renderItem = ({ item }: { item: DataItem }) => {
    let id = item?.id
    console.log(id)
    const bgColor = id === selectedId ? '#f3f8fe' : 'white';
    const color = id === selectedId ? '#196eee' : '#d2d2d2';

    return (

      <TouchableOpacity
        onPress={() => setSelectedId(item?.id)}
        style={[styles.NavItemMainCon, { backgroundColor: bgColor }]}>
        <Text style={[styles.NavItemText, { color }]}>{item.title}</Text>
      </TouchableOpacity>
    );

  };
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor="white"
      />
      <ScrollView
      >
        <View style={styles.container}>
          {/* Comp 1 */}

          <View
            style={styles.HeadderMainCompStyles}>
            <View
              style={styles.HeadderMainSubCompStyles}>
              <View style={{ width: screenWidth * 30 }}>
                <Text
                  style={styles.LogoFirstLineStyle}>
                  Explore
                </Text>
                <Text
                  style={styles.LogoSecondLineStyle}>
                  Aspen
                </Text>
              </View>

              <View>
                <DropdownComponent />
              </View>
            </View>
          </View>

          {/* Comp 1 end */}

          <View style={{ paddingHorizontal: screenWidth * 5 }}>
            <View style={styles.searchBar}
            >
              <Icon
                name="search"
                type="Feather"
                size={23}
                style={styles.SearchIcon}
                color={'#b8b8b8'}
              />
              <TextInput
                style={styles.SearchInput}
                value={search}
                placeholder="Find things to do"
                placeholderTextColor={'#b8b8b8'}
                onChangeText={text => setSearch(text)}
                onPress={() => {
                  navigation.navigate('SearchSection')
                }}

              />
            </View>
          </View>

          <View
            style={{
              height: screenHeight * 12,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
              paddingHorizontal: screenWidth * 5,
            }}>
            <View
              style={{
                height: screenHeight * 10,
              }}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
              />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <PopularSectionScreen />
          </View>

          <View style={{ flex: 1 }}>
            <RecommendedSectionScreen />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f8fe',
    borderRadius: 25,
    paddingHorizontal: 10,
    width: '100%',
    height: screenHeight * 7,
  },
  SearchIcon: {
    marginLeft: 10,
    marginRight: 7,
    color: '#888',
  },
  SearchInput: {
    flex: 1,
    fontSize: screenWidth * 3,
    color: '#333',
  },
  NavItemMainCon: {
    // marginRight: screenWidth * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: screenHeight * 6,
    paddingHorizontal: screenWidth * 3.5,
  },
  NavItemText: {
    fontSize: screenWidth * 3.1,
    fontFamily: 'Montserrat-Bold',
  },
  HeadderMainCompStyles: {
    height: screenHeight * 15,
    justifyContent: 'center',
    paddingHorizontal: screenWidth * 5,
  },
  HeadderMainSubCompStyles: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  LogoFirstLineStyle: {
    fontSize: screenWidth * 3.4,
    fontFamily: 'Montserrat-Medium',
  },
  LogoSecondLineStyle: {
    fontSize: screenWidth * 9,
    fontFamily: 'Montserrat-Medium',
  }
});

export default HomeScreen