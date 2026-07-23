import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";

import GroupItem from "./GroupItem";

export default function GroupList() {
  const API_URL = "http://localhost:3000/api/grupos";

  const [grupos, setGrupos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const cargarGrupos = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      if (json.estado) {
        setGrupos(json.datos);
      } else {
        Alert.alert("Error", json.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar la lista de Grupos.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    cargarGrupos();
  }, []);

  return (
    <FlatList
      data={grupos}
      renderItem={({ item }) => <GroupItem chat={item} />}
      style={{ backgroundColor: "white" }}
    />
  );
}
