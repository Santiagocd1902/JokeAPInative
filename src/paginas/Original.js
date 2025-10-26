import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Original() {
  const [jokes, setJokes] = useState([]);
  const [votos, setVotos] = useState({});

  const fetchJokes = async () => {
    try {
      const resp = await fetch("https://v2.jokeapi.dev/joke/Any?type=single&amount=2");
      const data = await resp.json();
      setJokes(data.jokes || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  const votar = (id) => {
    setVotos((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>😂 Joke Battle</Text>
      {jokes.length === 0 ? (
        <Text>Cargando...</Text>
      ) : (
        jokes.map((j, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.joke}>{j.joke}</Text>
            <Button title="Votar" onPress={() => votar(i)} />
            <Text>Votos: {votos[i] || 0}</Text>
          </View>
        ))
      )}
      <Button title="Nueva batalla" onPress={fetchJokes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  card: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 8, width: "90%" },
  joke: { marginBottom: 10 },
});
