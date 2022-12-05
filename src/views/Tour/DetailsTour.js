import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import image from "../../assets/Bear.jpg";
import { URL_IMAGES } from "../../api/urlGetDataAPI";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { createYeuThich } from "../../redux/slice/yeuThich";

const DetailsTour = ({ navigation, route }) => {
  const post = route.params;
  const dispatch = useDispatch();
  const [product, setProduct] = useState(post);
  const [like, setLike] = useState(false);
  const listYeuThich = useSelector((s) => s.storeInforYeuThich.Tour);
  const idUser = useSelector((s) => s.storeInforUser.id);

  useEffect(() => {
    setLike(kiemtraLike);
  }, [listYeuThich]);

  const kiemtraLike = () => {
    let kt = false;
    if (listYeuThich[0] != "idtour") {
      listYeuThich.map((i) => {
        if (i == post._id) {
          kt = true;
        }
      });
    }
    // console.log(kt);
    return kt;
  };

  const LikeOrUnLike = async () => {
    await axiosClient
      .put("/nguoidung/update/" + idUser, {
        like: !like,
        YeuThich: post._id,
      })
      .then((res) => {
        console.log("update like or unlike");
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
    getDataYeuThichUser();
  };

  const getDataYeuThichUser = async () => {
    await axiosClient
      .get("/nguoidung/getlike/" + idUser)
      .then((res) => {
        // if (res.data.length > 1) {
        console.log("detail YeuThich: ", res.data);
        dispatch(createYeuThich(res.data));
        // }
        // if (res.data.length == 1) {
        // let data = [res.data]
        // dispatch(createYeuThich(res.data));
        // }
      })
      .catch((err) => {
        console.log("ERR AXIOS: ", err);
      });
  };

  // console.log("detail YeuThich: ", listYeuThich);
  return (
    <View style={styles.AndroidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={{ width: "100%", height: 400 }}
          source={{ uri: URL_IMAGES + post.HinhAnh }}
        >
          <View style={styles.header}>
            <Icon
              name="arrow-back-ios"
              size={28}
              color={COLORS.white}
              onPress={navigation.goBack}
            />
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
              <TouchableOpacity onPress={LikeOrUnLike}>
                {like ? (
                  <Icon name="favorite" size={30} color={COLORS.red} />
                ) : (
                  <Icon name="favorite" size={30} color={COLORS.gray} />
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", top: 10 }}>
              <Icon name="place" size={28} color={COLORS.primary} />
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
                <Icon name="today" color={COLORS.primary} size={20} />
                <Text style={{ marginLeft: 5 }}>
                  Ngày đi: Khách hàng có thể chọn
                </Text>
              </View>
              {/* <View style={styles.infoDate}>
                                <Icon
                                    name="today"
                                    color={COLORS.primary}
                                    size={20}
                                />
                                <Text style={{ marginLeft: 5 }}>
                                    Ngày về: {product.post.endDate}{" "}
                                </Text>
                            </View> */}
              <View style={styles.infoDate}>
                <Icon name="date-range" color={COLORS.primary} size={20} />
                <Text style={{ marginLeft: 5 }}>
                  Độ dài chuyến đi: {product.SoNgay}
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
                Giới thiệu
              </Text>
              <Text style={{ lineHeight: 22 }}>{product.MoTa}</Text>
            </View>

            <View style={styles.info}>
              <Text
                style={{
                  marginVertical: 20,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Lịch trình tour
              </Text>
              <Text style={{ lineHeight: 22 }}>{product.LichTrinh}</Text>
            </View>

            <View style={styles.info}>
              <Text
                style={{
                  marginVertical: 20,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Thông tin liên lạc
              </Text>
              <View style={styles.infoDate}>
                <Icon name="email" color={COLORS.primary} size={20} />
                <Text style={{ marginLeft: 5 }}>Email: {product.email}</Text>
              </View>
              <View style={styles.infoDate}>
                <Icon name="phone" color={COLORS.primary} size={20} />
                <Text style={{ marginLeft: 5 }}>
                  Số điện thoại: {product.SDT}
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
            Đặt vé
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
