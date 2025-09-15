import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchProduct,
  fetchAdminProducts,
  fetchProducts,
  _addProduct,
  _updateProduct,
  _deleteProduct,
  productQuery,
} from "../Services/product.api";

export function useProductSearch(queryString = window.location.search.slice(1)) {
  return useQuery(["product-query", queryString], () => fetchProducts(queryString + "&limit=5"), {
    keepPreviousData: true,
    enabled: Boolean(queryString),
  });
}

export function useProducts(queryString = "") {
  return useQuery(["products", queryString], () => fetchProducts(queryString), {
    keepPreviousData: true,
  });
}

export function useProductQuery(queryKey, url, enabled = true) {
  return useQuery([queryKey, url], () => productQuery(url), {
    keepPreviousData: true,
    enabled,
  });
}

export function useAdmin(userId, queryString = "") {
  const queryClient = useQueryClient();
  const products = useQuery(["admin_products", userId, queryString], () => fetchAdminProducts(userId, queryString), {
    keepPreviousData: true,
  });

  const addProduct = useMutation(_addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_products"]);
    },
  });

  const updateProduct = useMutation(_updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_products"]);
    },
  });

  const deleteProduct = useMutation(_deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_products"]);
    },
  });

  return {
    products,
    addProduct,
    deleteProduct,
    updateProduct,
  };
}

export function useProduct(id) {
  const data = useQuery(["product", id], () => fetchProduct(id), {
    enabled: !!id,
    suspense: true,
  });

  return data;
}
