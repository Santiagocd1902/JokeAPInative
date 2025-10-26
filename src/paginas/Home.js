import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator } from "react-native";

export default function Home() {
  const [jokes, setJokes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  const fetchJokes = async () => {
    setCargando(true);
    try {
      const resp = await fetch("https://v2.jokeapi.dev/joke/Any?type=single&amount=10");
      const data = await resp.json();
      setJokes(data.jokes || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  const jokesFiltrados = jokes.filter((joke) =>
    joke.joke.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🃏 JokeAPI App</Text>
      <Button title="Recargar chistes" onPress={fetchJokes} />
      <TextInput
        style={styles.input}
        placeholder="Buscar chiste..."
        value={busqueda}
        onChangeText={setBusqueda}
      />
      {cargando ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : jokesFiltrados.length > 0 ? (
        jokesFiltrados.map((j, i) => (
          <Text key={i} style={styles.joke}>{j.joke}</Text>
        ))
      ) : (
        <Text>No se encontraron chistes.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 20 },
  title: { fontSize: 24, marginVertical: 10 },
  input: {
    borderWidth: 1, borderColor: "#ccc", width: "90%", borderRadius: 8,
    padding: 8, marginVertical: 10
  },
  joke: {
    borderBottomWidth: 1, borderColor: "#ddd", paddingVertical: 10, width: "90%"
  },
});
