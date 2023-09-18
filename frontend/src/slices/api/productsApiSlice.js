import apiSlice from "./apiSlice";
import { PRODUCTS_URL } from "../../constants";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 20,
    }),
    getProdcutDetail: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 20,
    }),
  }),
});

export const { useGetProductsQuery, useGetProdcutDetailQuery } =
  productsApiSlice;
