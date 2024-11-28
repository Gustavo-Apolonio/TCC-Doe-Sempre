import React from "react";
import { StyleSheet, View } from "react-native";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import MotivationText from "@/components/Motivation";
import ActionButton from "@/components/ActionButton";
import { RelativePathString } from "expo-router";

export default function App() {
  const registry = (isDonor: boolean) => {
    alert('Entrando como ' + (isDonor ? 'doador' : 'ponto de coleta'));
  }

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.buttonContainer}>
        <ActionButton text="Entrar" link={{ href: "/login" as RelativePathString }} />
        <ActionButton text="Seja um doador" callback={() => registry(true)} />
        <ActionButton text="Seja um ponto de coleta" callback={() => registry(false)} />
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

  buttonContainer: {
    width: "80%",
    marginTop: 20,
  },
});
