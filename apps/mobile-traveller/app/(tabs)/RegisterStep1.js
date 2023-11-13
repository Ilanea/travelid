import React from "react";
import { ScrollView, Text, StyleSheet, TextInput, View, Pressable, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, Color, Border, FontSize } from "../../GlobalStyles";
import { Link } from 'expo-router';

const RegisterStep1 = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headline}>Register here</Text>
      {[
        "Gender",
        "Academic Degree",
        "Surname",
        "Name",
        "Street",
        "City",
        "Country",
        "Nationality",
        "Birthday",
        "Document No.",
        "Mobile Phone",
        "Phone (optional)",
      ].map((placeholder, index) => (
        <View key={index} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#546a83"
            keyboardType={index === 10 || index === 11  ? "phone-pad" : index === 8 ? "number-pad" : "default"}
          />
        </View>
      ))}
      
        <Link href="RegisterStep2Optional"asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
          <Image
            style={styles.arrowForwardIcon}
            source={require("../../assets/images/arrow-forward.png")}
          />
          </TouchableOpacity>
        </Link>
        
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    paddingTop: 70,
    paddingBottom: 71,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headline: {
    fontSize: FontSize.size_base,
    color: Color.m3RefPrimaryPrimary0,
    textAlign: "left",
    fontWeight: "600",
  },
  inputContainer: {
    alignSelf: "stretch",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorSlategray_200,
    height: 40,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_4xs,
    marginTop: 12,
    justifyContent: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  input: {
    opacity: 0.7,
    fontSize: FontSize.size_xs,
    flex: 1,
  },
  buttonContainer: {
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    marginTop: 12,
  },
  button: {
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorPeru,
    width: 136,
    height: 44,
    justifyContent: "center",
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    letterSpacing: 0,
    lineHeight: 20,
    fontWeight: "500",
    color: Color.m3SysLightOnPrimary,
    textAlign: "center",
    fontSize: FontSize.size_xs,
  },
  arrowForwardIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});

export default RegisterStep1;
