import React from "react";
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

const Stack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <Stack.Navigator
            initialRouteName="TabScreen"
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
        </Stack.Navigator>
    );
}

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <HomeStackScreen />
        </NavigationContainer>
    );
};

export default MainNavigation;
