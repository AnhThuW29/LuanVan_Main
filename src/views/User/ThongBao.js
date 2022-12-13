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
import CustomSwitch from "../../consts/CustomSwitch";
import axiosClient from "../../api/axiosClient";
import { useSelector } from "react-redux";

function ThongBao({ navigation }) {
    const [finished, setFinished] = useState(1);
    const onSelectSwitch = (value) => {
        setFinished(value);
    };

    const [list, setList] = useState();
    const dataStoreUser = useSelector((s) => s.storeInforUser);

    const [inforUser, setInforUser] = useState({
        id: "id",
        HoTen: "name",
        Quyen: "1",
    });

    useEffect(() => {
        // const getYeuCau = async () => {
        //     await axiosClient
        //         .get("/yeucautour/getall/")
        //         .then((res) => {
        //             if (res.data.length > 0) setList(res.data);
        //             else setList([]);
        //         })
        //         .catch((err) => console.log("Lỗi thông báo: ", err));
        // };
        // getYeuCau();
    }, []);

    const YeuCau = () => {
        return (
            <ScrollView>
                <View style={styles.yeucau}>
                    <View style={styles.info}>
                        <Text style={styles.text}>Khách hàng: Tên</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.text}>Địa điểm: Địa điểm</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.info}
                        onPress={() => navigation.navigate("ChiTietYeuCau")}
                    >
                        <Text style={{ color: COLORS.orange }}>
                            Xem chi tiết
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.chitiet}></View>

                    {/* ))} */}
                </View>
            </ScrollView>
        );
    };
    const DaNhan = () => {
        return (
            <ScrollView>
                <View style={styles.yeucau}>
                    <View style={styles.info}>
                        <Text style={styles.text}>Khách hàng: Tên</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.text}>Địa điểm: Địa điểm</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.info}
                        onPress={() => navigation.navigate("SetUpTour")}
                    >
                        <Text style={{ color: COLORS.orange }}>
                            Tạo tour cho khách hàng
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.chitiet}></View>

                    {/* ))} */}
                </View>
            </ScrollView>
        );
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
                    Yêu cầu đặt tour
                </Text>
                <Icon name="notifications" size={28} color={COLORS.primary} />
            </View>
            <View>
                <CustomSwitch
                    selectionMode={1}
                    option1="Yêu cầu"
                    option2="Đã nhận"
                    onSelectSwitch={onSelectSwitch}
                />
            </View>

            {finished == 1 && <YeuCau />}
            {finished == 2 && <DaNhan />}
        </View>
    );
}

export default ThongBao;

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
});
