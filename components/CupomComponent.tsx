import { ICupomTicket } from "@/store/states/cupoms/slices";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

interface CupomComponentProps {
  cupomInfo: ICupomTicket;
  editCupom: () => void;
  deleteCupom: () => void;
}

export default function CupomComponent({ cupomInfo, editCupom, deleteCupom }: CupomComponentProps) {
  return (
    <View style={styles.container}>
      <Text>Cupom {cupomInfo.descountAmount}%</Text>
      <Text>-</Text>
      <Text style={styles.boldText}>
        {cupomInfo.name}
      </Text>
      <View style={{ ...styles.actionsContainer, justifyContent: cupomInfo.active ? 'space-between' : 'center' }}>
        {cupomInfo.active ? (
          <>
            <TouchableOpacity onPress={() => editCupom()}>
              <Icon name={'pencil'} size={20} color="#808080" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteCupom()}>
              <Icon name={'trash'} size={20} color="#f23535" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity>
            <Icon name={'ban'} size={20} color="#bcbcbc" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    marginBottom: 32,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 52,
  },
  boldText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
