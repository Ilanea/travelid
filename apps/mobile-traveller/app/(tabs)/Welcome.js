import * as React from "react";
import { Text, StyleSheet, View, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, Color, FontSize, FontFamily } from "../../GlobalStyles";
import { StatusBar } from 'react-native';
import { Link } from 'expo-router';

const Welcome = () => {
  const navigation = useNavigation();
  StatusBar.setBackgroundColor('transparent');

  return (
    <ImageBackground
      style={{ width: '100%', height: '100%' }}
      source={require("../../assets/images/welcome.png")}
    >
      <View style={styles.loginregister}>
        <Link href="Home" style={[styles.button, styles.backgroundlogin]}>
          <Text style={styles.login1}>Login</Text>
        </Link>
        <Link href="RegisterStep1" style={[styles.button, styles.backgroundregister]}>
          <Text style={[styles.register1, styles.register1Typo]}>Register</Text>
        </Link>
      </View>
      <View style={styles.logo}>
        <Image
          style={styles.image30Icon}
          source={require("../../assets/images/logo.png")}
        />
        <Text style={[styles.everyStayCounts, styles.register1Typo]}>every stay counts</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loginregister: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
  },
  button: {
    paddingVertical: Padding.p_base,
    width: '70%',
    height: 60,
    borderRadius: Border.br_5xs,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  backgroundlogin: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  backgroundregister: {
    borderStyle: "solid",
    borderColor: Color.m3SysLightOnPrimary,
    borderWidth: 1,
  },
  login1: {
    color: "#3a4646",
    textAlign: "center",
    fontSize: FontSize.size_base,
    fontWeight: "600",
  },
  register1: {
    fontWeight: "700",
    color: Color.m3SysLightOnPrimary,
  },
  register1Typo: {
    fontSize: FontSize.size_base,
    textAlign: "center",
  },
  logo: {
    position: "absolute",
    left: "50%",
    marginLeft: -141,
    top: 250,
    justifyContent: "center",
    zIndex: 1,
    alignItems: "center",
  },
  image30Icon: {
    width: 280,
    height: 94,
  },
  everyStayCounts: {
    fontStyle: "italic",
    marginTop: 15,
    fontWeight: "600",
    color: Color.m3SysLightOnPrimary,
  },
});

export default Welcome;
