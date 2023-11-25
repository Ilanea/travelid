import { useNavigation } from '@react-navigation/native';
import { Link, Stack } from 'expo-router';
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

//import { Image } from "expo-image";
import {
  Border,
  Color,
  FontFamily,
  FontSize,
  Padding,
} from '../../GlobalStyles';
import { useAuth } from '../provider/AuthProvider';

const RegisterStep1 = () => {
  const navigation = useNavigation();
  const { onSignup } = useAuth();

  const [username, setUsername] = useState('');
  const [academicDegree, setAcademicDegree] = useState('');
  const [firstName, setFirstName] = useState('');
  const [name, setName] = useState('');

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
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Academic Degree"
          placeholderTextColor="#546a83"
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
          placeholder="Name"
          placeholderTextColor="#546a83"
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Street"
          placeholderTextColor="#546a83"
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="City"
          placeholderTextColor="#546a83"
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Country"
          placeholderTextColor="#546a83"
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Nationality"
          placeholderTextColor="#546a83"
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Birthday"
          keyboardType="number-pad"
          placeholderTextColor="#546a83"
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Document No."
          placeholderTextColor="#546a83"
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Mobile Phone"
          keyboardType="phone-pad"
          placeholderTextColor="#546a83"
        />
      </View>
      <View style={[styles.ovalregister1, styles.labelTextFlexBox]}>
        <TextInput
          style={[styles.textregister1, styles.headlineTypo]}
          placeholder="Phone (optional)"
          keyboardType="phone-pad"
          placeholderTextColor="#546a83"
        />
      </View>
      <View style={[styles.buttoncontinue, styles.buttonSpaceBlock]}>
        <Pressable
          style={[styles.button, styles.buttonSpaceBlock]}
          // Inside the Pressable in RegisterStep1.tsx
          onPress={() => {
            onSignup?.(email, password, firstName, lastName)
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
    //fontFamily: FontFamily.poppinsSemiBold,
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
    //fontFamily: FontFamily.poppinsMedium14,
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
