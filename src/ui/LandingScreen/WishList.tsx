import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { screenHeight, screenWidth } from '../Dimensions/DimensionsConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { Icon } from 'react-native-basic-elements';
import { useFocusEffect } from '@react-navigation/native';

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

const WishList = (): React.JSX.Element => {


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
                                    <View
                                        style={styles.FlatListMainCompStyle}>
                                        <ImageBackground
                                            source={{ uri: item.image }}
                                            resizeMode="cover"
                                            imageStyle={styles.MainBgImgStyles}>
                                            <View
                                                style={styles.MainBgImgSubCompStyle}>
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
                                                            onPress={() => {
                                                                setRemoveId(item.id)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </ImageBackground>

                                        <View style={{ marginTop: screenWidth * 2 }}>
                                            <Text style={{
                                                fontFamily: 'Montserrat-SemiBold',
                                                fontSize: screenWidth * 4,
                                            }}>
                                                {
                                                    item.title.length <= 18 ?
                                                        item.title :
                                                        item.title.slice(0, 12) + '...'
                                                }
                                            </Text>
                                            <Text style={{
                                                fontFamily: 'Montserrat-Medium',
                                                fontSize: screenWidth * 3,
                                            }}>
                                                {
                                                    item.description.length <= 163 ?
                                                        item.description :
                                                        item.description.slice(0, 163) + '...'
                                                }
                                            </Text>
                                        </View>
                                    </View>
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
        marginTop: 10
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
    MainBgImgStyles: {
        height: screenHeight * 15,
        width: screenWidth * 42,
        borderRadius: 22,
        backgroundColor: 'gray'
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
    }
})

export default WishList