import React from "react";
import { StyleSheet, View } from "react-native";
import { RelativePathString, useNavigation } from "expo-router";
import ActionButton from "@/components/ActionButton";
import PageComponent from "@/components/Page";

export default function App() {
  const navigation = useNavigation();

  const newRegister = (isDonor: boolean) => {
    (navigation.navigate as any)('register', { isDonor });
  }

  return (
    <PageComponent expandLogo>
      <View style={styles.container}>
        <ActionButton text="Entrar" link={{ href: "/login" as RelativePathString }} />
        <ActionButton text="Seja um doador" callback={() => newRegister(true)} />
        <ActionButton text="Seja um ponto de coleta" callback={() => newRegister(false)} />
      </View>
    </PageComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
