import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  Button,
  StatusBar,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import COLORS from "../consts/color";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../api/axiosClient";
import { URL_IMAGES } from "../api/urlGetDataAPI";

const Favorite = ({ navigation }) => {
  const dispatch = useDispatch();
  const [dataTourFavorite, setDataTourFavorite] = useState([]);
  const listFavorite = useSelector((s) => s.storeInforYeuThich.Tour);
  console.log("dataTourFavorite: ", dataTourFavorite);

  useEffect(() => {
    axiosClient.post("/tour/getbylist", listFavorite).then((res) => {
      setDataTourFavorite(res.data);
    });
  }, [listFavorite]);

  const RenderFavorites = ({ navigation }) => {
    return (
      <View>
        <ScrollView>
          <View style={{ paddingRight: 10 }}>
            {listFavorite &&
              listFavorite.map((items) => (
                <TouchableOpacity
                  key={items._id}
                  // onPress={() => navigation.navigate("ChiTietHoaDon")}
                >
                  <View style={styles.info}>
                    <Image
                      style={styles.cardImage}
                      source={{
                        uri: URL_IMAGES + items.HinhAnh || "",
                      }}
                    />
                    <View
                      style={{
                        paddingRight: 10,
                        marginRight: 10,
                        width: "60%",
                      }}
                    >
                      <Text
                        style={{ fontSize: 18, fontWeight: "bold" }}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                      >
                        {items.TieuDe}
                      </Text>
                      <Text>Ngày đi: {items.NgayKhoiHanh}</Text>
                      <Text>Số lượng hành khách: {items.SoLuongKhach}</Text>
                    </View>
                  </View>
                  <View style={styles.infoPrice}>
                    <Icon
                      name="monetization-on"
                      style={{ fontSize: 18, marginRight: 5 }}
                    />
                    <Text>Tổng thanh toán: </Text>
                    <Text>{items.TongTien}</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>

          {/* <View>
            <Text>loi</Text>
            {console.log("LOI: 176: ", dataStoreHoaDon.HD)}
          </View> */}
        </ScrollView>
      </View>
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

      <RenderFavorites />
    </View>
  );
};

export default Favorite;

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
