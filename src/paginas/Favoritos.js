import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { auth, db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  const obtenerFavoritos = async () => {
    const q = query(collection(db, "favoritos"), where("uid", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    const lista = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setFavoritos(lista);
  };

  const eliminarFavorito = async (id) => {
    await deleteDoc(doc(db, "favoritos", id));
    obtenerFavoritos();
  };

  useEffect(() => {
    obtenerFavoritos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ Mis Favoritos</Text>
      {favoritos.length === 0 ? (
        <Text>No tienes favoritos aún</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ flex: 1 }}>{item.joke}</Text>
              <Button title="Eliminar" onPress={() => eliminarFavorito(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 15, textAlign: "center" },
  item: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
});
