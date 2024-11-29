import { Image, StyleSheet, View } from "react-native";

const LogoSource = require('@/assets/images/logo.png');

interface LogoProps {
  size?: 'xs' | 'sm' | 'lg';
}

export default function Logo({ size = 'lg' }: LogoProps) {
  return (
    <View>
      <Image
        source={LogoSource}
        style={styles[`logo${size}`]}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  logoxs: {
    width: 100,
    height: 100,
  },
  logosm: {
    width: 200,
    height: 200,
  },
  logolg: {
    width: 350,
    height: 350,
  },
});
