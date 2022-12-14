import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import COLORS from "../consts/color";
import Icon from "react-native-vector-icons/MaterialIcons";

import HomeScreen from "../views/HomeScreen";
import PostScreen from "../views/PostScreen";
import AccountScreen from "../views/User/AccountScreen";
import LichSu from "../views/GiaoDich/LichSu";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: COLORS.blue },
                tabBarInactiveTintColor: COLORS.orange,
                tabBarActiveTintColor: COLORS.red,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" color={color} size={size} />;
                    },
                }}
            />
            <Tab.Screen
                name="Đăng bài"
                component={PostScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon name="post-add" color={color} size={size} />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Đơn hàng"
                component={LichSu}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                name="shopping-cart"
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Tôi"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Icon
                                name="account-circle"
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;
