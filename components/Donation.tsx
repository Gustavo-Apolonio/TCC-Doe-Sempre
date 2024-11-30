import { StyleSheet, Text, View } from "react-native";
import DonationOption from "./DonationOption";

interface DonationComponentProps {
  itemType: number;
  place: string;
  id: number;
}

export default function DonationComponent({ itemType, place, id }: DonationComponentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ ...styles.headerText, ...styles.describer }}>É hora de doar</Text>
      </View>
      <Text style={styles.describer}>
        Você tem uma doação pendente
      </Text>
      <View style={styles.itemContainer}>
        <Text style={styles.describer}>Item:</Text>
        <DonationOption
          type={itemType}
          selected
        />
      </View>
      <Text style={styles.describer}>Em:</Text>
      <Text style={{ marginBottom: 8, }}>{place}</Text>
      <Text style={styles.describer}>Ticket {id + 1}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',

    width: '80%',
    borderTopLeftRadius: 41,
    borderTopRightRadius: 41,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#d9d9d9',
    marginBottom: 24,
  },
  header: {
    borderColor: '#0078AE',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    backgroundColor: '#0090D1',

    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,

    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 24,
    width: '100%',
  },
  headerText: {
    color: '#fff',
  },
  describer: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '50%',

    marginTop: 8,
    marginBottom: 8,
  },
});
