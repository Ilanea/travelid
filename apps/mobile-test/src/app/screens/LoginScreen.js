import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {Image,StyleSheet,Text,TextInput,Pressable,View,} from 'react-native';

import { useAuth } from '../provider/AuthProvider';
//import { theme } from '../theme/theme.js';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const navigation = useNavigation();
  const { onLogin } = useAuth();

  const handleLogin = async () => {
    if (onLogin) {
      try {
        await onLogin(email, password);
        console.log('Login successful');
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      console.error('onLogin is undefined');
    }
  };
  const navigation = useNavigation();

  return (
    <View style={[styles.login, styles.loginLayout]}>
      <View style={styles.istockphoto500369068612x612Parent}>
        <Image
          style={[styles.istockphoto500369068612x612Icon, styles.loginLayout]}
          contentFit="cover"
          source={require("../pics/welcome.png")}
        />
        <View style={[styles.frameWrapper, styles.framePosition]}>
          <View style={styles.frameParent}>
            <View style={styles.frameContainer}>
              <View style={styles.frameParent}>
                <Image
                  style={styles.image31Icon}
                  contentFit="cover"
                  source={require("../pics/image-30.png")}
                />
                <Text style={styles.everyStayCounts}>every stay counts</Text>
              </View>
            </View>
            <View style={styles.rectangleParent}>
              <View style={styles.frameChild} />
              <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                <View style={styles.frameView}>
                  <View style={[styles.frameParent1, styles.frameSpaceBlock]}>
                    <View style={styles.wrapperFlexBox}>
                      <TextInput
                        style={styles.username}
                        placeholder="Username"
                        placeholderTextColor="#263238"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                      />
                    </View>
                    <View
                      style={[styles.passwordWrapper, styles.wrapperFlexBox]}
                    >
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
                  <Pressable style={styles.forgotPassword} onPress={() => {}}>
                    <Text
                      style={[styles.forgotPassword1, styles.labelTextTypo]}
                    >
                      forgot password?
                    </Text>
                  </Pressable>
                </View>
                <Pressable
                  style={[styles.button, styles.loginShadowBox]}
                  onPress={handleLogin}
                >
                  <Text style={[styles.labelText, styles.labelTextTypo]}>
                    Login
                  </Text>
                  <Image
                    style={styles.arrowForwardIcon}
                    contentFit="cover"
                    source={require("../pics/arrow-forward1.png")}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginLayout: {
    width: "100%",
    flex: 1,
    overflow: "hidden",
  },
  framePosition: {
    zIndex: 1,
    position: "absolute",
  },
  frameSpaceBlock: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  wrapperFlexBox: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    backgroundColor: "#f4f9ff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  labelTextTypo: {
    fontSize: 12,
    textAlign: "center",
  },
  loginShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 40,
    },
  },
  istockphoto500369068612x612Icon: {
    maxWidth: "100%",
    maxHeight: "100%",
    zIndex: 0,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  image31Icon: {
    height: 94,
    width: 280,
  },
  everyStayCounts: {
    fontSize: 16,
    fontStyle: "italic",
    width: 311,
    marginTop: 12,
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  frameParent: {
    alignItems: "center",
  },
  frameContainer: {
    paddingHorizontal: 23,
    paddingVertical: 10,
  },
  frameChild: {
    backgroundColor: "rgba(210, 219, 234, 0.9)",
    width: 361,
    height: 355,
    zIndex: 0,
  },
  username: {
    opacity: 0.7,
    fontSize: 10,
    fontWeight: "600",
  },
  passwordWrapper: {
    borderStyle: "solid",
    borderColor: "#f4f9ff",
    borderWidth: 1,
    marginTop: 24,
  },
  frameParent1: {
    alignSelf: "stretch",
  },
  forgotPassword1: {
    fontWeight: "700",
    color: "#546a83",
  },
  forgotPassword: {
    marginTop: 31,
  },
  frameView: {
    width: 280,
    alignItems: "center",
  },
  labelText: {
    letterSpacing: 0,
    lineHeight: 20,
    fontWeight: "500",
    display: "flex",
    width: 66,
    justifyContent: "center",
    color: "#fff",
    fontSize: 12,
    alignItems: "center",
  },
  arrowForwardIcon: {
    width: 24,
    height: 24,
    display: "none",
    marginLeft: 10,
    overflow: "hidden",
  },
  button: {
    borderRadius: 100,
    backgroundColor: "#d68c57",
    shadowColor: "rgba(83, 142, 187, 0.25)",
    shadowRadius: 14,
    elevation: 14,
    width: 136,
    height: 44,
    paddingHorizontal: 16,
    marginTop: 54,
    justifyContent: "center",
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  frameGroup: {
    marginTop: -101,
    marginLeft: -150.5,
    top: "50%",
    left: "50%",
    justifyContent: "center",
    zIndex: 1,
    position: "absolute",
  },
  rectangleParent: {
    marginTop: 29,
  },
  frameWrapper: {
    top: 331,
    left: 410,
    padding: 10,
    flexDirection: "row",
  },
  istockphoto500369068612x612Parent: {
    top: -66,
    left: -421,
    width: 1109,
    height: 894,
    position: "absolute",
  },
  login: {
    backgroundColor: "#f2f5fa",
    shadowColor: "rgba(63, 82, 108, 0.4)",
    shadowRadius: 80,
    elevation: 80,
    height: 809,
    overflow: "hidden",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 40,
    },
  },
});

export default LoginScreen;
//   const navigateToRegister = () => {
//     navigation.navigate('Register');
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor={theme.backgroundLightBlue}
//       />

//       <View style={styles.middleContainer}>
//         <Text style={styles.text}>Email</Text>
//         <TextInput
//           style={styles.normalInput}
//           onChangeText={(text) => setEmail(text)}
//           value={email}
//         />
//         <Text style={styles.text}>Passwort</Text>
//         <TextInput
//           style={styles.normalInput}
//           secureTextEntry={true}
//           onChangeText={(text) => setPassword(text)}
//           value={password}
//         />
//         <TouchableOpacity>
//           <Text
//             style={{
//               borderWidth: 2,
//               borderColor: 'black',
//               marginTop: 30,
//               padding: 5,
//             }}
//             onPress={handleLogin}
//           >
//             Test
//           </Text>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={navigateToRegister}>
//           <Text style={styles.registerLink}>
//             Don't have an account? Register here
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.backgroundLightBlue,
//   },

//   middleContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center', // Center content vertically
//   },
//   text: {
//     marginTop: 30,
//     marginLeft: 50,
//     marginRight: 50,
//     fontSize: 15,
//   },
//   normalInput: {
//     marginTop: 8,
//     width: '60%',
//     borderBottomColor: 'black',
//     borderBottomWidth: 0.3,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   registerLink: {
//     color: '#007BFF',
//     marginTop: 10,
//   },
// });
// export default LoginScreen;
