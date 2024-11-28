import AppBorder from "@/styles/CustomBorder";
import { RelativePathString } from "expo-router";
import { Link } from "expo-router";
import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";

interface IActionButtonProps {
  text: string;
  callback?: () => void;
  link?: {
    href: RelativePathString;
  };
}

export default function ActionButton({ text, callback = () => { }, link }: IActionButtonProps) {
  return link ? (
    <Link
      href={link.href}
      style={{ ...styles.btn, ...AppBorder }}
    >
      <Text style={styles.btnText}>{text}</Text>
    </Link>
  ) : (
    <TouchableOpacity
      style={{ ...styles.btn, ...AppBorder }}
      onPressOut={() => callback()}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#5bc0eb",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    textAlign: "center",
    elevation: 2,
  },
  btnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  }
})
