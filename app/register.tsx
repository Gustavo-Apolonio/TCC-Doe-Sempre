import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { TextInputMask } from "react-native-masked-text";

import PageComponent from "@/components/Page";
import ActionButton from "@/components/ActionButton";
import { AppBorder } from "@/styles/CustomBorder";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { userActions } from "@/store/states/slices";
import { useAppDispatch } from "@/store/hooks";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { isDonor } = route.params as any;

  const [name, setName] = useState<string>();
  const [document, setDocument] = useState<string>();
  const [birthdate, setBirthdate] = useState<string>();
  const [mobileNumber, setMobileNumber] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [city, setCity] = useState<string>();
  const [uf, setUf] = useState<string>();

  const changeDocumentVal = (val: string) => {
    val = val.replace(/\D/g, '');
    setDocument(val);
  }

  const register = () => {
    dispatch(userActions.setState({
      document,
      isDonor
    }));
    (navigation.navigate as any)('home');
  };

  return (
    <PageComponent>
      <View style={styles.container}>
        <Text style={styles.inputLabelText}>Nome {isDonor ? 'Completo' : 'Instituição'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu nome"
          placeholderTextColor="#999"
          value={name}
          returnKeyType="next"
          enablesReturnKeyAutomatically
          onChangeText={(val) => setName(val)}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.inputLabelText}>{isDonor ? 'CPF' : 'CNPJ'}</Text>
        <TextInputMask
          type={isDonor ? "cpf" : 'cnpj'}
          keyboardType="numeric"
          style={styles.input}
          placeholder={"Insira seu " + isDonor ? 'CPF' : 'CNPJ'}
          placeholderTextColor="#999"
          value={document}
          returnKeyType="next"
          onChangeText={(val) => changeDocumentVal(val)}
        />
      </View>

      <View style={styles.rowContainer}>
        {isDonor && (
          <View style={{ ...styles.container, width: '50%' }}>
            <Text style={styles.inputLabelText}>Data de nascimento</Text>
            <TextInputMask
              type="custom"
              options={{
                mask: '99/99/9999'
              }}
              keyboardType="numeric"
              style={styles.input}
              placeholder="__/__/__"
              placeholderTextColor="#999"
              value={birthdate}
              returnKeyType="next"
              onChangeText={(val) => setBirthdate(val)}
            />
          </View>
        )}

        <View style={{ ...styles.container, width: isDonor ? '50%' : '100%' }}>
          <Text style={styles.inputLabelText}>Telefone</Text>
          <TextInputMask
            type="cel-phone"
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '+55 (99) '
            }}
            keyboardType="numeric"
            style={styles.input}
            placeholder="+55 (99) 91234-5678"
            placeholderTextColor="#999"
            value={mobileNumber}
            returnKeyType="next"
            onChangeText={(val) => setMobileNumber(val)}
          />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.inputLabelText}>Endereço de E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu e-mail"
          keyboardType="email-address"
          placeholderTextColor="#999"
          value={email}
          returnKeyType="next"
          enablesReturnKeyAutomatically
          onChangeText={(val) => setEmail(val)}
        />
      </View>

      <View style={styles.rowContainer}>
        <View style={{ ...styles.container, width: '75%' }}>
          <Text style={styles.inputLabelText}>Localização</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira sua cidade"
            placeholderTextColor="#999"
            value={city}
            returnKeyType="next"
            enablesReturnKeyAutomatically
            onChangeText={(val) => setCity(val)}
          />
        </View>

        <View style={{ ...styles.container, width: '25%' }}>
          <Text style={styles.inputLabelText}>UF</Text>
          <TextInputMask
            type="custom"
            options={{
              mask: 'AA',
            }}
            style={styles.input}
            placeholder="UF"
            placeholderTextColor="#999"
            value={uf}
            returnKeyType="next"
            onChangeText={(val) => setUf(val)}
          />
        </View>
      </View>

      <View style={styles.enterArea}>
        <ActionButton text={`Sou ${isDonor ? 'DOADOR' : 'Ponto de COLETA'}`} callback={register} />
      </View>
    </PageComponent>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
  },

  inputLabelText: {
    paddingLeft: 15,
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
    ...AppBorder
  },

  enterArea: {
    width: '100%',
  }
});
