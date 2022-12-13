import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity,
} from "react-native";
import {
    NativeBaseProvider,
    Box,
    TextArea,
    Select,
    CheckIcon,
} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import CustomInput from "../../consts/CustomInput";
import CustomButton from "../../consts/CustomButton";
import axiosClient from "../../api/axiosClient";
import { useSelector } from "react-redux";

function ChiTietYeuCau({ navigation }) {
    const DongY = async () => {
        // await axiosClient
    };

    return (
        <View style={styles.AndroidSafeArea}>
            <View style={styles.header}>
                <Icon
                    name="arrow-back-ios"
                    size={28}
                    color={COLORS.white}
                    onPress={navigation.goBack}
                />
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    Chi tiết yêu cầu
                </Text>
                <Icon name="notifications" size={28} color={COLORS.primary} />
            </View>
            <ScrollView>
                <View style={styles.info}>
                    <Text
                        style={{
                            marginVertical: 20,
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        Thông tin khách hàng
                    </Text>
                    <View style={styles.infoKH}>
                        <Icon name="email" color={COLORS.primary} size={20} />
                        <Text style={{ marginLeft: 5 }}>Họ tên:</Text>
                    </View>
                    <View style={styles.infoKH}>
                        <Icon name="phone" color={COLORS.primary} size={20} />
                        <Text style={{ marginLeft: 5 }}>Số điện thoại:</Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <Text
                        style={{
                            marginVertical: 20,
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        Yêu cầu
                    </Text>
                    <View style={styles.infoKH}>
                        <Icon name="place" color={COLORS.primary} size={20} />
                        <Text style={{ marginLeft: 5 }}>Địa điểm:</Text>
                    </View>
                    <View style={styles.infoKH}>
                        <Icon name="person" color={COLORS.primary} size={20} />
                        <Text style={{ marginLeft: 5 }}>Số lượng người:</Text>
                    </View>
                    <View style={styles.infoKH}>
                        <Icon name="today" color={COLORS.primary} size={20} />
                        <Text style={{ marginLeft: 5 }}>Ngày khởi hành:</Text>
                    </View>
                    <View style={styles.infoKH}>
                        <Icon name="today" color={COLORS.primary} size={20} />
                        <Text style={{ marginLeft: 5 }}>Số ngày:</Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <Text
                        style={{
                            marginVertical: 20,
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        Ghi chú của khách hàng
                    </Text>
                    <View style={styles.infoKH}>
                        <Icon name="notes" color={COLORS.primary} size={20} />
                        <Text style={{ marginLeft: 5 }}>Ghi chú:</Text>
                    </View>
                </View>

                <View style={{ alignItems: "center" }}>
                    <CustomButton
                        text="Đồng ý nhận tour"
                        onPress={DongY}
                        type="Primary"
                        widthBtn="50%"
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default ChiTietYeuCau;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        height: 70,
    },
    yeucau: {
        marginVertical: 20,
        marginHorizontal: 20,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 20,
    },
    info: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: "500",
    },
    info: {
        marginVertical: 10,
        marginHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: "#f2f2f2",
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    infoKH: {
        flexDirection: "row",
        // marginTop: 10,
        // marginBottom: 10,
        margin: 10,
    },
});
