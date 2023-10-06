import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Button } from 'react-native';
import { Link} from 'expo-router';
import { theme } from '../theme/theme.js';


export default function About() {
  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundLightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: theme.casualButton
  }
});
