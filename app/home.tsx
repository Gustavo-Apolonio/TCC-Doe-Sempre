import { StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import LoggedAreaComponent from "@/components/LoggedArea";
import RegisterDonationComponent from "@/components/RegisterDonation";
import DonationsComponent from "@/components/Donations";
import { donationsActions } from "@/store/states/slices";
import { IDonationTicket } from "@/store/states/donations/slices";
import { userSelectors } from "@/store/states/selectors";

export default function HomePage() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const stateUser = useAppSelector(userSelectors.getUser);

  const [addingDonation, setAddingDonation] = useState<boolean>(false);
  const [showSubmissionConfirmation, setShowSubmissionConfirmation] = useState<boolean>(false);

  const triggerFooterAction = () => {
    if (addingDonation) setShowSubmissionConfirmation(true);
    else setAddingDonation(true);
  };

  const handleOnSubmit = (payload?: IDonationTicket) => {
    if (payload) {
      dispatch(donationsActions.addDonation({ ...payload }));
      setShowSubmissionConfirmation(false);
      setAddingDonation(false);
      return;
    }

    setShowSubmissionConfirmation(false);
  }

  const openSettings = () => {
    (navigation.navigate as any)('settings');
  }

  const handleRegisterDonate = () => {
    alert('Someone is donating');
  }

  return (
    <LoggedAreaComponent
      isDonor={stateUser.isDonor}
      onSettings={openSettings}
      confirmFooter={addingDonation}
      footerAction={() => triggerFooterAction()}
    >
      {addingDonation ? (
        <RegisterDonationComponent
          showSubmitConfirmation={showSubmissionConfirmation}
          onSubmit={handleOnSubmit}
        />
      ) : (
        <DonationsComponent
          isDonor={stateUser.isDonor}
          registerDonate={() => handleRegisterDonate()}
        />
      )}
    </LoggedAreaComponent>
  )
}

const styles = StyleSheet.create({

});
