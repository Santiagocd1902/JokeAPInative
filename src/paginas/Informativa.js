import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Informativa() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📖 Descripción general</Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>JokeAPI App</Text> muestra chistes obtenidos desde una API externa.
      </Text>
      <Text style={styles.text}>
        Sirve como ejemplo educativo del consumo de APIs y manejo de estados en React Native.
      </Text>
      <Text style={styles.subtitle}>👨‍💻 Desarrollador</Text>
      <Text style={styles.text}>
        Aplicación creada por <Text style={{ fontWeight: "bold" }}>Santiago Castellanos</Text>.
      </Text>
      <Text style={styles.subtitle}>🎯 Objetivo</Text>
      <Text style={styles.text}>
        Ofrecer una experiencia divertida y educativa sobre APIs y estados.
      </Text>
      <Text style={styles.footer}>© {new Date().getFullYear()} JokeAPI App – Santiago Castellanos</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 20, fontWeight: "600", marginTop: 15 },
  text: { fontSize: 16, marginTop: 5 },
  footer: { textAlign: "center", marginTop: 20, color: "gray" },
});
