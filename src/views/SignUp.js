import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import {
  isValidEmail,
  isValidObjectField,
  updateError,
} from "../utils/methods";
import { Formik } from "formik";
import * as Yup from "yup";

import axiosClient from "../api/axiosClient";
import COLORS from "../consts/color";
import CustomButton from "../consts/CustomButton";
import CustomInput from "../consts/CustomInput";
import SignInScreen from "../views/SignIn";
import CustomSwitch from "../consts/CustomSwitch";

const validationSchema = Yup.object({
  HoTen: Yup.string()
    .trim()
    .min(3, "Tên không hợp lệ")
    .required("Bạn cần nhập tên"),
  Email: Yup.string()
    .email("Email không hợp lệ")
    .required("Bạn cần nhập email"),
  SDT: Yup.number().min(10, "Quá ngắn").required("Bạn cần nhập số điện thoại"),
  MatKhau: Yup.string()
    .trim()
    .min(8, "Mật khẩu quá ngắn")
    .required("Bạn cần nhập mật khẩu"),
  // confirmPassword: Yup.string().equals([Yup.ref('password'), null], 'Mật khẩu không giống nhau')
});

const SignUp = () => {
  const userInfo = {
    Email: "",
    HoTen: "",
    SDT: "",
    MatKhau: "",
    NgaySinh: "",
    CMND: "",
  };

  const [finished, setFinished] = useState(1);

  const onSelectSwitch = (value) => {
    setFinished(value);
  };

  const { Email, HoTen, SDT, MatKhau, NgaySinh, CMND } = userInfo;
  // const [userBan, setUserBan] = useState({
  //     Quyen: "BAN"
  // })
  // const [userMua, setUserMua] = useState({
  //     Quyen: "MUA"
  // })

  const [error, setError] = useState("");

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // chỉ thực hiện khi fields có giá trị
    if (!isValidObjectField(userInfo))
      return updateError("Điền vào ô trống", setError);

    // Tên hợp lệ với >= 3 ký tự
    if (!HoTen.trim() || HoTen.length < 3)
      return updateError("Tên không hợp lệ", setError);

    // Email phải hợp lệ
    if (!isValidEmail(Email))
      return updateError("Email không hợp lệ", setError);

    // SDT phải lớn hơn hoặc bằng 8 ký tự
    if (SDT.length < 10)
      return updateError("Số điện thoại không hợp lệ", setError);

    // MatKhau phải lớn hơn hoặc bằng 8 ký tự
    if (!MatKhau.trim() || MatKhau.length < 8)
      return updateError("Mật khẩu quá ngắn", setError);

    return true;
    // Confirm MatKhau
    // if(MatKhau !== confirmMatKhau)
    //     return updateError('Mật khẩu không giống nhau', setError)
  };

  const onSignUpPress = () => {
    if (isValidForm()) {
      console.log(userInfo);
    }
  };

  const signUp = async (values, formikAction) => {
    
    const user = {
      HoTen: "Phan Hải Dương",
      NgaySinh: "12/3/2000",
      SDT: "0325963852",
      DiaChi: [
        {
          TinhTP: "Bạc Liêu",
          QuanHuyen: "Giá Rai",
          XaPhuong: "Phước Long",
          ChiTiet: "Phước Long, Giá Rai, Bạc Liêu",
        },
      ],
      GioiTinh: "nam",
      Email: "duong@gmail.com",
      CMND: "335678419",
      MatKhau: "abc123456",
      YeuThich: [],
      LichSu: [],
      Quyen: "BAN",
    };
    // const res = await axiosClient.post("/v1/nguoidung/add", {
    //     ...values,
    // });
    // console.log(res.data);
    console.log(values);
    formikAction.resetForm();
    formikAction.setSubmitting(false);
  };

  const onTermsAndPolicy = () => {
    console.log("Điều khoản và chính sách");
  };

  const navigation = useNavigation();
  const onSignIn = () => {
    navigation.navigate("SignIn");
  };

  const dangKyNguoiMua = () => {
    return (
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { HoTen, email, SDT, MatKhau } = values;

          return (
            <>
              <CustomInput
                placeholder="Email"
                iconName="email"
                autoCapitalize="none"
                value={email}
                error={touched.Email && errors.Email}
                // error='Email không hợp lệ'
                onChangeText={handleChange("Email")}
                onBlur={handleBlur("Email")}
              />
              <CustomInput
                placeholder="Nhập họ và tên"
                iconName="account-circle"
                autoCapitalize="none"
                value={HoTen}
                error={touched.HoTen && errors.HoTen}
                onChangeText={handleChange("HoTen")}
                onBlur={handleBlur("HoTen")}
              />
              <CustomInput
                placeholder="Nhập số điện thoại"
                iconName="phone"
                keyboardType="numeric"
                value={SDT}
                error={touched.SDT && errors.SDT}
                onChangeText={handleChange("SDT")}
                onBlur={handleBlur("SDT")}
              />
              <CustomInput
                placeholder="Nhập mật khẩu"
                iconName="lock"
                value={MatKhau}
                error={touched.MatKhau && errors.MatKhau}
                onChangeText={handleChange("MatKhau")}
                onBlur={handleBlur("MatKhau")}
                password
              />

              <Text style={styles.text}>
                Bạn đồng ý với{""}
                <Text style={styles.link} onPress={onTermsAndPolicy}>
                  {" "}
                  điều khoản và chính sách{" "}
                </Text>
                sử dụng của chúng tôi
              </Text>

              <View style={{ alignItems: "center" }}>
                <CustomButton
                  text="Đăng kí"
                  submitting={isSubmitting}
                  onPress={handleSubmit}
                  type="Primary"
                  widthBtn="50%"
                />
              </View>

              <CustomButton
                text="Bạn đã có tài khoản? Đăng nhập"
                onPress={onSignIn}
                type="Secondary"
              />
            </>
          );
        }}
      </Formik>
    );
  };

  const dangKyNguoiBan = () => {
    return (
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { fullname, email, phone, password, NgaySinh, CMND } = values;

          return (
            <>
              <CustomInput
                placeholder="Email"
                iconName="email"
                autoCapitalize="none"
                value={email}
                error={touched.email && errors.email}
                // error='Email không hợp lệ'
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <CustomInput
                placeholder="Nhập họ và tên"
                iconName="account-circle"
                autoCapitalize="none"
                value={fullname}
                error={touched.fullname && errors.fullname}
                onChangeText={handleChange("fullname")}
                onBlur={handleBlur("fullname")}
              />
              <CustomInput
                placeholder="Nhập số điện thoại"
                iconName="phone"
                keyboardType="numeric"
                value={phone}
                error={touched.phone && errors.phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
              />
              <CustomInput
                placeholder="Nhập mật khẩu"
                iconName="lock"
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                password
              />
              <CustomInput
                placeholder="Ngày sinh"
                iconName="cake"
                keyboardType="numeric"
                value={NgaySinh}
                error={touched.NgaySinh && errors.NgaySinh}
                onChangeText={handleChange("NgaySinh")}
                onBlur={handleBlur("NgaySinh")}
              />
              <CustomInput
                placeholder="CMND/CCCD"
                iconName="fact-check"
                keyboardType="numeric"
                value={CMND}
                error={touched.CMND && errors.CMND}
                onChangeText={handleChange("CMND")}
                onBlur={handleBlur("CMND")}
              />

              <Text style={styles.text}>
                Bạn đồng ý với{""}
                <Text style={styles.link} onPress={onTermsAndPolicy}>
                  {" "}
                  điều khoản và chính sách{" "}
                </Text>
                sử dụng của chúng tôi
              </Text>

              <View style={{ alignItems: "center" }}>
                <CustomButton
                  text="Đăng kí"
                  submitting={isSubmitting}
                  onPress={handleSubmit}
                  type="Primary"
                  widthBtn="50%"
                />
              </View>

              <CustomButton
                text="Bạn đã có tài khoản? Đăng nhập"
                onPress={onSignIn}
                type="Secondary"
              />
            </>
          );
        }}
      </Formik>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng kí tài khoản mới</Text>
        <CustomSwitch
          selectionMode={1}
          option1="Mua Tour"
          option2="Bán Tour"
          onSelectSwitch={onSelectSwitch}
        />

        {finished == 1 && dangKyNguoiMua()}
        {finished == 2 && dangKyNguoiBan()}
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    padding: 20,
    marginVertical: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    paddingBottom: 20,
    alignItems: "center",
  },
  text: {
    marginVertical: 20,
  },
  link: {
    color: "orange",
  },
});
