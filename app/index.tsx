import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AddItem from "./components/AddItem";
import ShoppingList from "./components/ShoppingList";
import { persistor, store } from "./store";

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.safe}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft} />
            <Text style={styles.title}>Shopping List</Text>
            <Pressable style={styles.settings} accessibilityLabel="Settings">
              <Text style={styles.settingsText}>⚙</Text>
            </Pressable>
          </View>

          <AddItem />
          <ShoppingList />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f7f7f7" },
  headerRow: {
    backgroundColor: "#1e73be",
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: { width: 32 },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  settings: { width: 32, alignItems: "center" },
  settingsText: { color: "#fff", fontSize: 18 },
});
