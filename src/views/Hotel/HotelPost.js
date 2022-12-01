import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    ToastAndroid,
    // ToastAndroid,
    // Alert,
    // PermissionsAndroid,
} from "react-native";
import { NativeBaseProvider, Box, TextArea } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../../consts/color";
import CustomInput from "../../consts/CustomInput";
import CustomButton from "../../consts/CustomButton";
import axiosClient from "../../api/axiosClient";

const HotelPost = ({ navigation }) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [posts, setPosts] = useState({
        TenKhachSan: "",
        DiaChi: "",
        Phong: "",
        MoTa: "",
        Email: "",
        SDT: "",
        // HinhAnh,
    });

    const { TenKhachSan, DiaChi, Phong, MoTa, Email, SDT } = posts;

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const submitPost = async () => {
        if (TieuDe.length < 5) {
            showToast("Tiêu đề không được ngắn hơn 5 ký tự!");
            return;
        }

        if (MoTa.length < 10) {
            showToast("Nội dung không được ngắn hơn 10 ký tự!");
            return;
        }

        axiosClient
            .post("/v1/khachsan", {
                TenKhachSan,
                DiaChi,
                LoaiPhong: posts.Phong.LoaiPhong,
                LoaiGiuong: posts.Phong.LoaiGiuong,
                GiaPhong: posts.Phong.GiaPhong,
                LoaiPhong: posts.Phong.LoaiPhong,
                MoTa,
                Email,
                SDT,
                // thumbnail,
            })
            .then((res) => {
                setPosts([res.data], ...posts);
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
                            placeholder="Tên Khách sạn"
                            iconName="home-work"
                            value={TenKhachSan}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "TenKhachSan")
                            }
                        />

                        <CustomInput
                            placeholder="Địa chỉ"
                            iconName="place"
                            value={DiaChi}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "DiaChi")
                            }
                        />
                        <CustomInput
                            placeholder="Loại phòng"
                            iconName="meeting-room"
                            value={Phong.LoaiPhong}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "Phong.LoaiPhong")
                            }
                        />
                        <CustomInput
                            placeholder="Loại giường"
                            iconName="weekend"
                            value={Phong.LoaiGiuong}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "Phong.LoaiGiuong")
                            }
                        />
                        <CustomInput
                            placeholder="Giá phòng"
                            iconName="euro"
                            value={Phong.GiaPhong}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "Phong.GiaPhong")
                            }
                        />
                        <CustomInput
                            placeholder="Email"
                            iconName="email"
                            value={Email}
                            onChangeText={(value) =>
                                handleOnChangeText(value, "Email")
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

export default HotelPost;

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
