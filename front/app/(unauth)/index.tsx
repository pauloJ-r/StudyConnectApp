import { Image } from 'expo-image';
import { View, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

  
      <View style={styles.centerContent}>
        <Image
          source={require('../../assets/animations/Logo.gif')}
          style={styles.logo}
          contentFit="contain"
        />
      </View>


      <View style={styles.footer}>
        <Image
          source={require('../../assets/images/01.png')}
          contentFit="contain"
          style={styles.footerImage}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 350,
  },
  footer: {
    position: 'absolute',
    bottom: 40, 
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerImage: {
    width: 180,
    height: 150,
  },
});
