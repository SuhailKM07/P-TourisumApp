import { ImageBackground, StyleSheet, ScrollView, Text, View, Image, FlatList, ImageProps, TouchableOpacity, Platform, UIManager, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { screenHeight, screenWidth } from '../Dimensions/DimensionsConfig'
import { Icon } from 'react-native-basic-elements'
import ButtonComp from '../../GlobalComp/ButtonComp'
import axios from 'axios'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { beginAsyncEvent } from 'react-native/Libraries/Performance/Systrace'
import { RootStackParamList } from '../../navigation/NavigationTypeCheck'

interface dataTypeChecker {
    id: string
    img: ImageProps
    title: string
}

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

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}



// Define the props for WelcomeScreen
interface DetailsScreenProp {
    navigation: NativeStackNavigationProp<RootStackParamList, 'DetailsScreen'>
    route: any
}

const DetailsScreen: React.FC<DetailsScreenProp> = ({ navigation, route }) => {

    console.log(route.params?.id)

    const [showDiscription, setShowDiscription] = useState(false)
    const [singleApiResponse, setSingleApiResponse] = useState<Welcome | undefined>()
    const [isLoadingData, setLoadingData] = useState(false);
    const [isLoading, setLoading] = useState(false);

    // const navigation = useNavigation<any>();


    const fetchData = async () => {
        try {
            setLoadingData(false)
            const response = await axios.get<Welcome | undefined>(`https://fakestoreapi.com/products/${route.params?.id}`);
            setSingleApiResponse(response.data);
            setLoadingData(true)
        } catch (error) {
            setLoading(true)
            console.error('Error fetching API data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const Data: dataTypeChecker[] = [
        {
            id: '1',
            img: require('../../assets/images/DetailsScreen/wifi.png'),
            title: '1 Heater'
        },
        {
            id: '2',
            img: require('../../assets/images/DetailsScreen/food.png'),
            title: 'Dinner'
        },
        {
            id: '3',
            img: require('../../assets/images/DetailsScreen/tub.png'),
            title: '1 Tub'
        },
        {
            id: '4',
            img: require('../../assets/images/DetailsScreen/pool.png'),
            title: 'Pool'
        }
    ]

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
    // fafbfd
    return (

        <View style={{ flex: 1, backgroundColor: "white" }}>

            {
                !isLoading ? <ScrollView>
                    <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                        <ShimmerPlaceholder
                            height={screenHeight * 50}
                            width={screenWidth * 90}
                            style={{ borderRadius: 38 }}
                            visible={isLoadingData}
                        >
                            <ImageBackground
                                source={{
                                    uri: singleApiResponse?.image
                                }}
                                resizeMode="cover"
                                imageStyle={styles.imageBackgroundStyles}>
                                <View
                                    style={styles.imageBackgroundInnerView}>

                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log("back is clicked")
                                            navigation.pop()
                                        }}
                                        style={styles.InnerBgImgTouchableOpacity}
                                    >

                                        <Icon
                                            name="chevron-left"
                                            type="Feather"
                                            size={30}
                                            color={'gray'}
                                            style={{ width: 30 }}
                                        />
                                    </TouchableOpacity>



                                    <View
                                        style={styles.HeartIconParentStyles}
                                    >
                                        <Icon
                                            name="heart"
                                            type="AntDesign"
                                            size={30}
                                            color={'#ec5655'}
                                            style={{ width: 30 }}
                                        />
                                    </View>
                                </View>
                            </ImageBackground>
                        </ShimmerPlaceholder>
                    </View>

                    <View style={styles.HeadderSectionMainStyles}>
                        <View style={{ width: screenWidth * 50, gap: 15 }}>
                            <ShimmerPlaceholder
                                height={screenHeight * 2}
                                width={screenWidth * 40}
                                style={{ borderRadius: 38 }}
                                visible={isLoadingData}
                            >
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: screenWidth * 5 }}
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                >
                                    {
                                        singleApiResponse?.title
                                    }
                                </Text>
                            </ShimmerPlaceholder>
                            <ShimmerPlaceholder
                                height={screenHeight * 2}
                                width={screenWidth * 20}
                                style={{ borderRadius: 38 }}
                                visible={isLoadingData}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name="star"
                                        type="AntDesign"
                                        size={15}
                                        color={'#c78637'}
                                        style={{ width: screenWidth * 5 }}
                                    />
                                    <Text
                                        style={styles.RatingsTextStyles}>
                                        {singleApiResponse?.rating?.rate} ({singleApiResponse?.rating?.count} Reviews)
                                    </Text>
                                </View>
                            </ShimmerPlaceholder>
                        </View>
                        <ShimmerPlaceholder
                            height={screenHeight * 2}
                            width={screenWidth * 20}
                            style={{ borderRadius: 38 }}
                            visible={isLoadingData}
                        >
                            <Text style={styles.ShowMapTextStyles}>
                                Show map
                            </Text>
                        </ShimmerPlaceholder>
                    </View>

                    <View style={{ gap: 7, marginTop: 10, paddingHorizontal: screenWidth * 7 }}>
                        <ShimmerPlaceholder
                            height={screenHeight * 2}
                            width={screenWidth * 80}
                            style={{ borderRadius: 38 }}
                            visible={isLoadingData}
                        />
                        <ShimmerPlaceholder
                            height={screenHeight * 2}
                            width={screenWidth * 80}
                            style={{ borderRadius: 38 }}
                            visible={isLoadingData}
                        />

                        {isLoadingData && <Text style={styles.DiscriptionStyles}>
                            {
                                singleApiResponse?.description?.length || 0 > 150 ?
                                    showDiscription ?
                                        singleApiResponse?.description
                                        :
                                        singleApiResponse?.description?.slice(0, 145) + '...'
                                    :
                                    singleApiResponse?.description
                            }
                        </Text>
                        }
                        {isLoadingData ? (singleApiResponse?.description?.length || 0) < 150 ?
                            ''
                            :
                            <TouchableOpacity
                                onPress={() => {
                                    setShowDiscription(!showDiscription)
                                }}
                            >
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={styles.ReadMoreTextStyles}>
                                        Read more
                                    </Text>
                                    <Icon
                                        name="chevron-down"
                                        type="Feather"
                                        size={17}
                                        color={'#176ff2'}
                                        style={{ width: screenWidth * 5 }}
                                    />
                                </View>
                            </TouchableOpacity>
                            : ''
                        }


                    </View>

                    <View style={styles.FacilitiesMainStyles} >

                        <ShimmerPlaceholder
                            height={screenHeight * 2}
                            width={screenWidth * 40}
                            style={{ marginTop: 20, borderRadius: 38 }}
                            visible={isLoadingData}
                        >

                            <Text style={styles.FacilitiesTextStyles}>
                                Facilities
                            </Text>

                        </ShimmerPlaceholder>

                        <FlatList

                            keyExtractor={(item) => item.id}
                            data={Data}
                            horizontal
                            contentContainerStyle={styles.FlatListContainerStyles}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }: { item: dataTypeChecker }) => (
                                <ShimmerPlaceholder
                                    width={screenWidth * 20}
                                    height={screenHeight * 12}
                                    style={{ borderRadius: 20 }}
                                    visible={isLoadingData}
                                >
                                    <View style={styles.FacilitiesImageContainerStyles}>
                                        <Image
                                            source={item.img}
                                            style={{ width: screenWidth * 8, height: screenWidth * 8 }}
                                            resizeMode='contain'
                                        />
                                        <Text style={{ fontSize: screenWidth * 2.5, textAlign: 'center', color: '#b8b8b8' }}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </ShimmerPlaceholder>
                            )}

                        />

                    </View>


                    <View style={styles.FooterSectionMainStyles}>



                        <View style={{
                            justifyContent: 'center',
                            gap: 2
                        }} >
                            <ShimmerPlaceholder
                                height={screenHeight * 2}
                                width={screenWidth * 19}
                                style={{ borderRadius: 38, }}
                                visible={isLoadingData}
                            >
                                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: screenWidth * 3.5, fontWeight: 'bold' }}>
                                    Price
                                </Text>
                            </ShimmerPlaceholder>
                            <ShimmerPlaceholder
                                height={screenHeight * 2}
                                width={screenWidth * 15}
                                style={{ borderRadius: 38 }}
                                visible={isLoadingData}
                            >
                                <Text style={styles.PriceNumTextStyles}>
                                    $ {Math.trunc(singleApiResponse?.price || 0)}
                                </Text>
                            </ShimmerPlaceholder>
                        </View>

                        <ShimmerPlaceholder
                            height={screenHeight * 7}
                            width={screenWidth * 45}
                            style={{ borderRadius: 20 }}
                            visible={isLoadingData}
                        >
                            <ButtonComp

                                buttonContent='Book Now'
                                surfixIcon={
                                    <Icon
                                        name='arrowright'
                                        type='AntDesign'
                                        color={'white'}
                                        size={25}
                                        style={{
                                            marginLeft: 10
                                        }}
                                    />
                                }

                                buttonStyle={styles.ButtonStyles}
                                buttonTextStyle={styles.ButtonTextStyles}

                            />
                        </ShimmerPlaceholder>
                    </View>


                </ScrollView >

                    :

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: screenWidth * 4 }}>
                            Something Went Wrong Try Again !
                        </Text>
                        <Pressable onPress={() => navigation.pop()}>
                            <Text style={{ color: '#186ff2' }}>
                                Go Back !
                            </Text>
                        </Pressable>
                    </View>

            }

        </View >
    )
}

