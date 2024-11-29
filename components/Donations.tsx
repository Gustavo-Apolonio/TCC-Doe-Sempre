import { Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";

const DonationSource = require('@/assets/images/background-donations.png');

export default function DonationsComponent() {
  return (
    <View style={styles.container}>
      <Image
        source={DonationSource}
        style={styles.backgroundImg}
        resizeMode="contain"
      />
      <Text>Você ainda não fez nenhuma doação</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: "100%",
  },
  backgroundImg: {
    width: 100,
    height: 150,
    marginBottom: 20,
  }
});
