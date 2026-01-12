import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  editItem,
  ShoppingItem as ShoppingItemType,
} from "../features/shoppingSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { RootState } from "../store";
import EditItemModal from "./EditItemModal";
import ShoppingItem from "./ShoppingItem";

export default function ShoppingList() {
  const items = useAppSelector((s: RootState) => s.shopping.items);
  const dispatch = useAppDispatch();

  const [editingId, setEditingId] = useState<string | null>(null);

  const itemToEdit = useMemo(
    () => items.find((i: ShoppingItemType) => i.id === editingId) ?? null,
    [items, editingId]
  );

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text style={styles.empty}>
          Your shopping list is empty. Add items above.
        </Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <ShoppingItem item={item} onEdit={(id) => setEditingId(id)} />
          )}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              <Text style={styles.footerText}>🗑 Swipe to delete items</Text>
            </View>
          )}
        />
      )}

      <EditItemModal
        visible={!!editingId}
        onClose={() => setEditingId(null)}
        initialName={itemToEdit?.name ?? ""}
        initialQuantity={itemToEdit?.quantity ?? 1}
        onSave={(name, quantity) =>
          dispatch(editItem({ id: editingId!, name, quantity }))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { textAlign: "center", marginTop: 24, color: "#666" },
});
