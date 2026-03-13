import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import {
  toggleCreateProductModal,
  toggleUpdateProductModal,
} from "./extraSlice";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    fetchingProducts: false,
    products: [],
    totalProducts: 0,
  },
  reducers: {
    createProductRequest(state) {
      state.loading = true;
    },
    createProductSuccess(state, action) {
      state.loading = false;
      state.products = [action.payload, ...state.products];
    },
    createProductFailed(state) {
      state.loading = false;
    },
    getAllProductsRequest(state) {
      state.fetchingProducts = true;
    },
    getAllProductsSuccess(state, action) {
      state.fetchingProducts = false;
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
    },
    getAllProductsFailed(state) {
      state.fetchingProducts = false;
    },
    updateProductRequest(state) {
      state.loading = true;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product,
      );
    },
    updateProductFailed(state) {
      state.loading = false;
    },
    deleteProductRequest(state) {
      state.loading = true;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
      state.totalProducts = Math.max(0, state.totalProducts - 1);
    },
    deleteProductFailed(state) {
      state.loading = false;
    },
  },
});

export const createNewProduct = (data) => async (dispatch) => {
  dispatch(productSlice.actions.createProductRequest());
  await axiosInstance
    .post("/product/admin/create", data)
    .then((res) => {
      dispatch(productSlice.actions.createProductSuccess(res.data.product));
      toast.success(res.data.message || "Product Created Successfully");
      dispatch(toggleCreateProductModal());
    })
    .catch((err) => {
      dispatch(productSlice.actions.createProductFailed());
      toast.error(err.response?.data?.message || "Failed to create Product");
    });
};

export const fetchAllProducts = (page) => async (dispatch) => {
  dispatch(productSlice.actions.getAllProductsRequest());
  await axiosInstance
    .get(`/product?page=${page || 1}`)
    .then((res) => {
      dispatch(productSlice.actions.getAllProductsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productSlice.actions.getAllProductsFailed());
    });
};

export const updateProduct = (data, id) => async (dispatch) => {
  dispatch(productSlice.actions.updateProductRequest());
  await axiosInstance
    .put(`/product/admin/update/${id}`, data)
    .then((res) => {
      dispatch(
        productSlice.actions.updateProductSuccess(res.data.updateProduct),
      );
      toast.success(res.data.message || "Product Updated Successfully");
      dispatch(toggleUpdateProductModal());
    })
    .catch((err) => {
      dispatch(productSlice.actions.updateProductFailed());
      toast.error(err.response?.data?.message || "Failed to update Product");
    });
};

export const deleteProduct = (id, page) => async (dispatch, getState) => {
  dispatch(productSlice.actions.deleteProductRequest());
  await axiosInstance
    .delete(`/product/admin/delete/${id}`)
    .then((res) => {
      dispatch(productSlice.actions.deleteProductSuccess(id));
      toast.success(res.data.message || "Product deleted Successfully");

      const state = getState();
      const updatedTotal = state.product.totalProducts;
      const updatedMaxPage = Math.ceil(updatedTotal / 10) || 1;
      const validPage = Math.min(page, updatedMaxPage);
      dispatch(fetchAllProducts(validPage));
    })
    .catch((err) => {
      dispatch(productSlice.actions.deleteProductFailed());
      toast.error(err.response?.data?.message || "Failed to delete Product");
    });
};

export default productSlice.reducer;
