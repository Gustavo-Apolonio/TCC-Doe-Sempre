import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
  AppBorder: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 10,
  },
  RoundedBorder: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
});

export const { AppBorder, RoundedBorder } = Style;
