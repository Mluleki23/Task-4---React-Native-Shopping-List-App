import React, { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  initialName: string;
  initialQuantity: number;
  onSave: (name: string, quantity: number) => void;
};

export default function EditItemModal({
  visible,
  onClose,
  initialName,
  initialQuantity,
  onSave,
}: Props) {
  const [name, setName] = useState(initialName);
  const [quantity, setQuantity] = useState(String(initialQuantity));

  useEffect(() => {
    setName(initialName);
    setQuantity(String(initialQuantity));
  }, [initialName, initialQuantity, visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.dialog}>
          <Text style={styles.title}>Edit item</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <Button title="Cancel" onPress={onClose} />
            <Button
              title="Save"
              onPress={() => {
                const q = Math.max(1, parseInt(quantity || "1", 10) || 1);
                onSave(name.trim(), q);
                onClose();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  title: { fontWeight: "700", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
});
