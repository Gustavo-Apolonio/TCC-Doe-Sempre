import { Image, StyleSheet, View } from "react-native";

const ImgSource = require('@/assets/images/bubble.png');

export default function Footer() {
  return (
    <View>
      <Image
        source={ImgSource}
        style={styles.img}
        resizeMode="cover"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 500,
    height: 200,
  },
});
