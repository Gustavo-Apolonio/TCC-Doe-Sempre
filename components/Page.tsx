import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import Logo from "./Logo";
import MotivationText from "./Motivation";
import Footer from "./Footer";

interface PageComponentProps extends PropsWithChildren {
  expandLogo?: boolean;
}

export default function PageComponent({ expandLogo, children }: PageComponentProps) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Logo size={expandLogo ? 'lg' : 'sm'} />

        <View style={styles.content}>
          {children}
        </View>

        <MotivationText />

        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },

  content: {
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

