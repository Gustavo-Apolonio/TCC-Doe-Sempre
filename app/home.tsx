import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import LoggedAreaComponent from "@/components/LoggedArea";
import RegisterDonationComponent, { IGenerateCupom } from "@/components/RegisterDonation";
import DonationsComponent from "@/components/Donations";
import { donationsActions } from "@/store/states/slices";
import { IDonationTicket } from "@/store/states/donations/slices";
import { cupomsSelectors, userSelectors } from "@/store/states/selectors";
import { GenerateCupomByValues } from "@/utils/Cupoms";
import { useRoute } from "@react-navigation/native";

export default function HomePage() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute();

  const resetScreen = (route.params as { reset: boolean })?.reset;
  const stateUser = useAppSelector(userSelectors.getUser);
  const stateCupoms = useAppSelector(cupomsSelectors.getCupoms);

  const [addingDonation, setAddingDonation] = useState<boolean>(false);
  const [showSubmissionConfirmation, setShowSubmissionConfirmation] = useState<boolean>(false);

  const handleRegisterDonate = () => {
    if (addingDonation) setShowSubmissionConfirmation(true);
    else setAddingDonation(true);
  };

  const handleOnSubmit = (payload?: IDonationTicket | IGenerateCupom) => {
    if (payload) {
      if (stateUser.isDonor) {
        dispatch(donationsActions.addDonation({ ...payload } as IDonationTicket));
        setAddingDonation(false);
        setShowSubmissionConfirmation(false);
        return;
      }

      setAddingDonation(false);
      setShowSubmissionConfirmation(false);
      (navigation.navigate as any)('sendCupom', { cupom: GenerateCupomByValues(stateCupoms, (payload as IGenerateCupom).itemType, (payload as IGenerateCupom).foodQuantity, (payload as IGenerateCupom).clotheQuantity) });
      return;
    }

    setShowSubmissionConfirmation(false);
  }

  const handleCancelAdding = () => {
    setAddingDonation(false);
  }

  const openSettings = () => {
    (navigation.navigate as any)('settings');
  }

  useEffect(() => {
    setAddingDonation(false);
  }, [resetScreen]);

  return (
    <LoggedAreaComponent
      isDonor={addingDonation || stateUser.isDonor}
      onSettings={openSettings}
      confirmFooter={addingDonation}
      footerAction={() => handleRegisterDonate()}
    >
      {addingDonation ? (
        <RegisterDonationComponent
          isDonor={stateUser.isDonor}
          showSubmitConfirmation={showSubmissionConfirmation}
          onSubmit={handleOnSubmit}
          onCancel={handleCancelAdding}
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
