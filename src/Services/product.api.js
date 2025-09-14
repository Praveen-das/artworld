import axiosClient from "../lib/axiosClient";

export const deleteImage = (ids) => {
  return axiosClient.delete(`/imagekit/delete`, { data: ids }).then((res) => res.data);
};

export const _addProduct = async (product) => {
  return await axiosClient.post(`/products/add`, product);
};

export const _deleteProduct = (id) => {
  return axiosClient.delete(`/products/${id}`);
};

export const _updateProduct = async ({ id, updates }) => {
  return await axiosClient.put(`/products/${id}`, updates);
};

export const fetchProducts = async (query) => {
  return await axiosClient.get(`/products${query && "?" + query}`).then((res) => res.data);
};

export const fetchFilterParams = async (query) => {
  return await axiosClient.get("/products/fetch?" + query).then((res) => res.data);
};

export const fetchCategories = async (query) => {
  return await axiosClient.get("/products/categories?" + query).then((res) => res.data);
};
export const _addCategories = async (data) => {
  return await axiosClient.post("/products/categories/add", data).then((res) => res.data);
};
export const _removeCategories = async (id) => {
  return await axiosClient.delete("/products/categories/" + id).then((res) => res.data);
};
export const _updateCategories = async ({ id, updates }) => {
  return await axiosClient.put("/products/categories/" + id, updates).then((res) => res.data);
};

export const productQuery = async (url, page, facets, order = "createdAt_asc", query, limit) => {
  return await axiosClient
    .request({
      url,
      //   params: {
      //     facets,
      //     o: orderBy,
      //     q: query,
      //     limit,
      //     p: page,
      //   },
    })
    .then((res) => res.data);
};

export const fetchAdminProducts = (query) => {
  return axiosClient.get(`/user/products${query && "?" + query}`).then((res) => res.data);
};

export const fetchProduct = (id) => {
  return axiosClient.get(`/products/${id}`).then((res) => res.data);
};

export const _getUserWishlist = async () => {
  return await axiosClient.get(`/user/wishlist`).then((res) => res.data);
};

export const _addToWishlist = async (id) => {
  return axiosClient.post(`/user/wishlist/add/${id}`);
};

export const _removeFromWishlist = async (id) => {
  return axiosClient.delete(`/user/wishlist/remove/${id}`);
};
