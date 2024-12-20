import { StyleSheet, Text, View, TextInput, ImageBackground, FlatList, ActivityIndicator, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { screenHeight, screenWidth, windowHeight } from '../Dimensions/DimensionsConfig';
import { Icon } from 'react-native-basic-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/NavigationTypeCheck';
import Snackbar from 'react-native-snackbar';


export interface Welcome {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

export interface Rating {
    rate: number;
    count: number;
}


interface SearchSectionScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'SearchSection'>
}


const SearchSection: React.FC<SearchSectionScreenProps> = ({ navigation }) => {

    const [apiResponse, setApiResponse] = useState<Welcome[]>([]);
    const [filterSearch, setFilterSearch] = useState('')

    const fetchData = async () => {
        try {
            const response = await axios.get<Welcome[]>('https://fakestoreapi.com/products');
            setApiResponse(response.data);
        } catch (error) {
            console.error('Error fetching API data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filterBySearch = () => {
            let filteredData = apiResponse.filter((data, index) => {
                if (filterSearch.length > 0) {
                    return data.title.toLowerCase().includes(filterSearch.toLowerCase())
                }
                else {
                    fetchData()
                }
            })
            setApiResponse(filteredData)
        }
        filterBySearch()
    }, [filterSearch])

    const registerWishlistItem = async (id: number) => {
        try {

            let wishListIds: string[] = [];
            const unParsArray = await AsyncStorage.getItem('WishListid');

            if (unParsArray) {
                try {

                    const parsArray: string[] = JSON.parse(unParsArray);
                    wishListIds = [...parsArray];
                } catch (parseError) {
                    console.error('Error parsing stored wishlist:', parseError);
                }
            }

            wishListIds.push(id.toString());

            const pars = JSON.stringify(wishListIds);
            await AsyncStorage.setItem('WishListid', pars);

            Snackbar.show({
                text: 'Item Added Successfully in Wishlist !',
                duration: Snackbar.LENGTH_LONG,
                textColor  : 'green'
            });

        } catch (error) {
            console.error('Error in registerWishlistItem:', error);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                height: screenHeight * 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}>
                <View style={{
                    height: screenHeight * 7,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: 25,
                }}>

                    <Pressable
                        onPress={() => navigation.pop()}
                        style={({ pressed }) => [
                            {
                                opacity: pressed ? 0.9 : 1,
                                width: screenWidth * 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#eff4fc',
                                height: screenHeight * 7,
                                // borderTopLeftRadius: 25,
                                // borderBottomLeftRadius: 25,
                            }
                        ]}>
                        <Icon
                            name='chevron-left'
                            type='FontAwesome'
                            color={'black'}
                        />
                    </Pressable>

                    <View style={styles.searchBar}>
                        <Icon
                            name="search1"
                            type="AntDesign"
                            size={23}
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            value={filterSearch}
                            placeholder="Find things to do"
                            onChangeText={text => setFilterSearch(text)}
                        />
                    </View>
                </View>
            </View>

            {/* Result Section Code */}
            {
                apiResponse.length > 0 ?
                    <View style={{
                        flex: 1,
                        gap: 10,
                    }}>

                        <View
                            style={{ justifyContent: 'center' }}>
                            <View>
                                <Text
                                    style={styles.SearchTextStyles}>
                                    Result
                                </Text>
                            </View>

                        </View>


                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={apiResponse}
                            numColumns={2}
                            key={2}
                            keyExtractor={(item: Welcome) => {
                                return item.id.toString()
                            }}
                            contentContainerStyle={{
                                gap: 20,
                                paddingBottom: 20
                            }}
                            renderItem={({ item }: { item: Welcome }) => {
                                return (
                                    <Pressable
                                        style={({ pressed }) => [
                                            {
                                                opacity: pressed ? 0.9 : 1,
                                            }
                                        ]}
                                        onPress={() => {
                                            navigation.navigate('DetailsScreen', { id: item.id })
                                        }}
                                    >
                                        <View
                                            style={styles.FlatListMainComp}>
                                            <ImageBackground
                                                source={{ uri: item.image }}
                                                resizeMode="cover"
                                                imageStyle={styles.MainBgImgStyles}>
                                                <View
                                                    style={styles.MainBgImgSubCompStyles}>
                                                    <Pressable
                                                        onPress={() => {
                                                            registerWishlistItem(item.id)
                                                        }}
                                                    >
                                                        <View
                                                            style={{ backgroundColor: 'white', padding: 3, borderRadius: 50 }}>
                                                            <View
                                                                style={styles.HeartIconCompStyle}
                                                            >
                                                                <Icon
                                                                    name="heart"
                                                                    type="AntDesign"
                                                                    size={15}
                                                                    color={'#ec5655'}
                                                                    style={{ width: 15 }}

                                                                />
                                                            </View>
                                                        </View>
                                                    </Pressable>
                                                </View>
                                            </ImageBackground>

                                            <View style={{ marginTop: screenWidth * 2 }}>
                                                <Text
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                    style={{
                                                        fontFamily: 'Montserrat-SemiBold',
                                                        fontSize: screenWidth * 4,
                                                        // backgroundColor: 'yellow'
                                                    }}>
                                                    {
                                                        item.title
                                                    }
                                                </Text>
                                                <Text
                                                    numberOfLines={5}
                                                    ellipsizeMode='tail'
                                                    style={{
                                                        fontFamily: 'Montserrat-Medium',
                                                        fontSize: screenWidth * 3,
                                                        // backgroundColor: 'gray'
                                                    }}>
                                                    {
                                                        item.description
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                )
                            }}
                        />

                    </View>
                    :
                    <View
                        style={styles.ActivityIndicatorCompStyles}>
                        <ActivityIndicator size="large" />
                    </View>
            }


        </View>


    )
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f8fe',
        // borderTopRightRadius: 25,
        // borderBottomRightRadius: 25,
        paddingHorizontal: 10,
        height: screenHeight * 7,
        width: '80%'
    },
    icon: {
        marginLeft: 10,
        marginRight: 7,
        color: '#888',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    SearchTextStyles: {
        fontSize: screenWidth * 5,
        fontFamily: 'Montserrat-SemiBold',
        paddingHorizontal: screenWidth * 3,
    },
    FlatListMainComp: {
        backgroundColor: '#f8f8f8',
        // backgroundColor : 'red',
        shadowColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: screenWidth * 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: screenWidth * 2,
        borderRadius: 25,
        height: screenHeight * 35
    },
    MainBgImgStyles: {
        height: screenHeight * 15,
        width: screenWidth * 42,
        borderRadius: 22,
        backgroundColor: 'gray'
    },
    MainBgImgSubCompStyles: {
        height: screenHeight * 15,
        width: screenWidth * 42,
        position: 'relative',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        // top: 12,
        right: 10,
        // backgroundColor : 'green'
    },
    HeartIconCompStyle: {
        height: screenWidth * 7,
        width: screenWidth * 7,
        backgroundColor: '#f3f8fe',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ActivityIndicatorCompStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.3,
    }
})

export default SearchSection