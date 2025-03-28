import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from "./Logo";
import MotivationText from "./Motivation";

interface LoggedAreaComponentProps extends PropsWithChildren {
  isDonor: boolean;
  onSettings?: () => void;
  confirmFooter?: boolean;
  footerAction?: () => void;
}

export default function LoggedAreaComponent({ isDonor, onSettings, confirmFooter, footerAction, children }: LoggedAreaComponentProps) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView style={styles.header}>
          <View style={styles.headerLogo}>
            <Logo size='xs' />
          </View>

          <View style={styles.headerUser}>
            <Icon name="user" size={50} color="#000" />
          </View>

          {!isDonor && onSettings && (
            <TouchableOpacity
              style={styles.headerSettings}
              onPress={() => onSettings()}
            >
              <Icon name={'gear'} size={50} color="#808080" />
            </TouchableOpacity>
          )}
        </SafeAreaView>

        <SafeAreaView style={styles.content}>
          {children}
        </SafeAreaView>

        <SafeAreaView style={styles.footer}>
          {isDonor && (
            <TouchableOpacity
              style={styles.footerAction}
              onPress={() => footerAction && footerAction()}
            >
              <Icon name={confirmFooter ? 'check' : 'plus'} size={25} color="#000" />
            </TouchableOpacity>
          )}

          <View style={{ marginTop: !isDonor ? 25 : 0 }}>
            <MotivationText bold />
          </View>
        </SafeAreaView>
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
    maxHeight: "100%",
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0090D1',

    width: '100%',
    position: 'relative',
  },
  headerLogo: {
    position: 'relative',
    left: 35,
    top: 50
  },
  headerUser: {
    paddingRight: 35,
    paddingTop: 40
  },
  headerSettings: {
    position: 'absolute',
    right: 32.5,
    bottom: -55,
  },

  content: {
    width: "80%",
    height: "60%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footer: {
    backgroundColor: '#0090D1',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 100,

    alignItems: 'center',
    justifyContent: 'center',

    width: '100%'
  },

  footerAction: {
    borderRadius: '100%',
    backgroundColor: "#5bc0eb",

    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: 'center',
    textAlign: "center",
    elevation: 2,

    position: 'relative',
    bottom: 25,
  },
});

