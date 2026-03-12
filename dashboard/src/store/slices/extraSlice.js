import { createSlice } from "@reduxjs/toolkit";

const extraSlice = createSlice({
  name: "extra",
  initialState: {
    openedComponent: "Dashboard",
    isNavbarOpened: false,
    isViewProductModalOpened: false,
    isCreateProductModalOpened: false,
    isUpdateProductModalOpened: false,
  },
  reducers: {
    toggleComponent: (state, action) => {
      state.openedComponent = action.payload;
    },
    toggleNavbar: (state) => {
      state.isNavbarOpened = !state.isNavbarOpened;
    },
    toggleCreateProductModal: (state) => {
      state.isCreateProductModalOpened = !state.isCreateProductModalOpened;
    },
    toggleViewProductModal: (state) => {
      state.isViewProductModalOpened = !state.isViewProductModalOpened;
    },
    toggleUpdatProductModal: (state) => {
      state.isUpdateProductModalOpened = !state.isUpdateProductModalOpened;
    },
  },
});

export const {
  toggleComponent,
  toggleNavbar,
  toggleCreateProductModal,
  toggleUpdatProductModal,
  toggleViewProductModal,
} = extraSlice.actions;

export default extraSlice.reducer;
