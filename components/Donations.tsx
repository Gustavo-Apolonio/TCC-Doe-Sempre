import { useAppSelector } from "@/store/hooks";
import { IDonationTicket } from "@/store/states/donations/slices";
import { donationsSelectors } from "@/store/states/selectors";
import { Image, ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import DonationComponent from "./Donation";

const DonationSource = require('@/assets/images/background-donations.png');

export default function DonationsComponent() {
  const stateDonations = useAppSelector(donationsSelectors.getDonations);

  return stateDonations.length > 0 ?
    (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
        {stateDonations.map((donation: IDonationTicket, index: number) => (
          <DonationComponent
            key={donation.status + index}
            itemType={donation.itemType}
            place={donation.place}
            id={index}
          />
        ))}
      </ScrollView>
    )
    : (
      <View style={styles.container}>
        <Image
          source={DonationSource}
          style={styles.backgroundImg}
          resizeMode="contain"
        />
        <Text>Você ainda não fez nenhuma doação</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },
  backgroundImg: {
    width: 100,
    height: 150,
    marginBottom: 20,
  },
  scrollContainer: {
    width: '100%',
    height: '60%',
  }
});
