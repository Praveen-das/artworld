import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAdmin as _logoutAdmin, logoutUser, signinUser,signinAdmin as _signinAdmin, signupUser } from "../Services/user.api";
import socket from "../lib/ws";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync: signin } = useMutation(signinUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const { mutateAsync: signinAdmin } = useMutation(_signinAdmin, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const { mutateAsync: signup } = useMutation(signupUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const logout = useMutation(logoutUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const logoutAdmin = useMutation(_logoutAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  function handleLogout() {
    logout
      .mutateAsync()
      .then(() => {
        socket.disconnect();
      })
      .finally(() => {
        navigate("/");
      });
  }

  return {
    signin,
    logout,
    signinAdmin,
    logoutAdmin,
    signup,
    handleLogout,
  };
}

export default useAuth;
