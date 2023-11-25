import * as React from "react";
import { Text, StyleSheet, View, TextInput, Pressable, Image } from "react-native";
//import { Image } from "expo";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border, Padding } from "../../GlobalStyles";
import { Link, Stack } from 'expo-router';

const RegisterStep2Optional = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.registerStep2Optional, styles.buttonShadowBox]}>
      <Text style={styles.headline}>Tell us more about you</Text>
      <View style={styles.frameParent}>
        <View style={styles.groupWrapper}>
          <View style={[styles.rectangleParent, styles.groupChildPosition]}>
            <View style={[styles.groupChild, styles.groupChildPosition]} />
            <TextInput
              style={styles.comments}
              placeholder="Comments:"
              placeholderTextColor="#546a83"
            />
          </View>
        </View>
        <View style={[styles.buttonParent, styles.buttonParentFlexBox]}>
          <Pressable
            style={[styles.button, styles.buttonParentFlexBox]}
            onPress={() => navigation.navigate("RegisterStep3")}
          >
            <Text style={[styles.labelText, styles.skipTypo]}>Save</Text>
            <Image
              style={[styles.arrowForwardIcon, styles.arrowIconLayout]}
              contentFit="cover"
              source={require("../../assets/arrow-forward1.png")}
            />
          </Pressable>
          <Pressable
            style={[styles.skipParent, styles.buttonParentFlexBox]}
            onPress={() => navigation.navigate("RegisterStep3")}
          >
            <Text style={[styles.skip, styles.skipTypo]}>Skip</Text>
            <Image
              style={[styles.arrowForwardIcon1, styles.arrowIconLayout]}
              contentFit="cover"
              source={require("../../assets/arrow-forward2.png")}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonShadowBox: {
    overflow: "hidden",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 40,
    },
  },
  groupChildPosition: {
    bottom: "0%",
    right: "0%",
    position: "absolute",
  },
  buttonParentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  skipTypo: {
    textAlign: "center",
    //fontFamily: FontFamily.poppinsMedium14,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0,
  },
  arrowIconLayout: {
    height: 24,
    width: 24,
    overflow: "hidden",
  },
  headline: {
    color: Color.m3RefPrimaryPrimary0,
    textAlign: "left",
    //fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base,
  },
  groupChild: {
    height: "100%",
    top: "0%",
    left: "0%",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorSlategray_200,
    width: "100%",
  },
  comments: {
    top: 20,
    left: 21,
    opacity: 0.7,
    position: "absolute",
    //fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base,
  },
  rectangleParent: {
    height: "12.52%",
    width: "99.3%",
    top: "87.48%",
    left: "0.7%",
  },
  groupWrapper: {
    width: 285,
    height: 599,
  },
  labelText: {
    fontSize: FontSize.size_xs,
    color: Color.m3SysLightOnPrimary,
    display: "flex",
    width: 66,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowForwardIcon: {
    display: "none",
    marginLeft: 10,
  },
  button: {
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorPeru,
    shadowColor: "rgba(83, 142, 187, 0.25)",
    shadowRadius: 14,
    elevation: 14,
    width: 136,
    height: 44,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_3xs,
    justifyContent: "center",
    overflow: "hidden",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 40,
    },
  },
  skip: {
    color: Color.colorSlategray_100,
    fontSize: FontSize.size_base,
    //fontFamily: FontFamily.poppinsMedium14,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0,
  },
  arrowForwardIcon1: {
    marginLeft: 2,
  },
  skipParent: {
    marginLeft: 80,
  },
  buttonParent: {
    paddingBottom: 20,
    marginTop: 10,
    justifyContent: "center",
  },
  frameParent: {
    marginTop: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  registerStep2Optional: {
    backgroundColor: Color.colorGhostwhite,
    shadowColor: "rgba(63, 82, 108, 0.4)",
    shadowRadius: 80,
    elevation: 80,
    flex: 1,
    height: 770,
    paddingHorizontal: 42,
    paddingVertical: 15,
    alignItems: "center",
    width: "100%",
  },
});

export default RegisterStep2Optional;
