import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import LoggedAreaComponent from "@/components/LoggedArea";
import { userSelectors } from "@/store/states/selectors";
import { useNavigation } from "expo-router";
import ActionButton from "@/components/ActionButton";
import CupomsComponent from "@/components/CupomsComponent";
import { useState } from "react";
import CupomManagement from "@/components/CupomManagement";
import { ICupomTicket } from "@/store/states/cupoms/slices";
import { cupomsActions } from "@/store/states/slices";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const stateUser = useAppSelector(userSelectors.getUser);

  const [openManagement, setOpenManagement] = useState<boolean>(false);
  const [editingCupom, setEditingCupom] = useState<ICupomTicket>();

  const closeSettings = () => {
    navigation.goBack();
  }

  const toggleManagement = () => {
    setOpenManagement(!openManagement);

    if (!openManagement) setEditingCupom(undefined);
  }

  const toggleEditCupom = (cupom: ICupomTicket) => {
    setOpenManagement(true);

    setEditingCupom(cupom);
  }

  const handleSubmit = (cupom: ICupomTicket) => {
    if (cupom.id) dispatch(cupomsActions.editCupom({ ...cupom }));
    else dispatch(cupomsActions.addCupom({ ...cupom }));

    toggleManagement();
  }

  return (
    <LoggedAreaComponent
      isDonor={stateUser.isDonor}
      onSettings={closeSettings}
    >
      <View style={styles.container}>
        {openManagement ? (
          <CupomManagement cupom={editingCupom} onSubmit={handleSubmit} onCancel={toggleManagement} />
        ) : (
          <>
            <Text style={{ fontWeight: 'bold', marginBottom: openManagement ? 24 : 48 }}>Configurações</Text>
            <CupomsComponent setEditingCupom={toggleEditCupom} />
            <ActionButton text="Adicionar cupom" callback={toggleManagement} />
          </>
        )}
      </View>
    </LoggedAreaComponent>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
});
