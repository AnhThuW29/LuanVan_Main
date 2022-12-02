import React, { useCallback, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    // StatusBar,
    ScrollView,
    RefreshControl,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
} from "react-native";
import COLORS from "../consts/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomIcon from "../consts/CustomIcon";
import axiosClient from "../api/axiosClient";

import image from "../assets/Bear.jpg";

const { width } = Dimensions.get("screen");

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

function HomeScreen({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [hotel, setHotel] = useState([]);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState();

    useEffect(() => {
        axiosClient
            .get("/tour/getall")
            .then((res) => {
                setPosts(res.data);
                setFilter(res.data);
            })
            .catch((err) => {
                console.log("LỖI HomeScreen: ", err);
            });
        axiosClient
            .get("/khachsan/getall")
            .then((res) => {
                setHotel(res.data);
                setFilter(res.data);
            })
            .catch((err) => {
                console.log("LỖI HomeScreen: ", err);
            });
    }, []);

    const ListCategories = (name) => {
        return (
            <View key={name} style={styles.categoryContainer}>
                <CustomIcon
                    key="tour"
                    iconName="beach-access"
                    text="Tour"
                    onPress={() => navigation.navigate("TourScreen")}
                />
                <CustomIcon
                    key="hotel"
                    iconName="apartment"
                    text="Khách sạn"
                    // onPress={() => navigation.navigate("HotelScreen")}
                />
                <CustomIcon
                    key="favorite"
                    iconName="favorite"
                    text="Yêu thích"
                    onPress={() => navigation.navigate("Favorite")}
                />
                <CustomIcon
                    key="map"
                    iconName="place"
                    text="Bản đồ"
                    //onPress={() => navigation.navigate('Map')}
                />
            </View>
        );
    };

    const Card = ({ post, index }) => {
        return (
            <View key={index} style={{ marginVertical: 5 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        navigation.navigate("DetailsTour", {
                            post,
                        })
                    }
                >
                    <ImageBackground
                        style={styles.cardImage}
                        // source={{ uri: post.thumbnail.url }}
                        source={image}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                                fontSize: 22,
                                fontWeight: "bold",
                                marginTop: 10,
                            }}
                        >
                            {post.DiaDiem}
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "space-between",
                                flexDirection: "row",
                                alignItems: "flex-end",
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Icon
                                    name="place"
                                    size={20}
                                    color={COLORS.white}
                                />
                                <Text
                                    style={{
                                        marginLeft: 5,
                                        color: COLORS.white,
                                    }}
                                >
                                    {post.ThanhPho}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    width: 80,
                                }}
                            >
                                {/* <Icon
                                    name="star"
                                    size={20}
                                    color={COLORS.white}
                                />
                                <Text
                                    style={{
                                        marginLeft: 5,
                                        color: COLORS.white,
                                    }}
                                >
                                    5.0
                                </Text> */}
                                {/* <Icon
                                    name="edit"
                                    size={28}
                                    color={COLORS.white}
                                    onPress={() =>
                                        navigation.navigate("EditTour", post)
                                    }
                                />
                                <Icon
                                    name="delete"
                                    size={28}
                                    color={COLORS.white}
                                    onPress={() => handleDelete(post._id)}
                                /> */}
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.details}>
                        <Text
                            style={[styles.textDetails, styles.tourName]}
                            ellipsizeMode="tail"
                            numberOfLines={1}
                        >
                            {post.TieuDe}
                        </Text>
                        <Text
                            style={[
                                styles.textDetails,
                                { color: COLORS.orange },
                            ]}
                        >
                            {post.Gia}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const CardHotel = ({ hotel, index }) => {
        return (
            <View key={index} style={{ marginVertical: 5 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    // onPress={() =>
                    //     navigation.navigate("DetailsTour", {
                    //         hotel,
                    //     })
                    // }
                >
                    <ImageBackground
                        style={styles.cardImage}
                        // source={{ uri: post.thumbnail.url }}
                        source={image}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                                fontSize: 22,
                                fontWeight: "bold",
                                marginTop: 10,
                            }}
                        >
                            {hotel.TenKhachSan}
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "space-between",
                                flexDirection: "row",
                                alignItems: "flex-end",
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Icon
                                    name="place"
                                    size={20}
                                    color={COLORS.white}
                                />
                                <Text
                                    style={{
                                        marginLeft: 5,
                                        color: COLORS.white,
                                    }}
                                >
                                    {/* {hotel.DiaChi.TinhTP} */}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    width: 80,
                                }}
                            >
                                {/* <Icon
                                    name="star"
                                    size={20}
                                    color={COLORS.white}
                                />
                                <Text
                                    style={{
                                        marginLeft: 5,
                                        color: COLORS.white,
                                    }}
                                >
                                    5.0
                                </Text> */}
                                {/* <Icon
                                    name="edit"
                                    size={28}
                                    color={COLORS.white}
                                    onPress={() =>
                                        navigation.navigate("EditTour", post)
                                    }
                                />
                                <Icon
                                    name="delete"
                                    size={28}
                                    color={COLORS.white}
                                    onPress={() => handleDelete(post._id)}
                                /> */}
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.details}>
                        <Text
                            style={[styles.textDetails, styles.tourName]}
                            ellipsizeMode="tail"
                            numberOfLines={1}
                        >
                            {hotel.TenKhachSan}
                        </Text>
                        <Text
                            style={[
                                styles.textDetails,
                                { color: COLORS.orange },
                            ]}
                        >
                            {/* {hotel.Phong.GiaPhong} */}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    

    // Search
    const searchFilter = (text) => {
        if (text) {
            const newData = posts.filter((item) => {
                const itemData = item.TieuDe
                    ? item.TieuDe.toUpperCase()
                    : "".toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilter(newData);
            setSearch(text);
        } else {
            setFilter(posts);
            setSearch(text);
        }
    };

    // Refresh
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={styles.AndroidSafeArea}>
            {/* <StatusBar translucent={false} backgroundColor={COLORS.white} /> */}
            <View style={styles.header}>
                <Icon name="sort" size={28} color={COLORS.white} />
                <Icon
                    name="notifications-none"
                    size={28}
                    color={COLORS.white}
                />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 120,
                        paddingHorizontal: 20,
                    }}
                >
                    <View>
                        <Text style={styles.headerTitle}>Cùng khám phá</Text>
                        <Text style={styles.headerTitle}>
                            top địa điểm ở Việt Nam
                        </Text>
                        <View style={styles.inputContainer}>
                            <Icon name="search" size={28} />
                            <TextInput
                                placeholder="Tìm kiếm"
                                style={{ color: COLORS.grey }}
                                onChangeText={(text) => searchFilter(text)}
                            />
                        </View>
                    </View>
                </View>

                <ListCategories />

                <Text style={styles.sectionTitle}>Địa điểm yêu thích</Text>

                <View>
                    <FlatList
                        contentContainerStyle={{ paddingLeft: 20 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={filter}
                        // renderItem={({ item }) => <Card place={item} />}
                        renderItem={({ item }) => {
                            return <Card post={item} />;
                        }}
                        keyExtractor={(post) => {
                            post._id;
                        }}
                    />
                </View>

                <Text style={styles.sectionTitle}>Khách sạn</Text>
                <View>
                    <FlatList
                        contentContainerStyle={{ paddingLeft: 20 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={filter}
                        // renderItem={({ item }) => <Card place={item} />}
                        renderItem={({ item }) => {
                            return <CardHotel hotel={item} />;
                        }}
                        keyExtractor={(hotel) => {
                            hotel._id;
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default HomeScreen;

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
    },
    headerTitle: {
        color: COLORS.white,
        fontWeight: "bold",
        fontSize: 23,
    },

    inputContainer: {
        height: 60,
        width: "100%",
        backgroundColor: COLORS.white,
        borderRadius: 10,
        position: "absolute",
        top: 90,
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    categoryContainer: {
        marginTop: 40,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    sectionTitle: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontWeight: "bold",
        fontSize: 20,
    },
    cardImage: {
        height: 200,
        width: width - 40,
        marginRight: 20,
        padding: 10,
        overflow: "hidden",
        borderRadius: 10,
    },
    details: {
        width: width - 50,
        marginTop: 10,
    },
    tourName: {
        overflow: "hidden",
        height: 28,
        color: "#666666",
    },
    textDetails: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
