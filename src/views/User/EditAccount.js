import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../../consts/color";
import CustomInput from "../../consts/CustomInput";
import CustomButton from "../../consts/CustomButton";
import axiosClient from "../../api/axiosClient";

function EditAccount({ navigation }) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={styles.AndroidSafeArea}>
                <View style={styles.header}>
                    <Icon
                        name="arrow-back-ios"
                        size={28}
                        color={COLORS.white}
                        onPress={navigation.goBack}
                    />

                    <Text style={{ fontSize: 18, paddingLeft: 55 }}>
                        Cập nhật thông tin
                    </Text>
                </View>
                <ScrollView>
                    <>
                        <CustomInput
                            placeholder="Họ tên"
                            iconName="label"
                            // value={TieuDe}
                            // onChangeText={(text) => setTieuDe(text)}
                        />
                        <CustomInput
                            placeholder="Email"
                            iconName="email"
                            // value={Email}
                            // onChangeText={(text) => setEmail(text)}
                        />
                        <CustomInput
                            placeholder="Số điện thoại"
                            iconName="phone"
                            keyboardType="number-pad"
                            // value={SDT}
                            // onChangeText={(text) => setSDT(text)}
                        />
                        <CustomInput
                            placeholder="Ngày sinh"
                            iconName="cake"
                            // value={Email}
                            // onChangeText={(text) => setEmail(text)}
                        />
                        <CustomInput
                            placeholder="Giới tính"
                            iconName="face"
                            // value={Email}
                            // onChangeText={(text) => setEmail(text)}
                        />
                        <CustomInput
                            placeholder="CMND"
                            iconName="fact-check"
                            keyboardType="number-pad"
                            // value={Email}
                            // onChangeText={(text) => setEmail(text)}
                        />
                        <CustomInput
                            placeholder="Địa chỉ"
                            iconName="home"
                            // value={Email}
                            // onChangeText={(text) => setEmail(text)}
                        />

                        <View style={{ alignItems: "center" }}>
                            <CustomButton
                                text="Cập nhật"
                                type="Primary"
                                widthBtn="80%"
                                // onPress={() => UpdatePost()}
                            />
                        </View>
                    </>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

export default EditAccount;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        // backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        height: 80,
    },
});
