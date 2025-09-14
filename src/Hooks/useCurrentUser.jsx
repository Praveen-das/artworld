import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  _addToRecentlyViewed,
  _addUserAddress,
  _deleteUserAddress,
  _updateUser,
  _updateUserAddress,
  _addSocialMediaLink,
  _removeSocialMediaLink,
  _changePassword,
  _requestPasswordResetLink,
  _resetPassword,
} from "../Services/user.api";

function useCurrentUser() {
  const queryClient = useQueryClient();
  const currentUser = useQuery(["currentUser"], () => getCurrentUser());

  const updateUser = useMutation(_updateUser, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const addUserAddress = useMutation(_addUserAddress, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const updateUserAddress = useMutation(_updateUserAddress, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const { mutateAsync: deleteUserAddress } = useMutation(_deleteUserAddress, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const addToRecentlyViewed = useMutation(_addToRecentlyViewed, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const addSocialMediaLink = useMutation(_addSocialMediaLink, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const removeSocialMediaLink = useMutation(_removeSocialMediaLink, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
  
  const changePassword = useMutation(_changePassword, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
  
  const requestPasswordResetLink = useMutation(_requestPasswordResetLink);

  const resetPassword = useMutation(_resetPassword);

  return {
    currentUser,
    updateUser,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    addToRecentlyViewed,
    addSocialMediaLink,
    removeSocialMediaLink,
    changePassword,
    requestPasswordResetLink,
    resetPassword
  };
}

export default useCurrentUser;
