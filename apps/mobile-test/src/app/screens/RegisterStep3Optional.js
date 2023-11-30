import React, { useState, useCallback } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { FlatList, ScrollView, StyleSheet, View, Pressable, Text, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontSize, Color, Border } from "../../../GlobalStyles";
import { useAuth } from '../provider/AuthProvider';
//import { on } from "events";

const RegisterStep3Optional = () => {
  const navigation = useNavigation();
  const { onSignup } = useAuth();
  const [comment, setComment] = useState('');
  const [roomOpen, setRoomOpen] = useState();
  const [roomValue, setRoomValue] = useState();
  const [roomItems, setRoomItems] = useState([
    { value: "quiet", label: "quiet" },
    { value: "high ceiling", label: "high ceiling" },
    { value: "near to elevator", label: "near to elevator" },
    { value: "balcony / terrace", label: "balcony / terrace" },
  ]);
  const [houseKeepingOpen, setHouseKeepingOpen] = useState(false);
  const [houseKeepingValue, setHouseKeepingValue] = useState();
  const [houseKeepingItems, setHouseKeepingItems] = useState([
    { value: "extra pillow", label: "extra pillow" },
    { value: "bathrobe", label: "bathrobe" },
    { value: "slipper", label: "slipper" },
    { value: "cleaning room", label: "cleaning room" },
  ]);
  const [disabilitiesOpen, setDisabilitiesOpen] = useState(false);
  const [disabilitiesValue, setDisabilitiesValue] = useState();
  const [disabilitiesItems, setDisabilitiesItems] = useState([
    { value: "barrier-free", label: "barrier-free" },
    { value: "deaf", label: "deaf" },
    { value: "debility of sight", label: "debility of sight" },
    { value: "other", label: "other" },
  ]);
  const [interestsOpen, setInterestsOpen] = useState(false);
  const [interestsValue, setInterestsValue] = useState();
  const [interestsItems, setInterestsItems] = useState([
    { value: "sightseeing", label: "sightseeing" },
    { value: "culture", label: "culture" },
    { value: "sport", label: "sport" },
    { value: "family", label: "family" },
  ]);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceValue, setServiceValue] = useState();
  const [serviceItems, setServiceItems] = useState([
    { value: "quick check-in", label: "quick check-in" },
    { value: "detailed explaination", label: "detailed explaination" },
    { value: "with to be contacted", label: "with to be contacted" },
    { value: "standard", label: "standard" },
  ]);
  const [allergiesOpen, setAllergiesOpen] = useState(false);
  const [allergiesValue, setAllergiesValue] = useState();
  const [allergiesItems, setAllergiesItems] = useState([
    { value: "gluten", label: "gluten" },
    { value: "lactose", label: "lactose" },
    { value: "animal hair", label: "animal hair" },
    { value: "eggs", label: "eggs" },
  ]);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageValue, setLanguageValue] = useState();
  const [languageItems, setLanguageItems] = useState([
    { value: "German", label: "German" },
    { value: "English", label: "English" },
    { value: "Italien", label: "Italien" },
    { value: "other", label: "other" },
  ]);
  const [additionOpen, setAdditionOpen] = useState(false);
  const [additionValue, setAdditionValue] = useState();
  const [additionItems, setAdditionItems] = useState([
    { value: "vehicle", label: "vehicle" },
    { value: "children", label: "children" },
    { value: "pets", label: "pets" },
    {
      value: "wish to receive Newsletter",
      label: "wish to receive Newsletter",
    },
  ]);

  const onRoomOpen = useCallback(() => {
    setHouseKeepingOpen(false);
    setDisabilitiesOpen(false);
    setInterestsOpen(false);
    setServiceOpen(false);
    setAllergiesOpen(false);
    setLanguageOpen(false);
    setAdditionOpen(false);
  }, []);

  const onHouseKeepingOpen = useCallback(() => {
    setRoomOpen(false);
    setDisabilitiesOpen(false);
    setInterestsOpen(false);
    setServiceOpen(false);
    setAllergiesOpen(false);
    setLanguageOpen(false);
    setAdditionOpen(false);
  }, []);

  const onDisabilitiesOpen = useCallback(() => {
    setHouseKeepingOpen(false);
    setRoomOpen(false);
    setInterestsOpen(false);
    setServiceOpen(false);
    setAllergiesOpen(false);
    setLanguageOpen(false);
    setAdditionOpen(false);
  }, []);

  const onInterestsOpen = useCallback(() => {
    setHouseKeepingOpen(false);
    setRoomOpen(false);
    setDisabilitiesOpen(false);
    setServiceOpen(false);
    setAllergiesOpen(false);
    setLanguageOpen(false);
    setAdditionOpen(false);
  }, []);

  const onServiceOpen = useCallback(() => {
    setHouseKeepingOpen(false);
    setRoomOpen(false);
    setDisabilitiesOpen(false);
    setInterestsOpen(false);
    setAllergiesOpen(false);
    setLanguageOpen(false);
    setAdditionOpen(false);
  }, []);

  const onAllergiesOpen = useCallback(() => {
    setHouseKeepingOpen(false);
    setRoomOpen(false);
    setDisabilitiesOpen(false);
    setInterestsOpen(false);
    setServiceOpen(false);
    setLanguageOpen(false);
    setAdditionOpen(false);
  }, []);

  const onLanguageOpen = useCallback(() => {
    setHouseKeepingOpen(false);
    setRoomOpen(false);
    setDisabilitiesOpen(false);
    setInterestsOpen(false);
    setServiceOpen(false);
    setAllergiesOpen(false);
    setAdditionOpen(false);
  }, []);

  const onAdditionOpen = useCallback(() => {
    setHouseKeepingOpen(false);
    setRoomOpen(false);
    setDisabilitiesOpen(false);
    setInterestsOpen(false);
    setServiceOpen(false);
    setAllergiesOpen(false);
    setLanguageOpen(false);
  }, []);

  // const dropdownData = [
  //   { key: 'room', title: 'Room', items: roomItems },
  //   { key: 'houseKeeping', title: 'Housekeeping', items: houseKeepingItems },
  //   { key: 'disabilities', title: 'Disabilities', items: disabilitiesItems },
  //   { key: 'interests', title: 'Interests', items: interestsItems },
  //   { key: 'service', title: 'Service', items: serviceItems },
  //   { key: 'allergies', title: 'Allergies', items: allergiesItems },
  //   { key: 'language', title: 'Language', items: languageItems },
  //   { key: 'addition', title: 'Additional Information', items: additionItems },
  // ];
  return (
   <ScrollView contentContainerStyle={styles.scrollView}>
    <View style={styles.RegisterStep3Optional}>
      <Text style={styles.headline}>Tell us more about you</Text>
      <View style={styles.entriesregistration2}>
      {/* <FlatList
      data={dropdownData}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => ( */}
        <View style={styles.roomLayout}>
          <DropDownPicker
          listMode="SCROLLVIEW"
            zIndex={8000}
            zIndexInverse={1000}
            multiple={true}
            min={0}
            max={5}
            onOpen={onRoomOpen}
            open={roomOpen}
            setOpen={setRoomOpen}
            value={roomValue}
            setValue={setRoomValue}
            placeholder="Room"
            items={roomItems}
            labelStyle={styles.roomValue}
            autoScroll={true}
            multipleText={'Room'}
            //textStyle={styles.houseKeeping}
          />
        </View>
        <View style={[styles.houseKeeping, styles.roomLayout]}>
          <DropDownPicker
          listMode="SCROLLVIEW"
            zIndex={7000}
            zIndexInverse={2000}
            multiple={true}
            min={0}
            max={5}
            onOpen={onHouseKeepingOpen}
            open={houseKeepingOpen}
            setOpen={setHouseKeepingOpen}
            value={houseKeepingValue}
            setValue={setHouseKeepingValue}
            placeholder="Housekeeping"
            items={houseKeepingItems}
            labelStyle={styles.houseKeepingValue}
            multipleText={'Housekeeping'}
          />
        </View>
        <View style={[styles.houseKeeping, styles.roomLayout]}>
          <DropDownPicker
          listMode="SCROLLVIEW"
            zIndex={6000}
            zIndexInverse={3000}
            multiple={true}
            min={0}
            max={5}
            onOpen={onDisabilitiesOpen}
            open={disabilitiesOpen}
            setOpen={setDisabilitiesOpen}
            value={disabilitiesValue}
            setValue={setDisabilitiesValue}
            placeholder="Disabilities"
            items={disabilitiesItems}
            labelStyle={styles.disabilitiesValue}
            multipleText="Disabilities"
          />
        </View>
        <View style={[styles.houseKeeping, styles.roomLayout]}>
          <DropDownPicker
          listMode="SCROLLVIEW"
            zIndex={5000}
            zIndexInverse={4000}
            multiple={true}
            min={0}
            max={5}
            onOpen={onInterestsOpen}
            open={interestsOpen}
            setOpen={setInterestsOpen}
            value={interestsValue}
            setValue={setInterestsValue}
            placeholder="Interests"
            items={interestsItems}
            labelStyle={styles.interestsValue}
            multipleText="Interests"
          />
        </View>
        <View style={[styles.houseKeeping, styles.roomLayout]}>
          <DropDownPicker
          listMode="SCROLLVIEW"
            zIndex={4000}
            zIndexInverse={5000}
            multiple={true}
            min={0}
            max={5}
            onOpen={onServiceOpen}
            open={serviceOpen}
            setOpen={setServiceOpen}
            value={serviceValue}
            setValue={setServiceValue}
            placeholder="Service"
            items={serviceItems}
            labelStyle={styles.serviceValue}
            multipleText="Service"
          />
        </View>
        <View style={[styles.houseKeeping, styles.roomLayout]}>
          <DropDownPicker
          listMode="SCROLLVIEW"
            zIndex={3000}
            zIndexInverse={6000}
            multiple={true}
            min={0}
            max={5}
            onOpen={onAllergiesOpen}
            open={allergiesOpen}
            setOpen={setAllergiesOpen}
            value={allergiesValue}
            setValue={setAllergiesValue}
            placeholder="Allergies"
            items={allergiesItems}
            labelStyle={styles.allergiesValue}
            multipleText="Allergies"
          />
        </View>
        <View style={[styles.houseKeeping, styles.roomLayout]}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            zIndex={2000}
            zIndexInverse={7000}
            multiple={true}
            min={0}
            max={5}
            onOpen={onLanguageOpen}
            open={languageOpen}
            setOpen={setLanguageOpen}
            value={languageValue}
            setValue={setLanguageValue}
            placeholder="Language"
            items={languageItems}
            labelStyle={styles.languageValue}
            multipleText="Language"
          />
        </View>
        <View style={[styles.houseKeeping, styles.roomLayout]}>
          <DropDownPicker
          listMode="SCROLLVIEW"
            zIndex={1000}
            zIndexInverse={8000}
            multiple={true}
            min={0}
            max={5}
            onOpen={onAdditionOpen}
            open={additionOpen}
            setOpen={setAdditionOpen}
            value={additionValue}
            setValue={setAdditionValue}
            placeholder="Additional Information"
            items={additionItems}
            labelStyle={styles.additionValue}
            multipleText="Additional Information"
          />
        </View>
      </View>
      <View style={styles.frameParent}>
        <View style={styles.groupWrapper}>
          <View style={[styles.rectangleParent, styles.groupChildPosition]}>
            <View style={[styles.groupChild, styles.groupChildPosition]} />
            <TextInput
              style={[styles.comments]} //{, zIndex: 1000 }, { zIndexInverse: 8000 }
              placeholder="Comments:"
              placeholderTextColor="#546a83"
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
          </View>
        </View>
      </View>  
      <View style={[styles.bottomnavigate, styles.buttonFlexBox]}>
        <Pressable
          style={[styles.button, styles.buttonFlexBox]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={[styles.labelText, styles.skipTypo]}>Save</Text>
          <Image
            style={[styles.arrowForwardIcon, styles.arrowIconLayout]}
            contentFit="cover"
            source={require("../pics/arrow-forward1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.skipParent, styles.buttonFlexBox]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={[styles.skip, styles.skipTypo]}>Skip</Text>
          <Image
            style={[styles.arrowForwardIcon1, styles.arrowIconLayout]}
            contentFit="cover"
            source={require("../pics/arrow-forward2.png")}
          />
        </Pressable>
      </View>
         {/* <Pressable //no longer in use
        style={[styles.returnButton, styles.buttonFlexBox]}
        onPress={() => navigation.navigate("RegisterStep1")}
      >
        <Pressable
          style={styles.returnbutton}
          onPress={() => navigation.navigate("Welcome1")}
        >
          { <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/returnbutton.png")}
          /> }
        </Pressable>
      </Pressable>} */}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // roomValue: {
  //   //color: "#54595e",
  //   //fontSize: 16,
  //   //fontWeight: "500",
  // },
  // houseKeepingValue: {
  //   //color: "#54595e",
  //   //fontSize: 16,
  //   //fontWeight: "500",
  // },
  // disabilitiesValue: {
  //   color: "#54595e",
  //   //fontSize: 16,
  //   fontWeight: "500",

  // },
  // interestsValue: {
  //   color: "#54595e",
  //   //fontSize: 16,
  //   fontWeight: "500",
  // },
  // serviceValue: {
  //   color: "#54595e",
  //   //fontSize: 16,
  //   fontWeight: "500",

  // },
  // allergiesValue: {
  //   color: "#54595e",
  //   //fontSize: 16,
  //   fontWeight: "500",

  // },
  // languageValue: {
  //   color: "#54595e",
  //   //fontSize: 16,
  //   fontWeight: "500",

  // },
  // additionValue: {
  //   color: "#54595e",
  //   //fontSize: 16,
  //   fontWeight: "500",

  // },
  roomLayout: {
    height: 313,
    alignSelf: "stretch",
  },
  buttonFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  skipTypo: {
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0,
  },
  arrowIconLayout: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  houseKeeping: {
    marginTop: -250,
    //top: 250,
  },
  entriesregistration2: {
    paddingHorizontal: 20,
    maxWidth: 1000,
    zIndex: 0,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  comments: {
    opacity: 0.7,
    position: 'absolute',
    fontWeight: '600',
    fontSize: FontSize.size_base,
    width: 368,
    height: 100,
    top: 30,
    left: -8,
    borderWidth: 1,
    borderColor: '#546A831A',
    borderRadius: 10,
    backgroundColor: '#546A831A', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10, // Optional: Padding für den Text
    paddingBottom: 50, // Optional: Padding für den Text
  },
  rectangleParent: {
    height: '12.52%', //height: '12.52%',
    width: '99.3%',
    top: '78.48%',
    left: '10%',
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
    height: 24,
  },
  button: {
    backgroundColor: Color.colorPeru,
    width: 136,
    height: 44,
    paddingHorizontal: Padding.p_base,
    flexDirection: "row",
    justifyContent: "center",
    elevation: 14,
    shadowRadius: 14,
    shadowColor: "rgba(83, 142, 187, 0.25)",
    borderRadius: Border.br_81xl,
    paddingVertical: Padding.p_3xs,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 40,
    },
    overflow: "hidden",
  },
  skip: {
    color: '#546A83',
    fontSize: FontSize.size_base,
  },
  arrowForwardIcon1: {
    marginLeft: 3,
    height: 24,
  },
  skipParent: {
    width: 61,
    marginLeft: 80,
    height: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomnavigate: {
    marginLeft: -138,
    marginTop: 750,
    left: "50%",
    width: 277,
    height: 64,
    //zIndex: 1,
    flexDirection: "row",
    justifyContent: "center",
    elevation: 14,
    shadowRadius: 14,
    shadowColor: "rgba(83, 142, 187, 0.25)",
    borderRadius: Border.br_81xl,
    paddingVertical: Padding.p_3xs,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 40,
    },
    position: "absolute",
    paddingHorizontal: 0,
  },
  headline: {
    fontWeight: "600",
    color: Color.m3RefPrimaryPrimary0,
    textAlign: "center",
    //zIndex: 2,
    fontSize: FontSize.size_base,
    position: "absolute",
    width: "100%",
    top: 71, //Abstand 
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  returnbutton: {
    width: 32,
    height: 32,
  },
  returnButton: {
    top: 61,
    left: 12,
    padding: Padding.p_3xs,
    //zIndex: 3,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
  },
  RegisterStep3Optional: {
    backgroundColor: Color.colorGhostwhite,
    shadowColor: "rgba(63, 82, 108, 0.4)",
    shadowRadius: 80,
    elevation: 80,
    height: 828,
    paddingVertical: 110,
    paddingHorizontal: 0,
    overflow: "hidden",
    width: "100%",
    flex: 1,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 40,
    },
  //   scrollView: {
  //     flexGrow: 1,
  //     paddingBottom: 20, // Falls du am Ende Platz für die untere Leiste lassen willst
  // },
},
});

export default RegisterStep3Optional;
