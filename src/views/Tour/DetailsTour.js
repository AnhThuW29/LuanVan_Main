import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import image from "../../assets/Bear.jpg";
import { URL_IMAGES } from "../../api/urlGetDataAPI";

const DetailsTour = ({ navigation, route }) => {
    const post = route.params;
    const [product, setProduct] = useState(post);

    return (
        <View style={styles.AndroidSafeArea}>
            {/* <StatusBar translucent backgroundColor="rgba(0,0,0,0)" /> */}

            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    style={{ width: "100%", height: 400 }}
                    source={{uri: URL_IMAGES + post.HinhAnh}}
                >
                    <View style={styles.header}>
                        <Icon
                            name="arrow-back-ios"
                            size={28}
                            color={COLORS.white}
                            onPress={navigation.goBack}
                        />
                        <Icon name="more-vert" size={28} color={COLORS.white} />
                    </View>

                    <View style={styles.imageDetails}>
                        <Text
                            style={{
                                width: "70%",
                                fontSize: 30,
                                fontWeight: "bold",
                                color: COLORS.white,
                                marginBottom: 20,
                            }}
                        >
                            {product.TieuDe}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <Icon name="star" size={30} color={COLORS.orange} />
                            <Text
                                style={{
                                    color: COLORS.white,
                                    fontWeight: "bold",
                                    fontSize: 20,
                                }}
                            >
                                5.0
                            </Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.detailsContainer}>
                    <View style={{ flex: 0.4, bottom: 25 }}>
                        <View style={styles.iconContainer}>
                            <Icon
                                name="favorite"
                                size={30}
                                color={COLORS.gray}
                            />
                        </View>
                        <View style={{ flexDirection: "row", top: 10 }}>
                            <Icon
                                name="place"
                                size={28}
                                color={COLORS.primary}
                            />
                            <Text
                                style={{
                                    marginLeft: 5,
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: COLORS.primary,
                                }}
                            >
                                {product.DiaDiem}
                            </Text>
                        </View>
                    </View>
                    <ScrollView style={{ flex: 0.6, top: 10 }}>
                        <View style={styles.info}>
                            <View style={styles.infoDate}>
                                <Icon
                                    name="today"
                                    color={COLORS.primary}
                                    size={20}
                                />
                                <Text style={{ marginLeft: 5 }}>
                                    Ng??y ??i: Kh??ch h??ng c?? th??? ch???n
                                </Text>
                            </View>
                            {/* <View style={styles.infoDate}>
                                <Icon
                                    name="today"
                                    color={COLORS.primary}
                                    size={20}
                                />
                                <Text style={{ marginLeft: 5 }}>
                                    Ng??y v???: {product.post.endDate}{" "}
                                </Text>
                            </View> */}
                            <View style={styles.infoDate}>
                                <Icon
                                    name="date-range"
                                    color={COLORS.primary}
                                    size={20}
                                />
                                <Text style={{ marginLeft: 5 }}>
                                    ????? d??i chuy???n ??i: {product.SoNgay}
                                </Text>
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
                                Gi???i thi???u
                            </Text>
                            <Text style={{ lineHeight: 22 }}>
                                {product.MoTa}
                            </Text>
                        </View>

                        <View style={styles.info}>
                            <Text
                                style={{
                                    marginVertical: 20,
                                    fontWeight: "bold",
                                    fontSize: 20,
                                }}
                            >
                                L???ch tr??nh tour
                            </Text>
                            <Text style={{ lineHeight: 22 }}>
                                {product.LichTrinh}
                            </Text>
                        </View>

                        <View style={styles.info}>
                            <Text
                                style={{
                                    marginVertical: 20,
                                    fontWeight: "bold",
                                    fontSize: 20,
                                }}
                            >
                                Th??ng tin li??n l???c
                            </Text>
                            <View style={styles.infoDate}>
                                <Icon
                                    name="email"
                                    color={COLORS.primary}
                                    size={20}
                                />
                                <Text style={{ marginLeft: 5 }}>
                                    Email: {product.email}
                                </Text>
                            </View>
                            <View style={styles.infoDate}>
                                <Icon
                                    name="phone"
                                    color={COLORS.primary}
                                    size={20}
                                />
                                <Text style={{ marginLeft: 5 }}>
                                    S??? ??i???n tho???i: {product.SDT}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
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
                        }}
                    >
                        {product.Gia} / Tour
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.btnBookNow}
                    onPress={() =>
                        navigation.navigate("HoaDon", {
                            post,
                        })
                    }
                >
                    <Text
                        style={{
                            color: COLORS.primary,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        ?????t v??
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default DetailsTour;

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    btnBookNow: {
        height: 50,
        width: 160,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    iconContainer: {
        height: 60,
        width: 60,
        position: "absolute",
        top: -30,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        right: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    detailsContainer: {
        top: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        flex: 0.3,
    },
    header: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    imageDetails: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        position: "absolute",
        bottom: 30,
    },
    footer: {
        flexDirection: "row",
        backgroundColor: COLORS.primary,
        height: 60,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    info: {
        marginVertical: 10,
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
    infoDate: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 10,
    },
});
