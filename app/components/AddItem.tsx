import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { addItem } from "../features/shoppingSlice";
import { useAppDispatch } from "../hooks";

export default function AddItem() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onAdd = () => {
    if (!name.trim()) {
      setError("Please enter an item name.");
      return;
    }
    const q = Math.max(1, parseInt(quantity || "1", 10) || 1);
    dispatch(addItem(name.trim(), q));
    setName("");
    setQuantity("1");
    setError("");
    setSuccess(`Added "${name.trim()}"`);
    setTimeout(() => setSuccess(""), 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputLarge}
            placeholder="Add a new item"
            value={name}
            onChangeText={(t) => {
              setName(t);
              if (t.trim()) setError("");
            }}
            accessibilityLabel="Item name"
          />

          <Pressable
            onPress={onAdd}
            style={({ pressed }) => [
              styles.addBtn,
              pressed && styles.addBtnPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Add item"
            testID="add-item-button"
          >
            <Text style={styles.addBtnText}>Add</Text>
          </Pressable>
        </View>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {success ? (
        <View style={styles.snackbar} testID="snackbar">
          <Text style={styles.snackText}>{success}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, backgroundColor: "#f7f7f7" },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  inputRow: { flexDirection: "row", alignItems: "center" },
  inputLarge: {
    flex: 1,
    padding: 14,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  addBtn: {
    marginLeft: 8,
    backgroundColor: "#2e8b57",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnPressed: { opacity: 0.85 },
  addBtnText: { color: "#fff", fontWeight: "700" },
  error: { color: "red", marginTop: 6, marginLeft: 14 },
  snackbar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 20,
    backgroundColor: "#2e8b57",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
  },
  snackText: { color: "#fff", fontWeight: "600" },
});
