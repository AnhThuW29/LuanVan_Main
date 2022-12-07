import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigation from "./TabNavigation";
import HomeScreen from "../views/HomeScreen";
import DetailsTour from "../views/Tour/DetailsTour";
import Favorite from "../views/Favorite";
import HoaDon from "../views/GiaoDich/HoaDon";
import TourPost from "../views/Tour/TourPost";
import TourScreen from "../views/Tour/TourScreen";
import HotelPost from "../views/Hotel/HotelPost";
import ChiTietHoaDon from "../views/GiaoDich/ChiTietHoaDon";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import { Provider, useSelector } from "react-redux";
import store from "../redux/store";
import ChangePassword from "../views/User/ChangePassword";

const Stack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="TabNavigation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailsTour" component={DetailsTour} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="HoaDon" component={HoaDon} />
      <Stack.Screen name="TourPost" component={TourPost} />
      <Stack.Screen name="TourScreen" component={TourScreen} />
      <Stack.Screen name="HotelPost" component={HotelPost} />
      <Stack.Screen name="ChiTietHoaDon" component={ChiTietHoaDon} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />

      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      {/* {console.log("LOGGGGGG HomeStackScreen : HomeStackScreen")} */}
    </Stack.Navigator>
  );
};

const SignInUp = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      {/* {console.log("LOGGGGGG SignInUp : SignInUp")} */}
    </Stack.Navigator>
  );
};

const MainNavigation = () => {
  const [isLogin, setIsLogin] = useState(false);
  //   setIsLogin( useSelector((s) => s.storeInforUser.stateLogin))
  var stateLogin = useSelector((s) => s.storeInforUser.stateLogin);
  // var hoadon = useSelector((s) => s.storeInforHoaDon);
  // console.log("MAIN navifate: ", isLogin);

  useEffect(() => {
    setIsLogin(stateLogin);
  }, [stateLogin]);

  return (
    // <Provider store={store}>
    <NavigationContainer>
      {isLogin ? <HomeStackScreen /> : <SignInUp />}
      {/* <HomeStackScreen /> */}
      {/* <SignInUp /> */}
    </NavigationContainer>
    // </Provider>
  );
};

export default MainNavigation;
