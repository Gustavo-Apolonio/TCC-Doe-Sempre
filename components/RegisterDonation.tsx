import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import SelectPlaceComponent from "./SelectPlace";
import { useAppSelector } from "@/store/hooks";
import { placesSelectors } from "@/store/states/selectors";
import { IDonationTicket } from "@/store/states/donations/slices";
import DonationOption from "./DonationOption";
import { TextInputMask } from "react-native-masked-text";
import { RoundedBorder } from "@/styles/CustomBorder";
import ActionButton from "./ActionButton";

export interface IGenerateCupom {
  itemType: number;
  foodQuantity: number;
  clotheQuantity: number;
}

interface RegisterDonationComponentProps {
  isDonor: boolean;
  showSubmitConfirmation: boolean;
  onSubmit: (payload?: IDonationTicket | IGenerateCupom) => void;
  onCancel: () => void;
}

export default function RegisterDonationComponent({ isDonor, showSubmitConfirmation, onSubmit, onCancel }: RegisterDonationComponentProps) {
  const statePlaces = useAppSelector((state) => placesSelectors.getPlaces({ places: state.places }));

  const [donationOptionSelected, setDonationOptionSelected] = useState<number>();
  const [placeOptionSelected, setPlaceOptionSelected] = useState<number>();
  const [foodQuantity, setFoodQuantity] = useState<string | undefined>();
  const [clotheQuantity, setClotheQuantity] = useState<string | undefined>();

  const selectOption = (selection: number) => {
    if (selection === donationOptionSelected) return setDonationOptionSelected(undefined);

    setDonationOptionSelected(selection);
  };

  const preparePayload = (confirm: boolean) => {
    let payload: IDonationTicket | IGenerateCupom | undefined = undefined;

    if (confirm) {
      if (isDonor) {
        payload = {
          itemType: donationOptionSelected ?? 0,
          place: statePlaces.find((place: any) => place.value === placeOptionSelected)?.label,
          status: 'pending',
        };
      } else {
        const nFoodQuantity = parseFloat(foodQuantity?.replace(',', '.') ?? '');
        const nClotheQuantity = parseFloat(clotheQuantity?.replace(',', '.') ?? '');

        payload = {
          itemType: donationOptionSelected ?? 0,
          foodQuantity: isNaN(nFoodQuantity) ? 0 : nFoodQuantity,
          clotheQuantity: isNaN(nClotheQuantity) ? 0 : nClotheQuantity,
        }
      }
    }

    onSubmit(payload);
  }

  return (
    <View style={styles.container}>
      <Text>O que {isDonor ? 'irá doar' : 'está recebendo'}?</Text>
      <View style={styles.donationOptions}>
        <DonationOption
          type={0}
          selectOption={selectOption}
          selected={donationOptionSelected === 0}
        />
        <DonationOption
          type={2}
          selectOption={selectOption}
          selected={donationOptionSelected === 2}
        />
        <DonationOption
          type={1}
          selectOption={selectOption}
          selected={donationOptionSelected === 1}
        />
      </View>
      {isDonor ? (
        <View style={styles.placesContainer}>
          <Text style={styles.placesLabel}>Selecione o ponto de entrega mais próximo</Text>
          <SelectPlaceComponent
            selected={placeOptionSelected}
            selectValue={setPlaceOptionSelected}
          />
        </View>
      ) : (
        <View>
          {donationOptionSelected !== 1 && (
            <View style={{ ...styles.row }}>
              <TextInputMask
                type={"custom"}
                options={{
                  mask: "99,99",
                }}
                keyboardType="numeric"
                style={{ ...styles.input, width: '85%', }}
                placeholder="00,00"
                placeholderTextColor="#999"
                value={clotheQuantity}
                returnKeyType="next"
                onChangeText={(val) => setClotheQuantity(val)}
              />
              <Text style={{ ...styles.inputLabel, marginBottom: 25, }}>PÇS</Text>
            </View>
          )}
          {donationOptionSelected !== 0 && (<View style={{ ...styles.row }}>
            <TextInputMask
              type={"custom"}
              options={{
                mask: "99,99",
              }}
              keyboardType="numeric"
              style={{ ...styles.input, width: '85%', }}
              placeholder="00,00"
              placeholderTextColor="#999"
              value={foodQuantity}
              returnKeyType="next"
              onChangeText={(val) => setFoodQuantity(val)}
            />
            <Text style={{ ...styles.inputLabel, marginBottom: 25, }}>KG</Text>
          </View>)}
        </View>
      )}
      <ActionButton secondary text="Cancelar" callback={() => onCancel()} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSubmitConfirmation}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>AVISO</Text>
            <Text style={styles.modalText}>
              Certifique-se de que o item a ser {isDonor ? 'doado' : 'recebido'} encontra-se fechado, dentro do prazo de validade ou bem conservados e com condições a uso.
            </Text>
            <View style={styles.modalActions}>
              <Pressable onPress={() => preparePayload(false)}>
                <Text style={{ ...styles.modalText, ...styles.modalAction }}>Revisar</Text>
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
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    textAlign: 'center',
    margin: 12,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: "#f0f0f0",
    padding: 15,
    paddingLeft: 25,
    fontSize: 14,
    color: "#333",
    marginBottom: 15,
    ...RoundedBorder
  },
});
