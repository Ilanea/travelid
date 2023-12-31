import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';

import {
  Image,
  ImageBackground,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar
} from 'react-native';

import { useAuth } from '../provider/AuthProvider';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useAuth();

  const handleLogin = async () => {
    try {
      if (onLogin) {
        await onLogin(email, password);
        console.log('Login successful');
      } else {
        console.error('onLogin is undefined');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  const navigation = useNavigation();

  return (

    <ImageBackground
      style={{ width: '100%', height: '100%' }}
      source={require('../pics/welcome.png')}
    >
      <View style={styles.logo}>
      <StatusBar translucent backgroundColor="transparent" />

        <Image
          style={styles.image30Icon}
          contentFit="cover"
          source={require('../pics/image-30.png')}
        />
        <Text style={styles.everyStayCounts}>every stay counts</Text>
      </View>
      <View style={[styles.rectangleParent, styles.parentPosition]}>
        <View style={styles.frameChild} />
        <View style={[styles.frameParent, styles.frameSpaceBlock]}>
          <View style={styles.frameGroup}>
            <View style={[styles.frameContainer, styles.frameSpaceBlock]}>
              <View style={styles.wrapperFlexBox}>
                <TextInput
                  style={styles.username}
                  placeholder="Email"
                  placeholderTextColor="#263238"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                />
              </View>
              <View style={[styles.passwordWrapper, styles.wrapperFlexBox]}>
                <TextInput
                  style={styles.username}
                  placeholder="Password"
                  secureTextEntry={true}
                  placeholderTextColor="#263238"
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                />
              </View>
            </View>
            <Pressable
              style={styles.forgotPassword}
              onPress={() =>
                Linking.openURL(
                  'mailto:mm3220@mci4me.at?subject=Hello BONAWAY Team, I forgot my Password.'
                )
              }
            >
              <Text style={[styles.forgotPassword1, styles.labelTextTypo]}>
                forgot password?
              </Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleLogin()
            }}
          >
            <Text style={[styles.labelText, styles.labelTextTypo]}>Login</Text>
            <Image
              style={styles.arrowForwardIcon}
              contentFit="cover"
              source={require('../pics/arrow-forward1.png')}
            />
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  parentPosition: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  frameSpaceBlock: {
  },
  wrapperFlexBox: {
    paddingVertical: 13,
    paddingHorizontal: 100,
    backgroundColor: '#f4f9ff',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelTextTypo: {
    fontSize: 12,
    textAlign: 'center',
  },
  image30Icon: {
    width: 280,
    height: 94,
  },
  everyStayCounts: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 15,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    alignSelf: 'stretch',
  },
  logo: {
    marginLeft: -141,
    top: 250,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    left: '50%',
    position: 'absolute',
  },
  frameChild: {
    backgroundColor: 'rgba(210, 219, 234, 0.9)',
    height: 355,
    width: '100%',
    zIndex: 0,
  },
  username: {
    opacity: 0.7,
    fontSize: 10,
    fontWeight: '600',
  },
  passwordWrapper: {
    borderStyle: 'solid',
    borderColor: '#f4f9ff',
    borderWidth: 1,
    marginTop: 24,
  },
  forgotPassword1: {
    fontWeight: '700',
    color: '#546a83',
  },
  forgotPassword: {
    marginTop: 31,
  },

  labelText: {
    letterSpacing: 0,
    lineHeight: 20,
    fontWeight: '500',
    display: 'flex',
    width: 66,
    color: '#fff',
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowForwardIcon: {
    width: 24,
    height: 24,
    display: 'none',
    marginLeft: 10,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 100,
    backgroundColor: '#d68c57',
    shadowColor: 'rgba(83, 142, 187, 0.25)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    //shadowRadius: 14,
    elevation: 14,
    shadowOpacity: 1,
    height: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 54,
    overflow: 'hidden',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  frameParent: {
    zIndex: 1,
    top: '10%',
    position: 'absolute',
    justifyContent: 'center',
  },
  rectangleParent: {
    marginTop: 73,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  welcomeIcon: {
    flex: 1,
    width: '100%',
    height: 856,
    flexDirection: 'row',
  },
});

export default LoginScreen;
