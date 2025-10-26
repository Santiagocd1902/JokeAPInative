import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";

// dentro del componente:
const guardarFavorito = async () => {
  if (!auth.currentUser) return alert("Inicia sesión primero");
  await addDoc(collection(db, "favoritos"), {
    uid: auth.currentUser.uid,
    joke,
  });
  alert("Chiste guardado en favoritos");
};

// Y debajo del botón "Nuevo chiste":
<Button title="Guardar en Favoritos" onPress={guardarFavorito} />


export default function Detalles() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const resp = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
      const data = await resp.json();
      setJoke(data.joke);
    } catch (error) {
      console.error("Error al obtener el chiste:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>😂 Chiste del día</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Text style={styles.text}>{joke}</Text>
      )}
      <Button title="Nuevo chiste" onPress={fetchJoke} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 15, fontWeight: "bold" },
  text: { fontSize: 16, marginBottom: 20, textAlign: "center" },
});
