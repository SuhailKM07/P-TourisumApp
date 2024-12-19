import { View, Text, ScrollView, FlatList, ImageBackground, ImageBackgroundProps, StyleSheet } from 'react-native';
import React from 'react';
import { screenHeight, screenWidth } from '../Dimensions/DimensionsConfig';
import { Icon } from 'react-native-basic-elements';

interface DataStruct {
  id: string
  title: string
  rating: string
  img: ImageBackgroundProps
}

export default function PopularSectionScreen(): React.JSX.Element {

  const Data = [
    {
      id: '1',
      title: 'Alley Palace',
      rating: '4.1',
      img: require('../../assets/images/PopularSectionScreenImg/One.png')
    },
    {
      id: '2',
      title: 'Suhail Palace',
      rating: '5',
      img: require('../../assets/images/PopularSectionScreenImg/Two.jpg')
    },
    {
      id: '3',
      title: 'Salman Palace',
      rating: '5',
      img: require('../../assets/images/PopularSectionScreenImg/Three.jpg')
    },
    {
      id: '4',
      title: 'Saahid Palace',
      rating: '5',
      img: require('../../assets/images/PopularSectionScreenImg/Four.jpg')
    }
  ]

  return (
    <View>
      <View
        style={styles.PopularHeadderMainComp}>
        <Text
          style={styles.PopularTextStyle}>
          Popular
        </Text>
        <Text
          style={styles.SeeallTextStyle}>
          See all
        </Text>
      </View>

      <View>

        <FlatList
          data={Data}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.FlatListContainerStyle}
          renderItem={
            (({ item }: { item: DataStruct }) => {

              return (<ImageBackground
                source={item.img}
                resizeMode="cover"
                imageStyle={styles.MainBgImgStyle}>
                <View
                  style={styles.BgImgSubMainCon}>
                  <View style={{ gap: 10 }}>
                    <Text
                      style={styles.TitleTextStyle}>
                      {item.title}
                    </Text>
                    <View
                      style={styles.RatingConStyle}>
                      <Icon
                        name="star"
                        type="AntDesign"
                        size={13}
                        color={'gold'}
                      />
                      <Text
                        style={styles.RatingTextStyle}>
                        {item.rating}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={styles.HeartConStyles}>
                    <Icon
                      name="heart"
                      type="AntDesign"
                      size={15}
                      color={'#ec5655'}
                      style={{ width: 15 }}
                    />
                  </View>
                </View>
              </ImageBackground>
              )
            })
          }
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  PopularHeadderMainComp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 5
  },
  PopularTextStyle: {
    fontSize: screenWidth * 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  SeeallTextStyle: {
    fontSize: screenWidth * 3,
    fontFamily: 'Montserrat-SemiBold',
    color: '#186ef0',
  },
  FlatListContainerStyle: {
    gap: 20,
    height: screenHeight * 32,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: screenWidth * 5,
    paddingRight: screenWidth * 5,
  },
  MainBgImgStyle: {
    height: screenHeight * 30,
    width: screenWidth * 44,
    borderRadius: 35,
  },
  BgImgSubMainCon: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: screenHeight * 29.5,
    width: screenWidth * 44,
  },
  TitleTextStyle: {
    backgroundColor: '#4d5652',
    width: screenWidth * 20,
    borderRadius: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    fontSize: screenWidth * 2.4
  },
  RatingConStyle: {
    flexDirection: 'row',
    backgroundColor: '#4d5652',
    width: screenWidth * 13,
    padding: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  RatingTextStyle: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: screenWidth * 2.4
  },
  HeartConStyles: {
    height: screenWidth * 7,
    width: screenWidth * 7,
    backgroundColor: '#f3f8fe',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
