import { Dimensions } from "react-native";

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

let screenWidth = Dimensions.get('screen').width / 100;
let screenHeight = Dimensions.get('screen').height / 100;


export { windowHeight, windowWidth, screenHeight, screenWidth }



// import {Dimensions} from 'react-native';

// export const SizeConfig = {
//   width: Dimensions.get('window').width / 100,
//   deviceWidth: Dimensions.get('window').width,
//   height: Dimensions.get('window').height / 100,
//   deviceHeight: Dimensions.get('window').height,
//   fontSize: Dimensions.get('window').width / 100,
// };