import { StyleSheet } from "react-native";
import { useAppDispatch } from "@/store/hooks";
import LoggedAreaComponent from "@/components/LoggedArea";
import { useState } from "react";
import RegisterDonationComponent from "@/components/RegisterDonation";
import DonationsComponent from "@/components/Donations";
import { donationsActions } from "@/store/states/slices";
import { IDonationTicket } from "@/store/states/donations/slices";

export default function HomePage() {
  const dispatch = useAppDispatch();

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

  return (
    <LoggedAreaComponent
      confirmFooter={addingDonation}
      footerAction={() => triggerFooterAction()}
    >
      {addingDonation ? (
        <RegisterDonationComponent
          showSubmitConfirmation={showSubmissionConfirmation}
          onSubmit={handleOnSubmit}
        />
      ) : (
        <DonationsComponent />
      )}
    </LoggedAreaComponent>
  )
}

const styles = StyleSheet.create({

});
