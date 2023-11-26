import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Border, Color, FontSize, Padding } from '../../../GlobalStyles';
import { useAuth } from '../provider/AuthProvider';
//import DropDownPicker from 'react-native-dropdown-picker';

const RegisterStep2Optional = () => {
  const navigation = useNavigation();
  const { onSignup } = useAuth();

  const [comment, setComment] = useState('');
  // const [roomOpen, setRoomOpen] = useState(false);
  // const [roomValue, setRoomValue] = useState();
  // const [roomItems, setRoomItems] = useState([
  //   { value: "quiet", label: "quiet" },
  //   { value: "high ceiling", label: "high ceiling" },
  //   { value: "near to elevator", label: "near to elevator" },
  //   { value: "balcony / terrace", label: "balcony / terrace" },
  // ]);
  // const [houseKeepingOpen, setHouseKeepingOpen] = useState(false);
  // const [houseKeepingValue, setHouseKeepingValue] = useState();
  // const [houseKeepingItems, setHouseKeepingItems] = useState([
  //   { value: "extra pillow", label: "extra pillow" },
  //   { value: "bathrobe", label: "bathrobe" },
  //   { value: "slipper", label: "slipper" },
  //   { value: "cleaning room", label: "cleaning room" },
  // ]);
  // const [disabilitiesOpen, setDisabilitiesOpen] = useState(false);
  // const [disabilitiesValue, setDisabilitiesValue] = useState();
  // const [disabilitiesItems, setDisabilitiesItems] = useState([
  //   { value: "barrier-free", label: "barrier-free" },
  //   { value: "deaf", label: "deaf" },
  //   { value: "debility of sight", label: "debility of sight" },
  //   { value: "other", label: "other" },
  // ]);
  // const [interestsOpen, setInterestsOpen] = useState(false);
  // const [interestsValue, setInterestsValue] = useState();
  // const [interestsItems, setInterestsItems] = useState([
  //   { value: "sightseeing", label: "sightseeing" },
  //   { value: "culture", label: "culture" },
  //   { value: "sport", label: "sport" },
  //   { value: "family", label: "family" },
  // ]);
  // const [serviceOpen, setServiceOpen] = useState(false);
  // const [serviceValue, setServiceValue] = useState();
  // const [serviceItems, setServiceItems] = useState([
  //   { value: "quick check-in", label: "quick check-in" },
  //   { value: "detailed explaination", label: "detailed explaination" },
  //   { value: "with to be contacted", label: "with to be contacted" },
  //   { value: "standard", label: "standard" },
  // ]);
  // const [allergiesOpen, setAllergiesOpen] = useState(false);
  // const [allergiesValue, setAllergiesValue] = useState();
  // const [allergiesItems, setAllergiesItems] = useState([
  //   { value: "gluten", label: "gluten" },
  //   { value: "lactose", label: "lactose" },
  //   { value: "animal hair", label: "animal hair" },
  //   { value: "eggs", label: "eggs" },
  // ]);
  // const [languageOpen, setLanguageOpen] = useState(false);
  // const [languageValue, setLanguageValue] = useState();
  // const [languageItems, setLanguageItems] = useState([
  //   { value: "German", label: "German" },
  //   { value: "English", label: "English" },
  //   { value: "Italien", label: "Italien" },
  //   { value: "other", label: "other" },
  // ]);
  // const [additionOpen, setAdditionOpen] = useState(false);
  // const [additionValue, setAdditionValue] = useState();
  // const [additionItems, setAdditionItems] = useState([
  //   { value: "vehicle", label: "vehicle" },
  //   { value: "children", label: "children" },
  //   { value: "pets", label: "pets" },
  //   {value: "wish to receive Newsletter",label: "wish to receive Newsletter" },
  // ]);

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
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
          </View>
        </View>
        <View style={[styles.buttonParent, styles.buttonParentFlexBox]}>
          <Pressable
            style={[styles.button, styles.buttonParentFlexBox]}
            onPress={() => {
              onSignup?.(comment)
                .then(() => {
                  navigation.navigate('RegisterStep3');
                })
                .catch((error) => {
                  console.error('Registration error:', error);
                  // Handle registration error
                });
            }}
          >
          {/* <View style={styles.entriesregistration2}>
            <View style={styles.roomLayout}>
              <DropDownPicker
                open={roomOpen}
                setOpen={setRoomOpen}
                value={roomValue}
                setValue={setRoomValue}
                placeholder="Room"
                items={roomItems}
                labelStyle={styles.roomValue}
              />
            </View>
            <View style={[styles.houseKeeping, styles.roomLayout]}>
              <DropDownPicker
                open={houseKeepingOpen}
                setOpen={setHouseKeepingOpen}
                value={houseKeepingValue}
                setValue={setHouseKeepingValue}
                placeholder="Housekeeping"
                items={houseKeepingItems}
                labelStyle={styles.houseKeepingValue}
              />
            </View>
            <View style={[styles.houseKeeping, styles.roomLayout]}>
              <DropDownPicker
                open={disabilitiesOpen}
                setOpen={setDisabilitiesOpen}
                value={disabilitiesValue}
                setValue={setDisabilitiesValue}
                placeholder="Disabilities"
                items={disabilitiesItems}
                labelStyle={styles.disabilitiesValue}
              />
            </View>
            <View style={[styles.houseKeeping, styles.roomLayout]}>
              <DropDownPicker
                open={interestsOpen}
                setOpen={setInterestsOpen}
                value={interestsValue}
                setValue={setInterestsValue}
                placeholder="Interests"
                items={interestsItems}
                labelStyle={styles.interestsValue}
              />
            </View>
            <View style={[styles.houseKeeping, styles.roomLayout]}>
              <DropDownPicker
                open={serviceOpen}
                setOpen={setServiceOpen}
                value={serviceValue}
                setValue={setServiceValue}
                placeholder="Service"
                items={serviceItems}
                labelStyle={styles.serviceValue}
              />
            </View>
            <View style={[styles.houseKeeping, styles.roomLayout]}>
              <DropDownPicker
                open={allergiesOpen}
                setOpen={setAllergiesOpen}
                value={allergiesValue}
                setValue={setAllergiesValue}
                placeholder="Allergies"
                items={allergiesItems}
                labelStyle={styles.allergiesValue}
              />
            </View>
            <View style={[styles.houseKeeping, styles.roomLayout]}>
              <DropDownPicker
                open={languageOpen}
                setOpen={setLanguageOpen}
                value={languageValue}
                setValue={setLanguageValue}
                placeholder="Language"
                items={languageItems}
                labelStyle={styles.languageValue}
              />
            </View>
            <View style={[styles.houseKeeping, styles.roomLayout]}>
              <DropDownPicker
                open={additionOpen}
                setOpen={setAdditionOpen}
                value={additionValue}
                setValue={setAdditionValue}
                placeholder="Additional Information"
                items={additionItems}
                labelStyle={styles.additionValue}
              />
            </View>
          </View>   */}
            <Text style={[styles.labelText, styles.skipTypo]}>Save</Text>
            <Image
              style={[styles.arrowForwardIcon, styles.arrowIconLayout]}
              contentFit="cover"
              source={require('../pics/arrow-forward1.png')}
            />
          </Pressable>
          <Pressable
            style={[styles.skipParent, styles.buttonParentFlexBox]}
            onPress={() => navigation.navigate('RegisterStep3')}
          >
            <Text style={[styles.skip, styles.skipTypo]}>Skip</Text>
            <Image
              style={[styles.arrowForwardIcon1, styles.arrowIconLayout]}
              contentFit="cover"
              source={require('../pics/arrow-forward2.png')}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonShadowBox: {
    overflow: 'hidden',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 40,
    },
  },
  groupChildPosition: {
    bottom: '0%',
    right: '0%',
    position: 'absolute',
  },
  buttonParentFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipTypo: {
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0,
  },
  arrowIconLayout: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  headline: {
    color: Color.m3RefPrimaryPrimary0,
    textAlign: 'left',
    fontWeight: '600',
    fontSize: FontSize.size_base,
  },
  groupChild: {
    height: '100%',
    top: '0%',
    left: '0%',
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorSlategray_200,
    width: '100%',
  },
  comments: {
    top: 20,
    left: 21,
    opacity: 0.7,
    position: 'absolute',
    fontWeight: '600',
    fontSize: FontSize.size_base,
  },
  rectangleParent: {
    height: '12.52%',
    width: '99.3%',
    top: '87.48%',
    left: '0.7%',
  },
  groupWrapper: {
    width: 285,
    height: 599,
  },
  labelText: {
    fontSize: FontSize.size_xs,
    color: Color.m3SysLightOnPrimary,
    display: 'flex',
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowForwardIcon: {
    display: 'none',
    marginLeft: 10,
  },
  button: {
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorPeru,
    shadowColor: 'rgba(83, 142, 187, 0.25)',
    shadowRadius: 14,
    elevation: 14,
    width: 136,
    height: 44,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_3xs,
    justifyContent: 'center',
    overflow: 'hidden',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 40,
    },
  },
  skip: {
    color: Color.colorSlategray_100,
    fontSize: FontSize.size_base,
    fontWeight: '500',
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
    justifyContent: 'center',
  },
  frameParent: {
    marginTop: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerStep2Optional: {
    backgroundColor: Color.colorGhostwhite,
    shadowColor: 'rgba(63, 82, 108, 0.4)',
    shadowRadius: 80,
    elevation: 80,
    flex: 1,
    height: 770,
    paddingHorizontal: 42,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
});

export default RegisterStep2Optional;
