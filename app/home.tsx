import { StyleSheet, Text, View } from "react-native";
import PageComponent from "@/components/Page";
import { useAppSelector } from "@/store/hooks";
import { userSelectors } from "@/store/states/selectors";
import { useEffect } from "react";

export default function HomePage() {
  const stateUser = useAppSelector((state) => userSelectors.getUser(state));

  useEffect(() => {
    console.log(stateUser);
  }, [])

  return (
    <PageComponent>
      <View style={styles.container}>
        <Text>Home app page {stateUser.document}</Text>
      </View>
    </PageComponent>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

