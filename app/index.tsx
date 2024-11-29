import React from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "@/components/ActionButton";
import { RelativePathString } from "expo-router";
import PageComponent from "@/components/Page";

export default function App() {
  return (
    <PageComponent expandLogo>
      <View style={styles.container}>
        <ActionButton text="Entrar" link={{ href: "/login" as RelativePathString }} />
        <ActionButton text="Seja um doador" link={{ href: "/registerDonor" as RelativePathString }} />
        <ActionButton text="Seja um ponto de coleta" link={{ href: "/registerReceiver" as RelativePathString }} />
      </View>
    </PageComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
