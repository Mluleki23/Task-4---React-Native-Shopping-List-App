import shoppingReducer, {
  addItem,
  clearAll,
  deleteItem,
  editItem,
  togglePurchased,
} from "../app/features/shoppingSlice";

describe("shopping reducer", () => {
  it("should handle addItem", () => {
    const state = shoppingReducer(undefined, addItem("Apples", 3));
    expect(state.items.length).toBe(1);
    expect(state.items[0].name).toBe("Apples");
    expect(state.items[0].quantity).toBe(3);
  });

  it("should edit an item", () => {
    const added = shoppingReducer(undefined, addItem("Bread", 1));
    const id = added.items[0].id;
    const edited = shoppingReducer(
      added,
      editItem({ id, name: "Whole Wheat Bread", quantity: 2 })
    );
    expect(edited.items[0].name).toBe("Whole Wheat Bread");
    expect(edited.items[0].quantity).toBe(2);
  });

  it("should delete an item", () => {
    const s1 = shoppingReducer(undefined, addItem("Eggs", 6));
    const id = s1.items[0].id;
    const s2 = shoppingReducer(s1, deleteItem(id));
    expect(s2.items.find((i) => i.id === id)).toBeUndefined();
  });

  it("should toggle purchased", () => {
    const s1 = shoppingReducer(undefined, addItem("Milk", 1));
    const id = s1.items[0].id;
    const s2 = shoppingReducer(s1, togglePurchased(id));
    expect(s2.items[0].purchased).toBe(true);
  });

  it("should clear all", () => {
    const s1 = shoppingReducer(undefined, addItem("A", 1));
    const s2 = shoppingReducer(s1, clearAll());
    expect(s2.items.length).toBe(0);
  });
});
