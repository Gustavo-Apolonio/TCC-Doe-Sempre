import { useEffect, useState } from "react"
import { StyleSheet, Text } from "react-native";

const Sentences = [
  'Doe esperança, faça a diferença',
  'Doe amor, colha sorrisos',
  'Contribua e faça o bem acontecer',
  'Ajude hoje, mude o amanhã',
  'Uma doação pode mudar uma vida',
];

interface MotivationTextProps {
  bold?: boolean;
}

export default function MotivationText({ bold }: MotivationTextProps) {
  const [text, setText] = useState('Doe esperança, faça a diferença');

  useEffect(() => {
    const randomSentence = Sentences[Math.floor(Math.random() * Sentences.length)];
    setText(randomSentence);
  }, []);

  return (
    <Text style={{ ...styles.text, color: bold ? '#fff' : styles.text.color, fontWeight: bold ? 500 : 300, }}>{text}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
  }
});
