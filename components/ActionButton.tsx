import { AppBorder } from "@/styles/CustomBorder";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface IActionButtonProps {
  text: string;
  secondary?: boolean;
  callback?: () => void;
}

export default function ActionButton({ text, secondary, callback = () => { } }: IActionButtonProps) {
  return (
    <TouchableOpacity
      style={{
        ...styles.btn,
        ...AppBorder,
        ...(secondary && styles.btnSecondary)
      }}
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
    width: '100%',
  },
  btnSecondary: {
    backgroundColor: '#ececec',
  },
  btnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  }
})
