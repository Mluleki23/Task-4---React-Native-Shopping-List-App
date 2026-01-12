import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  deleteItem,
  ShoppingItem as ItemType,
  togglePurchased,
} from "../features/shoppingSlice";
import { useAppDispatch } from "../hooks";

type Props = {
  item: ItemType;
  onEdit: (id: string) => void;
};

export default function ShoppingItem({ item, onEdit }: Props) {
  const dispatch = useAppDispatch();

  const onDelete = () => {
    Alert.alert("Delete item", `Delete "${item.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => dispatch(deleteItem(item.id)),
      },
    ]);
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => dispatch(togglePurchased(item.id))}
        accessibilityLabel={
          item.purchased ? "Mark not purchased" : "Mark purchased"
        }
        style={styles.checkbox}
      >
        <Text style={{ fontSize: 18 }}>{item.purchased ? "☑" : "☐"}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.name, item.purchased && styles.purchased]}>
          {item.name}
        </Text>
        <Text style={styles.sub}>Qty: {item.quantity}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => onEdit(item.id)}
          style={[styles.actionBtn, styles.editBtn]}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.actionBtn, styles.delBtn]}
        >
          <Text style={[styles.actionText, { color: "#fff" }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  checkbox: {
    marginRight: 12,
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: { flex: 1 },
  name: { fontSize: 16 },
  sub: { color: "#666" },
  actions: { flexDirection: "row", alignItems: "center" },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  editBtn: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" },
  delBtn: { backgroundColor: "#b00" },
  actionText: { color: "#007aff" },
  purchased: { textDecorationLine: "line-through", color: "#888" },
});
