import ActionButton from "@/components/ActionButton";
import LoggedAreaComponent from "@/components/LoggedArea";
import { useAppSelector } from "@/store/hooks";
import { ICupomTicket } from "@/store/states/cupoms/slices";
import { userSelectors } from "@/store/states/selectors";
import { AppBorder } from "@/styles/CustomBorder";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

interface SendCupomPageProps { }

export default function SendCupomPage({ }: SendCupomPageProps) {
  const navigation = useNavigation();

  const route = useRoute();
  const { cupom } = route.params as { cupom: ICupomTicket };

  const [email, setEmail] = useState<string>();
  const [sending, setSending] = useState<boolean>(false);

  const stateUser = useAppSelector(userSelectors.getUser);

  const sendEmail = () => {
    setSending(false);
    setEmail(undefined);

    navigation.goBack();
  }

  return (
    <LoggedAreaComponent isDonor={stateUser.isDonor}>
      <View style={{ ...styles.container, ...styles.marginBt }}>
        <Text style={styles.marginBt}>O cupom de desconto gerado é</Text>
        <Text style={{ ...styles.cupomName, ...styles.marginBt }}>
          {cupom.name}
        </Text>
        <Text style={{ ...styles.cupomDesc }}>
          Cupom garante {cupom.descountAmount.toFixed(2).replace('.', ',')}% de desconto
        </Text>
        <Text style={{ ...styles.cupomDesc, ...styles.marginBt }}>
          Válido por 10 dias após a emissão
        </Text>
        <View style={{ ...styles.row, ...styles.marginBt }}>
          <Text style={{ marginBottom: 15, marginRight: 8 }}>E-mail Cliente</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira o e-mail do cliente"
            keyboardType="email-address"
            placeholderTextColor="#999"
            value={email}
            returnKeyType="done"
            enablesReturnKeyAutomatically
            onChangeText={(val) => setEmail(val)}
          />
        </View>
        <ActionButton text="Enviar" callback={() => setSending(true)} />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={sending}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>E-mail enviado com sucesso!</Text>
            <TouchableOpacity
              style={styles.footerAction}
              onPress={() => sendEmail()}
            >
              <Icon name={'check'} size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LoggedAreaComponent>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  cupomName: {
    paddingVertical: 28,
    paddingHorizontal: 56,
    backgroundColor: '#d9d9d9',
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '75%',
  },
  marginBt: {
    marginBottom: 28,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cupomDesc: {
    textAlign: 'left',
  },

  input: {
    width: '75%',
    backgroundColor: "#f0f0f0",
    padding: 15,
    paddingLeft: 25,
    fontSize: 14,
    color: "#333",
    marginBottom: 15,
    ...AppBorder
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
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
    marginBottom: 18,
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
  footerAction: {
    borderRadius: '100%',
    backgroundColor: "#48742c",

    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: 'center',
    textAlign: "center",
    elevation: 2,
  },
});
