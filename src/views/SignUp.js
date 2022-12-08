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
  fullname: Yup.string()
    .trim()
    .min(3, "Tên không hợp lệ")
    .required("Bạn cần nhập tên"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Bạn cần nhập email"),
  phone: Yup.number()
    .min(10, "Quá ngắn")
    .required("Bạn cần nhập số điện thoại"),
  password: Yup.string()
    .trim()
    .min(8, "Mật khẩu quá ngắn")
    .required("Bạn cần nhập mật khẩu"),
  // confirmPassword: Yup.string().equals([Yup.ref('password'), null], 'Mật khẩu không giống nhau')
});

const SignUp = () => {
  const userInfo = {
    email: "",
    fullname: "",
    phone: "",
    password: "",
  };

  const [finished, setFinished] = useState(1);

  const onSelectSwitch = (value) => {
    setFinished(value);
  };

  const { email, fullname, phone, password } = userInfo;

  const [error, setError] = useState("");

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // chỉ thực hiện khi fields có giá trị
    if (!isValidObjectField(userInfo))
      return updateError("Điền vào ô trống", setError);

    // Tên hợp lệ với >= 3 ký tự
    if (!fullname.trim() || fullname.length < 3)
      return updateError("Tên không hợp lệ", setError);

    // Email phải hợp lệ
    if (!isValidEmail(email))
      return updateError("Email không hợp lệ", setError);

    // Phone phải lớn hơn hoặc bằng 8 ký tự
    if (phone.length < 10)
      return updateError("Số điện thoại không hợp lệ", setError);

    // Password phải lớn hơn hoặc bằng 8 ký tự
    if (!password.trim() || password.length < 8)
      return updateError("Mật khẩu quá ngắn", setError);

    return true;
    // Confirm password
    // if(password !== confirmPassword)
    //     return updateError('Mật khẩu không giống nhau', setError)
  };

  const onSignUpPress = () => {
    if (isValidForm()) {
      console.log(userInfo);
    }
  };

  const signUp = async (values, formikAction) => {
    const res = await axiosClient.post("/v1/nguoidung/add", {
      ...values,
    });
    console.log(res.data);
    formikAction.resetForm();
    formikAction.setSubmitting(false);
  };

  const onSignUpFB = () => {
    console.log("Facebook");
  };

  const onSignUpEmail = () => {
    console.log("Email");
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
          const { fullname, email, phone, password } = values;

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
          const { fullname, email, phone, password } = values;

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
