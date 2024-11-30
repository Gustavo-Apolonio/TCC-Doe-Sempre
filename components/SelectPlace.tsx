import { useAppSelector } from "@/store/hooks";
import { placesSelectors } from "@/store/states/selectors";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface SelectPlaceComponentProps {
  selected: number | undefined,
  selectValue: (selectedOption: number) => void;
}

export default function SelectPlaceComponent({ selected, selectValue }: SelectPlaceComponentProps) {
  const statePlaces = useAppSelector((state) => placesSelectors.getPlaces({ places: state.places }))

  return (
    <ScrollView style={styles.container}>
      {statePlaces.map(({ label, value }: { label: string, value: number }) => (
        <TouchableOpacity
          style={{
            ...styles.selectItem,
            ...(selected === value && styles.selectedItem)
          }}
          key={value}
          onPress={() => selectValue(value)}
        >
          <Text style={styles.selectItemText}>{label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 225,
  },

  selectItem: {
    padding: 16,
    alignItems: 'center',

    borderStyle: 'solid',
    borderBottomWidth: 1.5,
    borderColor: '#666',

    backgroundColor: '#e2e2e2',
  },
  selectedItem: {
    backgroundColor: '#6CC1E780',
    borderColor: '#0078AE',
  },
  selectItemText: {
    textAlign: 'center',
  }
});
