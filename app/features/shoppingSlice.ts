import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
  createdAt: number;
}

export interface ShoppingState {
  items: ShoppingItem[];
}

const initialState: ShoppingState = {
  items: [],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addItem: {
      reducer(state: ShoppingState, action: PayloadAction<ShoppingItem>) {
        state.items.unshift(action.payload);
      },
      prepare(name: string, quantity: number) {
        return {
          payload: {
            id: nanoid(),
            name,
            quantity,
            purchased: false,
            createdAt: Date.now(),
          } as ShoppingItem,
        };
      },
    },
    editItem(
      state: ShoppingState,
      action: PayloadAction<{ id: string; name?: string; quantity?: number }>
    ) {
      const { id, name, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (name !== undefined) item.name = name;
        if (quantity !== undefined) item.quantity = quantity;
      }
    },
    deleteItem(state: ShoppingState, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    togglePurchased(state: ShoppingState, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.purchased = !item.purchased;
    },
    clearAll(state: ShoppingState) {
      state.items = [];
    },
  },
});

export const { addItem, editItem, deleteItem, togglePurchased, clearAll } =
  shoppingSlice.actions;
export default shoppingSlice.reducer;
