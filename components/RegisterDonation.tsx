import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import SelectPlaceComponent from "./SelectPlace";
import { useAppSelector } from "@/store/hooks";
import { placesSelectors } from "@/store/states/selectors";
import { IDonationTicket } from "@/store/states/donations/slices";
import DonationOption from "./DonationOption";

interface RegisterDonationComponentProps {
  showSubmitConfirmation: boolean;
  onSubmit: (payload?: IDonationTicket) => void;
}

export default function RegisterDonationComponent({ showSubmitConfirmation, onSubmit }: RegisterDonationComponentProps) {
  const statePlaces = useAppSelector((state) => placesSelectors.getPlaces({ places: state.places }));

  const [donationOptionSelected, setDonationOptionSelected] = useState<number>();
  const [placeOptionSelected, setPlaceOptionSelected] = useState<number>();

  const selectOption = (selection: number) => {
    if (selection === donationOptionSelected) return setDonationOptionSelected(undefined);

    setDonationOptionSelected(selection);
  };

  const preparePayload = (confirm: boolean) => {
    let payload: IDonationTicket | undefined = undefined;

    if (confirm) {
      payload = {
        itemType: donationOptionSelected ?? 0,
        place: statePlaces.find((place: any) => place.value === placeOptionSelected)?.label,
        status: 'pending',
      };
    }

    onSubmit(payload);
  }

  return (
    <View style={styles.container}>
      <Text>O que irá doar?</Text>
      <View style={styles.donationOptions}>
        <DonationOption
          type={0}
          selectOption={selectOption}
          selected={donationOptionSelected === 0}
        />
        <DonationOption
          type={1}
          selectOption={selectOption}
          selected={donationOptionSelected === 1}
        />
        <DonationOption
          type={2}
          selectOption={selectOption}
          selected={donationOptionSelected === 2}
        />
      </View>
      <View style={styles.placesContainer}>
        <Text style={styles.placesLabel}>Selecione o ponto de entrega mais próximo</Text>
        <SelectPlaceComponent
          selected={placeOptionSelected}
          selectValue={setPlaceOptionSelected}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSubmitConfirmation}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>AVISO</Text>
            <Text style={styles.modalText}>
              Certifique-se de que o item a ser doado encontra-se fechado, dentro do prazo de validade ou bem conservados e com condições a uso.
            </Text>
            <View style={styles.modalActions}>
              <Pressable onPress={() => preparePayload(false)}>
                <Text style={{ ...styles.modalText, ...styles.modalAction }}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={() => preparePayload(true)}>
                <Text style={{ ...styles.modalText, ...styles.modalAction }}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  donationOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
    marginBottom: 40,
  },
  placesContainer: {
    alignItems: 'center'
  },
  placesLabel: {
    marginBottom: 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: 350,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%'
  },
  modalAction: {
    color: "#4D85FF",
  }
});
