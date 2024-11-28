import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import MotivationText from "@/components/Motivation";

export default function LoginPage() {
  return (
    <View style={styles.container}>
      <Logo size="sm" />

      <View style={styles.content}>
        <Text>Login page</Text>
      </View>

      <MotivationText />

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  content: {
    width: "80%",
    marginTop: 20,
  },
});
