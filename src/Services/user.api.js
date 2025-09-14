import axiosClient from "../lib/axiosClient";

const signupUser = async (credentials) => {
  return await axiosClient.post("/user/create", credentials).then((res) => res.data);
};

const signinUser = async (credentials) => {
  const data = await axiosClient.post("/user/signin", credentials);
  return data;
};

const logoutUser = async () => {
  return await axiosClient.get("/user/logout");
};

const signinAdmin = async (credentials) => {
  const data = await axiosClient.post("/admin/signin", credentials).then((res) => res.data);
  return data;
};

const logoutAdmin = async () => {
  return await axiosClient.post("/admin/logout");
};

const _updateUser = async (updates) => {
  return await axiosClient.put("/user/update", updates);
};

const getCurrentUser = async () => {
  return axiosClient.get("/user").then(({ data }) => data || null);
};

const getAdmin = async () => {
  return axiosClient.get("/admin").then(({ data }) => data || null);
};

const _getUserById = async (uid) => {
  return await axiosClient.get(`/user/${uid}`).then(({ data }) => data || null);
};

const authenticateUsingGmail = async () => {
  return await axiosClient.get("/auth/google");
};

const _addUserAddress = async (payload) => {
  return await axiosClient.post("/user/address", payload);
};

const _updateUserAddress = async (updates) => {
  return await axiosClient.put("/user/address", updates);
};

const _deleteUserAddress = async (id) => {
  return await axiosClient.delete(`/user/address/${id}`).then((res) => res.data);
};

const _addToRecentlyViewed = async (id) => {
  return await axiosClient.post(`/user/rv/add/${id}`).then((res) => res.data);
};

const _addSocialMediaLink = async (data) => {
  return await axiosClient.post(`/user/social`, data).then((res) => res.data);
};
const _removeSocialMediaLink = async (id) => {
  return await axiosClient.delete(`/user/social/${id}`).then((res) => res.data);
};

const getArtists = async () => {
  return axiosClient.get("/user/artists").then(({ data }) => data || null);
};

const _addFollower = async ({ id }) => {
  return axiosClient.post(`/user/artists/follow/${id}`).then(({ data }) => data || null);
};

const _removeFollower = async ({ id }) => {
  return axiosClient.delete(`/user/artists/unfollow/${id}`).then(({ data }) => data || null);
};

const _changePassword = async (body) => {
  return await axiosClient.patch("/password/change", JSON.stringify(body)).then((res) => res.data);
};

const _requestPasswordResetLink = async (body) => {
  return await axiosClient.post("/password/send-reset-link", JSON.stringify(body)).then((res) => res.data);
};

const _resetPassword = async (body) => {
  return await axiosClient.patch("/password/reset", JSON.stringify(body)).then((res) => res.data);
};

export {
  signupUser,
  signinUser,
  logoutUser,
  signinAdmin,
  logoutAdmin,
  authenticateUsingGmail,
  getCurrentUser,
  getAdmin,
  _getUserById,
  _updateUser,
  _addUserAddress,
  _updateUserAddress,
  _deleteUserAddress,
  _addToRecentlyViewed,
  _addSocialMediaLink,
  _removeSocialMediaLink,
  getArtists,
  _addFollower,
  _removeFollower,
  _changePassword,
  _requestPasswordResetLink,
  _resetPassword,
};
