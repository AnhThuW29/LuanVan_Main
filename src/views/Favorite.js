import React from "react";
import { View, Text, StyleSheet } from "react-native";

import COLORS from "../consts/color";
import Icon from "react-native-vector-icons/MaterialIcons";

const Post = ({ navigation }) => {
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

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Trống</Text>
            </View>
        </View>
    );
};

export default Post;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        // marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        height: 80,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        top: 50,
    },
});
