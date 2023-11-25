import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { text } from 'stream/consumers';

import { Border, Color, FontSize, Padding } from '../../GlobalStyles';
import { useAuth } from '../provider/AuthProvider';

const RegisterStep1 = () => {
  const navigation = useNavigation();
  const { onSignup } = useAuth();

  const [gender, setGender] = useState('');
  const [academicDegree, setAcademicDegree] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [nationality, setNationality] = useState('');
  const [birthday, setBirthday] = useState('');
  const [documentNo, setDocumentNo] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <ScrollView
      style={styles.registerStep1}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.registerStep1Content}
    >
      <Text style={[styles.headline, styles.headlineTypo]}>Register here</Text>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Gender"
          placeholderTextColor="#546a83"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Academic Degree"
          placeholderTextColor="#546a83"
          value={academicDegree}
          onChangeText={(text) => setAcademicDegree(text)}
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Surname"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          placeholderTextColor="#546a83"
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Lastname"
          placeholderTextColor="#546a83"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Street"
          placeholderTextColor="#546a83"
          value={street}
          onChangeText={(text) => setStreet(text)}
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="City"
          placeholderTextColor="#546a83"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Country"
          placeholderTextColor="#546a83"
          value={country}
          onChangeText={(text) => setCountry(text)}
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Nationality"
          placeholderTextColor="#546a83"
          value={nationality}
          onChangeText={(text) => setNationality(text)}
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Birthday"
          keyboardType="number-pad"
          placeholderTextColor="#546a83"
          value={birthday}
          onChangeText={(text) => setBirthday(text)}
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Document No."
          placeholderTextColor="#546a83"
          value={documentNo}
          onChangeText={(text) => setDocumentNo(text)}
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Mobile Phone"
          keyboardType="phone-pad"
          placeholderTextColor="#546a83"
          value={mobilePhone}
          onChangeText={(text) => setMobilePhone(text)}
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Phone (optional)"
          keyboardType="phone-pad"
          placeholderTextColor="#546a83"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View style={[styles.buttoncontinue, styles.buttonSpaceBlock]}>
        <Pressable
          style={[styles.button, styles.buttonSpaceBlock]}
          // Sign up and display the appropriate screen
          onPress={() => {
            onSignup?.(
              gender,
              academicDegree,
              firstName,
              lastName,
              street,
              city,
              country,
              nationality,
              birthday,
              documentNo,
              mobilePhone,
              phone
            )
              .then(() => {
                navigation.navigate('RegisterStep2Optional');
              })
              .catch((error) => {
                console.error('Registration error:', error);
                // Handle registration error
              });
          }}
        >
          <Text style={[styles.labelText, styles.labelTextFlexBox]}>
            Continue
          </Text>
          <Image
            style={styles.arrowForwardIcon}
            contentFit="cover"
            source={require('../../assets/arrow-forward.png')}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  registerStep1Content: {
    flexDirection: 'column',
    paddingHorizontal: 50,
    paddingTop: 70,
    paddingBottom: 71,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headlineTypo: {
    fontWeight: '600',
  },
  labelTextFlexBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSpaceBlock: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  headline: {
    fontSize: FontSize.size_base,
    color: Color.m3RefPrimaryPrimary0,
    textAlign: 'left',
  },
  textregister1: {
    opacity: 0.7,
    fontSize: FontSize.size_xs,
    flex: 1,
  },
  ovalregister1: {
    alignSelf: 'stretch',
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorSlategray_200,
    height: 40,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_4xs,
    marginTop: 12,
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  labelText: {
    letterSpacing: 0,
    lineHeight: 20,
    fontWeight: '500',

    color: Color.m3SysLightOnPrimary,
    textAlign: 'center',
    display: 'flex',
    width: 66,
    fontSize: FontSize.size_xs,
    justifyContent: 'center',
  },
  arrowForwardIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    overflow: 'hidden',
  },
  button: {
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorPeru,
    width: 136,
    height: 44,
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  buttoncontinue: {
    height: 10,
    marginTop: 12,
  },
  registerStep1: {
    backgroundColor: Color.colorGhostwhite,
    shadowColor: 'rgba(63, 82, 108, 0.4)',
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowRadius: 80,
    elevation: 80,
    shadowOpacity: 1,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    flex: 1,
  },
});

export default RegisterStep1;
