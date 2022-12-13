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
import { useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function SetUpTour({ navigation }) {
    const [date, setDate] = useState();
    const dataKhachHang = useSelector((s) => s.storeInforUser);
    const nameKH = dataKhachHang.HoTen.slice(
        dataKhachHang.HoTen.lastIndexOf(" ")
    );

    const [setup, setSetup] = useState({
        DiaDiem: "",
        SoLuongKhach: 1,
        NgayKhoiHanh: date,
        SoNgayDi: 1,
        MoTa: "Lịch trình",
        TrangThai: "",
    });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const d = new Date();

    useEffect(() => {
        const t =
            d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
        setDate(t);
        // console.log(dataKhachHang);
        setSetup({
            ...setup,
            IDKhachHang: dataKhachHang.id,
            NgayKhoiHanh: t,
        });
    }, []);

    // SETUP NGAY KHOI HANH ----------------
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (dateClick) => {
        const dd = dateClick.getDate();
        const mm = dateClick.getMonth();
        const yy = dateClick.getFullYear();

        const t = new Date(yy, mm, dd + 1);
        if (t < d) {
            Alert.alert("Ngày khởi hành của bạn không hợp lệ!");
        } else {
            const dateDone = dd + "-" + (mm + 1) + "-" + yy;
            setDate(dateDone);
            setSetup({ ...setup, NgayKhoiHanh: dateDone });
        }

        hideDatePicker();
    };

    const handleSetUp = () => {
        const submit = async () => {
            await axiosClient
                .post("/setuptour/add", setup)
                .then((res) => console.log(res.data))
                .catch((err) => console.log("Lỗi yêu cầu: ", err));
        };
        submit();
    };
    return (
        <NativeBaseProvider>
            <View style={styles.AndroidSafeArea}>
                <View style={styles.header}>
                    <Icon
                        name="arrow-back-ios"
                        size={28}
                        color={COLORS.white}
                        onPress={navigation.goBack}
                    />
                    <Text style={{ fontSize: 18 }}>Xin chào, {nameKH}</Text>
                    <Icon
                        name="notifications"
                        size={28}
                        color={COLORS.primary}
                    />
                </View>

                <ScrollView>
                    <>
                        <CustomInput
                            placeholder="Địa điểm"
                            iconName="label"
                            value={setup.DiaDiem}
                            onChangeText={(text) =>
                                setSetup({ ...YeuCau, DiaDiem: text })
                            }
                        />
                        <CustomInput
                            placeholder="Số lượng khách"
                            iconName="person"
                            keyboardType="number-pad"
                            value={setup.SoLuongKhach}
                            onChangeText={(text) =>
                                setSetup({
                                    ...YeuCau,
                                    SoLuongKhach: text,
                                })
                            }
                        />

                        <View style={styles.infoWrapper}>
                            <View
                                style={[
                                    styles.infoItemLeftWrapper,
                                    { flexDirection: "row" },
                                ]}
                            >
                                <Icon
                                    name="today"
                                    style={{
                                        color: COLORS.primary,
                                        fontSize: 20,
                                        paddingRight: 10,
                                    }}
                                />
                                <Text style={styles.infoItemTitle}>
                                    Chọn ngày khởi hành:
                                </Text>
                            </View>
                            <View style={styles.infoItemRightWrapper}>
                                <TouchableOpacity onPress={showDatePicker}>
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                    />
                                    {/* <Text>{d.getDate()}</Text> */}
                                    <Text>{date}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <CustomInput
                            placeholder="Số lượng ngày"
                            iconName="today"
                            keyboardType="number-pad"
                            value={setup.SoNgayDi}
                            onChangeText={(text) =>
                                setSetup({ ...YeuCau, SoNgayDi: text })
                            }
                        />

                        <View style={styles.action}>
                            <Box alignItems="flex-start" w="100%" ml={4}>
                                <TextArea
                                    h={80}
                                    placeholder="Ghi chú"
                                    w="500"
                                    maxW="90%"
                                    value={setup.MoTa}
                                    onChangeText={(text) =>
                                        setSetup({
                                            ...YeuCau,
                                            MoTa: text,
                                        })
                                    }
                                />
                            </Box>
                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity
                                style={styles.btnBookNow}
                                onPress={() => {
                                    handleSetUp();
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        fontSize: 16,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Lưu
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                </ScrollView>
            </View>
        </NativeBaseProvider>
    );
}

export default SetUpTour;

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
        height: 80,
    },
    infoWrapper: {
        backgroundColor: COLORS.white,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        borderTopWidth: 1,
        borderTopColor: "#f2f2f2",
    },
    infoItemLeftWrapper: {
        paddingLeft: 10,
        paddingRight: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    infoItemRightWrapper: {
        marginRight: 10,
    },
    action: {
        marginVertical: 10,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    btnBookNow: {
        height: 50,
        width: 160,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
