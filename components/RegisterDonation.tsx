import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ClotheSource = require('@/assets/images/t-shirt.png');
const FoodSource = require('@/assets/images/food-together.png');
const AllSource = require('@/assets/images/all-together.png');

export default function RegisterDonationComponent() {
  const [donationOptionSelected, setDonationOptionSelected] = useState<number>();
  const [placeOptionSelected, setPlaceOptionSelected] = useState<string>();

  const selectOption = (selection: number) => {
    if (selection === donationOptionSelected) return setDonationOptionSelected(undefined);

    setDonationOptionSelected(selection);
  };

  return (
    <View style={styles.container}>
      <Text>O que irá doar?</Text>
      <View style={styles.donationOptions}>
        <TouchableOpacity
          style={{ ...styles.donationOption, ...(donationOptionSelected === 0 && styles.donationOptionSelected) }}
          onPress={() => selectOption(0)}
        >
          <View>
            <Image source={ClotheSource} style={styles.donationImg} resizeMode="contain" />
            <Text style={styles.donationText} >Roupas</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.donationOption, ...(donationOptionSelected === 1 && styles.donationOptionSelected) }}
          onPress={() => selectOption(1)}
        >
          <View>
            <Image source={FoodSource} style={styles.donationImg} resizeMode="contain" />
            <Text style={styles.donationText} >Alimento</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.donationOption, ...(donationOptionSelected === 2 && styles.donationOptionSelected) }}
          onPress={() => selectOption(2)}
        >
          <View>
            <Image source={AllSource} style={styles.donationImg} resizeMode="contain" />
            <Text style={styles.donationText} >Ambas</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text>Selecione o ponto de entrega mais próximo</Text>
      <Picker
        selectedValue={placeOptionSelected}
        style={styles.picker}
        onValueChange={(itemValue) => setPlaceOptionSelected(itemValue)}
      >
        <Picker.Item label="Supermercado Sonda - Av Paulista" value="0" />
        <Picker.Item label="Supermercado Sonda - Av Paulista" value="1" />
        <Picker.Item label="Supermercado Sonda - Av Paulista" value="2" />
      </Picker>
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
  },
  donationOption: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#d9d9d9',
  },
  donationOptionSelected: {
    backgroundColor: '#6CC1E780',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#0078AE',
  },
  donationImg: {
    width: 60,
    height: 60,
  },
  donationText: {
    textAlign: 'center',
  },
  picker: {
    width: 200,
    height: 50,
  },
});
