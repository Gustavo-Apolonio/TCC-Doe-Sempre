import { Image, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "@/store/hooks";
import { userSelectors } from "@/store/states/selectors";
import LoggedAreaComponent from "@/components/LoggedArea";
import { useState } from "react";
import RegisterDonationComponent from "@/components/RegisterDonation";
import DonationsComponent from "@/components/Donations";

export default function HomePage() {
  const stateUser = useAppSelector((state) => userSelectors.getUser(state));

  const [addingDonation, setAddingDonation] = useState<boolean>(false);

  return (
    <LoggedAreaComponent
      confirmFooter={addingDonation}
      footerAction={() => setAddingDonation(!addingDonation)}
    >
      {addingDonation ? (
        <RegisterDonationComponent />
      ) : (
        <DonationsComponent />
      )}
    </LoggedAreaComponent>
  )
}

const styles = StyleSheet.create({

});
