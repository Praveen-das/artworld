import { io } from "socket.io-client";
import { BASE_URL } from "../Utils/urls";

const socket = io(BASE_URL, { autoConnect: false });

export default socket;