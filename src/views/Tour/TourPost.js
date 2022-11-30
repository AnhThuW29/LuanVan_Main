import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    // Alert,
    // PermissionsAndroid,
} from "react-native";
import { NativeBaseProvider, Box, TextArea, useToast } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../../consts/color";
import CustomInput from "../../consts/CustomInput";
import CustomButton from "../../consts/CustomButton";
import axiosClient from "../../api/axiosClient";

const TourPost = ({ navigation }) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [posts, setPosts] = useState({
        TieuDe: "",
        LoaiTour: "",
        MoTa: "",
        DiaDiem: "",
        ThanhPho: "",
        LichTrinh: "",
        KhachSan: "",
        NguoiHuongDan: "",
        SoNgay: "",
        Gia: "",
        email: "",
        SDT: "",
        quantity: "",
    });

    const {
        TieuDe,
        LoaiTour,
        MoTa,
        DiaDiem,
        ThanhPho,
        LichTrinh,
        KhachSan,
        NguoiHuongDan,
        SoNgay,
        Gia,
        email,
        SDT,
        quantity,
    } = posts;

    const toast = useToast();
    // const showToast = (msg) => {
    //     toast.show({ description: msg });
    // };

    const submitPost = async () => {
        // if (TieuDe.length < 5) {
        //     toast.show({ description: "Tiêu đề không được ngắn hơn 5 ký tự!" });
        //     return;
        // }

        // if (MoTa.length < 10) {
        //     showToast("Nội dung không được ngắn hơn 10 ký tự!");
        //     return;
        // }

        axiosClient
            .post("/v1/tour/add", {
                TieuDe,
                LoaiTour,
                MoTa,
                DiaDiem,
                ThanhPho,
                LichTrinh,
                KhachSan,
                NguoiHuongDan,
                SoNgay,
                Gia,
                email,
                SDT,
                quantity,
                // thumbnail,
            })
            .then((res) => {
                setPosts(res.data);
                navigation.navigate("HomeScreen");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleOnChangeText = (value, field) => {
        setPosts({ ...posts, [field]: value });
    };

    return (
        <NativeBaseProvider>
            <View style={styles.AndroidSafeArea}>
                <View style={styles.header}>
                    <Icon
                        name="arrow-back-ios"
                        size={24}
                        color={COLORS.white}
                        onPress={navigation.goBack}
                    />
                    <Text>Xin chào, Anh Thư</Text>
                    <Icon
                        name="notifications-none"
                        size={24}
                        color={COLORS.white}
                    />
                </View>
                <ScrollView>
                    {/* <StatusBar
                        translucent={false}
                        backgroundColor={COLORS.white}
                    /> */}

                    <>
                        {error ? (
                            <Text
                                style={{
                                    color: "red",
                                    fontSize: 18,
                                    textAlign: "center",
                                }}
                            >
                                {error}
                            </Text>
                        ) : null}
                        <CustomInput
                            placeholder="Tiêu đề bài viết"
                            iconName="label"
                            value={TieuDe}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "TieuDe")
                            }
                        />

                        <CustomInput
                            placeholder="Địa điểm"
                            iconName="place"
                            value={DiaDiem}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "DiaDiem")
                            }
                        />
                        <CustomInput
                            placeholder="Thành phố"
                            iconName="place"
                            value={ThanhPho}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "ThanhPho")
                            }
                        />
                        <CustomInput
                            placeholder="Tour thiên nhiên, Tour biển, Tour gia đình, Tour tham quan,"
                            iconName="view-list"
                            value={LoaiTour}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "LoaiTour")
                            }
                        />
                        <CustomInput
                            placeholder="Khách sạn"
                            iconName="home-work"
                            value={KhachSan}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "KhachSan")
                            }
                        />
                        <CustomInput
                            placeholder="Độ dài chuyến đi"
                            iconName="date-range"
                            value={SoNgay}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "SoNgay")
                            }
                        />
                        <CustomInput
                            placeholder="Người hướng dẫn"
                            iconName="person"
                            value={NguoiHuongDan}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "NguoiHuongDan")
                            }
                        />
                        <CustomInput
                            placeholder="Email"
                            iconName="email"
                            value={email}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "email")
                            }
                        />
                        <CustomInput
                            placeholder="Phone"
                            iconName="phone"
                            value={SDT}
                            keyboardType="number-pad"
                            onChangeText={(value) =>
                                handleOnChangeText(value, "SDT")
                            }
                        />

                        <CustomInput
                            placeholder="Giá tour"
                            iconName="euro"
                            value={Gia}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "Gia")
                            }
                        />

                        <View style={styles.action}>
                            <Icon
                                name="source"
                                color={COLORS.primary}
                                size={20}
                                style={{ marginLeft: 10 }}
                            />
                            <Box alignItems="flex-start" w="100%" ml={2}>
                                <TextArea
                                    h={40}
                                    placeholder="Thông tin địa điểm"
                                    w="500"
                                    maxW="320"
                                    value={MoTa}
                                    onChangeText={(value) =>
                                        handleOnChangeText(value, "MoTa")
                                    }
                                />
                            </Box>
                        </View>
                        <CustomInput
                            placeholder="Lịch trình tour"
                            iconName="flag"
                            value={LichTrinh}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "LichTrinh")
                            }
                        />

                        <CustomButton
                            text="Tải hình"
                            iconName="folder"
                            type="Primary"
                            widthBtn="100%"
                            onPress={() => console.log("Tái")}
                        />

                        <View style={{ alignItems: "center" }}>
                            <CustomButton
                                text="Đăng bài"
                                type="Primary"
                                widthBtn="80%"
                                onPress={() => submitPost()}
                            />
                        </View>
                    </>
                </ScrollView>
            </View>
        </NativeBaseProvider>
    );
};

export default TourPost;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.primary,
        // height: 80,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: COLORS.orange,
        alignItems: "center",
        marginTop: 10,
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
        backgroundColor: COLORS.white,
    },
    actionError: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF0000",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -5,
        paddingLeft: 10,
        color: "#05375a",
        fontSize: 16,
    },
});
