import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '../Dimensions/DimensionsConfig'
import ButtonComp from '../GlobalComp/ButtonComp'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/NavigationTypeCheck';


// Define the props for WelcomeScreen
type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'WelcomeScreen'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/images/welcomeScreenImg/welcomeBanner.png')} resizeMode="cover" style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 25 }}>
                    <View style={styles.hadderParentTextComp}>
                        <Text style={styles.headderText}>
                            Aspen
                        </Text>
                    </View>
                    <View style={styles.bottomParentComp}>

                        <View>
                            <Text style={[styles.bottomSubText, { fontSize: screenWidth * 5 }]}>
                                Plan your
                            </Text>
                            <Text style={[styles.bottomSubText, { fontSize: screenWidth * 8 }]}>
                                Luxurious
                            </Text>
                            <Text style={[styles.bottomSubText, { fontSize: screenWidth * 8 }]}>
                                Vacation
                            </Text>
                        </View>

                        <ButtonComp
                            buttonContent={'Explore'}
                            buttonStyle={styles.button}
                            buttonTextStyle={styles.buttonText}
                            onPushFun={() => {
                                navigation.navigate("MyTabs")
                            }}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    hadderParentTextComp: {
        height: screenHeight * 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headderText: {
        color: 'white',
        fontFamily: 'DancingScript-Bold',
        fontSize: screenWidth * 30,
        textAlign: 'center'
    },
    bottomSubText: {
        fontFamily: 'Montserrat-Medium',
        color: 'white',

    },

    bottomParentComp: {
        height: screenHeight * 32,
        gap: 20,
        width: '100%'
    },
    button: {
        backgroundColor: '#176FF1',
        height: screenHeight * 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonText: {
        color: 'white',
        fontSize: screenWidth * 3.5,
        fontWeight: 500
    }
})

export default WelcomeScreen