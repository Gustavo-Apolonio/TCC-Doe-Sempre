import { ScrollView, StyleSheet, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ICupomTicket } from "@/store/states/cupoms/slices";
import { cupomsSelectors } from "@/store/states/selectors";
import CupomComponent from "./CupomComponent";
import { cupomsActions } from "@/store/states/slices";

interface CupomsComponentProps {
  setEditingCupom: (cupom: ICupomTicket) => void
}

export default function CupomsComponent({
  setEditingCupom
}: CupomsComponentProps) {
  const dispatch = useAppDispatch();

  const stateCupoms = useAppSelector(cupomsSelectors.getCupoms);

  const editCupom = (cupom: ICupomTicket) => {
    setEditingCupom(cupom);
  }

  const deleteCupom = (id: number) => {
    dispatch(cupomsActions.deleteCupom(id));
  }

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      {stateCupoms.length > 0 ? stateCupoms.map((cupom: ICupomTicket) => (
        <CupomComponent
          key={cupom.id}
          cupomInfo={cupom}
          editCupom={() => editCupom(cupom)}
          deleteCupom={() => deleteCupom(cupom.id ?? 0)}
        />
      )) : (
        <Text style={styles.text}>Você ainda não cadastrou nenhum cupom</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    height: '100%',
    marginBottom: 48,
  },
  container: {
    width: '100%',
  },
  text: {
    width: '100%',
    textAlign: 'center',
  },
});
