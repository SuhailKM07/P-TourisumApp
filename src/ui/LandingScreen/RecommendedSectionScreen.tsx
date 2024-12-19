import { Animated, FlatList, ImageBackground, ImageBackgroundProps, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { screenHeight, screenWidth } from '../Dimensions/DimensionsConfig';
import axios from 'axios';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/NavigationTypeCheck';

interface dataTypeCheck {
  id: string
  duration: string
  title: string
  description: string
  img: ImageBackgroundProps

}
// const RecommendedSectionScreen: React.FC<RecommendadionScreenProps> = ({ navigation }) => {
const RecommendedSectionScreen: React.FC = () => {


  const Data = [
    {
      id: 'LD1',
      duration: '4N/5D',
      title: 'Explore Aspen',
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.`,
      img: require('../../assets/images/RecommendedSectionScreenImg/One.jpg')
    },
    {
      id: 'LD2',
      duration: '3D',
      title: 'Explore India',
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.`,
      img: require('../../assets/images/RecommendedSectionScreenImg/Two.jpg')
    },
    {
      id: 'LD3',
      duration: '3N/4D',
      title: 'Explore USA',
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.`,
      img: require('../../assets/images/RecommendedSectionScreenImg/Three.jpg')
    },
    {
      id: 'LD4',
      duration: '2N/3D',
      title: 'Explore Dubai',
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.`,
      img: require('../../assets/images/RecommendedSectionScreenImg/Four.jpg')
    },
  ]
  

  return (
    <View>

      <View
        style={styles.RecommendedSectionMainCompStyle}>
        <View>
          <Text
            style={styles.RecommendedSectionTextStyle}>
            Recommended
          </Text>
        </View>



        <FlatList
          showsHorizontalScrollIndicator={false}
          data={Data}
          horizontal
          keyExtractor={(item) => {
            return item.id
          }}
          contentContainerStyle={styles.FlatListCompStyle}
          renderItem={({ item }: { item: dataTypeCheck }) => {
            return (

              <View>
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.9 : 1,
                    }
                  ]}
                >
                  <View
                    style={styles.MainBgImgCompStyles}>
                    <ImageBackground
                      source={item.img}
                      resizeMode="cover"
                      imageStyle={styles.MainBgImgStyle}>
                      <View
                        style={styles.SubMainBgImgCompStyle}>
                        <View
                          style={styles.DurationMainCompStyle}>
                          <Text
                            style={styles.DurationTextStyle}>
                            {item.duration}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>

                    <View style={{ marginTop: screenWidth * 2 }}>
                      <Text style={styles.TitleTextStyle}>
                        {item.title}
                      </Text>
                      <Text style={styles.DiscriptionTextStyle}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            )
          }}

        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  RecommendedSectionMainCompStyle: {
    minHeight: screenHeight * 44,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 20,
    // backgroundColor: 'green'
  },
  RecommendedSectionTextStyle: {
    fontSize: screenWidth * 5,
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: screenWidth * 5,
    // backgroundColor : 'red'
  },
  FlatListCompStyle: {
    gap: 20,
    alignItems: 'center',
    paddingLeft: screenWidth * 5,
    paddingRight: screenWidth * 5,
    height: screenHeight * 38,
  },
  MainBgImgCompStyles: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: screenWidth * 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23
  },
  MainBgImgStyle: {
    height: screenHeight * 15,
    width: screenWidth * 45,
    borderRadius: 22,
  },
  SubMainBgImgCompStyle: {
    height: screenHeight * 15,
    width: screenWidth * 45,
    position: 'relative',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    top: 12,
    right: 10,
  },
  DurationMainCompStyle: {
    backgroundColor: 'white',
    padding: 3,
    borderRadius: 50
  },
  DurationTextStyle: {
    // textAlign: 'right',
    backgroundColor: '#395551',
    width: screenWidth * 14,
    fontSize: screenWidth * 3,
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    borderRadius: 50,
  },
  TitleTextStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: screenWidth * 4
  },
  DiscriptionTextStyle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: screenWidth * 3
  }
});

export default RecommendedSectionScreen

