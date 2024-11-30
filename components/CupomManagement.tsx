import { ICupomTicket } from "@/store/states/cupoms/slices";
import { RoundedBorder } from "@/styles/CustomBorder";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import ActionButton from "./ActionButton";
import DonationOption from "./DonationOption";

interface CupomManagementProps {
  cupom?: ICupomTicket;
  onSubmit: (cupom: ICupomTicket) => void;
  onCancel: () => void;
}

export default function CupomManagement({ cupom, onSubmit, onCancel }: CupomManagementProps) {
  const [descountAmount, setDescountAmount] = useState<string | undefined>(cupom?.descountAmount?.toFixed(2)?.replace('.', ','));
  const [foodQuantity, setFoodQuantity] = useState<string | undefined>(cupom?.foodQuantity?.toFixed(2)?.replace('.', ','));
  const [clotheQuantity, setClotheQuantity] = useState<string | undefined>(cupom?.clotheQuantity?.toFixed(2)?.replace('.', ','));
  const [name, setName] = useState<string | undefined>(cupom?.name);

  const getDonationType = () => {
    let type = '';
    const nFoodQuantity = +(foodQuantity?.replace(',', '.') ?? '');
    const nClotheQuantity = +(clotheQuantity?.replace(',', '.') ?? '');

    if (foodQuantity && nFoodQuantity > 0) type += 'F';
    if (clotheQuantity && nClotheQuantity > 0) type += 'C';
    if (type === 'FC') type = 'B'

    return type;
  }

  const getCupomName = () => {
    const base = 'DOE';
    const type = getDonationType();
    const desc = 'DESC';
    const descValue = descountAmount?.replace(/\D/g, '') ?? '';

    const final = `${base}${type}${desc}${descValue}`;

    setName(final);
  }

  useEffect(() => {
    getCupomName();
  }, [descountAmount, foodQuantity, clotheQuantity]);

  const handleSubmit = () => {
    const payload: ICupomTicket = {
      clotheQuantity: parseFloat(clotheQuantity?.replace(',', '.') ?? ''),
      descountAmount: parseFloat(descountAmount?.replace(',', '.') ?? ''),
      foodQuantity: parseFloat(foodQuantity?.replace(',', '.') ?? ''),
      name: name ?? 'DOEDESC',
      active: true,
      id: cupom?.id,
    };

    onSubmit(payload as any);
  }

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Text style={styles.bold}>{cupom ? 'Edição de descontos' : 'Adicione um cupom'}</Text>
      <Text style={styles.bold}>{name}</Text>
      <View style={styles.row}>
        <Text style={{ ...styles.inputLabel, marginBottom: 25, }}>Cupom</Text>
        <TextInputMask
          type={"custom"}
          options={{
            mask: "99,99",
          }}
          keyboardType="numeric"
          style={{ ...styles.input }}
          placeholder="00,00"
          placeholderTextColor="#999"
          value={descountAmount}
          returnKeyType="next"
          onChangeText={(val) => setDescountAmount(val)}
        />
        <Text style={{ ...styles.inputLabel, marginBottom: 25, }}>%</Text>
      </View>
      <View style={styles.donationInputContainer}>
        <DonationOption type={1} />
        <Text style={styles.inputLabel}>Quantos kilos de alimento?</Text>
        <View style={styles.row}>
          <TextInputMask
            type={"custom"}
            options={{
              mask: "99,99",
            }}
            keyboardType="numeric"
            style={{ ...styles.input }}
            placeholder="00,00"
            placeholderTextColor="#999"
            value={foodQuantity}
            returnKeyType="next"
            onChangeText={(val) => setFoodQuantity(val)}
          />
          <Text style={{ ...styles.inputLabel, marginBottom: 25, }}>KG</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.donationInputContainer}>
        <DonationOption type={0} />
        <Text style={styles.inputLabel}>Quantas peças de vestimenta?</Text>
        <View style={styles.row}>
          <TextInputMask
            type={"custom"}
            options={{
              mask: "99,99",
            }}
            keyboardType="numeric"
            style={{ ...styles.input }}
            placeholder="00,00"
            placeholderTextColor="#999"
            value={clotheQuantity}
            returnKeyType="next"
            onChangeText={(val) => setClotheQuantity(val)}
          />
          <Text style={{ ...styles.inputLabel, marginBottom: 25, }}>PÇS</Text>
        </View>
      </View>
      <View style={{ ...styles.row, justifyContent: 'space-between' }}>
        <View style={{ ...styles.row, width: '48%' }}>
          <ActionButton text="Cancelar" secondary callback={onCancel} />
        </View>
        <View style={{ ...styles.row, width: '48%' }}>
          <ActionButton text="Salvar cupom" callback={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  inputLabel: {
    fontSize: 16,
    textAlign: 'center',
    margin: 12,
    marginBottom: 8,
  },
  input: {
    width: '30%',
    backgroundColor: "#f0f0f0",
    padding: 15,
    paddingLeft: 25,
    fontSize: 14,
    color: "#333",
    marginBottom: 15,
    ...RoundedBorder
  },

  donationInputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  divider: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    marginBottom: 15,
  }
});
