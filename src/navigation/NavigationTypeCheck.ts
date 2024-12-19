import { ParamListBase } from "@react-navigation/native";

export interface BottomNavTypeChecking extends ParamListBase  {
  Home: undefined;
  Bookings: undefined;
  WishList: undefined;
  Profile: undefined;
}

export interface RootStackParamList extends ParamListBase {
  WelcomeScreen: undefined;
  LandingScreen: undefined;
  SearchSection: undefined;
  MyTabs: undefined;
  DetailsScreen: {id : number};
};