import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

import COLORS from "../consts/color";
import Icon from "react-native-vector-icons/MaterialIcons";

const PostScreen = ({ navigation }) => {
    return (
        <View style={styles.AndroidSafeArea}>
            <View style={styles.header}>
                <Icon
                    name="arrow-back-ios"
                    size={28}
                    color={COLORS.white}
                    onPress={navigation.goBack}
                />
                <Text>Xin chào, Anh Thư</Text>
                <Icon name="notifications" size={28} color={COLORS.white} />
            </View>

            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("TourPost")}
                >
                    <Text style={{ fontSize: 20, fontWeight: "400" }}>
                        Tour
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("HotelPost")}
                >
                    <Text style={{ fontSize: 20, fontWeight: "400" }}>
                        Khách sạn
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostScreen;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        height: 80,
    },
    button: {
        backgroundColor: COLORS.primary,
        height: 100,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 25,
        borderRadius: 100,
    },
});
