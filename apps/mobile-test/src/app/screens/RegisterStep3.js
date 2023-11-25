import * as React from "react";
import { Text, StyleSheet, View, TextInput, Pressable, Image } from "react-native";
//import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Padding, Border, Color } from "../../GlobalStyles";
import { Link, Stack } from 'expo-router';

const RegisterStep3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.registerStep3}>
      <Text style={styles.headline}>Say Cheese!</Text>
      <View style={styles.frameParent}>
        <View>
          <Image
            style={styles.pngaaa1Icon}
            contentFit="cover"
            source={require("../../assets/pngaaa-1.png")}
          />
          <View style={[styles.uploadYourPhotoParent, styles.buttonFlexBox]}>
            <Text style={[styles.uploadYourPhoto, styles.labelTextTypo]}>
              upload your photo
            </Text>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require("../../assets/vector.png")}
            />
          </View>
        </View>
        <View style={[styles.entriesregistration3, styles.buttonSpaceBlock]}>
          <Image
            style={[styles.entriesregistration3Child, styles.childLayout]}
            contentFit="cover"
            source={require("../../assets/rectangle-34624092.png")}
          />
          <TextInput
            style={styles.ovalregister3}
            placeholder={`Username
`}
            placeholderTextColor="#546a83"
          />
          <TextInput
            style={styles.ovalregister3}
            placeholder={`Password
`}
            secureTextEntry={true}
            placeholderTextColor="#546a83"
          />
          <TextInput
            style={styles.ovalregister3}
            placeholder={`Re-enter Password
`}
            secureTextEntry={true}
            placeholderTextColor="#546a83"
          />
          <TextInput
            style={styles.ovalregister3}
            placeholder={`E-Mail
`}
            placeholderTextColor="#546a83"
          />
        </View>
      </View>
      <Image
        style={[styles.registerStep3Child, styles.childLayout]}
        contentFit="cover"
        source={require("../../assets/rectangle-346240921.png")}
      />
      <Pressable
        style={[styles.button, styles.buttonSpaceBlock]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={[styles.labelText, styles.labelTextTypo]}>Complete</Text>
        <Image
          style={styles.arrowForwardIcon}
          contentFit="cover"
          source={require("../../assets/arrow-forward3.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  labelTextTypo: {
    display: "flex",
    textAlign: "center",
    //fontFamily: FontFamily.poppinsMedium14,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0,
    fontSize: FontSize.size_xs,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSpaceBlock: {
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
  },
  childLayout: {
    width: 254,
    borderRadius: Border.br_3xs,
  },
  headline: {
    fontSize: FontSize.size_base,
    color: Color.m3RefPrimaryPrimary0,
    textAlign: "left",
    //fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  pngaaa1Icon: {
    width: 191,
    height: 191,
  },
  uploadYourPhoto: {
    color: Color.colorSlategray_100,
    width: 125,
    height: 17,
  },
  vectorIcon: {
    width: 17,
    height: 17,
  },
  uploadYourPhotoParent: {
    width: 167,
    marginTop: 14,
    height: 17,
  },
  entriesregistration3Child: {
    height: 39,
  },
  ovalregister3: {
    backgroundColor: Color.colorSlategray_200,
    width: 250,
    height: 40,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_4xs,
    marginTop: 15,
    borderRadius: Border.br_3xs,
    fontSize: FontSize.size_xs,
    flexDirection: "row",
    //fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  entriesregistration3: {
    width: 380,
    height: 146,
    paddingHorizontal: 0,
    marginTop: 9,
  },
  frameParent: {
    marginTop: 75,
    alignItems: "center",
  },
  registerStep3Child: {
    height: 41,
    marginTop: 75,
  },
  labelText: {
    color: Color.m3SysLightOnPrimary,
    width: 66,
  },
  arrowForwardIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    overflow: "hidden",
  },
  button: {
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorPeru,
    width: 136,
    height: 44,
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 75,
    overflow: "hidden",
  },
  registerStep3: {
    backgroundColor: Color.colorGhostwhite,
    shadowColor: "rgba(63, 82, 108, 0.4)",
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowRadius: 80,
    elevation: 80,
    shadowOpacity: 1,
    flex: 1,
    width: "100%",
    height: 781,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default RegisterStep3;
