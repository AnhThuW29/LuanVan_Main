import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
    ScrollView,
    Dimensions,
    Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import CustomSwitch from "../../consts/CustomSwitch";
import image from "../../assets/Bear.jpg";

function LichSu({ route, navigation }) {
    const [finished, setFinished] = useState(1);

    const onSelectSwitch = (value) => {
        setFinished(value);
    };

    const Paid = ({ tour, index }) => {
        return (
            <ScrollView>
                <View>
                    <View style={styles.infoTitle}>
                        <Text style={{ fontSize: 16 }}>Hóa đơn đặt tour</Text>
                        {/* <Text style={{ fontSize: 16 }}>Đã thanh toán</Text> */}
                    </View>
                    <View style={styles.info}>
                        <Image style={styles.cardImage} source={image} />
                        <View>
                            <Text>Tiêu đề</Text>
                            <Text>Ngày đi</Text>
                            <Text>Số lượng hành khách</Text>
                        </View>
                    </View>
                    <View style={styles.infoPrice}>
                        <Icon
                            name="monetization-on"
                            style={{ fontSize: 18, marginRight: 5 }}
                        />
                        <Text>Tổng thanh toán: </Text>
                        <Text>Giá</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginRight: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.orange,
                                height: 50,
                                width: 100,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                                marginVertical: 10,
                            }}
                        >
                            <Text style={{ color: "white" }}>Mua lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={styles.infoTitle}>
                        <Text style={{ fontSize: 16 }}>Hóa đơn đặt tour</Text>
                        {/* <Text style={{ fontSize: 16 }}>Đã thanh toán</Text> */}
                    </View>
                    <View style={styles.info}>
                        <Image style={styles.cardImage} source={image} />
                        <View>
                            <Text>Tiêu đề</Text>
                            <Text>Ngày đi</Text>
                            <Text>Số lượng hành khách</Text>
                        </View>
                    </View>
                    <View style={styles.infoPrice}>
                        <Icon
                            name="monetization-on"
                            style={{ fontSize: 18, marginRight: 5 }}
                        />
                        <Text>Tổng thanh toán: </Text>
                        <Text>Giá</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginRight: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.orange,
                                height: 50,
                                width: 100,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                                marginVertical: 10,
                            }}
                        >
                            <Text style={{ color: "white" }}>Mua lại</Text>
                        </TouchableOpacity>
                    </View>
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
                    Đơn hàng của tôi
                </Text>
                <Icon name="notifications" size={28} color={COLORS.white} />
            </View>
            {/* <View style={styles.containerTop}>
                <TouchableOpacity style={styles.top}>
                    <View>
                        <Text style={{ fontSize: 16 }}>thanh toán</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.top}>
                    <View>
                        <Text style={{ fontSize: 16 }}>hoàn thành</Text>
                    </View>
                </TouchableOpacity>
            </View> */}

            <View>
                <CustomSwitch
                    selectionMode={1}
                    option1="Đã thanh toán"
                    option2="Đã hoàn thành"
                    onSelectSwitch={onSelectSwitch}
                />
            </View>

            {finished == 1 && <Paid />}
            {finished == 2 && <Text>hoàn thành</Text>}
        </View>
    );
}

export default LichSu;

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
    containerTop: {
        flex: 1,
        // width: "100%",
        flexDirection: "row",
        width: Dimensions.get("window").width,
    },
    top: {
        height: 50,
        width: "50%",
        backgroundColor: COLORS.gray,
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: COLORS.dark,
        borderRightWidth: 0.5,
    },
    infoTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.gray,
        height: 40,
        paddingHorizontal: 10,
    },
    info: {
        flexDirection: "row",
        // justifyContent: "space-around",
        alignItems: "center",
    },
    cardImage: {
        height: 150,
        width: 150,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 20,
    },
    infoPrice: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 10,
    },
});
