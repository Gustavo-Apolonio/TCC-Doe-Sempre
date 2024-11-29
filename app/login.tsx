import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import AppBorder from "@/styles/CustomBorder";
import { ValidateDocument } from "@/utils/ValidateDocument";
import ActionButton from "@/components/ActionButton";
import PageComponent from "@/components/Page";
import { useNavigation } from "expo-router";
import { useAppDispatch } from "@/store/hooks";
import { userActions } from "@/store/states/slices";

const CPF_MASK = "999.999.999-99";
const CNPJ_MASK = "99.999.999/9999-99";
const TYPE = "99999999999999"

export default function LoginPage() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [document, setDocument] = useState<string>();
  const [documentType, setDocumentType] = useState<typeof CPF_MASK | typeof CNPJ_MASK | typeof TYPE>(TYPE);

  const changeDocumentType = () => {
    setDocumentType(document && document.length > 11 ? CNPJ_MASK : CPF_MASK);
  }

  const changeDocumentVal = (val: string) => {
    val = val.replace(/\D/g, '');
    setDocument(val);
  }

  const [password, setPassword] = useState<string>();

  const login = () => {
    dispatch(userActions.setState({ document }));
    (navigation.navigate as any)('home');
  }

  return (
    <PageComponent>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabelText}>CPF/CNPJ</Text>
        <TextInputMask
          type={"custom"}
          options={{
            mask: documentType,
            validator: (val) => ValidateDocument(val, typeof document === typeof CPF_MASK),
          }}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Insira seu CPF/CNPJ"
          placeholderTextColor="#999"
          value={document}
          onBlur={() => changeDocumentType()}
          onFocus={() => setDocumentType(TYPE)}
          returnKeyType="done"
          onChangeText={(val) => changeDocumentVal(val)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabelText}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira sua senha"
          secureTextEntry
          placeholderTextColor="#999"
          value={password}
          returnKeyType="go"
          enablesReturnKeyAutomatically
          onSubmitEditing={() => login()}
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <View style={styles.enterArea}>
        <ActionButton text="Entrar" callback={login} />
      </View>
    </PageComponent>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: '100%',
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
