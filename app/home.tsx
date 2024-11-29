import { StyleSheet, Text, View } from "react-native";
import PageComponent from "@/components/Page";

export default function HomePage() {
  return (
    <PageComponent>
      <View style={styles.container}>
        <Text>Home app page</Text>
      </View>
    </PageComponent>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

