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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChiTietHoaDon from "./ChiTietHoaDon";
import CustomInput from "../../consts/CustomInput";
import axiosClient from "../../api/axiosClient";
import { useToast } from "native-base";

function HoaDon({ route, navigation }) {
    const { post } = route.params;
    const [product, setProduct] = useState();
    const [date, setDate] = useState("");

    const handleDecrease = () => {
        if (post.post.quantity > 0) {
            setProduct((post.post.quantity -= 1));
        }
    };
    const handleIncrease = () => {
        setProduct((post.post.quantity += 1));
    };

    const gia = post.post.Gia * post.post.quantity;

    const toast = useToast;
    const showToast = (msg) => {
        toast.show({ description: msg });
    };

    const payment = () => {
        if (!date) {
            toast.show({ description: "Bạn cần nhập ngày đi!" });
            return;
        }

        axiosClient
            .put("/tour/update", {
                sl: post.post.quantity,
                date,
                gia,
                id: post.post._id,
                status: "ThanhToan",
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        Alert.alert("Bạn đã đặt vé thành công!");
        navigation.navigate("TabNavigation");
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
                <Text>Xin chào, Anh Thư</Text>
                <Icon name="notifications" size={28} color={COLORS.white} />
            </View>
            <ScrollView>
                {/* Tour info */}
                <View style={styles.textTitleWrapper}>
                    <Text style={styles.textTitle}>THÔNG TIN TOUR</Text>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Tên tour</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>
                            {post.post.TieuDe}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Địa điểm</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>
                            {post.post.DiaDiem}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Hướng dẫn viên</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>
                            {post.post.NguoiHuongDan}
                        </Text>
                    </View>
                </View>

                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Chọn ngày</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <CustomInput
                            placeholder="01/01/2022"
                            widthInput="60%"
                            value={date}
                            onChangeText={(text) => setDate(text)}
                        />
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Số lượng người</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    marginRight: 20,
                                    padding: 4,
                                    opacity: 0.5,
                                }}
                                onPress={handleDecrease}
                            >
                                <Icon
                                    name="remove-circle-outline"
                                    style={{
                                        fontSize: 20,
                                        color: COLORS.orange,
                                    }}
                                />
                            </TouchableOpacity>
                            <Text>{post.post.quantity}</Text>
                            <TouchableOpacity
                                style={{
                                    marginLeft: 20,
                                    padding: 4,
                                    opacity: 0.5,
                                }}
                                onPress={handleIncrease}
                            >
                                <Icon
                                    name="add-circle-outline"
                                    style={{
                                        fontSize: 20,
                                        color: COLORS.orange,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.white,
                        flexDirection: "row",
                        justifyContent: "center",
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "#f2f2f2",
                    }}
                    // onPress={() => navigation.navigate("DetailsTour")}
                >
                    <Text style={styles.infoItemTitle}>Xem chi tiết</Text>
                </TouchableOpacity>
                {/* Thông tin người đặt */}
                <View style={styles.textTitleWrapper}>
                    <Text style={styles.textTitle}>THÔNG TIN NGƯỜI ĐẶT</Text>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Họ và tên</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>Thư</Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Số điện thoại</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>0123456789</Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItemLeftWrapper}>
                        <Text style={styles.infoItemTitle}>Email</Text>
                    </View>
                    <View style={styles.infoItemRightWrapper}>
                        <Text style={styles.infoItemText}>thu@gmail.com</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            color: COLORS.white,
                            fontSize: 18,
                        }}
                    >
                        {gia} VND
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.btnBookNow}
                    // onPress={() =>
                    //     navigation.navigate("ChiTietHoaDon", { post })
                    // }
                    onPress={payment}
                >
                    <Text
                        style={{
                            color: COLORS.primary,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        Xác nhận đặt vé
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HoaDon;

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
    titlesWrapper: {
        paddingHorizontal: 20,
        marginTop: 30,
    },
    title: {
        fontFamily: "Verdana-Italic",
        fontSize: 32,
        color: "black",
        width: "50%",
    },
    priceWrapper: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    priceText: {
        color: COLORS.orange,
        fontSize: 30,
    },
    textTitleWrapper: {
        backgroundColor: COLORS.gray,
        justifyContent: "center",
        height: 50,
        paddingLeft: 10,
    },
    textTitle: {
        color: COLORS.dark,
        fontSize: 16,
        // fontWeight: "500",
    },
    infoWrapper: {
        backgroundColor: COLORS.white,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
    },
    infoItemLeftWrapper: {
        paddingLeft: 20,
    },
    infoItemRightWrapper: {
        paddingRight: 20,
    },
    infoItemTitle: {
        fontSize: 16,
        color: "#6e7781",
    },
    infoItemText: {
        fontSize: 16,
    },
    footer: {
        flexDirection: "row",
        backgroundColor: COLORS.primary,
        height: 60,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    btnBookNow: {
        height: 50,
        width: 160,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
