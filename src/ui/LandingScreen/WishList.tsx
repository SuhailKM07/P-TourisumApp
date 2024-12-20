import { ActivityIndicator, FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { screenHeight, screenWidth } from '../Dimensions/DimensionsConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { Icon } from 'react-native-basic-elements';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BottomNavTypeChecking } from '../../navigation/NavigationTypeCheck';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
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

interface WishListProps {
    navigation: NativeStackNavigationProp<BottomNavTypeChecking, 'WishList'>
    route: any
}

const WishList: React.FC<WishListProps> = ({ navigation }) => {


    const [apiResponse, setApiResponse] = useState<Welcome[]>([]);
    const [getWisListAllData, setWisListAllData] = useState<Welcome[] | null>(null);
    const [removeId, setRemoveId] = useState<number | null>();
    const [isNoData, setNoData] = useState<boolean>(false)


    const fetchData = async () => {
        try {
            setNoData(true)
            const response = await axios.get<Welcome[]>('https://fakestoreapi.com/products');
            setApiResponse(response.data);
            setNoData(false)
        } catch (error) {
            setNoData(false)
            console.error('Error fetching API data:', error);
        }
    };

    const getWishListId = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            if (keys.length > 0) {
                const locStorageData = await AsyncStorage.multiGet(keys);
                const firstKeyData = locStorageData[0]?.[1] || null;
                wishListAllData(firstKeyData);
            } else {
                console.log('No keys found in AsyncStorage.');
            }
        } catch (error) {
            console.error('Error retrieving wishlist IDs from AsyncStorage:', error);
        }
    };

    const wishListAllData = (storedIds: string | null) => {
        if (!storedIds) {
            console.log('No stored IDs to match with API data.');
            return;
        }

        const response = apiResponse?.filter((element) =>
            storedIds.includes(element.id.toString())
        );
        setWisListAllData(response);
    };

    const removeFromVishList = async () => {
        try {

            let wishListIds: string[] = [];
            const unParsArray = await AsyncStorage.getItem('WishListid');

            if (unParsArray) {
                try {



                    const parsArray: string[] = JSON.parse(unParsArray);
                    wishListIds = [...parsArray];

                    wishListIds?.map((element, index) => {
                        if (element == removeId?.toString()) {
                            wishListIds.splice(index, 1)
                        }
                    })


                } catch (parseError) {
                    console.error('Error parsing stored wishlist:', parseError);
                }
            }

            const pars = JSON.stringify(wishListIds);
            await AsyncStorage.setItem('WishListid', pars);
            console.log("clicked delete")
            fetchData();
            Snackbar.show({
                text: 'Item Removed Successfully from Wishlist !',
                duration: Snackbar.LENGTH_LONG,
                textColor: 'red'
            });
            setRemoveId(-1)
            const keys = await AsyncStorage.getItem('WishListid');
            console.log(keys)


        } catch (error) {
            console.error('Error in registerWishlistItem:', error);
        }
    };


    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (apiResponse.length > 0) {
            getWishListId();
        }
    }, [apiResponse]);

    useEffect(() => {
        removeFromVishList()
    }, [removeId])


    return (
        <View style={styles.SupMainCompStyle} >
            {
                getWisListAllData && getWisListAllData.length > 0 ?
                    <View style={styles.MainCompStyle}>

                        <View
                            style={styles.WelcomeWishListCompStyle}>
                            <View>
                                <Text
                                    style={styles.WelcomeWishListTextStyle}>
                                    Welcome to WishList
                                </Text>
                            </View>

                        </View>


                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={getWisListAllData}
                            numColumns={2}
                            key={2}
                            keyExtractor={(item: Welcome) => {
                                return item.id.toString()
                            }}
                            contentContainerStyle={{ gap: 20 }}
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
                                                            setRemoveId(item.id)
                                                        }}
                                                    >
                                                        <View
                                                            style={{ backgroundColor: 'white', padding: 3, borderRadius: 50 }}>
                                                            <View
                                                                style={styles.HeartBrokenCompStyles}
                                                            >
                                                                <Icon
                                                                    name="heart-broken"
                                                                    type="FontAwesome5"
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
                    isNoData ? <View
                        style={styles.ActivityIndicatorMainCompStyle}>

                        <ActivityIndicator size="large" />
                    </View> :
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: screenWidth * 5 }}>
                                No Data Found ?
                            </Text>
                        </View>
            }


        </View>
    )
}

const styles = StyleSheet.create({
    SupMainCompStyle: {
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor : 'white'
    },
    MainCompStyle: {
        flex: 1,
        gap: 10,
        paddingBottom: 10,
    },
    WelcomeWishListCompStyle: {
        justifyContent: 'center',
    },
    WelcomeWishListTextStyle: {
        fontSize: screenWidth * 5,
        fontFamily: 'Montserrat-SemiBold',
        paddingHorizontal: screenWidth * 3,
    },
    FlatListMainCompStyle: {
        backgroundColor: '#f8f8f8',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: screenWidth * 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: screenWidth * 2,
        borderRadius: 25
    },

    MainBgImgSubCompStyle: {
        height: screenHeight * 15,
        width: screenWidth * 42,
        position: 'relative',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        right: 10,
    },
    HeartBrokenCompStyles: {
        height: screenWidth * 7,
        width: screenWidth * 7,
        backgroundColor: '#f3f8fe',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ActivityIndicatorMainCompStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.3,
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
})

export default WishList