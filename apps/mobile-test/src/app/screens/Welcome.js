import * as React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image, 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, Color, FontSize, } from "../../../GlobalStyles";
import { StatusBar } from 'react-native';

const Welcome = () => {
  const navigation = useNavigation();
  <StatusBar translucent backgroundColor="transparent" />
  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      //resizeMode="cover"
      source={require("../pics/welcome.png")}
    >
      <Pressable style={[styles.loginregister, styles.registerFlexBox]}>
        <Pressable
          style={styles.login}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Pressable
            style={[styles.backgroundlogin, styles.backgroundloginSpaceBlock]}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.login1}>Login</Text>
          </Pressable>
        </Pressable>
        <Pressable
          style={[styles.register, styles.registerSpaceBlock]}
          onPress={() => navigation.navigate("RegisterStep1")}
        >
          <Pressable
            style={[
              styles.backgroundregister,
              styles.backgroundloginSpaceBlock,
            ]}
            onPress={() => navigation.navigate("RegisterStep1")}
          >
            <Text style={[styles.register1, styles.register1Typo]}>
              Register
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
      <View style={styles.logo}>
        <Image
          style={styles.image30Icon}
          contentFit="cover"
          source={require("../pics/image-30.png")}
        />
        <Text style={[styles.everyStayCounts, styles.register1Typo]}>
          every stay counts
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  registerFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backgroundloginSpaceBlock: {
    paddingVertical: Padding.p_base,
    paddingHorizontal: 0,
    height: 60,
    borderRadius: Border.br_5xs,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  registerSpaceBlock: {
    marginTop: 15,
    alignSelf: "stretch",
  },
  register1Typo: {
    color: Color.m3SysLightOnPrimary,
    textAlign: "center",
    fontSize: FontSize.size_base,
  },
  login1: {
    color: "#3a4646",
    textAlign: "center",
    fontSize: FontSize.size_base,
    fontWeight: "600",
    flex: 1,
  },
  backgroundlogin: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  login: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  register1: {
    fontWeight: "700",
    color: Color.m3SysLightOnPrimary,
    flex: 1,
  },
  backgroundregister: {
    borderStyle: "solid",
    borderColor: Color.m3SysLightOnPrimary,
    borderWidth: 1,
  },
  register: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginregister: {
    marginLeft: -156,
    bottom: 0,
    width: 311,
    paddingBottom: 50,
    zIndex: 0,
    left: "50%",
    position: "absolute",
    justifyContent: "flex-end",
  },
  image30Icon: {
    width: 280,
    height: 94,
  },
  everyStayCounts: {
    fontStyle: "italic",
    marginTop: 15,
    alignSelf: "stretch",
    fontWeight: "600",
    color: Color.m3SysLightOnPrimary,
  },
  logo: {
    marginLeft: -141,
    top: 250,
    justifyContent: "center",
    zIndex: 1,
    alignItems: "center",
    left: "50%",
    position: "absolute",
  },
  welcomeIcon: {
    width: "100%",
    height: 766,
    flexDirection: "row",
    flex: 1,
  },
});

export default Welcome;
