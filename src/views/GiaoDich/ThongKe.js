import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    TextInput,
    Button,
    Alert,
    StatusBar,
    Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChiTietHoaDon from "./ChiTietHoaDon";
import CustomInput from "../../consts/CustomInput";
import axiosClient from "../../api/axiosClient";
import { useSelector } from "react-redux";

function ThongKe({ navigation }) {
    const dataKhachHang = useSelector((s) => s.storeInforUser);
    const nameKH = dataKhachHang.HoTen.slice(
        dataKhachHang.HoTen.lastIndexOf(" ")
    );

    return (
        <View style={styles.AndroidSafeArea}>
            <View style={styles.header}>
                <Icon
                    name="arrow-back-ios"
                    size={28}
                    color={COLORS.white}
                    onPress={navigation.goBack}
                />
                <Text style={{ fontSize: 18 }}>Xin chào, {nameKH}</Text>
                <Icon name="notifications" size={28} color={COLORS.white} />
            </View>

            <ScrollView>
                <View style={styles.sectionDoanhthu}>
                    <View style={styles.Tien}>
                        <View
                            style={{
                                height: "31%",
                                flexDirection: "row",
                                // justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Icon
                                name="monetization-on"
                                color={COLORS.orange}
                                size="30"
                                style={{ paddingLeft: 10, paddingTop: 5 }}
                            />
                            <Text
                                style={{
                                    paddingTop: 5,
                                    paddingLeft: 10,
                                    color: COLORS.orange,
                                    fontSize: 20,
                                }}
                            >
                                Lợi nhuận
                            </Text>
                        </View>
                        <View
                            style={{
                                height: "69%",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{ color: COLORS.orange, fontSize: 30 }}
                            >
                                1.500
                            </Text>
                        </View>
                    </View>
                    <View style={styles.Loai}>
                        <Text style={{ fontSize: 16 }}>Doanh thu</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                            2000
                        </Text>
                    </View>
                    <View style={styles.Loai}>
                        <Text style={{ fontSize: 16 }}>Chi phí</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                            500
                        </Text>
                    </View>
                    <View style={styles.Loai}>
                        <Text style={{ fontSize: 16 }}>Số lượng bán</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                            2
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionDaban}>
                    <View style={{ alignItems: "center", paddingVertical: 20 }}>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: COLORS.orange,
                            }}
                        >
                            Lịch sử doanh thu
                        </Text>
                    </View>

                    <View style={styles.Ban}>
                        <View>
                            <Icon
                                name="local-atm"
                                size={30}
                                style={{ paddingRight: 15 }}
                                color="#127d89"
                            />
                        </View>
                        <View style={{ paddingVertical: 15 }}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    color: COLORS.orange,
                                }}
                            >
                                1000
                            </Text>
                            <Text style={{ fontSize: 16 }}>Tên tour</Text>
                            <Text style={{ fontSize: 16 }}>Ngày</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default ThongKe;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        // backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        height: 80,
    },
    sectionDoanhthu: {
        backgroundColor: "white",
        height: 300,
        marginVertical: 20,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    Tien: {
        height: "40%",
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
    },
    Loai: {
        height: "20%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
    },
    sectionDaban: {
        backgroundColor: "white",
        minHeight: 500,
        marginVertical: 20,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    Ban: {
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        borderColor: COLORS.gray,
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
});
