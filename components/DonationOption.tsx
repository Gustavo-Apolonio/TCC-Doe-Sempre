import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ClotheSource = require('@/assets/images/t-shirt.png');
const FoodSource = require('@/assets/images/food-together.png');
const AllSource = require('@/assets/images/all-together.png');

interface DonationOptionProps {
  type: number;
  selected?: boolean;
  selectOption?: (option: number) => void;
}

export default function DonationOption({ type, selected, selectOption }: DonationOptionProps) {
  switch (type) {
    case 0:
      return (
        <TouchableOpacity
          style={{ ...styles.donationOption, ...(selected && styles.donationOptionSelected) }}
          onPress={() => selectOption && selectOption(0)}
        >
          <View>
            <Image source={ClotheSource} style={styles.donationImg} resizeMode="contain" />
            <Text style={styles.donationText} >Roupas</Text>
          </View>
        </TouchableOpacity>
      );

    case 1:
      return (
        <TouchableOpacity
          style={{ ...styles.donationOption, ...(selected && styles.donationOptionSelected) }}
          onPress={() => selectOption && selectOption(1)}
        >
          <View>
            <Image source={FoodSource} style={styles.donationImg} resizeMode="contain" />
            <Text style={styles.donationText} >Alimento</Text>
          </View>
        </TouchableOpacity>
      );

    case 2:
    default:
      return (
        <TouchableOpacity
          style={{ ...styles.donationOption, ...(selected && styles.donationOptionSelected) }}
          onPress={() => selectOption && selectOption(2)}
        >
          <View>
            <Image source={AllSource} style={styles.donationImg} resizeMode="contain" />
            <Text style={styles.donationText} >Ambas</Text>
          </View>
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
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
});