const styles = StyleSheet.create({
    imageBackgroundStyles: {
        height: screenHeight * 50,
        width: screenWidth * 90,
        borderRadius: 38,
    },
    imageBackgroundInnerView: {
        height: screenHeight * 52.8,
        width: screenWidth * 90,
        position: 'relative',
    },
    InnerBgImgTouchableOpacity: {
        height: screenWidth * 10,
        width: screenWidth * 10,
        backgroundColor: '#f3f8fe',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        left: 20,
    },
    HeartIconParentStyles: {
        height: screenWidth * 11,
        width: screenWidth * 11,
        backgroundColor: '#f3f8fe',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 5,
        right: 10,
    },
    HeadderSectionMainStyles: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: screenHeight * 7,
        paddingHorizontal: screenWidth * 7,

    },
    RatingsTextStyles: {
        color: 'gray',
        fontFamily: 'Montserrat-Medium',
        fontSize: screenWidth * 2.9
    },
    ShowMapTextStyles: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#176ff2',
        width: screenWidth * 20,
        fontSize: screenWidth * 3,
        marginTop: 10,
    },
    DiscriptionStyles: {
        color: '#3A544F',
        fontSize: screenWidth * 3.5,
        lineHeight: screenHeight * 2.7
    },
    ReadMoreTextStyles: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#176ff2',
        width: screenWidth * 22,
        fontSize: screenWidth * 3.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    FacilitiesMainStyles: {
        height: screenHeight * 25,
        justifyContent: 'space-evenly',
        paddingHorizontal: screenWidth * 7,
        paddingVertical: screenHeight * 1,

    },
    FacilitiesTextStyles: {
        fontSize: screenWidth * 5,
        fontFamily: 'Montserrat-SemiBold',
    },
    FlatListContainerStyles: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 20
    },
    FacilitiesImageContainerStyles: {
        backgroundColor: '#eef2fb',
        width: screenWidth * 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingVertical: 15,
        gap: 10
    },
    FooterSectionMainStyles: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        paddingHorizontal: screenWidth * 7,
        justifyContent: 'space-between',
    },
    PriceNumTextStyles: {
        fontFamily: 'Montserrat-Bold',
        fontSize: screenWidth * 6,
        color: '#2dd7a4',
    },
    ButtonStyles: {
        backgroundColor: '#176ff2',
        width: screenWidth * 55,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: screenHeight * 8
    },
    ButtonTextStyles: {
        color: 'white',
        textAlign: 'center',
        fontSize: screenWidth * 3.5,
        fontFamily: 'Montserrat-Bold'
    }

})

export default DetailsScreen